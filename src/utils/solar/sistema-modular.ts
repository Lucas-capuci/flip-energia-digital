// SISTEMA MODULAR DE PROPOSTAS SOLARES - ORQUESTRADOR PRINCIPAL

import { EntradaDados, ResultadoCompleto } from './types';
import { EntradaDadosModule } from './modulo1-entrada-dados';
import { CalculoGeracaoModule } from './modulo2-calculo-geracao';
import { FluxosEntradaModule } from './modulo3-fluxos-entrada';
import { CompatibilidadeTecnicaModule } from './modulo4-compatibilidade-tecnica';
import { CalculosAdicionaisModule } from './modulo5-calculos-adicionais';
import { RelatorioFinalModule } from './modulo6-relatorio-final';

export class SistemaModularSolar {
  
  /**
   * Método principal que executa todo o fluxo modular
   */
  static calcularProposta(
    dados: EntradaDados,
    parametrosFinanceiros?: {
      tarifaEnergia?: number;
      custoPorWp?: number;
      taxaDesconto?: number;
      inflacaoEnergia?: number;
    }
  ): ResultadoCompleto {
    const erros: string[] = [];
    
    try {
      // MÓDULO 1: Validar entrada de dados
      const errosValidacao = EntradaDadosModule.validarEntradaCompleta(dados);
      if (errosValidacao.length > 0) {
        return {
          entradaDados: dados,
          calculoGeracao: {} as any,
          resultadoObjetivo: {} as any,
          verificacaoTecnica: {} as any,
          calculosAdicionais: {} as any,
          relatorioFinal: {} as any,
          valido: false,
          erros: errosValidacao
        };
      }
      
      // MÓDULO 3: Processar objetivo do cliente
      const resultadoObjetivo = FluxosEntradaModule.processarObjetivoCliente(dados);
      
      // MÓDULO 2: Calcular geração com base no resultado do objetivo
      const calculoGeracao = CalculoGeracaoModule.calcularGeracao(dados, resultadoObjetivo.numeroModulos);
      
      // MÓDULO 4: Verificar compatibilidade técnica
      const verificacaoTecnica = CompatibilidadeTecnicaModule.verificarCompatibilidade(dados, resultadoObjetivo);
      
      // MÓDULO 5: Calcular valores adicionais
      const calculosAdicionais = CalculosAdicionaisModule.calcularTodosValores(dados, resultadoObjetivo, parametrosFinanceiros);
      
      // MÓDULO 6: Gerar relatório final
      const relatorioFinal = RelatorioFinalModule.gerarRelatorio(dados, resultadoObjetivo, verificacaoTecnica, calculosAdicionais);
      
      // Validações finais
      const errosTecnicos = CompatibilidadeTecnicaModule.validarCompatibilidadeCompleta(verificacaoTecnica);
      const errosFinanceiros = CalculosAdicionaisModule.validarCalculos(calculosAdicionais);
      
      erros.push(...errosTecnicos, ...errosFinanceiros);
      
      return {
        entradaDados: dados,
        calculoGeracao,
        resultadoObjetivo,
        verificacaoTecnica,
        calculosAdicionais,
        relatorioFinal,
        valido: erros.length === 0,
        erros
      };
      
    } catch (error) {
      erros.push(`Erro no processamento: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
      
      return {
        entradaDados: dados,
        calculoGeracao: {} as any,
        resultadoObjetivo: {} as any,
        verificacaoTecnica: {} as any,
        calculosAdicionais: {} as any,
        relatorioFinal: {} as any,
        valido: false,
        erros
      };
    }
  }
}