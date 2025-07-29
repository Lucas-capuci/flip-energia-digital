// MÓDULO 2 — CÁLCULO DE GERAÇÃO DE ENERGIA
// Cálculo base reutilizável para qualquer entrada

import { EntradaDados, CalculoGeracao } from './types';

export class CalculoGeracaoModule {
  
  /**
   * Cálculo principal de geração de energia
   * E_mensal = (Pmod × Irr × PR × 30 × Nmod) / 1000
   */
  static calcularGeracao(dados: EntradaDados, numeroModulos: number): CalculoGeracao {
    const { local, equipamentos } = dados;
    const { modulo } = equipamentos;
    
    // Energia mensal por módulo (kWh)
    const energiaMensalPorModulo = this.calcularEnergiaPorModulo(
      modulo.potencia,
      local.irradiacaoMedia,
      equipamentos.eficienciaSystem
    );
    
    // Energia mensal total
    const energiaMensalTotal = energiaMensalPorModulo * numeroModulos;
    
    // Energia anual total
    const energiaAnualTotal = energiaMensalTotal * 12;
    
    // Potência instalada (kWp)
    const potenciaInstalada = (numeroModulos * modulo.potencia) / 1000;
    
    return {
      energiaMensalPorModulo,
      energiaMensalTotal,
      energiaAnualTotal,
      numeroModulos,
      potenciaInstalada
    };
  }
  
  /**
   * Cálculo de energia por módulo
   */
  static calcularEnergiaPorModulo(
    potenciaModulo: number, // W
    irradiacao: number, // kWh/m²/dia
    performanceRatio: number // 0.75-0.85
  ): number {
    // E_mensal_por_modulo = (Pmod × Irr × PR × 30) / 1000
    return (potenciaModulo * irradiacao * performanceRatio * 30) / 1000;
  }
  
  /**
   * Cálculo inverso: quantos módulos são necessários para gerar X kWh/mês
   */
  static calcularNumeroModulosParaGeracao(
    energiaDesejada: number, // kWh/mês
    dados: EntradaDados
  ): number {
    const energiaPorModulo = this.calcularEnergiaPorModulo(
      dados.equipamentos.modulo.potencia,
      dados.local.irradiacaoMedia,
      dados.equipamentos.eficienciaSystem
    );
    
    return Math.ceil(energiaDesejada / energiaPorModulo);
  }
  
  /**
   * Cálculo com base na potência desejada (kWp)
   */
  static calcularNumeroModulosParaPotencia(
    potenciaDesejada: number, // kWp
    potenciaModulo: number // W
  ): number {
    return Math.ceil((potenciaDesejada * 1000) / potenciaModulo);
  }
  
  /**
   * Validação do cálculo de geração
   */
  static validarCalculoGeracao(calculo: CalculoGeracao): string[] {
    const erros: string[] = [];
    
    if (calculo.numeroModulos <= 0) {
      erros.push('Número de módulos deve ser maior que zero');
    }
    
    if (calculo.potenciaInstalada <= 0) {
      erros.push('Potência instalada deve ser maior que zero');
    }
    
    if (calculo.energiaMensalTotal <= 0) {
      erros.push('Geração mensal deve ser maior que zero');
    }
    
    // Verificações de coerência
    if (calculo.energiaAnualTotal !== calculo.energiaMensalTotal * 12) {
      erros.push('Inconsistência entre geração mensal e anual');
    }
    
    // Limites práticos
    if (calculo.potenciaInstalada > 1000) {
      erros.push('Potência muito alta para sistema residencial (> 1 MWp)');
    }
    
    if (calculo.energiaMensalPorModulo > 150) {
      erros.push('Geração por módulo muito alta, verificar parâmetros');
    }
    
    return erros;
  }
  
  /**
   * Aplicar correções por fatores ambientais
   */
  static aplicarCorrecaoAmbiental(
    geracaoBase: number,
    inclinacao: number,
    orientacao: number,
    fatores?: {
      sombreamento?: number; // 0-1
      sujeira?: number; // 0-1
      temperatura?: number; // 0-1
    }
  ): number {
    let fatorCorrecao = 1;
    
    // Correção por inclinação (simplificada)
    if (inclinacao < 10) fatorCorrecao *= 0.95;
    else if (inclinacao > 40) fatorCorrecao *= 0.90;
    
    // Correção por orientação (simplificada)
    // Sul = 180° é ótimo
    const desvioSul = Math.abs(orientacao - 180);
    if (desvioSul > 45) fatorCorrecao *= 0.85;
    else if (desvioSul > 90) fatorCorrecao *= 0.70;
    
    // Aplicar fatores adicionais se fornecidos
    if (fatores) {
      if (fatores.sombreamento) fatorCorrecao *= (1 - fatores.sombreamento);
      if (fatores.sujeira) fatorCorrecao *= (1 - fatores.sujeira);
      if (fatores.temperatura) fatorCorrecao *= fatores.temperatura;
    }
    
    return geracaoBase * fatorCorrecao;
  }
  
  /**
   * Estimativa de geração por mês (considerando sazonalidade)
   */
  static calcularGeracaoMensal(
    geracaoAnual: number,
    regiao: 'nordeste' | 'sudeste' | 'sul' | 'centro-oeste' | 'norte' = 'sudeste'
  ): number[] {
    // Fatores sazonais por região (simplificado)
    const fatoresSazonais: { [key: string]: number[] } = {
      nordeste: [0.85, 0.80, 0.85, 0.90, 0.95, 1.0, 1.1, 1.15, 1.1, 1.0, 0.95, 0.90],
      sudeste: [1.1, 1.05, 1.0, 0.95, 0.85, 0.80, 0.85, 0.90, 0.95, 1.05, 1.15, 1.20],
      sul: [1.2, 1.15, 1.0, 0.85, 0.70, 0.65, 0.70, 0.80, 0.90, 1.05, 1.15, 1.25],
      'centro-oeste': [0.90, 0.85, 0.90, 0.95, 0.90, 0.85, 0.90, 1.0, 1.05, 1.10, 1.05, 0.95],
      norte: [0.80, 0.85, 0.90, 0.95, 1.0, 1.05, 1.10, 1.15, 1.10, 1.0, 0.90, 0.85]
    };
    
    const fatores = fatoresSazonais[regiao];
    const geracaoMensalMedia = geracaoAnual / 12;
    
    return fatores.map(fator => geracaoMensalMedia * fator);
  }
}