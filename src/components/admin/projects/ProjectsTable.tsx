
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Checkbox } from '../../ui/checkbox';
import { Input } from '../../ui/input';
import { Edit, Trash2, Check, X } from 'lucide-react';

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

interface ProjectsTableProps {
  projects: Project[];
  selectedProjects: Set<string>;
  onProjectSelection: (projectId: string, checked: boolean) => void;
  onDelete: (id: string) => void;
  onEdit: (project: Project) => void;
  onProgressUpdate: (id: string, progress: number) => void;
}

const ProjectsTable: React.FC<ProjectsTableProps> = ({
  projects,
  selectedProjects,
  onProjectSelection,
  onDelete,
  onEdit,
  onProgressUpdate
}) => {
  const [editingProgress, setEditingProgress] = useState<string | null>(null);
  const [progressValue, setProgressValue] = useState<number>(0);

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; variant: any }> = {
      planejamento: { label: 'Planejamento', variant: 'secondary' },
      em_andamento: { label: 'Em Andamento', variant: 'default' },
      pausado: { label: 'Pausado', variant: 'destructive' },
      concluido: { label: 'Concluído', variant: 'default' },
      cancelado: { label: 'Cancelado', variant: 'destructive' }
    };

    const config = statusConfig[status] || { label: status, variant: 'outline' };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress >= 25) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const isProjectLate = (project: Project) => {
    if (!project.end_date || project.status === 'concluido' || project.status === 'cancelado') {
      return false;
    }
    const today = new Date();
    const endDate = new Date(project.end_date);
    return endDate < today;
  };

  const handleProgressEdit = (projectId: string, currentProgress: number) => {
    setEditingProgress(projectId);
    setProgressValue(currentProgress);
  };

  const handleProgressSave = (projectId: string) => {
    const clampedProgress = Math.max(0, Math.min(100, progressValue));
    onProgressUpdate(projectId, clampedProgress);
    setEditingProgress(null);
  };

  const handleProgressCancel = () => {
    setEditingProgress(null);
    setProgressValue(0);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12">Seleção</TableHead>
          <TableHead>Projeto</TableHead>
          <TableHead>Cliente</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Progresso</TableHead>
          <TableHead>Início</TableHead>
          <TableHead>Previsão</TableHead>
          <TableHead>Valor</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {projects.map((project) => (
          <TableRow 
            key={project.id}
            className={isProjectLate(project) ? 'bg-red-50 border-red-200' : ''}
          >
            <TableCell>
              <Checkbox
                checked={selectedProjects.has(project.id)}
                onCheckedChange={(checked) => onProjectSelection(project.id, !!checked)}
              />
            </TableCell>
            <TableCell className="font-medium">
              {project.name}
              {isProjectLate(project) && (
                <Badge variant="destructive" className="ml-2 text-xs">ATRASADO</Badge>
              )}
            </TableCell>
            <TableCell>{project.client}</TableCell>
            <TableCell>
              <Badge variant="outline">{project.type}</Badge>
            </TableCell>
            <TableCell>{getStatusBadge(project.status)}</TableCell>
            <TableCell>
              {editingProgress === project.id ? (
                <div className="flex items-center space-x-2">
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={progressValue}
                    onChange={(e) => setProgressValue(Number(e.target.value))}
                    className="w-16 h-8"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleProgressSave(project.id)}
                    className="h-8 w-8 p-0"
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleProgressCancel}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getProgressColor(project.progress)}`}
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <span 
                    className="text-sm text-gray-600 cursor-pointer hover:text-blue-600"
                    onClick={() => handleProgressEdit(project.id, project.progress)}
                  >
                    {project.progress}%
                  </span>
                </div>
              )}
            </TableCell>
            <TableCell>{new Date(project.start_date).toLocaleDateString()}</TableCell>
            <TableCell>
              {project.end_date ? new Date(project.end_date).toLocaleDateString() : 'N/A'}
            </TableCell>
            <TableCell>R$ {project.value.toLocaleString()}</TableCell>
            <TableCell>
              <div className="flex space-x-1">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onEdit(project)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onDelete(project.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProjectsTable;
