import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Calendar,
  RefreshCw
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { QuickReceitaDialog } from './QuickReceitaDialog';
import { QuickDespesaDialog } from './QuickDespesaDialog';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface ProjectDetailViewProps {
  projectId: string;
  onBack: () => void;
}

interface Project {
  id: string;
  name: string;
  client: string;
  status: string;
  value: number;
  start_date: string;
  end_date: string | null;
}

interface Receita {
  id: string;
  valor: number;
  data_entrada: string;
  categoria: string;
  cliente: string;
  forma_pagamento: string;
}

interface Despesa {
  id: string;
  valor: number;
  valor_total: number | null;
  valor_pago: number | null;
  data_saida: string;
  categoria: string;
  fornecedor: string;
  status_pagamento: string | null;
  eh_recorrente: boolean;
  frequencia: string | null;
}

export const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({ projectId, onBack }) => {
  const [project, setProject] = useState<Project | null>(null);
  const [receitas, setReceitas] = useState<Receita[]>([]);
  const [despesas, setDespesas] = useState<Despesa[]>([]);
  const [loading, setLoading] = useState(true);
  const [receitaDialogOpen, setReceitaDialogOpen] = useState(false);
  const [despesaDialogOpen, setDespesaDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ id: string; type: 'receita' | 'despesa' } | null>(null);
  const { toast } = useToast();

  const loadData = async () => {
    setLoading(true);
    try {
      const [projectRes, receitasRes, despesasRes] = await Promise.all([
        supabase.from('projects').select('*').eq('id', projectId).single(),
        supabase.from('receitas').select('*').eq('projeto_id', projectId).order('data_entrada', { ascending: false }),
        supabase.from('despesas').select('*').eq('projeto_id', projectId).order('data_saida', { ascending: false })
      ]);

      if (projectRes.data) setProject(projectRes.data);
      setReceitas(receitasRes.data || []);
      setDespesas(despesasRes.data || []);
    } catch (error) {
      console.error('Erro:', error);
      toast({ title: "Erro", description: "Erro ao carregar dados", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [projectId]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;

    try {
      const table = itemToDelete.type === 'receita' ? 'receitas' : 'despesas';
      const { error } = await supabase.from(table).delete().eq('id', itemToDelete.id);
      if (error) throw error;
      
      toast({ title: "Sucesso", description: `${itemToDelete.type === 'receita' ? 'Receita' : 'Despesa'} excluída` });
      loadData();
    } catch (error) {
      console.error('Erro:', error);
      toast({ title: "Erro", description: "Erro ao excluir", variant: "destructive" });
    } finally {
      setDeleteDialogOpen(false);
      setItemToDelete(null);
    }
  };

  const getStatusColor = (status: string | null) => {
    if (status === 'pago') return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
    if (status === 'parcial') return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
    return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
  };

  if (loading) {
    return <div className="animate-pulse space-y-4">{[...Array(5)].map((_, i) => <div key={i} className="h-16 bg-muted rounded" />)}</div>;
  }

  if (!project) {
    return <div className="text-center py-8 text-muted-foreground">Projeto não encontrado</div>;
  }

  const totalReceitas = receitas.reduce((acc, r) => acc + Number(r.valor), 0);
  const totalDespesas = despesas.reduce((acc, d) => acc + Number(d.valor_total || d.valor), 0);
  const totalPago = despesas.reduce((acc, d) => acc + Number(d.valor_pago || 0), 0);
  const totalPendente = totalDespesas - totalPago;
  const lucro = totalReceitas - totalDespesas;
  const margem = totalReceitas > 0 ? (lucro / totalReceitas) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{project.name}</h2>
          <p className="text-muted-foreground">{project.client}</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setReceitaDialogOpen(true)} className="gap-2" variant="outline">
            <Plus className="h-4 w-4" /> Receita
          </Button>
          <Button onClick={() => setDespesaDialogOpen(true)} className="gap-2" variant="destructive">
            <Plus className="h-4 w-4" /> Despesa
          </Button>
        </div>
      </div>

      {/* Resumo Financeiro */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Valor do Projeto</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatCurrency(project.value)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" /> Receitas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">{formatCurrency(totalReceitas)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-red-600" /> Despesas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">{formatCurrency(totalDespesas)}</p>
            <p className="text-xs text-muted-foreground">Pendente: {formatCurrency(totalPendente)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4" /> Lucro
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-2xl font-bold ${lucro >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(lucro)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Margem</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{margem.toFixed(1)}%</p>
            <Progress value={Math.max(0, margem)} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Tabelas lado a lado */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Receitas */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Receitas ({receitas.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {receitas.length === 0 ? (
              <p className="text-center py-4 text-muted-foreground">Nenhuma receita</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {receitas.map(r => (
                    <TableRow key={r.id}>
                      <TableCell className="text-sm">{formatDate(r.data_entrada)}</TableCell>
                      <TableCell className="text-sm">{r.categoria}</TableCell>
                      <TableCell className="text-right font-medium text-green-600">{formatCurrency(r.valor)}</TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => { setItemToDelete({ id: r.id, type: 'receita' }); setDeleteDialogOpen(true); }}
                        >
                          <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Despesas */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-red-600" />
              Despesas ({despesas.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {despesas.length === 0 ? (
              <p className="text-center py-4 text-muted-foreground">Nenhuma despesa</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {despesas.map(d => (
                    <TableRow key={d.id}>
                      <TableCell className="text-sm">
                        <div className="flex items-center gap-1">
                          {formatDate(d.data_saida)}
                          {d.eh_recorrente && <RefreshCw className="h-3 w-3 text-muted-foreground" />}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{d.categoria}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(d.status_pagamento)}>
                          {d.status_pagamento || 'pendente'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium text-red-600">
                        {formatCurrency(d.valor_total || d.valor)}
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => { setItemToDelete({ id: d.id, type: 'despesa' }); setDeleteDialogOpen(true); }}
                        >
                          <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Dialogs */}
      <QuickReceitaDialog 
        open={receitaDialogOpen} 
        onOpenChange={setReceitaDialogOpen}
        projectId={projectId}
        onSuccess={loadData}
      />
      <QuickDespesaDialog 
        open={despesaDialogOpen} 
        onOpenChange={setDespesaDialogOpen}
        projectId={projectId}
        onSuccess={loadData}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir esta {itemToDelete?.type}? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
