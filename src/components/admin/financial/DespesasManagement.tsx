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
import { Plus, Search, Edit, Trash2, Filter, Repeat } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Despesa {
  id: string;
  tipo_despesa: string;
  fornecedor: string;
  categoria: string;
  valor: number;
  forma_pagamento: string;
  data_saida: string;
  tipo_custo: string;
  eh_recorrente: boolean;
  frequencia?: string;
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

    // Filtro por tipo
    if (filterType !== 'todos') {
      filtered = filtered.filter(despesa => despesa.tipo_despesa === filterType);
    }

    // Filtro por categoria
    if (filterCategory !== 'todos') {
      filtered = filtered.filter(despesa => despesa.categoria === filterCategory);
    }

    // Filtro por tipo de custo
    if (filterCostType !== 'todos') {
      filtered = filtered.filter(despesa => despesa.tipo_custo === filterCostType);
    }

    // Filtro por recorrência
    if (filterRecurrent !== 'todos') {
      const isRecurrent = filterRecurrent === 'sim';
      filtered = filtered.filter(despesa => despesa.eh_recorrente === isRecurrent);
    }

    // Filtro por busca
    if (searchTerm) {
      filtered = filtered.filter(despesa =>
        despesa.fornecedor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        despesa.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
        despesa.observacoes?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredDespesas(filtered);
  }, [despesas, searchTerm, filterType, filterCategory, filterCostType, filterRecurrent]);

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
      operacional: 'bg-blue-100 text-blue-800',
      administrativa: 'bg-purple-100 text-purple-800',
      projeto: 'bg-green-100 text-green-800',
      marketing: 'bg-pink-100 text-pink-800',
      manutencao: 'bg-orange-100 text-orange-800',
      comercial: 'bg-indigo-100 text-indigo-800',
      outro: 'bg-gray-100 text-gray-800',
    };
    return colors[type] || colors.outro;
  };

  const getCostTypeColor = (type: string) => {
    return type === 'fixo' 
      ? 'bg-red-100 text-red-800' 
      : 'bg-yellow-100 text-yellow-800';
  };

  // Obter categorias únicas para o filtro
  const uniqueCategories = Array.from(new Set(despesas.map(d => d.categoria)));

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
        <div className="flex items-center justify-between">
          <CardTitle>Gestão de Despesas</CardTitle>
          <Button onClick={onCreateNew} className="gap-2">
            <Plus className="h-4 w-4" />
            Nova Despesa
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Filtros */}
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6 mb-6">
          <div className="relative">
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
              <SelectItem value="todos">Todas as categorias</SelectItem>
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

          <Select value={filterRecurrent} onValueChange={setFilterRecurrent}>
            <SelectTrigger>
              <SelectValue placeholder="Recorrente" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="sim">Recorrente</SelectItem>
              <SelectItem value="nao">Não recorrente</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span className="text-sm text-muted-foreground">
              {filteredDespesas.length} de {despesas.length}
            </span>
          </div>
        </div>

        {/* Tabela de Despesas */}
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
                <TableHead>Recorrente</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDespesas.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center text-muted-foreground">
                    Nenhuma despesa encontrada
                  </TableCell>
                </TableRow>
              ) : (
                filteredDespesas.map((despesa) => (
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
                      {despesa.projects?.name || 'N/A'}
                    </TableCell>
                    <TableCell className="font-mono text-red-600">
                      {formatCurrency(despesa.valor)}
                    </TableCell>
                    <TableCell>
                      {despesa.eh_recorrente ? (
                        <div className="flex items-center gap-2">
                          <Repeat className="h-4 w-4 text-orange-600" />
                          <span className="text-sm">{despesa.frequencia}</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">Não</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {/* TODO: Implementar edição */}}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(despesa.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};