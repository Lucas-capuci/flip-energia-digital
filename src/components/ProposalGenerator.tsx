
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Calculator, Users } from 'lucide-react';
import ProposalHeader from './proposal/ProposalHeader';
import AdminDashboard from './admin/AdminDashboard';

const ProposalGenerator = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <ProposalHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="proposals" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="proposals" className="flex items-center space-x-2">
              <Calculator className="h-4 w-4" />
              <span>Propostas Solares</span>
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Dashboard Administrativo</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="proposals" className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-flip-blue-100 p-6">
              <h2 className="text-xl font-semibold text-flip-gray-900 mb-4">
                Propostas Solares - Em Desenvolvimento
              </h2>
              <p className="text-flip-gray-600">
                Esta seção estará disponível em breve para cálculos de sistemas solares.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="dashboard" className="space-y-6">
            <AdminDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProposalGenerator;
