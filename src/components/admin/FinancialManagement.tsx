import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus, TrendingUp, TrendingDown, Calculator, FolderOpen, RefreshCw } from 'lucide-react';
import { FinancialDashboard } from './financial/FinancialDashboard';
import { ReceitasManagement } from './financial/ReceitasManagement';
import { DespesasManagement } from './financial/DespesasManagement';
import { ProjectFinancialView } from './financial/ProjectFinancialView';
import { QuickReceitaDialog } from './financial/QuickReceitaDialog';
import { QuickDespesaDialog } from './financial/QuickDespesaDialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const FinancialManagement = () => {
  const [quickReceitaOpen, setQuickReceitaOpen] = useState(false);
  const [quickDespesaOpen, setQuickDespesaOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [processingRecorrentes, setProcessingRecorrentes] = useState(false);
  const { toast } = useToast();

  const processarRecorrentes = async () => {
    setProcessingRecorrentes(true);
    try {
      const { data, error } = await supabase.rpc('processar_despesas_recorrentes');
      
      if (error) throw error;
      
      toast({
        title: "Processamento concluído",
        description: `${data || 0} despesas recorrentes processadas`,
      });
    } catch (error) {
      console.error('Erro ao processar recorrentes:', error);
      toast({
        title: "Erro",
        description: "Erro ao processar despesas recorrentes",
        variant: "destructive",
      });
    } finally {
      setProcessingRecorrentes(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Controle Financeiro</h2>
          <p className="text-muted-foreground">
            Gerencie receitas, despesas e acompanhe a saúde financeira
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button
            onClick={processarRecorrentes}
            variant="outline"
            size="sm"
            disabled={processingRecorrentes}
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${processingRecorrentes ? 'animate-spin' : ''}`} />
            Processar Recorrentes
          </Button>
          <Button
            onClick={() => setQuickReceitaOpen(true)}
            className="gap-2"
            variant="outline"
          >
            <Plus className="h-4 w-4" />
            Receita
          </Button>
          <Button
            onClick={() => setQuickDespesaOpen(true)}
            className="gap-2"
            variant="destructive"
          >
            <Plus className="h-4 w-4" />
            Despesa
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard" className="gap-2">
            <Calculator className="h-4 w-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="receitas" className="gap-2">
            <TrendingUp className="h-4 w-4" />
            Receitas
          </TabsTrigger>
          <TabsTrigger value="despesas" className="gap-2">
            <TrendingDown className="h-4 w-4" />
            Despesas
          </TabsTrigger>
          <TabsTrigger value="projetos" className="gap-2">
            <FolderOpen className="h-4 w-4" />
            Por Projeto
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          <FinancialDashboard />
        </TabsContent>

        <TabsContent value="receitas" className="space-y-4">
          <ReceitasManagement onCreateNew={() => setQuickReceitaOpen(true)} />
        </TabsContent>

        <TabsContent value="despesas" className="space-y-4">
          <DespesasManagement onCreateNew={() => setQuickDespesaOpen(true)} />
        </TabsContent>

        <TabsContent value="projetos" className="space-y-4">
          <ProjectFinancialView />
        </TabsContent>
      </Tabs>

      <QuickReceitaDialog 
        open={quickReceitaOpen} 
        onOpenChange={setQuickReceitaOpen}
      />
      
      <QuickDespesaDialog 
        open={quickDespesaOpen} 
        onOpenChange={setQuickDespesaOpen}
      />
    </div>
  );
};