
// Utilitários para cálculos de projetos elétricos

export interface SolarMicroFormData {
  projectType: 'solar-micro' | 'solar-mini';
  monthlyConsumption: number;
  solarIrradiation: number;
  structureType: 'roof' | 'ground' | 'carport';
  inclination: number;
  orientation: number;
  networkVoltage: '220/380V' | '127/220V';
  lossesPercent: number;
  connectionType: 'monophasic' | 'triphasic';
  location: string;
  electricityTariff: number;
  moduleWattage: number;
  moduleArea: number;
  costPerKwp: number;
}

export interface SubstationFormData {
  projectType: 'substation-aerial' | 'substation-enclosed';
  installedPower: number;
  powerFactor: number;
  inputVoltage: '13.8kV' | '34.5kV' | '69kV';
  outputVoltage: '220/380V';
  transformerType: 'dry' | 'oil';
  soilResistivity: number;
  location: string;
  materialCostPerKva: number;
  laborCostPerKva: number;
  projectCostPerKva: number;
}

export interface SolarCalculationResults {
  systemPower: string;
  numberOfModules: number;
  moduleType: string;
  inverterQuantity: number;
  inverterType: string;
  estimatedArea: string;
  annualGeneration: string;
  totalCost: string;
  costPerKwp: string;
  monthlySavings: string;
  payback: string;
  co2Avoided: string;
}

export interface SubstationCalculationResults {
  transformerPower: string;
  currentMT: string;
  currentBT: string;
  recommendedTransformer: string;
  equipmentList: string[];
  estimatedArea: string;
  groundingResistance: string;
  totalCost: string;
  materialsCost: string;
  laborCost: string;
  projectCost: string;
  executionTime: string;
}

// Função para cálculos de energia solar
export const calculateSolarProject = (formData: SolarMicroFormData): SolarCalculationResults => {
  const PR = (100 - formData.lossesPercent) / 100; // Performance Ratio
  
  // Potência necessária (kWp)
  const systemPower = formData.monthlyConsumption / (formData.solarIrradiation * 30 * PR);
  
  // Número de módulos
  const numberOfModules = Math.ceil(systemPower / (formData.moduleWattage / 1000));
  
  // Área estimada
  const estimatedArea = numberOfModules * formData.moduleArea;
  
  // Inversores (estimando 0.8 de fator de dimensionamento)
  const inverterQuantity = Math.ceil(systemPower / 50); // Assumindo inversores de 50kW
  
  // Geração anual
  const annualGeneration = systemPower * formData.solarIrradiation * 365 * PR;
  
  // Custos
  const totalCost = systemPower * formData.costPerKwp;
  const monthlySavings = (annualGeneration / 12) * formData.electricityTariff;
  const payback = totalCost / (monthlySavings * 12);
  
  // CO2 evitado (fator: 0.084 kg CO2/kWh)
  const co2Avoided = annualGeneration * 0.084;
  
  return {
    systemPower: systemPower.toFixed(2),
    numberOfModules,
    moduleType: `${formData.moduleWattage}Wp`,
    inverterQuantity,
    inverterType: formData.projectType === 'solar-micro' ? 'String' : 'Central',
    estimatedArea: estimatedArea.toFixed(1),
    annualGeneration: annualGeneration.toFixed(0),
    totalCost: totalCost.toFixed(2),
    costPerKwp: formData.costPerKwp.toFixed(2),
    monthlySavings: monthlySavings.toFixed(2),
    payback: payback.toFixed(1),
    co2Avoided: co2Avoided.toFixed(0)
  };
};

// Função para cálculos de subestação
export const calculateSubstationProject = (formData: SubstationFormData): SubstationCalculationResults => {
  // Potência aparente (kVA)
  const apparentPower = formData.installedPower / formData.powerFactor;
  
  // Correntes
  const inputVoltageNum = parseFloat(formData.inputVoltage.replace('kV', '')) * 1000;
  const currentMT = apparentPower * 1000 / (Math.sqrt(3) * inputVoltageNum);
  const currentBT = apparentPower * 1000 / (Math.sqrt(3) * 380);
  
  // Transformador padrão
  const standardTransformers = [75, 112.5, 150, 225, 300, 500, 750, 1000];
  const recommendedTransformer = standardTransformers.find(t => t >= apparentPower) || standardTransformers[standardTransformers.length - 1];
  
  // Área estimada
  const areaMultiplier = formData.projectType === 'substation-aerial' ? 9 : 18;
  const estimatedArea = Math.ceil(recommendedTransformer / 150) * areaMultiplier;
  
  // Resistência de aterramento (simplificada)
  const groundingResistance = formData.soilResistivity / (4 * Math.PI * 2.4); // Assumindo haste de 2.4m
  
  // Custos
  const materialsCost = recommendedTransformer * formData.materialCostPerKva;
  const laborCost = recommendedTransformer * formData.laborCostPerKva;
  const projectCost = recommendedTransformer * formData.projectCostPerKva;
  const totalCost = materialsCost + laborCost + projectCost;
  
  // Tempo de execução (baseado na potência)
  const executionTime = Math.ceil(recommendedTransformer / 150) * 30; // 30 dias por faixa de 150kVA
  
  // Lista de equipamentos
  const equipmentList = [
    `Transformador ${recommendedTransformer}kVA - ${formData.transformerType === 'dry' ? 'Seco' : 'Óleo'}`,
    'Chaves seccionadoras MT',
    'Para-raios',
    'Relé de proteção',
    'Estruturas metálicas',
    'Sistema de aterramento',
    'Quadro de distribuição BT'
  ];
  
  return {
    transformerPower: recommendedTransformer.toString(),
    currentMT: currentMT.toFixed(1),
    currentBT: currentBT.toFixed(1),
    recommendedTransformer: `${recommendedTransformer}kVA`,
    equipmentList,
    estimatedArea: estimatedArea.toString(),
    groundingResistance: groundingResistance.toFixed(2),
    totalCost: totalCost.toFixed(2),
    materialsCost: materialsCost.toFixed(2),
    laborCost: laborCost.toFixed(2),
    projectCost: projectCost.toFixed(2),
    executionTime: `${executionTime} dias`
  };
};

// Validações
export const validateSolarData = (data: Partial<SolarMicroFormData>): string[] => {
  const errors: string[] = [];
  
  if (!data.monthlyConsumption || data.monthlyConsumption <= 0) {
    errors.push('Consumo mensal deve ser maior que zero');
  }
  
  if (!data.solarIrradiation || data.solarIrradiation <= 0) {
    errors.push('Irradiação solar deve ser maior que zero');
  }
  
  if (data.lossesPercent && (data.lossesPercent < 10 || data.lossesPercent > 30)) {
    errors.push('Fator de perdas deve estar entre 10% e 30%');
  }
  
  return errors;
};

export const validateSubstationData = (data: Partial<SubstationFormData>): string[] => {
  const errors: string[] = [];
  
  if (!data.installedPower || data.installedPower <= 0) {
    errors.push('Potência instalada deve ser maior que zero');
  }
  
  if (!data.powerFactor || data.powerFactor <= 0 || data.powerFactor > 1) {
    errors.push('Fator de potência deve estar entre 0 e 1');
  }
  
  if (!data.soilResistivity || data.soilResistivity <= 0) {
    errors.push('Resistividade do solo deve ser maior que zero');
  }
  
  return errors;
};
