// MÓDULO 4 — VERIFICAÇÃO DE COMPATIBILIDADE TÉCNICA
// Verifica compatibilidade com inversor, strings e área

import { EntradaDados, ResultadoObjetivo, VerificacaoTecnica } from './types';

export class CompatibilidadeTecnicaModule {
  
  /**
   * Verificação completa de compatibilidade técnica
   */
  static verificarCompatibilidade(
    dados: EntradaDados,
    resultado: ResultadoObjetivo
  ): VerificacaoTecnica {
    const verificacaoInversor = this.verificarInversor(dados, resultado);
    const verificacaoStrings = this.verificarStrings(dados, resultado);
    const verificacaoArea = this.verificarArea(dados, resultado);
    
    return {
      inversor: verificacaoInversor,
      strings: verificacaoStrings,
      area: verificacaoArea
    };
  }
  
  /**
   * Verificação de compatibilidade do inversor
   */
  static verificarInversor(dados: EntradaDados, resultado: ResultadoObjetivo) {
    const { inversor } = dados.equipamentos;
    const potenciaModulos = resultado.potenciaInstalada * 1000; // Converter para W
    
    // Razão potência módulos/inversor
    const razaoPotencia = potenciaModulos / inversor.potenciaNominal;
    
    const observacoes: string[] = [];
    let compativel = true;
    
    // Verificação da razão de potência (90% a 130%)
    if (razaoPotencia < 0.9) {
      compativel = false;
      observacoes.push(`Sistema subdimensionado: ${(razaoPotencia * 100).toFixed(1)}% da potência do inversor`);
    } else if (razaoPotencia > 1.3) {
      compativel = false;
      observacoes.push(`Sistema superdimensionado: ${(razaoPotencia * 100).toFixed(1)}% da potência do inversor`);
    } else if (razaoPotencia < 1.0) {
      observacoes.push(`Sistema conservador: ${(razaoPotencia * 100).toFixed(1)}% da potência do inversor`);
    } else if (razaoPotencia > 1.2) {
      observacoes.push(`Sistema agressivo: ${(razaoPotencia * 100).toFixed(1)}% da potência do inversor - pode haver clipping`);
    } else {
      observacoes.push(`Dimensionamento adequado: ${(razaoPotencia * 100).toFixed(1)}% da potência do inversor`);
    }
    
    return {
      compativel,
      razaoPotencia,
      observacoes
    };
  }
  
  /**
   * Verificação de configuração de strings
   */
  static verificarStrings(dados: EntradaDados, resultado: ResultadoObjetivo) {
    const { modulo, inversor } = dados.equipamentos;
    const numeroModulos = resultado.numeroModulos;
    
    // Calcular configuração ótima de strings
    const configuracao = this.calcularConfiguracaoStrings(dados, numeroModulos);
    
    const observacoes: string[] = [];
    let compativel = true;
    
    // Verificar tensão da string
    const tensaoString = configuracao.modulosPorString * modulo.tensaoOperacao;
    const tensaoStringVoc = configuracao.modulosPorString * modulo.tensaoCircuitoAberto * 1.2; // Fator temperatura
    
    if (tensaoString < inversor.tensaoMpptMin) {
      compativel = false;
      observacoes.push(`Tensão da string muito baixa: ${tensaoString.toFixed(1)}V < ${inversor.tensaoMpptMin}V`);
    }
    
    if (tensaoString > inversor.tensaoMpptMax) {
      compativel = false;
      observacoes.push(`Tensão da string muito alta: ${tensaoString.toFixed(1)}V > ${inversor.tensaoMpptMax}V`);
    }
    
    if (tensaoStringVoc > inversor.tensaoMaxEntrada) {
      compativel = false;
      observacoes.push(`Tensão Voc muito alta: ${tensaoStringVoc.toFixed(1)}V > ${inversor.tensaoMaxEntrada}V`);
    }
    
    // Verificar corrente
    const correnteString = modulo.correnteOperacao;
    if (correnteString > inversor.correnteMaxEntrada) {
      compativel = false;
      observacoes.push(`Corrente da string muito alta: ${correnteString.toFixed(1)}A > ${inversor.correnteMaxEntrada}A`);
    }
    
    // Verificar número de strings vs MPPTs
    if (configuracao.numeroStrings > inversor.numeroMppt) {
      observacoes.push(`${configuracao.numeroStrings} strings para ${inversor.numeroMppt} MPPTs - haverá strings em paralelo`);
    }
    
    if (compativel) {
      observacoes.push(`Configuração válida: ${configuracao.numeroStrings} strings de ${configuracao.modulosPorString} módulos`);
      observacoes.push(`Tensão: ${tensaoString.toFixed(1)}V, Corrente: ${correnteString.toFixed(1)}A`);
    }
    
    return {
      modulosPorString: configuracao.modulosPorString,
      numeroStrings: configuracao.numeroStrings,
      tensaoString,
      correnteString,
      compativel,
      observacoes
    };
  }
  
