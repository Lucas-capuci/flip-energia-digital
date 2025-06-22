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
  
  // Potência necessária (kWp) - mais precisa
  const systemPower = formData.monthlyConsumption / (formData.solarIrradiation * 30 * PR);
  
  // Número de módulos
  const numberOfModules = Math.ceil(systemPower / (formData.moduleWattage / 1000));
  
  // Potência real do sistema
  const realSystemPower = numberOfModules * (formData.moduleWattage / 1000);
  
  // Área estimada
  const estimatedArea = numberOfModules * formData.moduleArea;
  
  // Inversores (mais detalhado)
  const inverterPower = formData.projectType === 'solar-micro' ? 5 : 50; // kW
  const inverterQuantity = Math.ceil(realSystemPower / inverterPower);
  const inverterType = formData.projectType === 'solar-micro' ? 'String (5kW)' : 'Central (50kW)';
  
  // Geração anual mais precisa
  const annualGeneration = realSystemPower * formData.solarIrradiation * 365 * PR;
  
  // Custos detalhados
  const totalCost = realSystemPower * formData.costPerKwp;
  const monthlySavings = (annualGeneration / 12) * formData.electricityTariff;
  const payback = totalCost / (monthlySavings * 12);
  
  // CO2 evitado (fator brasileiro: 0.0817 kg CO2/kWh)
  const co2Avoided = annualGeneration * 0.0817;
  
  // Tipo de módulo baseado na potência
  const moduleType = formData.moduleWattage >= 500 ? 'Monocristalino Tier 1' : 'Policristalino';
  
  return {
    systemPower: realSystemPower.toFixed(2),
    numberOfModules,
    moduleType,
    inverterQuantity,
    inverterType,
    estimatedArea: estimatedArea.toFixed(1),
    annualGeneration: annualGeneration.toFixed(0),
    totalCost: totalCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 }),
    costPerKwp: formData.costPerKwp.toLocaleString('pt-BR', { minimumFractionDigits: 2 }),
    monthlySavings: monthlySavings.toLocaleString('pt-BR', { minimumFractionDigits: 2 }),
    payback: payback.toFixed(1),
    co2Avoided: co2Avoided.toFixed(0)
  };
};

// Função para cálculos de subestação
export const calculateSubstationProject = (formData: SubstationFormData): SubstationCalculationResults => {
  // Potência aparente (kVA) - mais precisa
  const apparentPower = formData.installedPower / formData.powerFactor;
  
  // Correntes detalhadas
  const inputVoltageNum = parseFloat(formData.inputVoltage.replace('kV', '')) * 1000;
  const currentMT = apparentPower * 1000 / (Math.sqrt(3) * inputVoltageNum);
  const currentBT = apparentPower * 1000 / (Math.sqrt(3) * 380);
  
  // Transformador padrão ABNT
  const standardTransformers = [30, 45, 75, 112.5, 150, 225, 300, 500, 750, 1000, 1500, 2000];
  const recommendedTransformer = standardTransformers.find(t => t >= apparentPower) || standardTransformers[standardTransformers.length - 1];
  
  // Área estimada mais realista
  const baseArea = formData.projectType === 'substation-aerial' ? 12 : 20;
  const estimatedArea = baseArea + (recommendedTransformer / 150) * 8;
  
  // Resistência de aterramento (método das hastes paralelas)
  const rodLength = 2.4; // metros
  const numberOfRods = Math.ceil(recommendedTransformer / 300) + 2;
  const groundingResistance = formData.soilResistivity / (2 * Math.PI * rodLength * numberOfRods);
  
  // Custos detalhados e realistas
  const materialsCost = recommendedTransformer * formData.materialCostPerKva;
  const laborCost = recommendedTransformer * formData.laborCostPerKva;
  const projectCost = recommendedTransformer * formData.projectCostPerKva;
  const totalCost = materialsCost + laborCost + projectCost;
  
  // Tempo de execução baseado na complexidade
  const baseTime = formData.projectType === 'substation-aerial' ? 45 : 60;
  const complexityFactor = recommendedTransformer > 500 ? 1.5 : 1;
  const executionTime = Math.ceil(baseTime * complexityFactor);
  
  // Lista de equipamentos detalhada
  const equipmentList = [
    `Transformador ${recommendedTransformer}kVA - ${formData.transformerType === 'dry' ? 'Seco (Resina)' : 'Óleo Mineral'}`,
    'Chaves seccionadoras MT (3 polos)',
    'Para-raios ZnO (classe MT)',
    'Relé de proteção digital',
    'TC\'s e TP\'s (se necessário)',
    'Estruturas metálicas galvanizadas',
    `Sistema de aterramento (${numberOfRods} hastes)`,
    'Quadro de distribuição BT',
    'Cabos MT/BT especificados',
    'Sistema de proteção e medição'
  ];
  
  return {
    transformerPower: recommendedTransformer.toString(),
    currentMT: currentMT.toFixed(1),
    currentBT: currentBT.toFixed(1),
    recommendedTransformer: `${recommendedTransformer}kVA - ${formData.transformerType === 'dry' ? 'Seco' : 'Óleo'}`,
    equipmentList,
    estimatedArea: estimatedArea.toFixed(0),
    groundingResistance: groundingResistance.toFixed(2),
    totalCost: totalCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 }),
    materialsCost: materialsCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 }),
    laborCost: laborCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 }),
    projectCost: projectCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 }),
    executionTime: `${executionTime} dias úteis`
  };
};

