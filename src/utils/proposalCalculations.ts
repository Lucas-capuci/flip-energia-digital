
// Arquivo de utilidades para cálculos de propostas

export interface FormData {
  clientName: string;
  monthlyConsumption: number;
  localIrradiation: number;
  systemEfficiency: number;
  panelPower: number;
  energyTariff: number;
  systemPrice: number;
  excessPrice: number;
  excessEstimate: number;
}

export interface CalculationResults {
  systemPower: string;
  numberOfPanels: number;
  inverterRange: string;
  monthlySavings: string;
  annualSavings: string;
  payback: string;
  co2Reduction: string;
  excessProfit: string;
}

// Função para calcular valores da proposta
export const calculateProposalValues = (formData: FormData): CalculationResults => {
  const systemPower = formData.monthlyConsumption / (30 * formData.localIrradiation * (formData.systemEfficiency / 100));
  const numberOfPanels = Math.ceil(systemPower / (formData.panelPower / 1000));
  const inverterMin = systemPower * 0.8;
  const inverterMax = systemPower * 1.2;
  const monthlySavings = formData.monthlyConsumption * formData.energyTariff;
  const annualSavings = monthlySavings * 12;
  const payback = formData.systemPrice / annualSavings;
  const co2Reduction = (formData.monthlyConsumption * 12 * 0.084) / 1000;
  const excessProfit = formData.excessEstimate * formData.excessPrice * 12;

  return {
    systemPower: systemPower.toFixed(2),
    numberOfPanels,
    inverterRange: `${inverterMin.toFixed(2)} - ${inverterMax.toFixed(2)}`,
    monthlySavings: monthlySavings.toFixed(2),
    annualSavings: annualSavings.toFixed(2),
    payback: payback.toFixed(1),
    co2Reduction: co2Reduction.toFixed(2),
    excessProfit: excessProfit.toFixed(2)
  };
};

// Funções para formatação de valores
export const formatFloatValue = (value: number): string => {
  if (value === 0) return '';
  return value.toString().replace('.', ',');
};

export const parseFloatValue = (value: string): number => {
  const normalizedValue = value.replace(',', '.');
  return parseFloat(normalizedValue) || 0;
};
