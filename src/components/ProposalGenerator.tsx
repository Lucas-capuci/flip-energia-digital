
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Calculator, Users } from 'lucide-react';
import ProposalHeader from './proposal/ProposalHeader';
import ProposalForm from './proposal/ProposalForm';
import AdminDashboard from './admin/AdminDashboard';
import CalculationResults from './proposal/CalculationResults';
import { FormData, calculateProposalValues, CalculationResults as CalcResultsType } from '../utils/proposalCalculations';

const ProposalGenerator = () => {
  const [formData, setFormData] = useState<FormData>({
    clientName: '',
    monthlyConsumption: 0,
    localIrradiation: 0,
    systemEfficiency: 80,
    panelPower: 550,
    energyTariff: 0,
    systemPrice: 0,
    excessPrice: 0,
    excessEstimate: 0,
  });

  const [calculations, setCalculations] = useState<CalcResultsType | null>(null);

  const handleInputChange = (field: keyof FormData, value: number | string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCalculate = () => {
    const results = calculateProposalValues(formData);
    setCalculations(results);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ProposalHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="proposals" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="proposals" className="flex items-center space-x-2">
              <Calculator className="h-4 w-4" />
              <span>Gerador de Propostas</span>
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Dashboard Administrativo</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="proposals" className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-flip-blue-100 p-6">
              <h2 className="text-xl font-semibold text-flip-gray-900 mb-4">
                Calcular Proposta Comercial
              </h2>
              <ProposalForm 
                formData={formData}
                onInputChange={handleInputChange}
              />
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-flip-blue-100 p-6">
              <h2 className="text-xl font-semibold text-flip-gray-900 mb-4">
                Resultados dos Cálculos
              </h2>
              <CalculationResults 
                calculations={calculations}
                onCalculate={handleCalculate}
              />
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
