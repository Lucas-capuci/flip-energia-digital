
import React from 'react';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { Info } from 'lucide-react';
import { SubstationFormData } from '../../utils/electricalCalculations';

interface SubstationProjectFormProps {
  data: Partial<SubstationFormData>;
  onChange: (data: Partial<SubstationFormData>) => void;
  projectType: 'substation-aerial' | 'substation-enclosed';
}

const SubstationProjectForm: React.FC<SubstationProjectFormProps> = ({ data, onChange, projectType }) => {
  const handleInputChange = (field: keyof SubstationFormData, value: string | number) => {
    onChange({ ...data, [field]: value });
  };

  const renderField = (
    label: string,
    field: keyof SubstationFormData,
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
    field: keyof SubstationFormData,
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
      {/* Dados Básicos */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium text-flip-gray-900 mb-3">⚡ Dados Básicos</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderField(
            'Potência Total Instalada',
            'installedPower',
            'number',
            'Ex: 500',
            'Potência ativa total a ser atendida pela subestação',
            'kW'
          )}
          {renderField(
            'Fator de Potência',
            'powerFactor',
            'number',
            'Ex: 0.92',
            'Fator de potência desejado para o sistema (0,85 a 0,98)',
            'cos φ'
          )}
        </div>
      </div>

      {/* Características Elétricas */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium text-flip-gray-900 mb-3">🔌 Características Elétricas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderSelect(
            'Tensão de Entrada (MT)',
            'inputVoltage',
            [
              { value: '13.8kV', label: '13,8 kV' },
              { value: '34.5kV', label: '34,5 kV' },
              { value: '69kV', label: '69 kV' }
            ],
            'Tensão de média tensão da concessionária'
          )}
          
          {renderSelect(
            'Tensão de Saída (BT)',
            'outputVoltage',
            [
              { value: '220/380V', label: '220/380V' }
            ],
            'Tensão de baixa tensão para distribuição'
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {renderSelect(
            'Tipo de Transformador',
            'transformerType',
            [
              { value: 'oil', label: 'A Óleo' },
              { value: 'dry', label: 'A Seco' }
            ],
            'Tipo de isolação do transformador'
          )}
          
          {renderField(
            'Resistividade do Solo',
            'soilResistivity',
            'number',
            'Ex: 100',
            'Resistividade elétrica do solo para dimensionamento do aterramento',
            'Ω·m'
          )}
        </div>
      </div>

      {/* Custos Estimados */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium text-flip-gray-900 mb-3">💰 Custos Estimados</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {renderField(
            'Custo Materiais por kVA',
            'materialCostPerKva',
            'number',
            'Ex: 1200',
            'Custo estimado de materiais por kVA instalado',
            'R$/kVA'
          )}
          {renderField(
            'Custo Mão de Obra por kVA',
            'laborCostPerKva',
            'number',
            'Ex: 800',
            'Custo estimado de mão de obra por kVA instalado',
            'R$/kVA'
          )}
          {renderField(
            'Custo Projeto por kVA',
            'projectCostPerKva',
            'number',
            'Ex: 400',
            'Custo estimado de projeto e documentação por kVA',
            'R$/kVA'
          )}
        </div>
      </div>

      {/* Localização */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium text-flip-gray-900 mb-3">📍 Localização</h3>
        <div className="grid grid-cols-1 gap-4">
          {renderField(
            'Local da Obra',
            'location',
            'text',
            'Ex: São Paulo - SP',
            'Cidade e estado onde será construída a subestação'
          )}
        </div>
      </div>

      {/* Informações Específicas do Tipo */}
      <div className={`${projectType === 'substation-aerial' ? 'bg-blue-50 border-blue-200' : 'bg-green-50 border-green-200'} border p-4 rounded-lg`}>
        <h4 className={`font-medium mb-2 ${projectType === 'substation-aerial' ? 'text-blue-900' : 'text-green-900'}`}>
          ⚠️ Características - {projectType === 'substation-aerial' ? 'Subestação Aérea' : 'Subestação Abrigada'}
        </h4>
        <ul className={`text-sm space-y-1 ${projectType === 'substation-aerial' ? 'text-blue-800' : 'text-green-800'}`}>
          {projectType === 'substation-aerial' ? (
            <>
              <li>• Instalação ao ar livre</li>
              <li>• Menor custo de construção</li>
              <li>• Requer maior área disponível</li>
              <li>• Manutenção mais complexa</li>
              <li>• Área estimada: ~9 m² por transformador</li>
            </>
          ) : (
            <>
              <li>• Instalação em edificação</li>
              <li>• Maior proteção dos equipamentos</li>
              <li>• Menor área externa necessária</li>
              <li>• Manutenção facilitada</li>
              <li>• Área estimada: ~18 m² por transformador</li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SubstationProjectForm;
