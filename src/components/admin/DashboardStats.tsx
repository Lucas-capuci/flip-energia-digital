
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { TrendingUp, Users, FileText, Briefcase, DollarSign } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const DashboardStats = () => {
  const [stats, setStats] = useState({
    totalLeads: 0,
    budgetRequests: 0,
    activeProjects: 0,
    projectedRevenue: 0,
    partnerRegistrations: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch budget requests count
      const { count: budgetCount } = await supabase
        .from('budget_requests')
        .select('*', { count: 'exact', head: true });

      // Fetch partner registrations count
      const { count: partnerCount } = await supabase
        .from('partner_registrations')
        .select('*', { count: 'exact', head: true });

      // Fetch active projects count and revenue
      const { data: projects, count: projectCount } = await supabase
        .from('projects')
        .select('value', { count: 'exact' })
        .in('status', ['planejamento', 'em_andamento']);

      const projectedRevenue = projects?.reduce((sum, project) => sum + Number(project.value), 0) || 0;

      setStats({
        totalLeads: (budgetCount || 0) + (partnerCount || 0),
        budgetRequests: budgetCount || 0,
        activeProjects: projectCount || 0,
        projectedRevenue,
        partnerRegistrations: partnerCount || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const statsData = [
    {
      title: 'Total de Leads',
      value: stats.totalLeads.toString(),
      description: 'Orçamentos + Parceiros',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Propostas Enviadas',
      value: stats.budgetRequests.toString(),
      description: 'Solicitações de orçamento',
      icon: FileText,
      color: 'text-green-600'
    },
    {
      title: 'Projetos Ativos',
      value: stats.activeProjects.toString(),
      description: 'Em planejamento/andamento',
      icon: Briefcase,
      color: 'text-purple-600'
    },
    {
      title: 'Cadastros Parceiros',
      value: stats.partnerRegistrations.toString(),
      description: 'Interessados em parcerias',
      icon: TrendingUp,
      color: 'text-orange-600'
    },
    {
      title: 'Receita Projetada',
      value: `R$ ${(stats.projectedRevenue / 1000).toFixed(0)}k`,
      description: 'Baseado em projetos ativos',
      icon: DollarSign,
      color: 'text-green-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {statsData.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <IconComponent className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default DashboardStats;
