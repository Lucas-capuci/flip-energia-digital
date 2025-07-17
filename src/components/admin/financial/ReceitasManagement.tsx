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
import { Plus, Search, Edit, Trash2, Filter } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Receita {
  id: string;
  tipo_receita: string;
  cliente: string;
  categoria: string;
  valor: number;
  forma_pagamento: string;
  data_entrada: string;
  observacoes?: string;
  projeto_id?: string;
  projects?: {
    name: string;
  };
}

interface ReceitasManagementProps {
  onCreateNew: () => void;
}

export const ReceitasManagement: React.FC<ReceitasManagementProps> = ({ onCreateNew }) => {
  const [receitas, setReceitas] = useState<Receita[]>([]);
  const [filteredReceitas, setFilteredReceitas] = useState<Receita[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('todos');
  const [filterCategory, setFilterCategory] = useState<string>('todos');
  const { toast } = useToast();

  const loadReceitas = async () => {
    try {
      const { data, error } = await supabase
        .from('receitas')
        .select(`
          *,
          projects (
            name
          )
        `)
        .order('data_entrada', { ascending: false });

      if (error) throw error;

      setReceitas(data || []);
      setFilteredReceitas(data || []);
    } catch (error) {
      console.error('Erro ao carregar receitas:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar receitas",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReceitas();
  }, []);

  useEffect(() => {
    let filtered = receitas;

    // Filtro por tipo
    if (filterType !== 'todos') {
      filtered = filtered.filter(receita => receita.tipo_receita === filterType);
    }

    // Filtro por categoria
    if (filterCategory !== 'todos') {
      filtered = filtered.filter(receita => receita.categoria === filterCategory);
    }

    // Filtro por busca
    if (searchTerm) {
      filtered = filtered.filter(receita =>
        receita.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
        receita.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
        receita.observacoes?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredReceitas(filtered);
  }, [receitas, searchTerm, filterType, filterCategory]);

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta receita?')) return;

    try {
      const { error } = await supabase
        .from('receitas')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Receita excluída com sucesso",
      });
      
      loadReceitas();
    } catch (error) {
      console.error('Erro ao excluir receita:', error);
      toast({
        title: "Erro",
        description: "Erro ao excluir receita",
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
      projeto: 'bg-blue-100 text-blue-800',
      servico: 'bg-green-100 text-green-800',
      venda: 'bg-purple-100 text-purple-800',
      outro: 'bg-gray-100 text-gray-800',
    };
    return colors[type] || colors.outro;
  };

  // Obter categorias únicas para o filtro
  const uniqueCategories = Array.from(new Set(receitas.map(r => r.categoria)));

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Carregando receitas...</CardTitle>
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
          <CardTitle>Gestão de Receitas</CardTitle>
          <Button onClick={onCreateNew} className="gap-2">
            <Plus className="h-4 w-4" />
            Nova Receita
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Filtros */}
        <div className="grid gap-4 md:grid-cols-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar receitas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger>
              <SelectValue placeholder="Tipo de receita" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os tipos</SelectItem>
              <SelectItem value="projeto">Projeto</SelectItem>
              <SelectItem value="servico">Serviço</SelectItem>
              <SelectItem value="venda">Venda</SelectItem>
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

          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span className="text-sm text-muted-foreground">
              {filteredReceitas.length} de {receitas.length} receitas
            </span>
          </div>
        </div>

        {/* Tabela de Receitas */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Projeto</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Pagamento</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReceitas.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-muted-foreground">
                    Nenhuma receita encontrada
                  </TableCell>
                </TableRow>
              ) : (
                filteredReceitas.map((receita) => (
                  <TableRow key={receita.id}>
                    <TableCell>{formatDate(receita.data_entrada)}</TableCell>
                    <TableCell>
                      <Badge className={getTypeColor(receita.tipo_receita)}>
                        {receita.tipo_receita}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      {receita.cliente}
                    </TableCell>
                    <TableCell>{receita.categoria}</TableCell>
                    <TableCell>
                      {receita.projects?.name || 'N/A'}
                    </TableCell>
                    <TableCell className="font-mono text-green-600">
                      {formatCurrency(receita.valor)}
                    </TableCell>
                    <TableCell>{receita.forma_pagamento}</TableCell>
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
                          onClick={() => handleDelete(receita.id)}
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