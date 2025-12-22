import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Search,
  FolderOpen,
  ArrowUpRight,
  ArrowDownRight,
  Eye
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { ProjectDetailView } from './ProjectDetailView';

interface Project {
  id: string;
  name: string;
  client: string;
  status: string;
  value: number;
}

interface Receita {
  id: string;
  valor: number;
  projeto_id: string | null;
}

interface Despesa {
  id: string;
  valor: number;
  valor_total: number | null;
  valor_pago: number | null;
  projeto_id: string | null;
  status_pagamento: string | null;
}

interface ProjectFinancial {
  project: Project;
  totalReceitas: number;
  totalDespesas: number;
  totalPendente: number;
  lucro: number;
  margemLucro: number;
}

export const ProjectFinancialView = () => {
  const [projectFinancials, setProjectFinancials] = useState<ProjectFinancial[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const { toast } = useToast();

  const loadData = async () => {
    try {
      const [projectsRes, receitasRes, despesasRes] = await Promise.all([
        supabase.from('projects').select('*').order('name'),
        supabase.from('receitas').select('id, valor, projeto_id'),
        supabase.from('despesas').select('id, valor, valor_total, valor_pago, projeto_id, status_pagamento')
      ]);

      if (projectsRes.error) throw projectsRes.error;

      const financials: ProjectFinancial[] = (projectsRes.data || []).map(project => {
        const projectReceitas = (receitasRes.data || []).filter(r => r.projeto_id === project.id);
        const projectDespesas = (despesasRes.data || []).filter(d => d.projeto_id === project.id);

        const totalReceitas = projectReceitas.reduce((acc, r) => acc + Number(r.valor), 0);
        const totalDespesas = projectDespesas.reduce((acc, d) => acc + Number(d.valor_total || d.valor), 0);
        const totalPendente = projectDespesas
          .filter(d => d.status_pagamento !== 'pago')
          .reduce((acc, d) => acc + (Number(d.valor_total || d.valor) - Number(d.valor_pago || 0)), 0);

        const lucro = totalReceitas - totalDespesas;
        const margemLucro = totalReceitas > 0 ? (lucro / totalReceitas) * 100 : 0;

        return { project, totalReceitas, totalDespesas, totalPendente, lucro, margemLucro };
      });

      setProjectFinancials(financials);
    } catch (error) {
      console.error('Erro:', error);
      toast({ title: "Erro", description: "Erro ao carregar dados", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      planejamento: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      em_andamento: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      concluido: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      cancelado: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    };
    return colors[status] || colors.planejamento;
  };

  const filteredFinancials = projectFinancials.filter(pf => {
    const matchesSearch = 
      pf.project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pf.project.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'todos' || pf.project.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const chartData = filteredFinancials
    .filter(pf => pf.totalReceitas > 0 || pf.totalDespesas > 0)
    .slice(0, 8)
    .map(pf => ({
      name: pf.project.name.length > 12 ? pf.project.name.substring(0, 12) + '...' : pf.project.name,
      receitas: pf.totalReceitas,
      despesas: pf.totalDespesas,
    }));

  const totals = filteredFinancials.reduce((acc, pf) => ({
    receitas: acc.receitas + pf.totalReceitas,
    despesas: acc.despesas + pf.totalDespesas,
    lucro: acc.lucro + pf.lucro,
    pendentes: acc.pendentes + pf.totalPendente
  }), { receitas: 0, despesas: 0, lucro: 0, pendentes: 0 });

  // Se um projeto está selecionado, mostra a visão detalhada
  if (selectedProjectId) {
    return (
      <ProjectDetailView 
        projectId={selectedProjectId} 
        onBack={() => { setSelectedProjectId(null); loadData(); }} 
      />
    );
  }

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        {[...Array(5)].map((_, i) => <div key={i} className="h-16 bg-muted rounded" />)}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Cards de Resumo */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receitas (Projetos)</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(totals.receitas)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Despesas (Projetos)</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{formatCurrency(totals.despesas)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lucro Total</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totals.lucro >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(totals.lucro)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
            <DollarSign className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{formatCurrency(totals.pendentes)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico */}
      {chartData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Comparativo por Projeto</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="name" className="text-xs" />
                <YAxis tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`} />
                <Tooltip 
                  formatter={(value) => formatCurrency(Number(value))}
                  contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
                />
                <Legend />
                <Bar dataKey="receitas" name="Receitas" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="despesas" name="Despesas" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Lista de Projetos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FolderOpen className="h-5 w-5" />
            Projetos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4 flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar projeto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="planejamento">Planejamento</SelectItem>
                <SelectItem value="em_andamento">Em Andamento</SelectItem>
                <SelectItem value="concluido">Concluído</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            {filteredFinancials.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">Nenhum projeto encontrado</div>
            ) : (
              filteredFinancials.map((pf) => (
                <div 
                  key={pf.project.id}
                  className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                  onClick={() => setSelectedProjectId(pf.project.id)}
                >
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-medium">{pf.project.name}</p>
                      <p className="text-sm text-muted-foreground">{pf.project.client}</p>
                    </div>
                    <Badge className={getStatusColor(pf.project.status)}>
                      {pf.project.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right hidden sm:block">
                      <p className="text-xs text-muted-foreground">Receitas</p>
                      <p className="font-medium text-green-600">{formatCurrency(pf.totalReceitas)}</p>
                    </div>
                    <div className="text-right hidden sm:block">
                      <p className="text-xs text-muted-foreground">Despesas</p>
                      <p className="font-medium text-red-600">{formatCurrency(pf.totalDespesas)}</p>
                    </div>
                    <div className="text-right min-w-[100px]">
                      <p className="text-xs text-muted-foreground">Lucro</p>
                      <div className="flex items-center gap-1 justify-end">
                        {pf.lucro >= 0 ? (
                          <ArrowUpRight className="h-4 w-4 text-green-600" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4 text-red-600" />
                        )}
                        <p className={`font-bold ${pf.lucro >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {formatCurrency(pf.lucro)}
                        </p>
                      </div>
                    </div>
                    <div className="w-20 hidden md:block">
                      <Progress value={Math.max(0, Math.min(100, pf.margemLucro))} className="h-2" />
                      <p className="text-xs text-center mt-1">{pf.margemLucro.toFixed(0)}%</p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
