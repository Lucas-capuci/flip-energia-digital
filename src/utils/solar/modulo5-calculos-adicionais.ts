// MÓDULO 5 — CÁLCULOS ADICIONAIS
// Geração anual, economia, payback, CO₂, investimento

import { EntradaDados, ResultadoObjetivo, CalculosAdicionais } from './types';

export class CalculosAdicionaisModule {
  
  /**
   * Calcular todos os valores adicionais
   */
  static calcularTodosValores(
    dados: EntradaDados,
    resultado: ResultadoObjetivo,
    parametrosFinanceiros?: {
      tarifaEnergia?: number; // R$/kWh
      custoPorWp?: number; // R$/Wp
      taxaDesconto?: number; // % ao ano
      inflacaoEnergia?: number; // % ao ano
    }
  ): CalculosAdicionais {
    const params = {
      tarifaEnergia: parametrosFinanceiros?.tarifaEnergia || 0.75,
      custoPorWp: parametrosFinanceiros?.custoPorWp || 3.50,
      taxaDesconto: parametrosFinanceiros?.taxaDesconto || 8,
      inflacaoEnergia: parametrosFinanceiros?.inflacaoEnergia || 5,
      ...parametrosFinanceiros
    };
    
    // Geração anual
    const geracaoAnual = resultado.geracaoEstimada * 12;
    
    // Economia mensal e anual
    const economiaMensal = resultado.geracaoEstimada * params.tarifaEnergia;
    const economiaAnual = economiaMensal * 12;
    
    // Valor do investimento
    const valorInvestimento = resultado.potenciaInstalada * 1000 * params.custoPorWp;
    
    // Payback simples
    const payback = valorInvestimento / economiaAnual;
    
    // Redução de CO₂
    const reducaoCO2 = this.calcularReducaoCO2(geracaoAnual);
    
    return {
      geracaoAnual,
      economiaMensal,
      economiaAnual,
      payback,
      reducaoCO2,
      valorInvestimento,
      custoPorWp: params.custoPorWp
    };
  }
  
  /**
   * Calcular redução de CO₂
   */
  static calcularReducaoCO2(geracaoAnual: number): number {
    // Fator de emissão do SIN brasileiro: ~0.055 tCO₂/MWh
    const fatorEmissao = 0.055; // tCO₂/MWh
    return (geracaoAnual / 1000) * fatorEmissao;
  }
  
  /**
   * Calcular payback descontado (TIR considerada)
   */
  static calcularPaybackDescontado(
    investimentoInicial: number,
    economiaAnual: number,
    taxaDesconto: number,
    inflacaoEnergia: number,
    vidaUtil: number = 25
  ): number {
    let valorPresente = 0;
    let ano = 0;
    
    while (valorPresente < investimentoInicial && ano < vidaUtil) {
      ano++;
      
      // Economia do ano com inflação energética
      const economiaAno = economiaAnual * Math.pow(1 + inflacaoEnergia / 100, ano);
      
      // Valor presente da economia
      const vpEconomia = economiaAno / Math.pow(1 + taxaDesconto / 100, ano);
      
      valorPresente += vpEconomia;
    }
    
    return ano;
  }
  
  /**
   * Calcular TIR (Taxa Interna de Retorno)
   */
  static calcularTIR(
    investimentoInicial: number,
    economiaAnual: number,
    inflacaoEnergia: number,
    vidaUtil: number = 25
  ): number {
    // Método de Newton-Raphson simplificado
    let tir = 0.1; // Chute inicial de 10%
    const tolerancia = 0.0001;
    let iteracoes = 0;
    const maxIteracoes = 100;
    
    while (iteracoes < maxIteracoes) {
      let vpl = -investimentoInicial;
      let derivada = 0;
      
      for (let ano = 1; ano <= vidaUtil; ano++) {
        const fluxoAno = economiaAnual * Math.pow(1 + inflacaoEnergia / 100, ano);
        const denominador = Math.pow(1 + tir, ano);
        
        vpl += fluxoAno / denominador;
        derivada -= (ano * fluxoAno) / Math.pow(1 + tir, ano + 1);
      }
      
      if (Math.abs(vpl) < tolerancia) break;
      
      const novoTir = tir - vpl / derivada;
      if (Math.abs(novoTir - tir) < tolerancia) break;
      
      tir = novoTir;
      iteracoes++;
    }
    
    return tir * 100; // Retornar em percentual
  }
  
  /**
   * Calcular VPL (Valor Presente Líquido)
   */
  static calcularVPL(
    investimentoInicial: number,
    economiaAnual: number,
    taxaDesconto: number,
    inflacaoEnergia: number,
    vidaUtil: number = 25
  ): number {
    let vpl = -investimentoInicial;
    
    for (let ano = 1; ano <= vidaUtil; ano++) {
      // Economia do ano com inflação energética
      const economiaAno = economiaAnual * Math.pow(1 + inflacaoEnergia / 100, ano);
      
      // Valor presente da economia
      const vpEconomia = economiaAno / Math.pow(1 + taxaDesconto / 100, ano);
      
      vpl += vpEconomia;
    }
    
    return vpl;
  }
  
