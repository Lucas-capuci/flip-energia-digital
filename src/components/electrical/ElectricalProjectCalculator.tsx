
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { AlertTriangle, Calculator, FileText, Download, RefreshCw, TrendingUp } from 'lucide-react';
import { toast } from '../ui/use-toast';
import SolarProjectForm from './SolarProjectForm';
import SubstationProjectForm from './SubstationProjectForm';
import ProjectResults from './ProjectResults';
import { 
  SolarMicroFormData, 
  SubstationFormData, 
  SolarCalculationResults, 
  SubstationCalculationResults,
  calculateSolarProject,
  calculateSubstationProject,
  validateSolarData,
  validateSubstationData,
  exportToPDF
} from '../../utils/electricalCalculations';

type ProjectType = 'solar-micro' | 'solar-mini' | 'substation-aerial' | 'substation-enclosed';

const ElectricalProjectCalculator = () => {
  const [projectType, setProjectType] = useState<ProjectType>('solar-micro');
  const [isCalculating, setIsCalculating] = useState(false);

  const [solarFormData, setSolarFormData] = useState<Partial<SolarMicroFormData>>({
    projectType: 'solar-micro',
    targetGeneration: 0,
    availableBudget: 0,
    solarIrradiation: 5.2,
    structureType: 'ground',
    inclination: 20,
    orientation: 0,
    networkVoltage: '220/380V',
    lossesPercent: 18,
    connectionType: 'triphasic',
    location: '',
    electricityTariff: 0.85,
    moduleWattage: 550,
    moduleArea: 2.8,
    costPerKwp: projectType === 'solar-micro' ? 4500 : 3800
  });

  const [substationFormData, setSubstationFormData] = useState<Partial<SubstationFormData>>({
    projectType: projectType as 'substation-aerial' | 'substation-enclosed',
    installedPower: 0,
    powerFactor: 0.92,
    inputVoltage: '13.8kV',
    outputVoltage: '220/380V',
    transformerType: 'dry',
    soilResistivity: 100,
    location: '',
    materialCostPerKva: 800,
    laborCostPerKva: 300,
    projectCostPerKva: 200
  });

  const [calculations, setCalculations] = useState<SolarCalculationResults | SubstationCalculationResults | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const handleProjectTypeChange = (value: string) => {
    const newProjectType = value as ProjectType;
    setProjectType(newProjectType);
    setCalculations(null);
    setValidationErrors([]);
    
    // Update form data based on project type
    if (newProjectType.startsWith('solar')) {
      setSolarFormData(prev => ({
        ...prev,
        projectType: newProjectType as 'solar-micro' | 'solar-mini',
        costPerKwp: newProjectType === 'solar-micro' ? 4500 : 3800
      }));
    } else {
      setSubstationFormData(prev => ({
        ...prev,
        projectType: newProjectType as 'substation-aerial' | 'substation-enclosed'
      }));
    }
  };

  const validateAndCalculate = async () => {
    setIsCalculating(true);
    setValidationErrors([]);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate calculation time

      if (projectType.startsWith('solar')) {
        const errors = validateSolarData(solarFormData);
        if (errors.length > 0) {
          setValidationErrors(errors);
          toast({
            variant: "destructive",
            title: "Dados inválidos",
            description: "Corrija os erros antes de continuar."
          });
          return;
        }

        const results = calculateSolarProject(solarFormData as SolarMicroFormData);
        setCalculations(results);
        
        toast({
          title: "Cálculo concluído",
          description: "Usina solar dimensionada com sucesso!"
        });

      } else {
        const errors = validateSubstationData(substationFormData);
        if (errors.length > 0) {
          setValidationErrors(errors);
          toast({
            variant: "destructive",
            title: "Dados inválidos",
            description: "Corrija os erros antes de continuar."
          });
          return;
        }

        const results = calculateSubstationProject(substationFormData as SubstationFormData);
        setCalculations(results);
        
        toast({
          title: "Cálculo concluído",
          description: "Subestação dimensionada com sucesso!"
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro no cálculo",
        description: "Verifique os dados e tente novamente."
      });
    } finally {
      setIsCalculating(false);
    }
  };

  const handleReset = () => {
    setCalculations(null);
    setValidationErrors([]);
    setSolarFormData({
      projectType: 'solar-micro',
      targetGeneration: 0,
      availableBudget: 0,
      solarIrradiation: 5.2,
      structureType: 'ground',
      inclination: 20,
      orientation: 0,
      networkVoltage: '220/380V',
      lossesPercent: 18,
      connectionType: 'triphasic',
      location: '',
      electricityTariff: 0.85,
      moduleWattage: 550,
      moduleArea: 2.8,
      costPerKwp: 4500
    });
    setSubstationFormData({
      projectType: 'substation-aerial',
      installedPower: 0,
      powerFactor: 0.92,
      inputVoltage: '13.8kV',
      outputVoltage: '220/380V',
      transformerType: 'dry',
      soilResistivity: 100,
      location: '',
      materialCostPerKva: 800,
      laborCostPerKva: 300,
      projectCostPerKva: 200
    });
  };

  const handleExportPDF = () => {
    if (!calculations) return;
    
    try {
      exportToPDF(calculations, projectType, projectType.startsWith('solar') ? solarFormData : substationFormData);
      toast({
        title: "PDF exportado",
        description: "Relatório técnico gerado com sucesso!"
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro na exportação",
        description: "Não foi possível gerar o PDF."
      });
    }
  };

  const isSolarProject = projectType.startsWith('solar');
  const projectTypeLabels = {
    'solar-micro': 'Usina Solar - Microgeração (Investimento)',
    'solar-mini': 'Usina Solar - Minigeração (Investimento)',
    'substation-aerial': 'Subestação Aérea',
    'substation-enclosed': 'Subestação Abrigada'
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <Card className="border-flip-blue-200">
        <CardHeader className="bg-gradient-to-r from-flip-blue-50 to-green-50">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl text-flip-blue-900 flex items-center">
                <TrendingUp className="h-6 w-6 mr-2" />
                Calculadora de Investimento em Projetos Elétricos
              </CardTitle>
              <CardDescription className="text-flip-blue-700 mt-2">
                Dimensionamento técnico e análise de viabilidade econômica para usinas solares e subestações
              </CardDescription>
            </div>
            <Badge variant="outline" className="border-green-300 text-green-700 bg-green-50">
              Investimento v2.0
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Project Type Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2 text-flip-blue-500" />
            Tipo de Projeto de Investimento
          </CardTitle>
          <CardDescription>
            Selecione o tipo de projeto elétrico para análise de investimento
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Select value={projectType} onValueChange={handleProjectTypeChange}>
                <SelectTrigger className="w-full border-flip-blue-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="solar-micro">🔆 Usina Solar - Microgeração (até 75 kWp)</SelectItem>
                  <SelectItem value="solar-mini">☀️ Usina Solar - Minigeração (acima de 75 kWp)</SelectItem>
                  <SelectItem value="substation-aerial">⚡ Subestação Aérea</SelectItem>
                  <SelectItem value="substation-enclosed">🏢 Subestação Abrigada</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Badge 
                variant={isSolarProject ? "default" : "secondary"}
                className={isSolarProject ? "bg-green-500" : "bg-blue-500"}
              >
                {projectTypeLabels[projectType]}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Validation Errors */}
      {validationErrors.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-800 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Correções necessárias
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1">
              {validationErrors.map((error, index) => (
                <li key={index} className="text-red-700 text-sm">• {error}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Section */}
        <div className="lg:col-span-2">
          {isSolarProject ? (
            <SolarProjectForm
              data={solarFormData}
              onChange={setSolarFormData}
              projectType={projectType as 'solar-micro' | 'solar-mini'}
            />
          ) : (
            <SubstationProjectForm
              data={substationFormData}
              onChange={setSubstationFormData}
              projectType={projectType as 'substation-aerial' | 'substation-enclosed'}
            />
          )}
        </div>

        {/* Actions Panel */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                onClick={validateAndCalculate}
                disabled={isCalculating}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {isCalculating ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Calculando...
                  </>
                ) : (
                  <>
                    <Calculator className="h-4 w-4 mr-2" />
                    Calcular Investimento
                  </>
                )}
              </Button>

              <Button 
                variant="outline" 
                onClick={handleReset}
                className="w-full border-flip-blue-200"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Resetar Dados
              </Button>

              {calculations && (
                <Button 
                  variant="outline" 
                  onClick={handleExportPDF}
                  className="w-full border-green-200 text-green-700 hover:bg-green-50"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Exportar Relatório
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Investment Info Panel */}
          <Card className="bg-gradient-to-br from-green-50 to-blue-50">
            <CardHeader>
              <CardTitle className="text-sm text-flip-blue-900">💡 Dicas de Investimento</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-flip-blue-800 space-y-2">
              {isSolarProject ? (
                <>
                  <p>• ROI típico: 15-25% ao ano</p>
                  <p>• Payback: 3-6 anos</p>
                  <p>• Vida útil: 25+ anos</p>
                  <p>• Valorização do imóvel</p>
                  <p>• Energia limpa e sustentável</p>
                </>
              ) : (
                <>
                  <p>• Infraestrutura essencial</p>
                  <p>• Valorização do empreendimento</p>
                  <p>• Segurança energética</p>
                  <p>• Conformidade regulatória</p>
                  <p>• Vida útil: 30+ anos</p>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Results Section */}
      {calculations && (
        <ProjectResults
          calculations={calculations}
          projectType={projectType}
          onExportPDF={handleExportPDF}
        />
      )}
    </div>
  );
};

export default ElectricalProjectCalculator;
