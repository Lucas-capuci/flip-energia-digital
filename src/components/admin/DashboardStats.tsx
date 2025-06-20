
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { TrendingUp, Users, FileText, Briefcase, DollarSign } from 'lucide-react';

const DashboardStats = () => {
  const stats = [
    {
      title: 'Total de Leads',
      value: '156',
      description: '+12% desde o último mês',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Propostas Enviadas',
      value: '89',
      description: '+8% desde o último mês',
      icon: FileText,
      color: 'text-green-600'
    },
    {
      title: 'Projetos Ativos',
      value: '23',
      description: '+3 novos este mês',
      icon: Briefcase,
      color: 'text-purple-600'
    },
    {
      title: 'Taxa de Conversão',
      value: '32%',
      description: '+2% desde o último mês',
      icon: TrendingUp,
      color: 'text-orange-600'
    },
    {
      title: 'Receita Projetada',
      value: 'R$ 245k',
      description: 'Baseado em projetos ativos',
      icon: DollarSign,
      color: 'text-green-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {stats.map((stat, index) => {
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