  /**
   * Calcular configuração ótima de strings
   */
  static calcularConfiguracaoStrings(dados: EntradaDados, numeroModulos: number) {
    const { modulo, inversor } = dados.equipamentos;
    
    // Calcular número ótimo de módulos por string
    const tensaoOtima = (inversor.tensaoMpptMin + inversor.tensaoMpptMax) / 2;
    let modulosPorString = Math.round(tensaoOtima / modulo.tensaoOperacao);
    
    // Verificar limites
    const modulosMin = Math.ceil(inversor.tensaoMpptMin / modulo.tensaoOperacao);
    const modulosMax = Math.floor(inversor.tensaoMpptMax / modulo.tensaoOperacao);
    
    modulosPorString = Math.max(modulosMin, Math.min(modulosPorString, modulosMax));
    
    // Calcular número de strings
    const numeroStrings = Math.ceil(numeroModulos / modulosPorString);
    
    // Verificar se é necessário ajustar para múltiplos do MPPT
    if (numeroStrings <= inversor.numeroMppt) {
      // Configuração simples - uma string por MPPT
      return { modulosPorString, numeroStrings };
    } else {
      // Múltiplas strings por MPPT - otimizar distribuição
      const stringsPorMppt = Math.ceil(numeroStrings / inversor.numeroMppt);
      const numeroStringsOtimo = stringsPorMppt * inversor.numeroMppt;
      
      // Pode ser necessário ajustar o número de módulos
      const modulosOtimo = numeroStringsOtimo * modulosPorString;
      
      return { 
        modulosPorString, 
        numeroStrings: numeroStringsOtimo,
        modulosAjustados: modulosOtimo
      };
    }
  }
  
  /**
   * Verificação de área disponível
   */
  static verificarArea(dados: EntradaDados, resultado: ResultadoObjetivo, areaDisponivel?: number) {
    const { modulo } = dados.equipamentos;
    const numeroModulos = resultado.numeroModulos;
    
    // Fatores de compactação por tipo de instalação
    const fatoresCompactacao = {
      'telhado': 0.65,     // Considerando obstáculos e espaçamentos
      'solo': 0.70,        // Considerando sombreamento entre fileiras
      'carport': 0.60      // Estrutura com limitações
    };
    
    const fatorCompactacao = fatoresCompactacao[dados.local.tipoInstalacao] || 0.65;
    
    // Área ocupada pelos módulos
    const areaModulos = numeroModulos * modulo.dimensoes.area;
    
    // Área total necessária (considerando espaçamentos e acessos)
    const areaTotal = areaModulos / fatorCompactacao;
    
    const observacoes: string[] = [];
    
    observacoes.push(`Área dos módulos: ${areaModulos.toFixed(1)} m²`);
    observacoes.push(`Área total necessária: ${areaTotal.toFixed(1)} m² (fator ${fatorCompactacao})`);
    observacoes.push(`Tipo de instalação: ${dados.local.tipoInstalacao}`);
    
    // Se área disponível foi informada, verificar adequação
    if (areaDisponivel) {
      if (areaTotal > areaDisponivel) {
        observacoes.push(`❌ Área insuficiente: necessário ${areaTotal.toFixed(1)} m², disponível ${areaDisponivel} m²`);
      } else {
        const aproveitamento = (areaTotal / areaDisponivel) * 100;
        observacoes.push(`✅ Área adequada: ${aproveitamento.toFixed(1)}% de aproveitamento`);
      }
    }
    
    return {
      areaOcupada: areaTotal,
      fatorCompactacao,
      observacoes
    };
  }
  
  /**
   * Sugerir otimizações técnicas
   */
  static sugerirOtimizacoes(
    dados: EntradaDados,
    resultado: ResultadoObjetivo,
    verificacao: VerificacaoTecnica
  ): string[] {
    const sugestoes: string[] = [];
    
    // Otimizações do inversor
    if (!verificacao.inversor.compativel) {
      if (verificacao.inversor.razaoPotencia < 0.9) {
        sugestoes.push('Considere usar um inversor de menor potência ou adicionar mais módulos');
      } else if (verificacao.inversor.razaoPotencia > 1.3) {
        sugestoes.push('Considere usar um inversor de maior potência ou reduzir o número de módulos');
      }
    }
    
    // Otimizações das strings
    if (!verificacao.strings.compativel) {
      sugestoes.push('Ajuste a configuração de strings para atender os limites do inversor');
      
      if (verificacao.strings.numeroStrings > dados.equipamentos.inversor.numeroMppt) {
        sugestoes.push('Considere usar inversores com mais MPPTs ou dividir em subsistemas');
      }
    }
    
    // Otimizações de eficiência
    if (verificacao.inversor.razaoPotencia > 1.15) {
      sugestoes.push('Sistema pode ter clipping - considere orientações diferentes ou inversores adicionais');
    }
    
    // Otimizações de área
    if (dados.local.tipoInstalacao === 'telhado' && verificacao.area.fatorCompactacao < 0.6) {
      sugestoes.push('Layout do telhado pode ser otimizado para melhor aproveitamento');
    }
    
    return sugestoes;
  }
  
  /**
   * Validar toda a compatibilidade técnica
   */
  static validarCompatibilidadeCompleta(verificacao: VerificacaoTecnica): string[] {
    const erros: string[] = [];
    
    if (!verificacao.inversor.compativel) {
      erros.push('Incompatibilidade com inversor detectada');
    }
    
    if (!verificacao.strings.compativel) {
      erros.push('Configuração de strings inválida');
    }
    
    // Verificações adicionais podem ser adicionadas aqui
    
    return erros;
  }
}