// Validações aprimoradas
export const validateSolarData = (data: Partial<SolarMicroFormData>): string[] => {
  const errors: string[] = [];
  
  if (!data.monthlyConsumption || data.monthlyConsumption <= 0) {
    errors.push('Consumo mensal deve ser maior que zero');
  }
  
  if (data.monthlyConsumption && data.monthlyConsumption > 50000) {
    errors.push('Consumo muito alto para o tipo de projeto selecionado');
  }
  
  if (!data.solarIrradiation || data.solarIrradiation <= 0) {
    errors.push('Irradiação solar deve ser maior que zero');
  }
  
  if (data.solarIrradiation && (data.solarIrradiation < 3 || data.solarIrradiation > 7)) {
    errors.push('Irradiação solar deve estar entre 3 e 7 kWh/m²/dia');
  }
  
  if (data.lossesPercent && (data.lossesPercent < 10 || data.lossesPercent > 30)) {
    errors.push('Fator de perdas deve estar entre 10% e 30%');
  }
  
  if (data.inclination && (data.inclination < 0 || data.inclination > 90)) {
    errors.push('Inclinação deve estar entre 0° e 90°');
  }
  
  if (data.orientation && (data.orientation < -180 || data.orientation > 180)) {
    errors.push('Orientação deve estar entre -180° e 180°');
  }
  
  if (!data.location || data.location.trim() === '') {
    errors.push('Local da instalação é obrigatório');
  }
  
  if (data.electricityTariff && data.electricityTariff <= 0) {
    errors.push('Tarifa de energia deve ser maior que zero');
  }
  
  return errors;
};

export const validateSubstationData = (data: Partial<SubstationFormData>): string[] => {
  const errors: string[] = [];
  
  if (!data.installedPower || data.installedPower <= 0) {
    errors.push('Potência instalada deve ser maior que zero');
  }
  
  if (data.installedPower && data.installedPower > 5000) {
    errors.push('Potência muito alta, considere subestação de maior porte');
  }
  
  if (!data.powerFactor || data.powerFactor <= 0 || data.powerFactor > 1) {
    errors.push('Fator de potência deve estar entre 0,1 e 1,0');
  }
  
  if (data.powerFactor && data.powerFactor < 0.8) {
    errors.push('Fator de potência abaixo de 0,8 pode gerar multa da concessionária');
  }
  
  if (!data.soilResistivity || data.soilResistivity <= 0) {
    errors.push('Resistividade do solo deve ser maior que zero');
  }
  
  if (data.soilResistivity && data.soilResistivity > 10000) {
    errors.push('Resistividade muito alta, verificar medição');
  }
  
  if (!data.location || data.location.trim() === '') {
    errors.push('Local da obra é obrigatório');
  }
  
  if (data.materialCostPerKva && data.materialCostPerKva <= 0) {
    errors.push('Custo de materiais deve ser maior que zero');
  }
  
  return errors;
};

// Função para exportar PDF
export const exportToPDF = (
  calculations: SolarCalculationResults | SubstationCalculationResults,
  projectType: string,
  formData: any
) => {
  // Simulação da exportação - em produção, usaria uma biblioteca como jsPDF
  const fileName = `relatorio-${projectType}-${new Date().toISOString().split('T')[0]}.pdf`;
  
  // Criar conteúdo do relatório
  const reportContent = {
    title: `Relatório Técnico - ${projectType}`,
    date: new Date().toLocaleDateString('pt-BR'),
    calculations,
    formData,
    company: 'Flip Engenharia',
    engineer: 'Eng. Responsável'
  };
  
  // Em produção, aqui seria gerado o PDF real
  console.log('Exportando PDF:', reportContent);
  
  // Simular download
  const blob = new Blob([JSON.stringify(reportContent, null, 2)], {
    type: 'application/json'
  });
  
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
