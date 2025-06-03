
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { FileText, Calculator, Zap, Sun, Plug, DollarSign, Clock, Leaf, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import jsPDF from 'jspdf';

interface FormData {
  clientName: string;
  monthlyConsumption: number;
  localIrradiation: number;
  systemEfficiency: number;
  panelPower: number;
  energyTariff: number;
  systemPrice: number;
  excessPrice: number;
  excessEstimate: number;
}

const ProposalGenerator = () => {
  const { logout } = useAuth();
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

  const [calculations, setCalculations] = useState<any>(null);

  const handleInputChange = (field: keyof FormData, value: string | number) => {
    const numValue = typeof value === 'string' ? parseFloat(value) || 0 : value;
    setFormData(prev => ({
      ...prev,
      [field]: field === 'clientName' ? value : numValue
    }));
  };

  const calculateValues = () => {
    const systemPower = formData.monthlyConsumption / (30 * formData.localIrradiation * (formData.systemEfficiency / 100));
    const numberOfPanels = Math.ceil(systemPower / (formData.panelPower / 1000));
    const inverterMin = systemPower * 0.8;
    const inverterMax = systemPower * 1.2;
    const monthlySavings = formData.monthlyConsumption * formData.energyTariff;
    const annualSavings = monthlySavings * 12;
    const payback = formData.systemPrice / annualSavings;
    const co2Reduction = (formData.monthlyConsumption * 12 * 0.084) / 1000;
    const excessProfit = formData.excessEstimate * formData.excessPrice * 12;

    const results = {
      systemPower: systemPower.toFixed(2),
      numberOfPanels,
      inverterRange: `${inverterMin.toFixed(2)} - ${inverterMax.toFixed(2)}`,
      monthlySavings: monthlySavings.toFixed(2),
      annualSavings: annualSavings.toFixed(2),
      payback: payback.toFixed(1),
      co2Reduction: co2Reduction.toFixed(2),
      excessProfit: excessProfit.toFixed(2)
    };

    setCalculations(results);
    return results;
  };

  const generatePDF = () => {
    const results = calculateValues();
    const pdf = new jsPDF();

    // Configurações do PDF
    pdf.setFontSize(20);
    pdf.setTextColor(53, 51, 205); // Flip blue
    pdf.text('PROPOSTA COMERCIAL', 20, 30);
    pdf.text('FLIP ENERGY', 20, 45);

    // Dados do cliente
    pdf.setFontSize(14);
    pdf.setTextColor(0, 0, 0);
    pdf.text(`Cliente: ${formData.clientName}`, 20, 70);
    pdf.text(`Data: ${new Date().toLocaleDateString('pt-BR')}`, 20, 85);

    // Seção de dados técnicos
    pdf.setFontSize(12);
    pdf.text('⚡ DADOS TÉCNICOS', 20, 110);
    pdf.text(`Consumo médio mensal: ${formData.monthlyConsumption} kWh`, 25, 125);
    pdf.text(`Irradiação local: ${formData.localIrradiation} kWh/m².dia`, 25, 140);
    pdf.text(`Eficiência do sistema: ${formData.systemEfficiency}%`, 25, 155);

    // Resultados dos cálculos
    pdf.text('☀️ DIMENSIONAMENTO', 20, 180);
    pdf.text(`Potência do sistema: ${results.systemPower} kWp`, 25, 195);
    pdf.text(`Número de placas: ${results.numberOfPanels} unidades`, 25, 210);
    pdf.text(`Inversor recomendado: ${results.inverterRange} kWp`, 25, 225);

    // Análise financeira
    pdf.text('💰 ANÁLISE FINANCEIRA', 20, 250);
    pdf.text(`Economia mensal: R$ ${results.monthlySavings}`, 25, 265);
    pdf.text(`Economia anual: R$ ${results.annualSavings}`, 25, 280);
    pdf.text(`Payback: ${results.payback} anos`, 25, 295);

    // Adicionar nova página se necessário
    pdf.addPage();

    // Impacto ambiental
    pdf.text('🌱 IMPACTO AMBIENTAL', 20, 30);
    pdf.text(`Redução CO₂ anual: ${results.co2Reduction} toneladas`, 25, 45);

    // Lucro com excedente
    pdf.text('💵 LUCRO COM EXCEDENTE', 20, 70);
    pdf.text(`Lucro anual estimado: R$ ${results.excessProfit}`, 25, 85);

    // Rodapé
    pdf.setFontSize(10);
    pdf.text('FLIP ENERGY - Soluções Integradas em Energia', 20, 270);
    pdf.text('Instagram: @flipenergia | WhatsApp: (11) 99999-9999', 20, 280);
    pdf.text('Site: flipeng.com.br | Cidade: São Paulo - SP', 20, 290);

    // Download do PDF
    pdf.save(`Proposta_${formData.clientName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-flip-blue-50 to-white">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-flip-blue-100 px-6 py-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div>
            <h1 className="text-2xl font-bold text-flip-gray-900">Gerador de Propostas</h1>
            <p className="text-flip-gray-600">Flip Energy - Área Restrita</p>
          </div>
          <Button 
            variant="outline" 
            onClick={logout}
            className="text-flip-blue-500 border-flip-blue-500 hover:bg-flip-blue-50"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulário */}
          <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-lg rounded-2xl">
            <div className="flex items-center mb-6">
              <Calculator className="h-6 w-6 text-flip-blue-500 mr-3" />
              <h2 className="text-xl font-semibold text-flip-gray-900">Dados do Projeto</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-flip-gray-700 mb-2">
                  Nome do Cliente
                </label>
                <Input
                  value={formData.clientName}
                  onChange={(e) => handleInputChange('clientName', e.target.value)}
                  placeholder="Ex: João da Silva"
                  className="border-flip-blue-200 focus:border-flip-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-flip-gray-700 mb-2">
                    Consumo Médio Mensal (kWh)
                  </label>
                  <Input
                    type="number"
                    value={formData.monthlyConsumption || ''}
                    onChange={(e) => handleInputChange('monthlyConsumption', e.target.value)}
                    placeholder="Ex: 1500"
                    className="border-flip-blue-200 focus:border-flip-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-flip-gray-700 mb-2">
                    Irradiação Local (kWh/m².dia)
                  </label>
                  <Input
                    type="number"
                    step="0.1"
                    value={formData.localIrradiation || ''}
                    onChange={(e) => handleInputChange('localIrradiation', e.target.value)}
                    placeholder="Ex: 5"
                    className="border-flip-blue-200 focus:border-flip-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-flip-gray-700 mb-2">
                    Eficiência do Sistema (%)
                  </label>
                  <Input
                    type="number"
                    value={formData.systemEfficiency || ''}
                    onChange={(e) => handleInputChange('systemEfficiency', e.target.value)}
                    placeholder="Ex: 80"
                    className="border-flip-blue-200 focus:border-flip-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-flip-gray-700 mb-2">
                    Potência da Placa (Wp)
                  </label>
                  <Input
                    type="number"
                    value={formData.panelPower || ''}
                    onChange={(e) => handleInputChange('panelPower', e.target.value)}
                    placeholder="Ex: 550"
                    className="border-flip-blue-200 focus:border-flip-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-flip-gray-700 mb-2">
                    Tarifa de Energia (R$/kWh)
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.energyTariff || ''}
                    onChange={(e) => handleInputChange('energyTariff', e.target.value)}
                    placeholder="Ex: 0,85"
                    className="border-flip-blue-200 focus:border-flip-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-flip-gray-700 mb-2">
                    Preço do Sistema (R$)
                  </label>
                  <Input
                    type="number"
                    value={formData.systemPrice || ''}
                    onChange={(e) => handleInputChange('systemPrice', e.target.value)}
                    placeholder="Ex: 50000"
                    className="border-flip-blue-200 focus:border-flip-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-flip-gray-700 mb-2">
                    Preço da Energia Excedente (R$/kWh)
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.excessPrice || ''}
                    onChange={(e) => handleInputChange('excessPrice', e.target.value)}
                    placeholder="Ex: 0,50"
                    className="border-flip-blue-200 focus:border-flip-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-flip-gray-700 mb-2">
                    Estimativa de Excedente (kWh)
                  </label>
                  <Input
                    type="number"
                    value={formData.excessEstimate || ''}
                    onChange={(e) => handleInputChange('excessEstimate', e.target.value)}
                    placeholder="Ex: 500"
                    className="border-flip-blue-200 focus:border-flip-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Button 
                onClick={generatePDF}
                className="w-full bg-flip-blue-500 hover:bg-flip-blue-600 text-white py-3"
                disabled={!formData.clientName || !formData.monthlyConsumption}
              >
                <FileText className="h-5 w-5 mr-2" />
                Gerar Proposta
              </Button>
            </div>
          </Card>

          {/* Prévia dos Cálculos */}
          <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-lg rounded-2xl">
            <div className="flex items-center mb-6">
              <Zap className="h-6 w-6 text-flip-blue-500 mr-3" />
              <h2 className="text-xl font-semibold text-flip-gray-900">Prévia dos Cálculos</h2>
            </div>

            <Button 
              onClick={calculateValues}
              variant="outline"
              className="w-full mb-6 border-flip-blue-500 text-flip-blue-500 hover:bg-flip-blue-50"
            >
              Calcular Valores
            </Button>

            {calculations && (
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-flip-blue-50 rounded-lg">
                  <Sun className="h-5 w-5 text-flip-blue-500 mr-3" />
                  <div>
                    <p className="font-medium text-flip-gray-900">Potência do Sistema</p>
                    <p className="text-flip-gray-600">{calculations.systemPower} kWp</p>
                  </div>
                </div>

                <div className="flex items-center p-3 bg-flip-blue-50 rounded-lg">
                  <Plug className="h-5 w-5 text-flip-blue-500 mr-3" />
                  <div>
                    <p className="font-medium text-flip-gray-900">Número de Placas</p>
                    <p className="text-flip-gray-600">{calculations.numberOfPanels} unidades</p>
                  </div>
                </div>

                <div className="flex items-center p-3 bg-flip-blue-50 rounded-lg">
                  <DollarSign className="h-5 w-5 text-flip-blue-500 mr-3" />
                  <div>
                    <p className="font-medium text-flip-gray-900">Economia Anual</p>
                    <p className="text-flip-gray-600">R$ {calculations.annualSavings}</p>
                  </div>
                </div>

                <div className="flex items-center p-3 bg-flip-blue-50 rounded-lg">
                  <Clock className="h-5 w-5 text-flip-blue-500 mr-3" />
                  <div>
                    <p className="font-medium text-flip-gray-900">Payback</p>
                    <p className="text-flip-gray-600">{calculations.payback} anos</p>
                  </div>
                </div>

                <div className="flex items-center p-3 bg-flip-blue-50 rounded-lg">
                  <Leaf className="h-5 w-5 text-flip-blue-500 mr-3" />
                  <div>
                    <p className="font-medium text-flip-gray-900">Redução CO₂</p>
                    <p className="text-flip-gray-600">{calculations.co2Reduction} ton/ano</p>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProposalGenerator;
