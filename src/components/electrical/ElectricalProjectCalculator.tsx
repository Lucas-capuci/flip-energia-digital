import React, { useState } from 'react';
import { SolarMicroFormData, SubstationFormData, SolarCalculationResults, SubstationCalculationResults, calculateSolarProject, calculateSubstationProject, validateSolarData, validateSubstationData } from '../../utils/electricalCalculations';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';
import { Slider } from '../ui/slider';
import { toast } from '../ui/use-toast';
import { useToast } from "@/components/ui/use-toast"

type ProjectType = 'solar-micro' | 'substation';

const ElectricalProjectCalculator = () => {
  const [projectType, setProjectType] = useState<ProjectType>('solar-micro');
  const [solarFormData, setSolarFormData] = useState<SolarMicroFormData>({
    projectType: 'solar-micro',
    monthlyConsumption: 0,
    solarIrradiation: 5.0,
    structureType: 'roof',
    inclination: 20,
    orientation: 180,
    networkVoltage: '220/380V',
    lossesPercent: 18,
    connectionType: 'triphasic',
    location: '',
    electricityTariff: 0.85,
    moduleWattage: 550,
    moduleArea: 2.8,
    costPerKwp: 4500
  });

  const [substationFormData, setSubstationFormData] = useState<SubstationFormData>({
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

  const [solarResults, setSolarResults] = useState<SolarCalculationResults | null>(null);
  const [substationResults, setSubstationResults] = useState<SubstationCalculationResults | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const { toast } = useToast()

  const handleProjectTypeChange = (value: string) => {
    setProjectType(value as ProjectType);
    setErrors([]);
    setSolarResults(null);
    setSubstationResults(null);
  };

  const handleCalculate = () => {
    setErrors([]);
    if (projectType === 'solar-micro') {
      const validationErrors = validateSolarData(solarFormData);
      if (validationErrors.length > 0) {
        setErrors(validationErrors);
        return;
      }
      try {
        const results = calculateSolarProject(solarFormData);
        setSolarResults(results);
        setSubstationResults(null);
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Erro ao calcular projeto solar.",
          description: error.message,
        })
      }
    } else if (projectType === 'substation') {
      const validationErrors = validateSubstationData(substationFormData);
      if (validationErrors.length > 0) {
        setErrors(validationErrors);
        return;
      }
      try {
        const results = calculateSubstationProject(substationFormData);
        setSubstationResults(results);
        setSolarResults(null);
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Erro ao calcular subestação.",
          description: error.message,
        })
      }
    }
  };

  const handleReset = () => {
    setSolarResults(null);
    setSubstationResults(null);
    setErrors([]);
    setSolarFormData({
      projectType: 'solar-micro',
      monthlyConsumption: 0,
      solarIrradiation: 5.0,
      structureType: 'roof',
      inclination: 20,
      orientation: 180,
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

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Project Type Selection */}
      <Card className="w-full md:w-1/3">
        <CardHeader>
          <CardTitle>Tipo de Projeto</CardTitle>
          <CardDescription>Selecione o tipo de projeto elétrico.</CardDescription>
        </CardHeader>
        <CardContent>
          <Select onValueChange={handleProjectTypeChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione um tipo de projeto" defaultValue="solar-micro" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="solar-micro">Sistema Solar (Microgeração)</SelectItem>
              <SelectItem value="substation">Subestação</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Solar Project Form */}
      {projectType === 'solar-micro' && (
        <Card className="w-full md:w-2/3">
          <CardHeader>
            <CardTitle>Cálculo de Projeto Solar (Microgeração)</CardTitle>
            <CardDescription>Insira os dados para calcular o projeto solar.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="monthlyConsumption">Consumo Mensal (kWh)</Label>
                <Input
                  type="number"
                  id="monthlyConsumption"
                  value={solarFormData.monthlyConsumption.toString()}
                  onChange={(e) => setSolarFormData({ ...solarFormData, monthlyConsumption: parseFloat(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="solarIrradiation">Irradiação Solar (kWh/m²/dia)</Label>
                <Input
                  type="number"
                  id="solarIrradiation"
                  value={solarFormData.solarIrradiation.toString()}
                  onChange={(e) => setSolarFormData({ ...solarFormData, solarIrradiation: parseFloat(e.target.value) })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="moduleWattage">Potência do Módulo (W)</Label>
                <Input
                  type="number"
                  id="moduleWattage"
                  value={solarFormData.moduleWattage.toString()}
                  onChange={(e) => setSolarFormData({ ...solarFormData, moduleWattage: parseFloat(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="moduleArea">Área do Módulo (m²)</Label>
                <Input
                  type="number"
                  id="moduleArea"
                  value={solarFormData.moduleArea.toString()}
                  onChange={(e) => setSolarFormData({ ...solarFormData, moduleArea: parseFloat(e.target.value) })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="electricityTariff">Tarifa de Energia (R$/kWh)</Label>
                <Input
                  type="number"
                  id="electricityTariff"
                  value={solarFormData.electricityTariff.toString()}
                  onChange={(e) => setSolarFormData({ ...solarFormData, electricityTariff: parseFloat(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="costPerKwp">Custo por kWp (R$)</Label>
                <Input
                  type="number"
                  id="costPerKwp"
                  value={solarFormData.costPerKwp.toString()}
                  onChange={(e) => setSolarFormData({ ...solarFormData, costPerKwp: parseFloat(e.target.value) })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="lossesPercent">Perdas no Sistema (%)</Label>
              <Slider
                defaultValue={[solarFormData.lossesPercent]}
                max={30}
                min={10}
                step={1}
                onValueChange={(value) => setSolarFormData({ ...solarFormData, lossesPercent: value[0] })}
              />
              <p className="text-sm text-muted-foreground">Valor: {solarFormData.lossesPercent}%</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Substation Project Form */}
      {projectType === 'substation' && (
        <Card className="w-full md:w-2/3">
          <CardHeader>
            <CardTitle>Cálculo de Projeto de Subestação</CardTitle>
            <CardDescription>Insira os dados para calcular o projeto da subestação.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="installedPower">Potência Instalada (kW)</Label>
                <Input
                  type="number"
                  id="installedPower"
                  value={substationFormData.installedPower.toString()}
                  onChange={(e) => setSubstationFormData({ ...substationFormData, installedPower: parseFloat(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="powerFactor">Fator de Potência</Label>
                <Input
                  type="number"
                  id="powerFactor"
                  value={substationFormData.powerFactor.toString()}
                  onChange={(e) => setSubstationFormData({ ...substationFormData, powerFactor: parseFloat(e.target.value) })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="materialCostPerKva">Custo Material por kVA (R$)</Label>
                <Input
                  type="number"
                  id="materialCostPerKva"
                  value={substationFormData.materialCostPerKva.toString()}
                  onChange={(e) => setSubstationFormData({ ...substationFormData, materialCostPerKva: parseFloat(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="laborCostPerKva">Custo Mão de Obra por kVA (R$)</Label>
                <Input
                  type="number"
                  id="laborCostPerKva"
                  value={substationFormData.laborCostPerKva.toString()}
                  onChange={(e) => setSubstationFormData({ ...substationFormData, laborCostPerKva: parseFloat(e.target.value) })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="soilResistivity">Resistividade do Solo (Ω.m)</Label>
              <Input
                type="number"
                id="soilResistivity"
                value={substationFormData.soilResistivity.toString()}
                onChange={(e) => setSubstationFormData({ ...substationFormData, soilResistivity: parseFloat(e.target.value) })}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results Display */}
      {(solarResults || substationResults) && (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Resultados do Cálculo</CardTitle>
            <CardDescription>Aqui estão os resultados do seu cálculo.</CardDescription>
          </CardHeader>
          <CardContent>
            {errors.length > 0 && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Erros:</h3>
                <ul>
                  {errors.map((error, index) => (
                    <li key={index} className="text-red-500">{error}</li>
                  ))}
                </ul>
              </div>
            )}

            {solarResults && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Resultados do Projeto Solar:</h3>
                <p>Potência do Sistema: {solarResults.systemPower} kWp</p>
                <p>Número de Módulos: {solarResults.numberOfModules}</p>
                <p>Geração Anual Estimada: {solarResults.annualGeneration} kWh</p>
                <p>Economia Mensal Estimada: R$ {solarResults.monthlySavings}</p>
                <p>Payback Estimado: {solarResults.payback} anos</p>
              </div>
            )}

            {substationResults && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Resultados do Projeto de Subestação:</h3>
                <p>Potência do Transformador: {substationResults.transformerPower} kVA</p>
                <p>Corrente MT: {substationResults.currentMT} A</p>
                <p>Custo Total Estimado: R$ {substationResults.totalCost}</p>
                <p>Tempo de Execução Estimado: {substationResults.executionTime}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="w-full flex justify-end gap-2 mt-4">
        <Button variant="secondary" onClick={handleReset}>
          Resetar
        </Button>
        <Button onClick={handleCalculate}>Calcular</Button>
      </div>
    </div>
  );
};

export default ElectricalProjectCalculator;