  /**
   * Projeção financeira completa
   */
  static calcularProjecaoFinanceira(
    dados: EntradaDados,
    resultado: ResultadoObjetivo,
    parametros: {
      tarifaEnergia: number;
      custoPorWp: number;
      taxaDesconto: number;
      inflacaoEnergia: number;
      vidaUtil?: number;
      custoManutencao?: number; // % do investimento por ano
    }
  ) {
    const vidaUtil = parametros.vidaUtil || 25;
    const custoManutencao = parametros.custoManutencao || 0.5; // 0.5% ao ano
    
    const valorInvestimento = resultado.potenciaInstalada * 1000 * parametros.custoPorWp;
    const economiaAnual = resultado.geracaoEstimada * 12 * parametros.tarifaEnergia;
    const custoManutencaoAnual = valorInvestimento * (custoManutencao / 100);
    const economiaLiquida = economiaAnual - custoManutencaoAnual;
    
    // Cálculos financeiros
    const paybackSimples = valorInvestimento / economiaLiquida;
    const paybackDescontado = this.calcularPaybackDescontado(
      valorInvestimento,
      economiaLiquida,
      parametros.taxaDesconto,
      parametros.inflacaoEnergia,
      vidaUtil
    );
    const tir = this.calcularTIR(
      valorInvestimento,
      economiaLiquida,
      parametros.inflacaoEnergia,
      vidaUtil
    );
    const vpl = this.calcularVPL(
      valorInvestimento,
      economiaLiquida,
      parametros.taxaDesconto,
      parametros.inflacaoEnergia,
      vidaUtil
    );
    
    // Projeção ano a ano
    const projecaoAnual = [];
    let saldoAcumulado = -valorInvestimento;
    
    for (let ano = 1; ano <= vidaUtil; ano++) {
      const economiaAno = economiaAnual * Math.pow(1 + parametros.inflacaoEnergia / 100, ano);
      const custoManutencaoAno = custoManutencaoAnual * Math.pow(1 + 3 / 100, ano); // 3% inflação geral
      const fluxoLiquido = economiaAno - custoManutencaoAno;
      
      saldoAcumulado += fluxoLiquido;
      
      projecaoAnual.push({
        ano,
        economia: economiaAno,
        custoManutencao: custoManutencaoAno,
        fluxoLiquido,
        saldoAcumulado
      });
    }
    
    return {
      investimentoInicial: valorInvestimento,
      economiaAnual,
      custoManutencaoAnual,
      economiaLiquida,
      paybackSimples,
      paybackDescontado,
      tir,
      vpl,
      projecaoAnual
    };
  }
  
  /**
   * Análise de sensibilidade
   */
  static analiseSensibilidade(
    dados: EntradaDados,
    resultado: ResultadoObjetivo,
    parametrosBase: {
      tarifaEnergia: number;
      custoPorWp: number;
      irradiacaoMedia: number;
    }
  ) {
    const cenarios = [];
    
    // Cenário pessimista (-20%)
    cenarios.push({
      nome: 'Pessimista',
      fator: 0.8,
      ...this.calcularCenario(dados, resultado, parametrosBase, 0.8)
    });
    
    // Cenário base
    cenarios.push({
      nome: 'Base',
      fator: 1.0,
      ...this.calcularCenario(dados, resultado, parametrosBase, 1.0)
    });
    
    // Cenário otimista (+20%)
    cenarios.push({
      nome: 'Otimista',
      fator: 1.2,
      ...this.calcularCenario(dados, resultado, parametrosBase, 1.2)
    });
    
    return cenarios;
  }
  
  /**
   * Calcular cenário específico para análise de sensibilidade
   */
  private static calcularCenario(
    dados: EntradaDados,
    resultado: ResultadoObjetivo,
    parametros: { tarifaEnergia: number; custoPorWp: number; irradiacaoMedia: number },
    fator: number
  ) {
    const tarifaAjustada = parametros.tarifaEnergia * fator;
    const irradiacaoAjustada = parametros.irradiacaoMedia * fator;
    const geracaoAjustada = resultado.geracaoEstimada * fator;
    
    const economiaAnual = geracaoAjustada * 12 * tarifaAjustada;
    const investimento = resultado.potenciaInstalada * 1000 * parametros.custoPorWp;
    const payback = investimento / economiaAnual;
    
    return {
      geracao: geracaoAjustada,
      economia: economiaAnual,
      payback
    };
  }
  
  /**
   * Validar cálculos adicionais
   */
  static validarCalculos(calculos: CalculosAdicionais): string[] {
    const erros: string[] = [];
    
    if (calculos.payback <= 0) {
      erros.push('Payback deve ser positivo');
    }
    
    if (calculos.payback > 25) {
      erros.push('Payback muito alto (> 25 anos) - projeto pode não ser viável');
    }
    
    if (calculos.economiaAnual <= 0) {
      erros.push('Economia anual deve ser positiva');
    }
    
    if (calculos.valorInvestimento <= 0) {
      erros.push('Valor do investimento deve ser positivo');
    }
    
    return erros;
  }
}