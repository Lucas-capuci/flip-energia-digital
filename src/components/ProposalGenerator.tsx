
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Calculator, Users, Zap } from 'lucide-react';
import ProposalHeader from './proposal/ProposalHeader';
import AdminDashboard from './admin/AdminDashboard';
import ElectricalProjectCalculator from './electrical/ElectricalProjectCalculator';
import SolarProposalForm from './proposal/SolarProposalForm';

const ProposalGenerator = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <ProposalHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="electrical" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="electrical" className="flex items-center space-x-2">
              <Zap className="h-4 w-4" />
              <span>Projetos Elétricos</span>
            </TabsTrigger>
            <TabsTrigger value="proposals" className="flex items-center space-x-2">
              <Calculator className="h-4 w-4" />
              <span>Propostas Solares</span>
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Dashboard Administrativo</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="electrical" className="space-y-6">
            <ElectricalProjectCalculator />
          </TabsContent>

          <TabsContent value="proposals" className="space-y-6">
            <SolarProposalForm />
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
