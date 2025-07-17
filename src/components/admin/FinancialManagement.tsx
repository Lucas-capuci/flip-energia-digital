import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus, DollarSign, TrendingUp, TrendingDown, Calculator } from 'lucide-react';
import { FinancialDashboard } from './financial/FinancialDashboard';
import { ReceitasManagement } from './financial/ReceitasManagement';
import { DespesasManagement } from './financial/DespesasManagement';
import { CreateReceitaDialog } from './financial/CreateReceitaDialog';
import { CreateDespesaDialog } from './financial/CreateDespesaDialog';

export const FinancialManagement = () => {
  const [createReceitaOpen, setCreateReceitaOpen] = useState(false);
  const [createDespesaOpen, setCreateDespesaOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Controle Financeiro</h2>
          <p className="text-muted-foreground">
            Gerencie receitas, despesas e acompanhe a saúde financeira da empresa
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => setCreateReceitaOpen(true)}
            className="gap-2"
            variant="outline"
          >
            <Plus className="h-4 w-4" />
            Nova Receita
          </Button>
          <Button
            onClick={() => setCreateDespesaOpen(true)}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Nova Despesa
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
            <DollarSign className="h-4 w-4" />
            Por Projeto
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          <FinancialDashboard />
        </TabsContent>

        <TabsContent value="receitas" className="space-y-4">
          <ReceitasManagement onCreateNew={() => setCreateReceitaOpen(true)} />
        </TabsContent>

        <TabsContent value="despesas" className="space-y-4">
          <DespesasManagement onCreateNew={() => setCreateDespesaOpen(true)} />
        </TabsContent>

        <TabsContent value="projetos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Visão por Projeto</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Funcionalidade em desenvolvimento - Análise financeira por projeto específico
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <CreateReceitaDialog 
        open={createReceitaOpen} 
        onOpenChange={setCreateReceitaOpen}
      />
      
      <CreateDespesaDialog 
        open={createDespesaOpen} 
        onOpenChange={setCreateDespesaOpen}
      />
    </div>
  );
};