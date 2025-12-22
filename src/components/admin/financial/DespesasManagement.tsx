import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Plus, Search, Edit, Trash2, Filter, Repeat, ChevronDown, ChevronRight, Eye, EyeOff, CreditCard, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { EditDespesaDialog } from './EditDespesaDialog';
import { Progress } from '@/components/ui/progress';

interface Despesa {
  id: string;
  tipo_despesa: string;
  fornecedor: string;
  categoria: string;
  valor: number;
  valor_total?: number;
  valor_pago?: number;
  status_pagamento?: string;
  forma_pagamento: string;
  data_saida: string;
  tipo_custo: string;
  eh_recorrente: boolean;
  frequencia?: string;
  duracao_meses?: number | null;
  indefinida: boolean;
  observacoes?: string;
  projeto_id?: string;
  projects?: {
    name: string;
  };
}

interface DespesasManagementProps {
  onCreateNew: () => void;
}

export const DespesasManagement: React.FC<DespesasManagementProps> = ({ onCreateNew }) => {
  const [despesas, setDespesas] = useState<Despesa[]>([]);
  const [filteredDespesas, setFilteredDespesas] = useState<Despesa[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('todos');
  const [filterCategory, setFilterCategory] = useState<string>('todos');
  const [filterCostType, setFilterCostType] = useState<string>('todos');
  const [filterRecurrent, setFilterRecurrent] = useState<string>('todos');
  const [filterStatus, setFilterStatus] = useState<string>('todos');
  const [viewMode, setViewMode] = useState<'detalhado' | 'consolidado'>('detalhado');
  const [editingDespesa, setEditingDespesa] = useState<Despesa | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const loadDespesas = async () => {
    try {
      const { data, error } = await supabase
        .from('despesas')
        .select(`
          *,
          projects (
            name
          )
        `)
        .order('data_saida', { ascending: false });

      if (error) throw error;

      setDespesas(data || []);
      setFilteredDespesas(data || []);
    } catch (error) {
      console.error('Erro ao carregar despesas:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar despesas",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDespesas();
  }, []);

  useEffect(() => {
    let filtered = despesas;

    if (filterType !== 'todos') {
      filtered = filtered.filter(despesa => despesa.tipo_despesa === filterType);
    }
    if (filterCategory !== 'todos') {
      filtered = filtered.filter(despesa => despesa.categoria === filterCategory);
    }
    if (filterCostType !== 'todos') {
      filtered = filtered.filter(despesa => despesa.tipo_custo === filterCostType);
    }
    if (filterRecurrent !== 'todos') {
      const isRecurrent = filterRecurrent === 'sim';
      filtered = filtered.filter(despesa => despesa.eh_recorrente === isRecurrent);
    }
    if (filterStatus !== 'todos') {
      filtered = filtered.filter(despesa => despesa.status_pagamento === filterStatus);
    }
    if (searchTerm) {
      filtered = filtered.filter(despesa =>
        despesa.fornecedor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        despesa.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
        despesa.observacoes?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredDespesas(filtered);
  }, [despesas, searchTerm, filterType, filterCategory, filterCostType, filterRecurrent, filterStatus]);

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta despesa?')) return;

    try {
      const { error } = await supabase
        .from('despesas')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Despesa excluída com sucesso",
      });
      
      loadDespesas();
    } catch (error) {
      console.error('Erro ao excluir despesa:', error);
      toast({
        title: "Erro",
        description: "Erro ao excluir despesa",
        variant: "destructive",
      });
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      operacional: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      administrativa: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
      projeto: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      marketing: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400',
      manutencao: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
      comercial: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400',
      outro: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
    };
    return colors[type] || colors.outro;
  };

  const getCostTypeColor = (type: string) => {
    return type === 'fixo' 
      ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' 
      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
  };

  const getPaymentStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pendente: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
      parcial: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      pago: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    };
    return colors[status] || colors.pendente;
  };

  const handlePayment = async (despesa: Despesa, valorPagamento: number) => {
    try {
      const novoValorPago = (despesa.valor_pago || 0) + valorPagamento;
      const valorTotal = despesa.valor_total || despesa.valor;
      let novoStatus = 'parcial';
      
      if (novoValorPago >= valorTotal) {
        novoStatus = 'pago';
      } else if (novoValorPago === 0) {
        novoStatus = 'pendente';
      }

      const { error } = await supabase
        .from('despesas')
        .update({
          valor_pago: Math.min(novoValorPago, valorTotal),
          status_pagamento: novoStatus
        })
        .eq('id', despesa.id);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: `Pagamento de ${formatCurrency(valorPagamento)} registrado`,
      });
      
      loadDespesas();
    } catch (error) {
      console.error('Erro ao registrar pagamento:', error);
      toast({
        title: "Erro",
        description: "Erro ao registrar pagamento",
        variant: "destructive",
      });
    }
  };

  const uniqueCategories = Array.from(new Set(despesas.map(d => d.categoria)));

  // Agrupar despesas por fornecedor/categoria para visão consolidada
  const groupedDespesas = React.useMemo(() => {
    const groups = new Map<string, { despesas: Despesa[], total: number, totalPago: number }>();
    
    filteredDespesas.forEach(despesa => {
      const key = `${despesa.fornecedor}-${despesa.categoria}`;
      const existing = groups.get(key) || { despesas: [], total: 0, totalPago: 0 };
      existing.despesas.push(despesa);
      existing.total += Number(despesa.valor_total || despesa.valor);
      existing.totalPago += Number(despesa.valor_pago || 0);
      groups.set(key, existing);
    });

    return Array.from(groups.entries()).map(([key, value]) => ({
      key,
      fornecedor: value.despesas[0].fornecedor,
      categoria: value.despesas[0].categoria,
      despesas: value.despesas,
      total: value.total,
      totalPago: value.totalPago,
      count: value.despesas.length
    }));
  }, [filteredDespesas]);

  const toggleGroup = (key: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedGroups(newExpanded);
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Carregando despesas...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-muted rounded" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <CardTitle>Gestão de Despesas</CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'detalhado' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('detalhado')}
            >
              <Eye className="h-4 w-4 mr-1" />
              Detalhado
            </Button>
            <Button
              variant={viewMode === 'consolidado' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('consolidado')}
            >
              <EyeOff className="h-4 w-4 mr-1" />
              Consolidado
            </Button>
            <Button onClick={onCreateNew} className="gap-2">
              <Plus className="h-4 w-4" />
              Nova Despesa
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Filtros */}
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-7 mb-6">
          <div className="relative lg:col-span-2">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar despesas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger>
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os tipos</SelectItem>
              <SelectItem value="operacional">Operacional</SelectItem>
              <SelectItem value="administrativa">Administrativa</SelectItem>
              <SelectItem value="projeto">Projeto</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="manutencao">Manutenção</SelectItem>
              <SelectItem value="comercial">Comercial</SelectItem>
              <SelectItem value="outro">Outro</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todas</SelectItem>
              {uniqueCategories.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterCostType} onValueChange={setFilterCostType}>
            <SelectTrigger>
              <SelectValue placeholder="Custo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="fixo">Fixo</SelectItem>
              <SelectItem value="variavel">Variável</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="pendente">Pendente</SelectItem>
              <SelectItem value="parcial">Parcial</SelectItem>
              <SelectItem value="pago">Pago</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span className="text-sm text-muted-foreground">
              {filteredDespesas.length} de {despesas.length}
            </span>
          </div>
        </div>

        {/* Visualização Consolidada */}
        {viewMode === 'consolidado' ? (
          <div className="space-y-2">
            {groupedDespesas.map((group) => (
              <Collapsible key={group.key} open={expandedGroups.has(group.key)}>
                <CollapsibleTrigger asChild>
                  <div 
                    className="flex items-center justify-between p-4 bg-muted/50 rounded-lg cursor-pointer hover:bg-muted transition-colors"
                    onClick={() => toggleGroup(group.key)}
                  >
                    <div className="flex items-center gap-4">
                      {expandedGroups.has(group.key) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                      <div>
                        <p className="font-medium">{group.fornecedor}</p>
                        <p className="text-sm text-muted-foreground">{group.categoria}</p>
                      </div>
                      <Badge variant="secondary">{group.count} parcelas</Badge>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Total</p>
                        <p className="font-bold text-red-600">{formatCurrency(group.total)}</p>
                      </div>
                      <div className="text-right min-w-[100px]">
                        <p className="text-sm text-muted-foreground">Pago</p>
                        <p className="font-bold text-green-600">{formatCurrency(group.totalPago)}</p>
                      </div>
                      <div className="w-24">
                        <Progress 
                          value={(group.totalPago / group.total) * 100} 
                          className="h-2"
                        />
                        <p className="text-xs text-muted-foreground text-center mt-1">
                          {((group.totalPago / group.total) * 100).toFixed(0)}%
                        </p>
                      </div>
                    </div>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="ml-8 mt-2 space-y-2">
                    {group.despesas.map((despesa) => (
                      <div key={despesa.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <span className="text-sm">{formatDate(despesa.data_saida)}</span>
                          <Badge className={getPaymentStatusColor(despesa.status_pagamento || 'pendente')}>
                            {despesa.status_pagamento === 'pago' ? 'Pago' : 
                             despesa.status_pagamento === 'parcial' ? 'Parcial' : 'Pendente'}
                          </Badge>
                          {despesa.eh_recorrente && (
                            <Badge variant="outline" className="gap-1">
                              <Repeat className="h-3 w-3" />
                              {despesa.frequencia}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-medium">{formatCurrency(despesa.valor_total || despesa.valor)}</p>
                            {despesa.valor_pago !== undefined && despesa.valor_pago > 0 && (
                              <p className="text-xs text-green-600">Pago: {formatCurrency(despesa.valor_pago)}</p>
                            )}
                          </div>
                          <div className="flex gap-1">
                            {despesa.status_pagamento !== 'pago' && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  const valorRestante = (despesa.valor_total || despesa.valor) - (despesa.valor_pago || 0);
                                  const valorPagamento = prompt(`Valor a pagar (Restante: ${formatCurrency(valorRestante)}):`, valorRestante.toString());
                                  if (valorPagamento && !isNaN(parseFloat(valorPagamento))) {
                                    handlePayment(despesa, parseFloat(valorPagamento));
                                  }
                                }}
                                className="text-green-600"
                              >
                                <CreditCard className="h-4 w-4" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setEditingDespesa(despesa);
                                setEditDialogOpen(true);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(despesa.id)}
                              className="text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        ) : (
          /* Visualização Detalhada */
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Fornecedor</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Custo</TableHead>
                  <TableHead>Projeto</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Progresso</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Recorrente</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDespesas.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={11} className="text-center text-muted-foreground">
                      Nenhuma despesa encontrada
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredDespesas.map((despesa) => {
                    const valorTotal = despesa.valor_total || despesa.valor;
                    const valorPago = despesa.valor_pago || 0;
                    const percentPago = (valorPago / valorTotal) * 100;

                    return (
                      <TableRow key={despesa.id}>
                        <TableCell>{formatDate(despesa.data_saida)}</TableCell>
                        <TableCell>
                          <Badge className={getTypeColor(despesa.tipo_despesa)}>
                            {despesa.tipo_despesa}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">
                          {despesa.fornecedor}
                        </TableCell>
                        <TableCell>{despesa.categoria}</TableCell>
                        <TableCell>
                          <Badge className={getCostTypeColor(despesa.tipo_custo)}>
                            {despesa.tipo_custo}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {despesa.projects?.name || <span className="text-muted-foreground">-</span>}
                        </TableCell>
                        <TableCell className="font-mono">
                          <div className="space-y-1">
                            <div className="text-red-600 font-medium">
                              {formatCurrency(valorTotal)}
                            </div>
                            {valorPago > 0 && (
                              <div className="text-xs text-green-600">
                                Pago: {formatCurrency(valorPago)}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="w-20">
                            <Progress value={percentPago} className="h-2" />
                            <p className="text-xs text-muted-foreground text-center mt-1">
                              {percentPago.toFixed(0)}%
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getPaymentStatusColor(despesa.status_pagamento || 'pendente')}>
                            {despesa.status_pagamento === 'pendente' ? 'Pendente' :
                             despesa.status_pagamento === 'parcial' ? 'Parcial' : 'Pago'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {despesa.eh_recorrente ? (
                            <div className="flex items-center gap-2">
                              <Repeat className="h-4 w-4 text-orange-600" />
                              <span className="text-sm">{despesa.frequencia}</span>
                            </div>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            {despesa.status_pagamento !== 'pago' && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  const valorRestante = valorTotal - valorPago;
                                  const valorPagamento = prompt(`Valor a pagar (Restante: ${formatCurrency(valorRestante)}):`, valorRestante.toString());
                                  if (valorPagamento && !isNaN(parseFloat(valorPagamento))) {
                                    handlePayment(despesa, parseFloat(valorPagamento));
                                  }
                                }}
                                className="text-green-600 hover:text-green-700"
                                title="Registrar Pagamento"
                              >
                                <CreditCard className="h-4 w-4" />
                              </Button>
                            )}
                            {despesa.status_pagamento === 'pago' && (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setEditingDespesa(despesa);
                                setEditDialogOpen(true);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(despesa.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        )}

        <EditDespesaDialog
          despesa={editingDespesa}
          isOpen={editDialogOpen}
          onClose={() => {
            setEditDialogOpen(false);
            setEditingDespesa(null);
          }}
          onSuccess={() => {
            loadDespesas();
          }}
        />
      </CardContent>
    </Card>
  );
};
