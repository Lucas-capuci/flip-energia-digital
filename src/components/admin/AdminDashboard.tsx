
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Button } from '../ui/button';
import { Download, Filter, FileText, Phone, Briefcase } from 'lucide-react';
import LeadsManagement from './LeadsManagement';
import ProjectsManagement from './ProjectsManagement';
import ContactsManagement from './ContactsManagement';
import DashboardStats from './DashboardStats';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('leads');

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

      <DashboardStats />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
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

        <TabsContent value="leads" className="space-y-4">
          <LeadsManagement />
        </TabsContent>

        <TabsContent value="contacts" className="space-y-4">
          <ContactsManagement />
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <ProjectsManagement onTabChange={setActiveTab} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
