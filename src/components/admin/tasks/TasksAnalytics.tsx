import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  XCircle, 
  TrendingUp,
  Calendar,
  Users,
  BarChart3
} from 'lucide-react';

interface Task {
  id: string;
  task_number: string;
  title: string;
  status: string;
  due_date?: string;
  responsible?: string;
  priority: string;
  created_at: string;
  projects?: { name: string };
}

interface TasksAnalyticsProps {
  tasks: Task[];
}

const TasksAnalytics: React.FC<TasksAnalyticsProps> = ({ tasks }) => {
  const totalTasks = tasks.length;
  
  const statusCounts = {
    a_fazer: tasks.filter(t => t.status === 'a_fazer').length,
    em_andamento: tasks.filter(t => t.status === 'em_andamento').length,
    concluido: tasks.filter(t => t.status === 'concluido').length,
    cancelado: tasks.filter(t => t.status === 'cancelado').length,
  };

  const priorityCounts = {
    A: tasks.filter(t => t.priority === 'A').length,
    B: tasks.filter(t => t.priority === 'B').length,
    C: tasks.filter(t => t.priority === 'C').length,
  };

  const overdueTasks = tasks.filter(task => {
    if (!task.due_date || task.status === 'concluido') return false;
    return new Date(task.due_date) < new Date() && 
           new Date(task.due_date).toDateString() !== new Date().toDateString();
  }).length;

  const dueTasks = tasks.filter(task => {
    if (!task.due_date || task.status === 'concluido') return false;
    const today = new Date();
    const dueDate = new Date(task.due_date);
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays >= 0;
  }).length;

  const responsibleStats = tasks.reduce((acc, task) => {
    if (task.responsible) {
      acc[task.responsible] = (acc[task.responsible] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const topResponsible = Object.entries(responsibleStats)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  const completionRate = totalTasks > 0 ? Math.round((statusCounts.concluido / totalTasks) * 100) : 0;

  const recentTasks = tasks
    .filter(task => {
      const taskDate = new Date(task.created_at);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return taskDate >= thirtyDaysAgo;
    })
    .length;

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                <BarChart3 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total de Tarefas</p>
                <p className="text-2xl font-bold">{totalTasks}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Taxa de Conclusão</p>
                <p className="text-2xl font-bold">{completionRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 dark:bg-red-900 rounded-full">
                <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tarefas Atrasadas</p>
                <p className="text-2xl font-bold">{overdueTasks}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                <Calendar className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Vencem em 7 dias</p>
                <p className="text-2xl font-bold">{dueTasks}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Distribuição por Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Badge className="bg-red-100 text-red-800 hover:bg-red-200">A fazer</Badge>
                <span className="text-sm text-muted-foreground">
                  {statusCounts.a_fazer} tarefas
                </span>
              </div>
              <div className="w-20 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-red-500 h-2 rounded-full" 
                  style={{ width: totalTasks > 0 ? `${(statusCounts.a_fazer / totalTasks) * 100}%` : '0%' }}
                ></div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Em andamento</Badge>
                <span className="text-sm text-muted-foreground">
                  {statusCounts.em_andamento} tarefas
                </span>
              </div>
              <div className="w-20 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-yellow-500 h-2 rounded-full" 
                  style={{ width: totalTasks > 0 ? `${(statusCounts.em_andamento / totalTasks) * 100}%` : '0%' }}
                ></div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Concluído</Badge>
                <span className="text-sm text-muted-foreground">
                  {statusCounts.concluido} tarefas
                </span>
              </div>
              <div className="w-20 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: totalTasks > 0 ? `${(statusCounts.concluido / totalTasks) * 100}%` : '0%' }}
                ></div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Badge variant="destructive">Cancelado</Badge>
                <span className="text-sm text-muted-foreground">
                  {statusCounts.cancelado} tarefas
                </span>
              </div>
              <div className="w-20 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gray-500 h-2 rounded-full" 
                  style={{ width: totalTasks > 0 ? `${(statusCounts.cancelado / totalTasks) * 100}%` : '0%' }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Priority Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5" />
              <span>Distribuição por Prioridade</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Badge className="bg-red-500 text-white hover:opacity-80">A - Alta</Badge>
                <span className="text-sm text-muted-foreground">
                  {priorityCounts.A} tarefas
                </span>
              </div>
              <div className="w-20 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-red-500 h-2 rounded-full" 
                  style={{ width: totalTasks > 0 ? `${(priorityCounts.A / totalTasks) * 100}%` : '0%' }}
                ></div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Badge className="bg-yellow-500 text-white hover:opacity-80">B - Média</Badge>
                <span className="text-sm text-muted-foreground">
                  {priorityCounts.B} tarefas
                </span>
              </div>
              <div className="w-20 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-yellow-500 h-2 rounded-full" 
                  style={{ width: totalTasks > 0 ? `${(priorityCounts.B / totalTasks) * 100}%` : '0%' }}
                ></div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Badge className="bg-green-500 text-white hover:opacity-80">C - Baixa</Badge>
                <span className="text-sm text-muted-foreground">
                  {priorityCounts.C} tarefas
                </span>
              </div>
              <div className="w-20 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: totalTasks > 0 ? `${(priorityCounts.C / totalTasks) * 100}%` : '0%' }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Responsible and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Responsáveis com Mais Tarefas</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {topResponsible.length > 0 ? (
              <div className="space-y-3">
                {topResponsible.map(([responsible, count], index) => (
                  <div key={responsible} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">#{index + 1}</span>
                      <span className="text-sm">{responsible}</span>
                    </div>
                    <Badge variant="outline">{count} tarefas</Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">Nenhum responsável definido</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Atividade Recente</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Tarefas criadas (30 dias)</span>
                <Badge variant="outline">{recentTasks}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Tarefas concluídas</span>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                  {statusCounts.concluido}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Em andamento</span>
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                  {statusCounts.em_andamento}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TasksAnalytics;