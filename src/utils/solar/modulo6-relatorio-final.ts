// MÓDULO 6 — GERAÇÃO DE RELATÓRIO TÉCNICO-COMERCIAL

import { EntradaDados, ResultadoObjetivo, VerificacaoTecnica, CalculosAdicionais, RelatorioTecnicoComercial } from './types';

export class RelatorioFinalModule {
  
  /**
   * Gerar relatório técnico-comercial completo
   */
  static gerarRelatorio(
    dados: EntradaDados,
    resultado: ResultadoObjetivo,
    verificacao: VerificacaoTecnica,
    calculos: CalculosAdicionais
  ): RelatorioTecnicoComercial {
    
    const observacoes = this.gerarObservacoes(dados, resultado, verificacao);
    const recomendacoes = this.gerarRecomendacoes(dados, resultado, verificacao, calculos);
    
    return {
      dadosCliente: dados.cliente,
      dadosInstalacao: dados.local,
      resumoTecnico: {
        potenciaInstalada: resultado.potenciaInstalada,
        numeroModulos: resultado.numeroModulos,
        numeroInversores: 1, // Simplificado
        areaOcupada: verificacao.area.areaOcupada
      },
      projecaoEnergetica: {
        geracaoMensal: resultado.geracaoEstimada,
        geracaoAnual: calculos.geracaoAnual,
        percentualCompensacao: resultado.percentualCompensacao
      },
      analiseFinanceira: calculos,
      verificacaoTecnica: verificacao,
      observacoes,
      recomendacoes
    };
  }
  
  /**
   * Gerar observações técnicas
   */
  static gerarObservacoes(
    dados: EntradaDados,
    resultado: ResultadoObjetivo,
    verificacao: VerificacaoTecnica
  ): string[] {
    const observacoes: string[] = [];
    
    // Observações do sistema
    observacoes.push(`Sistema fotovoltaico de ${resultado.potenciaInstalada.toFixed(2)} kWp`);
    observacoes.push(`${resultado.numeroModulos} módulos ${dados.equipamentos.modulo.marca} de ${dados.equipamentos.modulo.potencia}W`);
    observacoes.push(`Inversor ${dados.equipamentos.inversor.marca} de ${dados.equipamentos.inversor.potenciaNominal/1000}kW`);
    
    // Observações técnicas do inversor
    observacoes.push(...verificacao.inversor.observacoes);
    
    // Observações das strings
    observacoes.push(...verificacao.strings.observacoes);
    
    // Observações de área
    observacoes.push(...verificacao.area.observacoes);
    
    return observacoes;
  }
  
  /**
   * Gerar recomendações
   */
  static gerarRecomendacoes(
    dados: EntradaDados,
    resultado: ResultadoObjetivo,
    verificacao: VerificacaoTecnica,
    calculos: CalculosAdicionais
  ): string[] {
    const recomendacoes: string[] = [];
    
    // Recomendações financeiras
    if (calculos.payback <= 5) {
      recomendacoes.push('✅ Excelente retorno financeiro - payback em até 5 anos');
    } else if (calculos.payback <= 8) {
      recomendacoes.push('✅ Bom retorno financeiro - payback adequado');
    } else {
      recomendacoes.push('⚠️ Payback elevado - avaliar viabilidade');
    }
    
    // Recomendações de compensação
    if (resultado.percentualCompensacao >= 90 && resultado.percentualCompensacao <= 110) {
      recomendacoes.push('✅ Sistema bem dimensionado para compensação total');
    } else if (resultado.percentualCompensacao > 110) {
      recomendacoes.push('💡 Sistema gera excedente - considere autoconsumo remoto');
    } else {
      recomendacoes.push('⚠️ Sistema não compensa totalmente o consumo');
    }
    
    // Recomendações técnicas
    if (!verificacao.inversor.compativel || !verificacao.strings.compativel) {
      recomendacoes.push('🔧 Necessário ajuste na configuração técnica');
    }
    
    // Recomendações ambientais
    recomendacoes.push(`🌱 Redução de ${calculos.reducaoCO2.toFixed(2)} toneladas de CO₂ por ano`);
    
    return recomendacoes;
  }
}