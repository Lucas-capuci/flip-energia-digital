import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Calculator,
  Repeat,
  Calendar
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';

interface FinancialSummary {
  totalReceitas: number;
  totalDespesas: number;
  saldoAtual: number;
  receitasMes: number;
  despesasMes: number;
  lucroMes: number;
  despesasRecorrentes: number;
}

interface CategoryData {
  categoria: string;
  valor: number;
  color: string;
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1', '#d084d0'];

export const FinancialDashboard = () => {
  const [summary, setSummary] = useState<FinancialSummary>({
    totalReceitas: 0,
    totalDespesas: 0,
    saldoAtual: 0,
    receitasMes: 0,
    despesasMes: 0,
    lucroMes: 0,
    despesasRecorrentes: 0,
  });
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });
  const [categoriesData, setCategoriesData] = useState<CategoryData[]>([]);
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadDashboardData = async () => {
    try {
      const [year, month] = selectedMonth.split('-');
      const startOfMonth = `${year}-${month}-01`;
      const endOfMonth = new Date(parseInt(year), parseInt(month), 0).getDate();
      const endOfMonthStr = `${year}-${month}-${endOfMonth}`;

      // Buscar receitas totais
      const { data: totalReceitas } = await supabase
        .from('receitas')
        .select('valor');

      // Buscar despesas totais
      const { data: totalDespesas } = await supabase
        .from('despesas')
        .select('valor');

      // Buscar receitas do mês
      const { data: receitasMes } = await supabase
        .from('receitas')
        .select('valor')
        .gte('data_entrada', startOfMonth)
        .lte('data_entrada', endOfMonthStr);

      // Buscar despesas do mês
      const { data: despesasMes } = await supabase
        .from('despesas')
        .select('valor')
        .gte('data_saida', startOfMonth)
        .lte('data_saida', endOfMonthStr);

      // Buscar despesas recorrentes ativas
      const { data: despesasRecorrentes } = await supabase
        .from('despesas')
        .select('valor')
        .eq('eh_recorrente', true);

      // Buscar categorias de despesas do mês
      const { data: categoriesDespesas } = await supabase
        .from('despesas')
        .select('categoria, valor')
        .gte('data_saida', startOfMonth)
        .lte('data_saida', endOfMonthStr);

      // Calcular totais
      const totalReceitasValue = totalReceitas?.reduce((acc, r) => acc + Number(r.valor), 0) || 0;
      const totalDespesasValue = totalDespesas?.reduce((acc, d) => acc + Number(d.valor), 0) || 0;
      const receitasMesValue = receitasMes?.reduce((acc, r) => acc + Number(r.valor), 0) || 0;
      const despesasMesValue = despesasMes?.reduce((acc, d) => acc + Number(d.valor), 0) || 0;
      const despesasRecorrentesValue = despesasRecorrentes?.reduce((acc, d) => acc + Number(d.valor), 0) || 0;

      setSummary({
        totalReceitas: totalReceitasValue,
        totalDespesas: totalDespesasValue,
        saldoAtual: totalReceitasValue - totalDespesasValue,
        receitasMes: receitasMesValue,
        despesasMes: despesasMesValue,
        lucroMes: receitasMesValue - despesasMesValue,
        despesasRecorrentes: despesasRecorrentesValue,
      });

      // Processar dados de categorias
      const categoryMap = new Map<string, number>();
      categoriesDespesas?.forEach(item => {
        const current = categoryMap.get(item.categoria) || 0;
        categoryMap.set(item.categoria, current + Number(item.valor));
      });

      const categoryData: CategoryData[] = Array.from(categoryMap.entries()).map(([categoria, valor], index) => ({
        categoria,
        valor,
        color: COLORS[index % COLORS.length]
      }));

      setCategoriesData(categoryData);

      // Buscar dados dos últimos 6 meses para o gráfico
      const monthlyChartData = [];
      for (let i = 5; i >= 0; i--) {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        const monthStart = `${monthYear}-01`;
        const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        const monthEndStr = `${monthYear}-${monthEnd}`;

        const [receitasMonth, despesasMonth] = await Promise.all([
          supabase
            .from('receitas')
            .select('valor')
            .gte('data_entrada', monthStart)
            .lte('data_entrada', monthEndStr),
          supabase
            .from('despesas')
            .select('valor')
            .gte('data_saida', monthStart)
            .lte('data_saida', monthEndStr)
        ]);

        const receitasValue = receitasMonth.data?.reduce((acc, r) => acc + Number(r.valor), 0) || 0;
        const despesasValue = despesasMonth.data?.reduce((acc, d) => acc + Number(d.valor), 0) || 0;

        monthlyChartData.push({
          mes: date.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' }),
          receitas: receitasValue,
          despesas: despesasValue,
          lucro: receitasValue - despesasValue
        });
      }

      setMonthlyData(monthlyChartData);
    } catch (error) {
      console.error('Erro ao carregar dados do dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, [selectedMonth]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 w-20 bg-muted animate-pulse rounded" />
              <div className="h-4 w-4 bg-muted animate-pulse rounded" />
            </CardHeader>
            <CardContent>
              <div className="h-8 w-24 bg-muted animate-pulse rounded mb-2" />
              <div className="h-3 w-16 bg-muted animate-pulse rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filtro de Mês */}
      <div className="flex items-center gap-4">
        <Calendar className="h-5 w-5" />
        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Selecione o mês" />
          </SelectTrigger>
          <SelectContent>
            {[...Array(12)].map((_, i) => {
              const date = new Date();
              date.setMonth(date.getMonth() - i);
              const value = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
              const label = date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
              return (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      {/* Cards de Resumo */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Atual</CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(summary.saldoAtual)}
            </div>
            <p className="text-xs text-muted-foreground">
              Receitas - Despesas totais
            </p>
            {summary.saldoAtual >= 0 ? (
              <Badge variant="default" className="mt-2">Positivo</Badge>
            ) : (
              <Badge variant="destructive" className="mt-2">Negativo</Badge>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receitas do Mês</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(summary.receitasMes)}
            </div>
            <p className="text-xs text-muted-foreground">
              Total de entradas no mês
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Despesas do Mês</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {formatCurrency(summary.despesasMes)}
            </div>
            <p className="text-xs text-muted-foreground">
              Total de saídas no mês
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lucro/Prejuízo Mensal</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${summary.lucroMes >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(summary.lucroMes)}
            </div>
            <p className="text-xs text-muted-foreground">
              Receitas - Despesas do mês
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Card de Despesas Recorrentes */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Despesas Recorrentes Ativas</CardTitle>
          <Repeat className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-600">
            {formatCurrency(summary.despesasRecorrentes)}
          </div>
          <p className="text-xs text-muted-foreground">
            Total de despesas com recorrência configurada
          </p>
        </CardContent>
      </Card>

      {/* Gráficos */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Gráfico de Evolução Mensal */}
        <Card>
          <CardHeader>
            <CardTitle>Evolução Mensal</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Line 
                  type="monotone" 
                  dataKey="receitas" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  name="Receitas"
                />
                <Line 
                  type="monotone" 
                  dataKey="despesas" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  name="Despesas"
                />
                <Line 
                  type="monotone" 
                  dataKey="lucro" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="Lucro"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Gráfico de Categorias de Despesas */}
        <Card>
          <CardHeader>
            <CardTitle>Despesas por Categoria (Mês)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoriesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ categoria, valor }) => `${categoria}: ${formatCurrency(valor)}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="valor"
                >
                  {categoriesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};