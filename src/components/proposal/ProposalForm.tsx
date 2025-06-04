import React, { useState, useEffect } from 'react';
import { Input } from '../ui/input';
import { FormData } from '../../utils/proposalCalculations';

interface ProposalFormProps {
  formData: FormData;
  onInputChange: (field: keyof FormData, value: number | string) => void;
}

const ProposalForm: React.FC<ProposalFormProps> = ({ formData, onInputChange }) => {
  const [localValues, setLocalValues] = useState<{ [key in keyof FormData]: string }>(() => {
    const initialValues: { [key in keyof FormData]: string } = {} as any;
    for (const key in formData) {
      initialValues[key as keyof FormData] = formData[key as keyof FormData]?.toString?.() || '';
    }
    return initialValues;
  });

  useEffect(() => {
    const updatedValues: { [key in keyof FormData]: string } = {} as any;
    for (const key in formData) {
      updatedValues[key as keyof FormData] = formData[key as keyof FormData]?.toString?.() || '';
    }
    setLocalValues(updatedValues);
  }, [formData]);

  const handleChange = (field: keyof FormData, value: string) => {
    const cleanValue = value.replace(',', '.');
    setLocalValues((prev) => ({ ...prev, [field]: cleanValue }));
  };

  const handleBlur = (field: keyof FormData) => {
    const num = parseFloat(localValues[field]);
    onInputChange(field, isNaN(num) ? 0 : num);
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
