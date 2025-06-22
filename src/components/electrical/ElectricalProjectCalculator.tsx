
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Calculator, RotateCcw, FileText, AlertTriangle, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import SolarProjectForm from './SolarProjectForm';
import SubstationProjectForm from './SubstationProjectForm';
import ProjectResults from './ProjectResults';
import { 
  SolarMicroFormData, 
  SubstationFormData,
  calculateSolarProject,
  calculateSubstationProject,
  validateSolarData,
  validateSubstationData
} from '../../utils/electricalCalculations';

type ProjectType = 'solar-micro' | 'solar-mini' | 'substation-aerial' | 'substation-enclosed';

const ElectricalProjectCalculator = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectType>('solar-micro');
  const [activeTab, setActiveTab] = useState('calculator');
  const [comparisonMode, setComparisonMode] = useState(false);
  const [secondProject, setSecondProject] = useState<ProjectType>('solar-mini');
  
  const [solarData, setSolarData] = useState<Partial<SolarMicroFormData>>({
    projectType: 'solar-micro',
    monthlyConsumption: 1500,
    solarIrradiation: 5.0,
    structureType: 'roof',
    inclination: 20,
    orientation: 0,
    networkVoltage: '220/380V',
    lossesPercent: 18,
    connectionType: 'triphasic',
    location: 'São Paulo - SP',
    electricityTariff: 0.85,
    moduleWattage: 550,
    moduleArea: 2.7,
    costPerKwp: 4500
  });

  const [substationData, setSubstationData] = useState<Partial<SubstationFormData>>({
    projectType: 'substation-aerial',
    installedPower: 500,
    powerFactor: 0.92,
    inputVoltage: '13.8kV',
    outputVoltage: '220/380V',
    transformerType: 'oil',
    soilResistivity: 100,
    location: 'São Paulo - SP',
    materialCostPerKva: 1200,
    laborCostPerKva: 800,
    projectCostPerKva: 400
  });

  const [calculations, setCalculations] = useState<any>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const projectOptions = [
    { value: 'solar-micro', label: 'Usina Fotovoltaica – Microgeração' },
    { value: 'solar-mini', label: 'Usina Fotovoltaica – Minigeração' },
    { value: 'substation-aerial', label: 'Subestação Aérea' },
    { value: 'substation-enclosed', label: 'Subestação Abrigada' }
  ];

  const handleProjectChange = (value: ProjectType) => {
    setSelectedProject(value);
    setCalculations(null);
    setValidationErrors([]);
    
    // Atualizar dados baseado no tipo
    if (value.startsWith('solar')) {
      setSolarData(prev => ({ ...prev, projectType: value as 'solar-micro' | 'solar-mini' }));
    } else {
      setSubstationData(prev => ({ ...prev, projectType: value as 'substation-aerial' | 'substation-enclosed' }));
    }
  };

  const handleCalculate = () => {
    let errors: string[] = [];
    let results: any = null;

    if (selectedProject.startsWith('solar')) {
      errors = validateSolarData(solarData);
      if (errors.length === 0) {
        results = calculateSolarProject(solarData as SolarMicroFormData);
      }
    } else {
      errors = validateSubstationData(substationData);
      if (errors.length === 0) {
        results = calculateSubstationProject(substationData as SubstationFormData);
      }
    }

    setValidationErrors(errors);
    if (errors.length === 0) {
      setCalculations(results);
    }
  };

  const handleReset = () => {
    if (selectedProject.startsWith('solar')) {
      setSolarData({
        projectType: selectedProject as 'solar-micro' | 'solar-mini',
        monthlyConsumption: 0,
        solarIrradiation: 5.0,
        structureType: 'roof',
        inclination: 20,
        orientation: 0,
        networkVoltage: '220/380V',
        lossesPercent: 18,
        connectionType: 'triphasic',
        location: '',
        electricityTariff: 0.85,
        moduleWattage: 550,
        moduleArea: 2.7,
        costPerKwp: 4500
      });
    } else {
      setSubstationData({
        projectType: selectedProject as 'substation-aerial' | 'substation-enclosed',
        installedPower: 0,
        powerFactor: 0.92,
        inputVoltage: '13.8kV',
        outputVoltage: '220/380V',
        transformerType: 'oil',
        soilResistivity: 100,
        location: '',
        materialCostPerKva: 1200,
        laborCostPerKva: 800,
        projectCostPerKva: 400
      });
    }
    setCalculations(null);
    setValidationErrors([]);
  };

  const handleExportPDF = () => {
    // Implementar exportação PDF
    console.log('Exportando PDF...');
  };

  const isSolarProject = selectedProject.startsWith('solar');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-flip-gray-900 mb-4">
            Calculadora de Projetos Elétricos
          </h1>
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex-1 min-w-80">
              <label className="block text-sm font-medium text-flip-gray-700 mb-2">
                Tipo de Projeto
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 ml-1 inline-block text-flip-blue-500" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Selecione o tipo de projeto para carregar os campos específicos</p>
                  </TooltipContent>
                </Tooltip>
              </label>
              <Select value={selectedProject} onValueChange={handleProjectChange}>
                <SelectTrigger className="border-flip-blue-200 focus:border-flip-blue-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {projectOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={handleReset}
                variant="outline"
                className="border-flip-blue-200 text-flip-blue-600 hover:bg-flip-blue-50"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Resetar
              </Button>
              <Button 
                onClick={() => setComparisonMode(!comparisonMode)}
                variant="outline"
                className="border-flip-blue-200 text-flip-blue-600 hover:bg-flip-blue-50"
              >
                {comparisonMode ? 'Modo Normal' : 'Comparar Projetos'}
              </Button>
            </div>
          </div>

          {/* Avisos de validação */}
          {validationErrors.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-center mb-2">
                <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                <h3 className="text-sm font-medium text-red-800">
                  Dados inconsistentes encontrados:
                </h3>
              </div>
              <ul className="text-sm text-red-700 list-disc list-inside">
                {validationErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="calculator" className="flex items-center space-x-2">
              <Calculator className="h-4 w-4" />
              <span>Calculadora</span>
            </TabsTrigger>
            <TabsTrigger value="results" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Resultados</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="space-y-6">
            <div className={`grid gap-6 ${comparisonMode ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
              {/* Projeto Principal */}
              <div className="bg-white rounded-lg shadow-sm border border-flip-blue-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-flip-gray-900">
                    {projectOptions.find(p => p.value === selectedProject)?.label}
                  </h2>
                  <Badge variant="default" className="bg-flip-blue-500">
                    {isSolarProject ? 'Solar' : 'Subestação'}
                  </Badge>
                </div>
                
                {isSolarProject ? (
                  <SolarProjectForm 
                    data={solarData}
                    onChange={setSolarData}
                    projectType={selectedProject as 'solar-micro' | 'solar-mini'}
                  />
                ) : (
                  <SubstationProjectForm 
                    data={substationData}
                    onChange={setSubstationData}
                    projectType={selectedProject as 'substation-aerial' | 'substation-enclosed'}
                  />
                )}
              </div>

              {/* Projeto de Comparação */}
              {comparisonMode && (
                <div className="bg-white rounded-lg shadow-sm border border-flip-blue-100 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-flip-gray-900">
                      Projeto de Comparação
                    </h2>
                    <Select value={secondProject} onValueChange={setSecondProject}>
                      <SelectTrigger className="w-64">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {projectOptions.filter(p => p.value !== selectedProject).map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {/* Formulário do segundo projeto seria renderizado aqui */}
                  <div className="text-center text-gray-500 py-8">
                    <Info className="h-8 w-8 mx-auto mb-2" />
                    <p>Formulário de comparação em desenvolvimento</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-center">
              <Button 
                onClick={handleCalculate}
                className="bg-flip-blue-500 hover:bg-flip-blue-600 text-white px-8 py-3"
                disabled={validationErrors.length > 0}
              >
                <Calculator className="h-5 w-5 mr-2" />
                Calcular Projeto
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="results" className="space-y-6">
            <ProjectResults 
              calculations={calculations}
              projectType={selectedProject}
              onExportPDF={handleExportPDF}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ElectricalProjectCalculator;
