
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { FileText, Calculator, Zap } from 'lucide-react';
import { Card } from './ui/card';
import { 
  FormData, 
  CalculationResults, 
  calculateProposalValues 
} from '../utils/proposalCalculations';
import ProposalForm from './proposal/ProposalForm';
import CalculationResultsDisplay from './proposal/CalculationResults';
import PDFGenerator, { generateProposalPDF } from './proposal/PDFGenerator';
import ProposalHeader from './proposal/ProposalHeader';

const ProposalGenerator = () => {
  const [formData, setFormData] = useState<FormData>({
    clientName: '',
    monthlyConsumption: 0,
    localIrradiation: 0,
    systemEfficiency: 0,
    panelPower: 0,
    energyTariff: 0,
    systemPrice: 0,
    excessPrice: 0,
    excessEstimate: 0
  });

  const [calculations, setCalculations] = useState<CalculationResults | null>(null);

  const handleInputChange = (field: keyof FormData, value: string | number) => {
    const numValue = typeof value === 'string' ? parseFloat(value) || 0 : value;
    setFormData(prev => ({
      ...prev,
      [field]: field === 'clientName' ? value : numValue
    }));
  };

  const calculateValues = () => {
    const results = calculateProposalValues(formData);
    setCalculations(results);
    return results;
  };

  const generatePDF = () => {
    const results = calculations || calculateValues();
    generateProposalPDF(formData, results);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-flip-blue-50 to-white">
      <ProposalHeader />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulário */}
          <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-lg rounded-2xl">
            <div className="flex items-center mb-6">
              <Calculator className="h-6 w-6 text-flip-blue-500 mr-3" />
              <h2 className="text-xl font-semibold text-flip-gray-900">Dados do Projeto</h2>
            </div>

            <ProposalForm 
              formData={formData} 
              onInputChange={handleInputChange} 
            />

            <PDFGenerator 
              formData={formData}
              calculations={calculations as CalculationResults} 
              onGeneratePDF={generatePDF}
            />
          </Card>

          {/* Prévia dos Cálculos */}
          <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-lg rounded-2xl">
            <div className="flex items-center mb-6">
              <Zap className="h-6 w-6 text-flip-blue-500 mr-3" />
              <h2 className="text-xl font-semibold text-flip-gray-900">Prévia dos Cálculos</h2>
            </div>

            <CalculationResultsDisplay 
              calculations={calculations} 
              onCalculate={calculateValues} 
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProposalGenerator;
