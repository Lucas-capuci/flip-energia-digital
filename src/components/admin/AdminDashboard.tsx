
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Download, Filter, Plus, Users, FileText, Phone, Briefcase } from 'lucide-react';
import LeadsManagement from './LeadsManagement';
import ProjectsManagement from './ProjectsManagement';
import ContactsManagement from './ContactsManagement';
import DashboardStats from './DashboardStats';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-flip-gray-900">Dashboard Administrativo</h1>
          <p className="text-flip-gray-600">Gerencie leads, propostas, contatos e projetos</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Filtros</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Exportar</span>
          </Button>
        </div>
      </div>

      <DashboardStats />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>Visão Geral</span>
          </TabsTrigger>
          <TabsTrigger value="leads" className="flex items-center space-x-2">
            <FileText className="h-4 w-4" />
            <span>Leads & Propostas</span>
          </TabsTrigger>
          <TabsTrigger value="contacts" className="flex items-center space-x-2">
            <Phone className="h-4 w-4" />
            <span>Contatos</span>
          </TabsTrigger>
          <TabsTrigger value="projects" className="flex items-center space-x-2">
            <Briefcase className="h-4 w-4" />
            <span>Projetos</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Leads Recentes</CardTitle>
                <CardDescription>Últimos cadastros de orçamento</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-flip-blue-600">12</p>
                <p className="text-sm text-flip-gray-600">Hoje</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Propostas Pendentes</CardTitle>
                <CardDescription>Aguardando resposta</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-yellow-600">8</p>
                <p className="text-sm text-flip-gray-600">Em andamento</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Projetos Ativos</CardTitle>
                <CardDescription>Em execução</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-green-600">15</p>
                <p className="text-sm text-flip-gray-600">Este mês</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="leads" className="space-y-4">
          <LeadsManagement />
        </TabsContent>

        <TabsContent value="contacts" className="space-y-4">
          <ContactsManagement />
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <ProjectsManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
