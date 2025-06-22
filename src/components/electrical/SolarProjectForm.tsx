
import React from 'react';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { Info } from 'lucide-react';
import { SolarMicroFormData } from '../../utils/electricalCalculations';

interface SolarProjectFormProps {
  data: Partial<SolarMicroFormData>;
  onChange: (data: Partial<SolarMicroFormData>) => void;
  projectType: 'solar-micro' | 'solar-mini';
}

const SolarProjectForm: React.FC<SolarProjectFormProps> = ({ data, onChange, projectType }) => {
  const handleInputChange = (field: keyof SolarMicroFormData, value: string | number) => {
    onChange({ ...data, [field]: value });
  };

  const renderField = (
    label: string,
    field: keyof SolarMicroFormData,
    type: 'text' | 'number' = 'text',
    placeholder: string = '',
    tooltip?: string,
    unit?: string
  ) => (
    <div>
      <label className="block text-sm font-medium text-flip-gray-700 mb-2">
        {label}
        {tooltip && (
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 ml-1 inline-block text-flip-blue-500" />
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        )}
        {unit && <span className="text-gray-500 text-xs ml-1">({unit})</span>}
      </label>
      <Input
        type={type}
        value={data[field] || ''}
        onChange={(e) => handleInputChange(field, type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value)}
        placeholder={placeholder}
        className="border-flip-blue-200 focus:border-flip-blue-500"
      />
    </div>
  );

  const renderSelect = (
    label: string,
    field: keyof SolarMicroFormData,
    options: { value: string; label: string }[],
    tooltip?: string
  ) => (
    <div>
      <label className="block text-sm font-medium text-flip-gray-700 mb-2">
        {label}
        {tooltip && (
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 ml-1 inline-block text-flip-blue-500" />
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        )}
      </label>
      <Select 
        value={data[field] as string || ''} 
        onValueChange={(value) => handleInputChange(field, value)}
      >
        <SelectTrigger className="border-flip-blue-200 focus:border-flip-blue-500">
          <SelectValue placeholder="Selecione..." />
        </SelectTrigger>
        <SelectContent>
          {options.map(option => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Dados de Consumo */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium text-flip-gray-900 mb-3">📊 Dados de Consumo</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderField(
            'Consumo Médio Mensal',
            'monthlyConsumption',
            'number',
            'Ex: 1500',
            'Consumo médio mensal em kWh baseado na conta de energia',
            'kWh'
          )}
          {renderField(
            'Irradiação Solar Local',
            'solarIrradiation',
            'number',
            'Ex: 5.0',
            'Irradiação solar média diária da região em kWh/m²/dia',
            'kWh/m²/dia'
          )}
        </div>
      </div>

      {/* Características Técnicas */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium text-flip-gray-900 mb-3">⚡ Características Técnicas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {renderSelect(
            'Tipo de Estrutura',
            'structureType',
            [
              { value: 'roof', label: 'Telhado' },
              { value: 'ground', label: 'Solo' },
              { value: 'carport', label: 'Carport' }
            ],
            'Tipo de estrutura onde os painéis serão instalados'
          )}
          
          {renderField(
            'Inclinação',
            'inclination',
            'number',
            'Ex: 20',
            'Inclinação ideal dos painéis em graus (0-90°)',
            '°'
          )}
          
          {renderField(
            'Orientação',
            'orientation',
            'number',
            'Ex: 0',
            'Azimute - orientação dos painéis (0° = Norte)',
            '° (Azimute)'
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {renderSelect(
            'Tensão da Rede',
            'networkVoltage',
            [
              { value: '220/380V', label: '220/380V (Trifásico)' },
              { value: '127/220V', label: '127/220V (Monofásico)' }
            ],
            'Tensão da rede elétrica local'
          )}
          
          {renderField(
            'Fator de Perdas',
            'lossesPercent',
            'number',
            'Ex: 18',
            'Perdas do sistema: cabeamento, inversores, sujeira, etc.',
            '%'
          )}
          
          {renderSelect(
            'Tipo de Conexão',
            'connectionType',
            [
              { value: 'monophasic', label: 'Monofásica' },
              { value: 'triphasic', label: 'Trifásica' }
            ],
            'Tipo de conexão com a rede elétrica'
          )}
        </div>
      </div>

      {/* Dados Econômicos */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium text-flip-gray-900 mb-3">💰 Dados Econômicos</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderField(
            'Tarifa de Energia',
            'electricityTariff',
            'number',
            'Ex: 0.85',
            'Valor da tarifa de energia elétrica em R$/kWh',
            'R$/kWh'
          )}
          {renderField(
            'Custo por kWp',
            'costPerKwp',
            'number',
            'Ex: 4500',
            `Custo estimado por kWp instalado para ${projectType === 'solar-micro' ? 'microgeração' : 'minigeração'}`,
            'R$/kWp'
          )}
        </div>
      </div>

      {/* Especificações dos Equipamentos */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium text-flip-gray-900 mb-3">🔧 Especificações dos Equipamentos</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {renderField(
            'Potência do Módulo',
            'moduleWattage',
            'number',
            'Ex: 550',
            'Potência nominal de cada painel fotovoltaico',
            'Wp'
          )}
          {renderField(
            'Área do Módulo',
            'moduleArea',
            'number',
            'Ex: 2.7',
            'Área de cada painel fotovoltaico',
            'm²'
          )}
          {renderField(
            'Local da Instalação',
            'location',
            'text',
            'Ex: São Paulo - SP',
            'Cidade e estado onde será instalado o sistema'
          )}
        </div>
      </div>

      {projectType === 'solar-mini' && (
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">⚠️ Características da Minigeração</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Potência superior a 75 kWp</li>
            <li>• Requer projeto específico na concessionária</li>
            <li>• Maior complexidade de instalação</li>
            <li>• Possibilidade de venda de energia excedente</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SolarProjectForm;
