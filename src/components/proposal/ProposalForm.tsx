
import React from 'react';
import { Input } from '../ui/input';
import { FormData, formatFloatValue, parseFloatValue } from '../../utils/proposalCalculations';

interface ProposalFormProps {
  formData: FormData;
  onInputChange: (field: keyof FormData, value: string | number) => void;
}

const ProposalForm: React.FC<ProposalFormProps> = ({ formData, onInputChange }) => {
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
            value={formatFloatValue(formData.monthlyConsumption)}
            onChange={(e) => onInputChange('monthlyConsumption', parseFloatValue(e.target.value))}
            placeholder="Ex: 1500"
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
            value={formatFloatValue(formData.localIrradiation)}
            onChange={(e) => onInputChange('localIrradiation', parseFloatValue(e.target.value))}
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
            value={formatFloatValue(formData.systemEfficiency)}
            onChange={(e) => onInputChange('systemEfficiency', parseFloatValue(e.target.value))}
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
            value={formatFloatValue(formData.panelPower)}
            onChange={(e) => onInputChange('panelPower', parseFloatValue(e.target.value))}
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
            value={formatFloatValue(formData.energyTariff)}
            onChange={(e) => onInputChange('energyTariff', parseFloatValue(e.target.value))}
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
            value={formatFloatValue(formData.systemPrice)}
            onChange={(e) => onInputChange('systemPrice', parseFloatValue(e.target.value))}
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
            value={formatFloatValue(formData.excessPrice)}
            onChange={(e) => onInputChange('excessPrice', parseFloatValue(e.target.value))}
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
            value={formatFloatValue(formData.excessEstimate)}
            onChange={(e) => onInputChange('excessEstimate', parseFloatValue(e.target.value))}
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
