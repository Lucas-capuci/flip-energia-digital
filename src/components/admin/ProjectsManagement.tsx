
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import ProjectsTable from './projects/ProjectsTable';
import ProjectsFilters from './projects/ProjectsFilters';
import CreateProjectDialog from './projects/CreateProjectDialog';
import EditProjectDialog from './projects/EditProjectDialog';

interface Project {
  id: string;
  name: string;
  client: string;
  type: string;
  status: string;
  start_date: string;
  end_date: string | null;
  value: number;
  progress: number;
  description: string | null;
  created_at: string;
}

interface ProjectsManagementProps {
  onTabChange?: (tab: string) => void;
}

const ProjectsManagement: React.FC<ProjectsManagementProps> = ({ onTabChange }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [typeFilter, setTypeFilter] = useState('todos');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProjects, setSelectedProjects] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const createForm = useForm({
    defaultValues: {
      name: '',
      client: '',
      type: '',
      status: 'planejamento',
      start_date: '',
      end_date: '',
      value: '',
      description: ''
    }
  });

  const editForm = useForm({
    defaultValues: {
      name: '',
      client: '',
      type: '',
      status: 'planejamento',
      start_date: '',
      end_date: '',
      value: '',
      progress: '',
      description: ''
    }
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [projects, searchTerm, statusFilter, typeFilter]);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar os projetos.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = projects;

    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'todos') {
      if (statusFilter === 'atrasado') {
        const today = new Date();
        filtered = filtered.filter(project => {
          if (!project.end_date || project.status === 'concluido' || project.status === 'cancelado') {
            return false;
          }
          const endDate = new Date(project.end_date);
          return endDate < today;
        });
      } else {
        filtered = filtered.filter(project => project.status === statusFilter);
      }
    }

    if (typeFilter !== 'todos') {
      filtered = filtered.filter(project => project.type === typeFilter);
    }

    setFilteredProjects(filtered);
  };

  const onCreateSubmit = async (data: any) => {
    try {
      const projectData = {
        name: data.name,
        client: data.client,
        type: data.type,
        status: data.status,
        start_date: data.start_date,
        end_date: data.end_date || null,
        value: parseFloat(data.value),
        description: data.description || null,
        progress: 0
      };

      const { error } = await supabase
        .from('projects')
        .insert([projectData]);

      if (error) throw error;

      await fetchProjects();
      setIsCreateDialogOpen(false);
      createForm.reset();
      
      toast({
        title: 'Projeto criado',
        description: 'O projeto foi criado com sucesso.',
      });
    } catch (error) {
      console.error('Error creating project:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível criar o projeto.',
        variant: 'destructive',
      });
    }
  };

  const onEditSubmit = async (data: any) => {
    if (!editingProject) return;

    try {
      const projectData = {
        name: data.name,
        client: data.client,
        type: data.type,
        status: data.status,
        start_date: data.start_date,
        end_date: data.end_date || null,
        value: parseFloat(data.value),
        progress: parseInt(data.progress),
        description: data.description || null,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('projects')
        .update(projectData)
        .eq('id', editingProject.id);

      if (error) throw error;

      await fetchProjects();
      setIsEditDialogOpen(false);
      setEditingProject(null);
      editForm.reset();
      
      toast({
        title: 'Projeto atualizado',
        description: 'O projeto foi atualizado com sucesso.',
      });
    } catch (error) {
      console.error('Error updating project:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível atualizar o projeto.',
        variant: 'destructive',
      });
    }
  };

  const deleteProject = async (id: string) => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;

      await fetchProjects();
      toast({
        title: 'Projeto excluído',
        description: 'O projeto foi excluído com sucesso.',
      });
    } catch (error) {
      console.error('Error deleting project:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível excluir o projeto.',
        variant: 'destructive',
      });
    }
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setIsEditDialogOpen(true);
  };

  const handleProgressUpdate = async (id: string, progress: number) => {
    try {
      const { error } = await supabase
        .from('projects')
        .update({ 
          progress: progress,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;

      await fetchProjects();
      toast({
        title: 'Progresso atualizado',
        description: 'O progresso do projeto foi atualizado com sucesso.',
      });
    } catch (error) {
      console.error('Error updating progress:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível atualizar o progresso.',
        variant: 'destructive',
      });
    }
  };

  const handleProjectSelection = (projectId: string, checked: boolean) => {
    const newSelection = new Set(selectedProjects);
    if (checked) {
      newSelection.add(projectId);
      if (onTabChange) {
        onTabChange('projects');
      }
    } else {
      newSelection.delete(projectId);
    }
    setSelectedProjects(newSelection);
  };

  if (isLoading) {
    return <div className="flex justify-center py-8">Carregando projetos...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Gerenciamento de Projetos ({filteredProjects.length})</span>
            <div className="flex space-x-2">
              <ProjectsFilters
                searchTerm={searchTerm}
                statusFilter={statusFilter}
                typeFilter={typeFilter}
                onSearchChange={setSearchTerm}
                onStatusChange={setStatusFilter}
                onTypeChange={setTypeFilter}
              />
              <CreateProjectDialog
                isOpen={isCreateDialogOpen}
                onOpenChange={setIsCreateDialogOpen}
                form={createForm}
                onSubmit={onCreateSubmit}
              />
            </div>
          </CardTitle>
          <CardDescription>
            Gerencie todos os projetos conectados ao Supabase. 
            <span className="text-red-600 font-medium">
              Critério para "atrasado": data de fim menor que hoje e status não concluído/cancelado.
            </span>
            <br />
            <span className="text-blue-600 font-medium">
              Clique na porcentagem para editar o progresso ou use o botão de editar para alterar outros dados.
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProjectsTable
            projects={filteredProjects}
            selectedProjects={selectedProjects}
            onProjectSelection={handleProjectSelection}
            onDelete={deleteProject}
            onEdit={handleEditProject}
            onProgressUpdate={handleProgressUpdate}
          />
        </CardContent>
      </Card>

      <EditProjectDialog
        project={editingProject!}
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        form={editForm}
        onSubmit={onEditSubmit}
      />
    </div>
  );
};

export default ProjectsManagement;
