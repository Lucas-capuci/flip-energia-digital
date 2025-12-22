import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Calculator,
  Repeat,
  Calendar,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Target,
  AlertTriangle
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
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
  Line,
  Legend,
  AreaChart,
  Area,
  ComposedChart
} from 'recharts';

interface FinancialSummary {
  totalReceitas: number;
  totalDespesas: number;
  saldoAtual: number;
  receitasMes: number;
  despesasMes: number;
  lucroMes: number;
  despesasRecorrentes: number;
  parcelamentosPendentes: number;
  despesasPendentes: number;
}

interface CategoryData {
  name: string;
  valor: number;
  color: string;
}

interface ProjectFinancial {
  id: string;
  name: string;
  receitas: number;
  despesas: number;
  lucro: number;
}

interface FutureProjection {
  mes: string;
  receitasProjetadas: number;
  despesasProjetadas: number;
  saldoProjetado: number;
}

const COLORS = ['#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4', '#ec4899', '#84cc16', '#6366f1'];

export const FinancialDashboard = () => {
  const [summary, setSummary] = useState<FinancialSummary>({
    totalReceitas: 0,
    totalDespesas: 0,
    saldoAtual: 0,
    receitasMes: 0,
    despesasMes: 0,
    lucroMes: 0,
    despesasRecorrentes: 0,
    parcelamentosPendentes: 0,
    despesasPendentes: 0,
  });
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });
  const [categoriesData, setCategoriesData] = useState<CategoryData[]>([]);
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [projectsData, setProjectsData] = useState<ProjectFinancial[]>([]);
  const [futureProjection, setFutureProjection] = useState<FutureProjection[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewType, setViewType] = useState<'categoria' | 'fornecedor'>('categoria');

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [year, month] = selectedMonth.split('-');
      const startOfMonth = `${year}-${month}-01`;
      const endOfMonth = new Date(parseInt(year), parseInt(month), 0).getDate();
      const endOfMonthStr = `${year}-${month}-${String(endOfMonth).padStart(2, '0')}`;

      // Buscar todas as receitas
      const { data: allReceitas } = await supabase
        .from('receitas')
        .select('valor, data_entrada, projeto_id');

      // Buscar todas as despesas
      const { data: allDespesas } = await supabase
        .from('despesas')
        .select('*');

      // Buscar projetos
      const { data: projects } = await supabase
        .from('projects')
        .select('id, name');

      const projectsMap = new Map(projects?.map(p => [p.id, p.name]) || []);

      // Calcular totais gerais
      const totalReceitasValue = allReceitas?.reduce((acc, r) => acc + Number(r.valor), 0) || 0;
      const totalDespesasValue = allDespesas?.reduce((acc, d) => acc + Number(d.valor), 0) || 0;

      // Filtrar por mês selecionado
      const receitasMes = allReceitas?.filter(r => 
        r.data_entrada >= startOfMonth && r.data_entrada <= endOfMonthStr
      ) || [];
      const despesasMes = allDespesas?.filter(d => 
        d.data_saida >= startOfMonth && d.data_saida <= endOfMonthStr
      ) || [];

      const receitasMesValue = receitasMes.reduce((acc, r) => acc + Number(r.valor), 0);
      const despesasMesValue = despesasMes.reduce((acc, d) => acc + Number(d.valor), 0);

      // Despesas recorrentes ativas
      const despesasRecorrentes = allDespesas?.filter(d => d.eh_recorrente) || [];
      const despesasRecorrentesValue = despesasRecorrentes.reduce((acc, d) => acc + Number(d.valor), 0);

      // Parcelamentos pendentes (despesas com valor_pago < valor_total)
      const parcelamentosPendentes = allDespesas?.filter(d => 
        d.status_pagamento !== 'pago' && d.valor_total && d.valor_pago !== null && d.valor_pago < d.valor_total
      ) || [];
      const parcelamentosPendentesValue = parcelamentosPendentes.reduce((acc, d) => 
        acc + (Number(d.valor_total || d.valor) - Number(d.valor_pago || 0)), 0
      );

      // Despesas pendentes
      const despesasPendentes = allDespesas?.filter(d => d.status_pagamento === 'pendente') || [];
      const despesasPendentesValue = despesasPendentes.reduce((acc, d) => acc + Number(d.valor), 0);

      setSummary({
        totalReceitas: totalReceitasValue,
        totalDespesas: totalDespesasValue,
        saldoAtual: totalReceitasValue - totalDespesasValue,
        receitasMes: receitasMesValue,
        despesasMes: despesasMesValue,
        lucroMes: receitasMesValue - despesasMesValue,
        despesasRecorrentes: despesasRecorrentesValue,
        parcelamentosPendentes: parcelamentosPendentesValue,
        despesasPendentes: despesasPendentesValue,
      });

      // Processar dados de categorias/fornecedores do mês
      const dataMap = new Map<string, number>();
      const fieldName = viewType === 'categoria' ? 'categoria' : 'fornecedor';
      
      despesasMes.forEach(item => {
        const key = item[fieldName] as string;
        const current = dataMap.get(key) || 0;
        dataMap.set(key, current + Number(item.valor));
      });

      const categoryData: CategoryData[] = Array.from(dataMap.entries())
        .map(([name, valor], index) => ({
          name,
          valor,
          color: COLORS[index % COLORS.length]
        }))
        .sort((a, b) => b.valor - a.valor);

      setCategoriesData(categoryData);

      // Dados dos últimos 6 meses para fluxo de caixa
      const monthlyChartData = [];
      for (let i = 5; i >= 0; i--) {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        const monthStart = `${monthYear}-01`;
        const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const monthEndStr = `${monthYear}-${String(monthEnd.getDate()).padStart(2, '0')}`;

        const receitasMonth = allReceitas?.filter(r => 
          r.data_entrada >= monthStart && r.data_entrada <= monthEndStr
        ) || [];
        const despesasMonth = allDespesas?.filter(d => 
          d.data_saida >= monthStart && d.data_saida <= monthEndStr
        ) || [];

        const receitasValue = receitasMonth.reduce((acc, r) => acc + Number(r.valor), 0);
        const despesasValue = despesasMonth.reduce((acc, d) => acc + Number(d.valor), 0);

        monthlyChartData.push({
          mes: date.toLocaleDateString('pt-BR', { month: 'short' }),
          receitas: receitasValue,
          despesas: despesasValue,
          lucro: receitasValue - despesasValue
        });
      }
      setMonthlyData(monthlyChartData);

      // Dados por projeto
      const projectFinancials: ProjectFinancial[] = [];
      projects?.forEach(project => {
        const receitasProjeto = allReceitas?.filter(r => r.projeto_id === project.id) || [];
        const despesasProjeto = allDespesas?.filter(d => d.projeto_id === project.id) || [];
        
        const totalReceitas = receitasProjeto.reduce((acc, r) => acc + Number(r.valor), 0);
        const totalDespesas = despesasProjeto.reduce((acc, d) => acc + Number(d.valor), 0);

        if (totalReceitas > 0 || totalDespesas > 0) {
          projectFinancials.push({
            id: project.id,
            name: project.name,
            receitas: totalReceitas,
            despesas: totalDespesas,
            lucro: totalReceitas - totalDespesas
          });
        }
      });
      setProjectsData(projectFinancials.sort((a, b) => b.lucro - a.lucro).slice(0, 5));

      // Projeção futura (próximos 6 meses)
      const futureData: FutureProjection[] = [];
      const avgReceitaMensal = monthlyChartData.reduce((acc, m) => acc + m.receitas, 0) / monthlyChartData.length;
      
      // Calcular despesas recorrentes por mês
      const despesasRecorrentesMensal = despesasRecorrentes
        .filter(d => d.frequencia === 'mensal')
        .reduce((acc, d) => acc + Number(d.valor), 0);

      let saldoAcumulado = summary.saldoAtual || (totalReceitasValue - totalDespesasValue);

      for (let i = 1; i <= 6; i++) {
        const date = new Date();
        date.setMonth(date.getMonth() + i);
        
        const receitasProj = avgReceitaMensal;
        const despesasProj = despesasRecorrentesMensal;
        saldoAcumulado += receitasProj - despesasProj;

        futureData.push({
          mes: date.toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' }),
          receitasProjetadas: receitasProj,
          despesasProjetadas: despesasProj,
          saldoProjetado: saldoAcumulado
        });
      }
      setFutureProjection(futureData);

    } catch (error) {
      console.error('Erro ao carregar dados do dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, [selectedMonth, viewType]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(8)].map((_, i) => (
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
      {/* Filtros */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-muted-foreground" />
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Selecione o mês" />
            </SelectTrigger>
            <SelectContent>
              {[...Array(25)].map((_, i) => {
                const date = new Date();
                date.setMonth(date.getMonth() - 12 + i);
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

        <Button 
          onClick={loadDashboardData} 
          variant="outline" 
          size="sm"
          disabled={loading}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Atualizar
        </Button>
      </div>

      {/* Cards de Resumo - Linha 1 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Atual</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${summary.saldoAtual >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(summary.saldoAtual)}
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              {summary.saldoAtual >= 0 ? (
                <ArrowUpRight className="h-3 w-3 text-green-600" />
              ) : (
                <ArrowDownRight className="h-3 w-3 text-red-600" />
              )}
              Receitas - Despesas totais
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receitas do Mês</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
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

        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Despesas do Mês</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
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

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lucro/Prejuízo</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${summary.lucroMes >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(summary.lucroMes)}
            </div>
            <p className="text-xs text-muted-foreground">
              Resultado do mês
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Cards de Resumo - Linha 2 */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Despesas Recorrentes</CardTitle>
            <Repeat className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {formatCurrency(summary.despesasRecorrentes)}
            </div>
            <p className="text-xs text-muted-foreground">
              Total mensal em recorrências
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Parcelamentos Pendentes</CardTitle>
            <Calculator className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {formatCurrency(summary.parcelamentosPendentes)}
            </div>
            <p className="text-xs text-muted-foreground">
              Valor restante a pagar
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Despesas Pendentes</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {formatCurrency(summary.despesasPendentes)}
            </div>
            <p className="text-xs text-muted-foreground">
              Aguardando pagamento
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos - Linha 1 */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Fluxo de Caixa Mensal */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Fluxo de Caixa (Últimos 6 meses)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="mes" className="text-xs" />
                <YAxis className="text-xs" tickFormatter={(value) => formatCurrency(value).replace('R$', '')} />
                <Tooltip 
                  formatter={(value) => formatCurrency(Number(value))}
                  contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
                />
                <Legend />
                <Bar dataKey="receitas" name="Receitas" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="despesas" name="Despesas" fill="#ef4444" radius={[4, 4, 0, 0]} />
                <Line type="monotone" dataKey="lucro" name="Lucro" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Projeção Futura */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Projeção Futura (6 meses)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={futureProjection}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="mes" className="text-xs" />
                <YAxis className="text-xs" tickFormatter={(value) => formatCurrency(value).replace('R$', '')} />
                <Tooltip 
                  formatter={(value) => formatCurrency(Number(value))}
                  contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="saldoProjetado" 
                  name="Saldo Projetado" 
                  fill="#8b5cf6" 
                  fillOpacity={0.3}
                  stroke="#8b5cf6" 
                  strokeWidth={2}
                />
                <Line type="monotone" dataKey="receitasProjetadas" name="Receitas Projetadas" stroke="#10b981" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="despesasProjetadas" name="Despesas Projetadas" stroke="#ef4444" strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos - Linha 2 */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Despesas por Categoria */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Despesas por {viewType === 'categoria' ? 'Categoria' : 'Fornecedor'}</CardTitle>
              <Select value={viewType} onValueChange={(value: 'categoria' | 'fornecedor') => setViewType(value)}>
                <SelectTrigger className="w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="categoria">Categoria</SelectItem>
                  <SelectItem value="fornecedor">Fornecedor</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            {categoriesData.length === 0 ? (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                Sem despesas no período
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoriesData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="valor"
                    nameKey="name"
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    labelLine={false}
                  >
                    {categoriesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Top 5 Projetos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Top 5 Projetos por Lucro
            </CardTitle>
          </CardHeader>
          <CardContent>
            {projectsData.length === 0 ? (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                Nenhum projeto com movimentação
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={projectsData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis type="number" tickFormatter={(value) => formatCurrency(value).replace('R$', '')} />
                  <YAxis type="category" dataKey="name" width={100} className="text-xs" />
                  <Tooltip 
                    formatter={(value) => formatCurrency(Number(value))}
                    contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
                  />
                  <Legend />
                  <Bar dataKey="receitas" name="Receitas" fill="#10b981" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="despesas" name="Despesas" fill="#ef4444" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
