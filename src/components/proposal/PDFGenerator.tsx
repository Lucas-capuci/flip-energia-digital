
import React from 'react';
import { FileText } from 'lucide-react';
import { Button } from '../ui/button';
import jsPDF from 'jspdf';
import { FormData, CalculationResults } from '../../utils/proposalCalculations';

interface PDFGeneratorProps {
  formData: FormData;
  calculations: CalculationResults;
  onGeneratePDF: () => void;
}

export const generateProposalPDF = (formData: FormData, results: CalculationResults) => {
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

const PDFGenerator: React.FC<PDFGeneratorProps> = ({ formData, onGeneratePDF }) => {
  return (
    <div className="mt-8">
      <Button 
        onClick={onGeneratePDF}
        className="w-full bg-flip-blue-500 hover:bg-flip-blue-600 text-white py-3"
        disabled={!formData.clientName || !formData.monthlyConsumption}
      >
        <FileText className="h-5 w-5 mr-2" />
        Gerar Proposta
      </Button>
    </div>
  );
};

export default PDFGenerator;
