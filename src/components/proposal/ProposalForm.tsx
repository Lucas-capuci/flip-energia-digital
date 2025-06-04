
import React from 'react';
import { Input } from '../ui/input';
import { FormData } from '../../utils/proposalCalculations';

interface ProposalFormProps {
  formData: FormData;
  onInputChange: (field: keyof FormData, value: string | number) => void;
}

const ProposalForm: React.FC<ProposalFormProps> = ({ formData, onInputChange }) => {
  const handleDecimalInputChange = (field: keyof FormData, value: string) => {
    // Permite apenas números, vírgulas e pontos
    const cleanValue = value.replace(/[^0-9.,]/g, '');
    
    // Se o campo estiver vazio, define como 0
    if (cleanValue === '') {
      onInputChange(field, 0);
      return;
    }
    
    // Substitui vírgula por ponto para conversão numérica
    const normalizedValue = cleanValue.replace(',', '.');
    const parsed = parseFloat(normalizedValue);
    
    // Atualiza apenas se for um número válido
    if (!isNaN(parsed)) {
      onInputChange(field, parsed);
    }
  };

  const formatDisplayValue = (value: number): string => {
    if (value === 0) return '';
    return value.toString().replace('.', ',');
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-flip-gray-700 mb-2">
          Nome do Cliente
        </label>
        <Input
          value={formData.clientName}
          onChange={(e) => onInputChange('clientName', e.target.value)}
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
            type="text"
            value={formatDisplayValue(formData.monthlyConsumption)}
            onChange={(e) => handleDecimalInputChange('monthlyConsumption', e.target.value)}
            placeholder="Ex: 1500 ou 0,85"
            className="border-flip-blue-200 focus:border-flip-blue-500"
            inputMode="decimal"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-flip-gray-700 mb-2">
            Irradiação Local (kWh/m².dia)
          </label>
          <Input
            type="text"
            value={formatDisplayValue(formData.localIrradiation)}
            onChange={(e) => handleDecimalInputChange('localIrradiation', e.target.value)}
            placeholder="Ex: 5,0"
            className="border-flip-blue-200 focus:border-flip-blue-500"
            inputMode="decimal"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-flip-gray-700 mb-2">
            Eficiência do Sistema (%)
          </label>
          <Input
            type="text"
            value={formatDisplayValue(formData.systemEfficiency)}
            onChange={(e) => handleDecimalInputChange('systemEfficiency', e.target.value)}
            placeholder="Ex: 80,5"
            className="border-flip-blue-200 focus:border-flip-blue-500"
            inputMode="decimal"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-flip-gray-700 mb-2">
            Potência da Placa (Wp)
          </label>
          <Input
            type="text"
            value={formatDisplayValue(formData.panelPower)}
            onChange={(e) => handleDecimalInputChange('panelPower', e.target.value)}
            placeholder="Ex: 550"
            className="border-flip-blue-200 focus:border-flip-blue-500"
            inputMode="decimal"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-flip-gray-700 mb-2">
            Tarifa de Energia (R$/kWh)
          </label>
          <Input
            type="text"
            value={formatDisplayValue(formData.energyTariff)}
            onChange={(e) => handleDecimalInputChange('energyTariff', e.target.value)}
            placeholder="Ex: 0,85"
            className="border-flip-blue-200 focus:border-flip-blue-500"
            inputMode="decimal"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-flip-gray-700 mb-2">
            Preço do Sistema (R$)
          </label>
          <Input
            type="text"
            value={formatDisplayValue(formData.systemPrice)}
            onChange={(e) => handleDecimalInputChange('systemPrice', e.target.value)}
            placeholder="Ex: 50000"
            className="border-flip-blue-200 focus:border-flip-blue-500"
            inputMode="decimal"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-flip-gray-700 mb-2">
            Preço da Energia Excedente (R$/kWh)
          </label>
          <Input
            type="text"
            value={formatDisplayValue(formData.excessPrice)}
            onChange={(e) => handleDecimalInputChange('excessPrice', e.target.value)}
            placeholder="Ex: 0,50"
            className="border-flip-blue-200 focus:border-flip-blue-500"
            inputMode="decimal"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-flip-gray-700 mb-2">
            Estimativa de Excedente (kWh)
          </label>
          <Input
            type="text"
            value={formatDisplayValue(formData.excessEstimate)}
            onChange={(e) => handleDecimalInputChange('excessEstimate', e.target.value)}
            placeholder="Ex: 500"
            className="border-flip-blue-200 focus:border-flip-blue-500"
            inputMode="decimal"
          />
        </div>
      </div>
    </div>
  );
};

export default ProposalForm;
