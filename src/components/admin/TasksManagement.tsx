import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Plus, Filter, Search, Calendar, User, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import CreateTaskDialog from './tasks/CreateTaskDialog';
import EditTaskDialog from './tasks/EditTaskDialog';
import TasksAnalytics from './tasks/TasksAnalytics';

interface Task {
  id: string;
  task_number: string;
  title: string;
  description?: string;
  status: string;
  due_date?: string;
  responsible?: string;
  priority: string;
  project_id?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
  projects?: { name: string };
}

const TasksManagement = () => {
  const { hasPermission } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showAnalytics, setShowAnalytics] = useState(false);

  const fetchTasks = async () => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select(`
          *,
          projects (name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTasks(data || []);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
      toast.error('Erro ao carregar tarefas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    let filtered = tasks;

    if (searchTerm) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.task_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(task => task.status === statusFilter);
    }

    if (priorityFilter !== 'all') {
      filtered = filtered.filter(task => task.priority === priorityFilter);
    }

    setFilteredTasks(filtered);
  }, [tasks, searchTerm, statusFilter, priorityFilter]);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      a_fazer: { label: 'A fazer', variant: 'secondary' as const },
      em_andamento: { label: 'Em andamento', variant: 'default' as const },
      concluido: { label: 'Concluído', variant: 'default' as const },
      cancelado: { label: 'Cancelado', variant: 'destructive' as const }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Badge variant={config.variant} className={
        status === 'a_fazer' ? 'bg-red-100 text-red-800 hover:bg-red-200' :
        status === 'em_andamento' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' :
        status === 'concluido' ? 'bg-green-100 text-green-800 hover:bg-green-200' :
        'bg-gray-100 text-gray-800 hover:bg-gray-200'
      }>
        {config.label}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      A: { label: 'A', className: 'bg-red-500 text-white' },
      B: { label: 'B', className: 'bg-yellow-500 text-white' },
      C: { label: 'C', className: 'bg-green-500 text-white' }
    };
    
    const config = priorityConfig[priority as keyof typeof priorityConfig];
    return (
      <Badge className={`${config.className} hover:opacity-80`}>
        {config.label}
      </Badge>
    );
  };

  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    setEditDialogOpen(true);
  };

  const handleTaskCreated = () => {
    fetchTasks();
    setCreateDialogOpen(false);
  };

  const handleTaskUpdated = () => {
    fetchTasks();
    setEditDialogOpen(false);
    setSelectedTask(null);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const isOverdue = (dueDate?: string) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date() && new Date(dueDate).toDateString() !== new Date().toDateString();
  };

  if (showAnalytics) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Analytics de Tarefas</h2>
          <Button onClick={() => setShowAnalytics(false)}>
            Voltar para Tarefas
          </Button>
        </div>
        <TasksAnalytics tasks={tasks} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5" />
              <span>Controle de Tarefas</span>
            </CardTitle>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                onClick={() => setShowAnalytics(true)}
              >
                Analytics
              </Button>
              {hasPermission('tasks', 'create') && (
                <Button onClick={() => setCreateDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Tarefa
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar tarefas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="a_fazer">A fazer</SelectItem>
                <SelectItem value="em_andamento">Em andamento</SelectItem>
                <SelectItem value="concluido">Concluído</SelectItem>
                <SelectItem value="cancelado">Cancelado</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filtrar por prioridade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as prioridades</SelectItem>
                <SelectItem value="A">Prioridade A</SelectItem>
                <SelectItem value="B">Prioridade B</SelectItem>
                <SelectItem value="C">Prioridade C</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Controle</TableHead>
                  <TableHead>Tarefa</TableHead>
                  <TableHead>Descritivo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Prazo</TableHead>
                  <TableHead>Responsável</TableHead>
                  <TableHead>Prioridade</TableHead>
                  <TableHead>Projeto</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-4">
                      Carregando tarefas...
                    </TableCell>
                  </TableRow>
                ) : filteredTasks.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-4">
                      Nenhuma tarefa encontrada
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTasks.map((task) => (
                    <TableRow 
                      key={task.id}
                      className={isOverdue(task.due_date) && task.status !== 'concluido' ? 'bg-red-50' : ''}
                    >
                      <TableCell className="font-mono text-sm">
                        {task.task_number}
                      </TableCell>
                      <TableCell className="font-medium">
                        {task.title}
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {task.description || '-'}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(task.status)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          {task.due_date && (
                            <>
                              <Calendar className="h-4 w-4 text-gray-400" />
                              <span className={isOverdue(task.due_date) && task.status !== 'concluido' ? 'text-red-600 font-medium' : ''}>
                                {formatDate(task.due_date)}
                              </span>
                            </>
                          )}
                          {!task.due_date && '-'}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          {task.responsible && (
                            <>
                              <User className="h-4 w-4 text-gray-400" />
                              <span>{task.responsible}</span>
                            </>
                          )}
                          {!task.responsible && '-'}
                        </div>
                      </TableCell>
                      <TableCell>
                        {getPriorityBadge(task.priority)}
                      </TableCell>
                      <TableCell>
                        {task.projects?.name || '-'}
                      </TableCell>
                      <TableCell>
                        {hasPermission('tasks', 'edit') && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(task)}
                          >
                            Editar
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <CreateTaskDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onTaskCreated={handleTaskCreated}
      />

      {selectedTask && (
        <EditTaskDialog
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          task={selectedTask}
          onTaskUpdated={handleTaskUpdated}
        />
      )}
    </div>
  );
};

export default TasksManagement;