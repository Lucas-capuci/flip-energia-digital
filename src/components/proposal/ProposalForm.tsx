import React, { useState, useEffect } from 'react';
import { Input } from '../ui/input';
import { FormData } from '../../utils/proposalCalculations';

interface ProposalFormProps {
  formData: FormData;
  onInputChange: (field: keyof FormData, value: string | number) => void;
}

const ProposalForm: React.FC<ProposalFormProps> = ({ formData, onInputChange }) => {
  const [localValues, setLocalValues] = useState<{ [key in keyof FormData]: string }>({
    clientName: formData.clientName || '',
    monthlyConsumption: formData.monthlyConsumption.toString(),
    localIrradiation: formData.localIrradiation.toString(),
    systemEfficiency: formData.systemEfficiency.toString(),
    panelPower: formData.panelPower.toString(),
    energyTariff: formData.energyTariff.toString(),
    systemPrice: formData.systemPrice.toString(),
    excessPrice: formData.excessPrice.toString(),
    excessEstimate: formData.excessEstimate.toString(),
  });

  useEffect(() => {
    // Atualiza localValues quando formData externo mudar
    const updated = {} as typeof localValues;
    (Object.keys(formData) as (keyof FormData)[]).forEach((key) => {
      updated[key] = formData[key].toString();
    });
    setLocalValues(updated);
  }, [formData]);

  const handleChange = (field: keyof FormData, value: string) => {
    // Permite somente números, vírgulas e pontos
    const cleanValue = value.replace(/[^0-9.,]/g, '');
    setLocalValues((prev) => ({ ...prev, [field]: cleanValue }));
  };

  const handleBlur = (field: keyof FormData) => {
    const str = localValues[field].replace(',', '.');
    const num = parseFloat(str);
    if (!isNaN(num)) {
      onInputChange(field, num);
    } else {
      onInputChange(field, 0);
    }
  };

  const renderInput = (label: string, field: keyof FormData, placeholder: string) => (
    <div>
      <label className="block text-sm font-medium text-flip-gray-700 mb-2">
        {label}
      </label>
      <Input
        type="text"
        value={localValues[field]}
        onChange={(e) => handleChange(field, e.target.value)}
        onBlur={() => handleBlur(field)}
        placeholder={placeholder}
        className="border-flip-blue-200 focus:border-flip-blue-500"
        inputMode="decimal"
      />
    </div>
  );

  return (
    <div className="space-y-4">
      {renderInput('Nome do Cliente', 'clientName', 'Ex: João da Silva')}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderInput('Consumo Médio Mensal (kWh)', 'monthlyConsumption', 'Ex: 1500')}
        {renderInput('Irradiação Local (kWh/m².dia)', 'localIrradiation', 'Ex: 5,0')}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderInput('Eficiência do Sistema (%)', 'systemEfficiency', 'Ex: 80,5')}
        {renderInput('Potência da Placa (Wp)', 'panelPower', 'Ex: 550')}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderInput('Tarifa de Energia (R$/kWh)', 'energyTariff', 'Ex: 0,85')}
        {renderInput('Preço do Sistema (R$)', 'systemPrice', 'Ex: 50000')}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderInput('Preço da Energia Excedente (R$/kWh)', 'excessPrice', 'Ex: 0,50')}
        {renderInput('Estimativa de Excedente (kWh)', 'excessEstimate', 'Ex: 500')}
      </div>
    </div>
  );
};

export default ProposalForm;
