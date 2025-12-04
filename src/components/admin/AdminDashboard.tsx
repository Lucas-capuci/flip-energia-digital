
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Button } from '../ui/button';
import { Download, Filter, FileText, Phone, Briefcase, DollarSign, Users, CheckSquare, ScrollText } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import LeadsManagement from './LeadsManagement';
import ProjectsManagement from './ProjectsManagement';
import ContactsManagement from './ContactsManagement';
import DashboardStats from './DashboardStats';
import { FinancialManagement } from './FinancialManagement';
import { UserManagement } from './UserManagement';
import TasksManagement from './TasksManagement';
import ContractGenerator from './contracts/ContractGenerator';

const AdminDashboard = () => {
  const { hasPermission } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  const exportAllData = async () => {
    // Implementation for exporting all data from Supabase tables
    console.log('Exporting all dashboard data...');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-flip-gray-900">Dashboard Administrativo</h1>
          <p className="text-flip-gray-600">Dados conectados ao Supabase - gerencie leads, propostas, contatos e projetos</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Filtros</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2" onClick={exportAllData}>
            <Download className="h-4 w-4" />
            <span>Exportar Tudo</span>
          </Button>
        </div>
      </div>


      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="dashboard" className="flex items-center space-x-2">
            <Briefcase className="h-4 w-4" />
            <span>Dashboard</span>
          </TabsTrigger>
          {hasPermission('leads', 'view') && (
            <TabsTrigger value="leads" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Leads</span>
            </TabsTrigger>
          )}
          {hasPermission('contacts', 'view') && (
            <TabsTrigger value="contacts" className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>Contatos</span>
            </TabsTrigger>
          )}
          {hasPermission('projects', 'view') && (
            <TabsTrigger value="projects" className="flex items-center space-x-2">
              <Briefcase className="h-4 w-4" />
              <span>Projetos</span>
            </TabsTrigger>
          )}
          {hasPermission('tasks', 'view') && (
            <TabsTrigger value="tasks" className="flex items-center space-x-2">
              <CheckSquare className="h-4 w-4" />
              <span>Tarefas</span>
            </TabsTrigger>
          )}
          <TabsTrigger value="contracts" className="flex items-center space-x-2">
            <ScrollText className="h-4 w-4" />
            <span>Contratos</span>
          </TabsTrigger>
          {hasPermission('financial', 'view') && (
            <TabsTrigger value="financial" className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4" />
              <span>Financeiro</span>
            </TabsTrigger>
          )}
          {hasPermission('user_management', 'view') && (
            <TabsTrigger value="users" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Usuários</span>
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          <DashboardStats />
        </TabsContent>

        {hasPermission('leads', 'view') && (
          <TabsContent value="leads" className="space-y-4">
            <LeadsManagement />
          </TabsContent>
        )}

        {hasPermission('contacts', 'view') && (
          <TabsContent value="contacts" className="space-y-4">
            <ContactsManagement />
          </TabsContent>
        )}

        {hasPermission('projects', 'view') && (
          <TabsContent value="projects" className="space-y-4">
            <ProjectsManagement onTabChange={setActiveTab} />
          </TabsContent>
        )}

        {hasPermission('financial', 'view') && (
          <TabsContent value="financial" className="space-y-4">
            <FinancialManagement />
          </TabsContent>
        )}

        {hasPermission('user_management', 'view') && (
          <TabsContent value="users" className="space-y-4">
            <UserManagement />
          </TabsContent>
        )}

        {hasPermission('tasks', 'view') && (
          <TabsContent value="tasks" className="space-y-4">
            <TasksManagement />
          </TabsContent>
        )}

        <TabsContent value="contracts" className="space-y-4">
          <ContractGenerator />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
