
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
      {/* Dados de Investimento */}
      <div className="bg-gradient-to-br from-green-50 to-blue-50 p-4 rounded-lg border border-green-200">
        <h3 className="font-medium text-flip-gray-900 mb-3">💰 Parâmetros de Investimento</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderField(
            'Geração Desejada Mensal',
            'targetGeneration',
            'number',
            'Ex: 2000',
            'Meta de geração mensal em kWh para o projeto de investimento',
            'kWh'
          )}
          {renderField(
            'Orçamento Disponível',
            'availableBudget',
            'number',
            'Ex: 100000',
            'Valor máximo disponível para investimento no projeto',
            'R$'
          )}
        </div>
      </div>

      {/* Dados Técnicos da Usina */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium text-flip-gray-900 mb-3">⚡ Especificações Técnicas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {renderField(
            'Irradiação Solar Local',
            'solarIrradiation',
            'number',
            'Ex: 5.0',
            'Irradiação solar média diária da região em kWh/m²/dia (consulte atlas solar)',
            'kWh/m²/dia'
          )}
          
          {renderSelect(
            'Tipo de Estrutura',
            'structureType',
            [
              { value: 'ground', label: 'Solo (Usina)' },
              { value: 'roof', label: 'Telhado Industrial' },
              { value: 'carport', label: 'Carport/Estacionamento' }
            ],
            'Tipo de estrutura onde a usina será instalada'
          )}
          
          {renderField(
            'Inclinação',
            'inclination',
            'number',
            'Ex: 20',
            'Inclinação ideal dos painéis para máxima geração (varia por região)',
            '°'
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {renderField(
            'Orientação',
            'orientation',
            'number',
            'Ex: 0',
            'Azimute - orientação dos painéis (0° = Norte, ideal para Brasil)',
            '° (Azimute)'
          )}
          
          {renderSelect(
            'Tensão da Rede',
            'networkVoltage',
            [
              { value: '220/380V', label: '220/380V (Trifásico)' },
              { value: '127/220V', label: '127/220V (Monofásico)' }
            ],
            'Tensão da rede elétrica do local de conexão'
          )}
          
          {renderField(
            'Fator de Perdas',
            'lossesPercent',
            'number',
            'Ex: 18',
            'Perdas técnicas: cabeamento, inversores, sujeira, sombreamento',
            '%'
          )}
        </div>
      </div>

      {/* Dados Comerciais */}
      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
        <h3 className="font-medium text-flip-gray-900 mb-3">💼 Dados Comerciais</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderField(
            'Tarifa de Energia Local',
            'electricityTariff',
            'number',
            'Ex: 0.85',
            'Tarifa média de energia da região (para cálculo de receita)',
            'R$/kWh'
          )}
          {renderField(
            'Custo por kWp Instalado',
            'costPerKwp',
            'number',
            'Ex: 4500',
            `Custo médio de instalação para ${projectType === 'solar-micro' ? 'microgeração' : 'minigeração'} incluindo equipamentos e instalação`,
            'R$/kWp'
          )}
        </div>
      </div>

      {/* Especificações dos Equipamentos */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h3 className="font-medium text-flip-gray-900 mb-3">🔧 Equipamentos</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {renderField(
            'Potência do Módulo',
            'moduleWattage',
            'number',
            'Ex: 550',
            'Potência unitária dos painéis fotovoltaicos a serem utilizados',
            'Wp'
          )}
          {renderField(
            'Área do Módulo',
            'moduleArea',
            'number',
            'Ex: 2.8',
            'Área unitária de cada painel fotovoltaico',
            'm²'
          )}
          {renderField(
            'Local da Usina',
            'location',
            'text',
            'Ex: Goiânia - GO',
            'Cidade e estado onde a usina será instalada'
          )}
        </div>
      </div>

      {projectType === 'solar-mini' && (
        <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
          <h4 className="font-medium text-purple-900 mb-2">🏭 Características da Minigeração</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ul className="text-sm text-purple-800 space-y-1">
              <li>• Potência superior a 75 kWp</li>
              <li>• Projeto específico na concessionária</li>
              <li>• Maior complexidade regulatória</li>
            </ul>
            <ul className="text-sm text-purple-800 space-y-1">
              <li>• Possibilidade de venda de energia</li>
              <li>• ROI mais atrativo em escala</li>
              <li>• Ideal para investidores</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default SolarProjectForm;
