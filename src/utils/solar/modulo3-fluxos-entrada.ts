// MÓDULO 3 — FLUXOS DE ENTRADA (OBJETIVO DO CLIENTE)
// Avalia a necessidade do cliente e usa o fluxo adequado

import { EntradaDados, ResultadoObjetivo } from './types';
import { CalculoGeracaoModule } from './modulo2-calculo-geracao';

export class FluxosEntradaModule {
  
  /**
   * Método principal que direciona para o fluxo correto
   */
  static processarObjetivoCliente(dados: EntradaDados): ResultadoObjetivo {
    const { cliente } = dados;
    
    switch (cliente.objetivoCliente) {
      case 'gerar_kwh':
        return this.cenarioA_GerarKWh(dados);
      
      case 'definir_potencia':
        return this.cenarioB_DefinirPotencia(dados);
      
      case 'usar_modulos':
        return this.cenarioC_UsarModulos(dados);
      
      case 'zerar_conta':
        return this.cenarioD_ZerarConta(dados);
      
      default:
        throw new Error(`Objetivo não reconhecido: ${cliente.objetivoCliente}`);
    }
  }
  
  /**
   * CENÁRIO A: Cliente quer gerar X kWh/mês
   * 1. Cálculo da geração mensal por módulo
   * 2. N = X / (E_mensal_por_módulo)
   * 3. Potência total = N × Pmod
   */
  static cenarioA_GerarKWh(dados: EntradaDados): ResultadoObjetivo {
    const energiaDesejada = dados.cliente.valorObjetivo!;
    
    // Calcular número de módulos necessários
    const numeroModulos = CalculoGeracaoModule.calcularNumeroModulosParaGeracao(
      energiaDesejada,
      dados
    );
    
    // Calcular geração real com o número de módulos inteiros
    const calculo = CalculoGeracaoModule.calcularGeracao(dados, numeroModulos);
    
    // Calcular percentual de compensação
    const percentualCompensacao = (calculo.energiaMensalTotal / dados.cliente.consumoMedioMensal) * 100;
    
    return {
      numeroModulos,
      potenciaInstalada: calculo.potenciaInstalada,
      geracaoEstimada: calculo.energiaMensalTotal,
      percentualCompensacao
    };
  }
  
  /**
   * CENÁRIO B: Cliente define a potência (kWp)
   * 1. N = Potência desejada / (Pmod / 1000)
   * 2. Geração estimada = usar Módulo 2
   */
  static cenarioB_DefinirPotencia(dados: EntradaDados): ResultadoObjetivo {
    const potenciaDesejada = dados.cliente.valorObjetivo!; // kWp
    
    // Calcular número de módulos
    const numeroModulos = CalculoGeracaoModule.calcularNumeroModulosParaPotencia(
      potenciaDesejada,
      dados.equipamentos.modulo.potencia
    );
    
    // Calcular geração
    const calculo = CalculoGeracaoModule.calcularGeracao(dados, numeroModulos);
    
    // Calcular percentual de compensação
    const percentualCompensacao = (calculo.energiaMensalTotal / dados.cliente.consumoMedioMensal) * 100;
    
    return {
      numeroModulos,
      potenciaInstalada: calculo.potenciaInstalada,
      geracaoEstimada: calculo.energiaMensalTotal,
      percentualCompensacao
    };
  }
  
  /**
   * CENÁRIO C: Cliente tem X módulos disponíveis
   * 1. Potência instalada = N × Pmod
   * 2. Geração estimada = usar Módulo 2
   */
  static cenarioC_UsarModulos(dados: EntradaDados): ResultadoObjetivo {
    const numeroModulos = dados.cliente.valorObjetivo!;
    
    // Calcular geração
    const calculo = CalculoGeracaoModule.calcularGeracao(dados, numeroModulos);
    
    // Calcular percentual de compensação
    const percentualCompensacao = (calculo.energiaMensalTotal / dados.cliente.consumoMedioMensal) * 100;
    
    return {
      numeroModulos,
      potenciaInstalada: calculo.potenciaInstalada,
      geracaoEstimada: calculo.energiaMensalTotal,
      percentualCompensacao
    };
  }
  
  /**
   * CENÁRIO D: Cliente quer zerar ou compensar parte da conta
   * 1. Levanta-se o consumo médio mensal
   * 2. Define-se a % de compensação desejada (ex: 100%, 80%)
   * 3. Usa-se o mesmo fluxo do Cenário A
   */
  static cenarioD_ZerarConta(dados: EntradaDados): ResultadoObjetivo {
    const consumoMedio = dados.cliente.consumoMedioMensal;
    const percentualDesejado = dados.cliente.perfilCompensacao;
    
    // Calcular energia necessária para compensar
    const energiaNecessaria = (consumoMedio * percentualDesejado) / 100;
    
    // Usar o fluxo do cenário A
    const dadosModificados: EntradaDados = {
      ...dados,
      cliente: {
        ...dados.cliente,
        objetivoCliente: 'gerar_kwh',
        valorObjetivo: energiaNecessaria
      }
    };
    
    return this.cenarioA_GerarKWh(dadosModificados);
  }
  
  /**
   * Otimizar resultado considerando eficiência técnica e econômica
   */
  static otimizarResultado(
    resultado: ResultadoObjetivo,
    dados: EntradaDados,
    opcoes?: {
      maximizarEficiencia?: boolean;
      minimizarCusto?: boolean;
      limitarPotencia?: number; // kWp
    }
  ): ResultadoObjetivo {
    let resultadoOtimizado = { ...resultado };
    
    if (opcoes?.maximizarEficiencia) {
      // Ajustar para múltiplos de strings otimizadas
      const modulosPorString = this.calcularModulosPorStringOtimo(dados);
      const stringsNecessarias = Math.ceil(resultado.numeroModulos / modulosPorString);
      resultadoOtimizado.numeroModulos = stringsNecessarias * modulosPorString;
      
      // Recalcular com número otimizado
      const calculoOtimizado = CalculoGeracaoModule.calcularGeracao(
        dados, 
        resultadoOtimizado.numeroModulos
      );
      
      resultadoOtimizado.potenciaInstalada = calculoOtimizado.potenciaInstalada;
      resultadoOtimizado.geracaoEstimada = calculoOtimizado.energiaMensalTotal;
      resultadoOtimizado.percentualCompensacao = 
        (calculoOtimizado.energiaMensalTotal / dados.cliente.consumoMedioMensal) * 100;
    }
    
    if (opcoes?.limitarPotencia && resultadoOtimizado.potenciaInstalada > opcoes.limitarPotencia) {
      // Reduzir para o limite de potência
      const numeroModulosLimitado = CalculoGeracaoModule.calcularNumeroModulosParaPotencia(
        opcoes.limitarPotencia,
        dados.equipamentos.modulo.potencia
      );
      
      const calculoLimitado = CalculoGeracaoModule.calcularGeracao(dados, numeroModulosLimitado);
      
      resultadoOtimizado = {
        numeroModulos: numeroModulosLimitado,
        potenciaInstalada: calculoLimitado.potenciaInstalada,
        geracaoEstimada: calculoLimitado.energiaMensalTotal,
        percentualCompensacao: (calculoLimitado.energiaMensalTotal / dados.cliente.consumoMedioMensal) * 100
      };
    }
    
    return resultadoOtimizado;
  }
  
  /**
   * Calcular número ótimo de módulos por string
   */
  static calcularModulosPorStringOtimo(dados: EntradaDados): number {
    const { modulo, inversor } = dados.equipamentos;
    
    // Tensão ótima no MPPT (meio da faixa)
    const tensaoOtima = (inversor.tensaoMpptMin + inversor.tensaoMpptMax) / 2;
    
    // Número de módulos para atingir tensão ótima
    const modulosOtimo = Math.round(tensaoOtima / modulo.tensaoOperacao);
    
    // Verificar limites
    const modulosMin = Math.ceil(inversor.tensaoMpptMin / modulo.tensaoOperacao);
    const modulosMax = Math.floor(inversor.tensaoMpptMax / modulo.tensaoOperacao);
    
    return Math.max(modulosMin, Math.min(modulosOtimo, modulosMax));
  }
  
  /**
   * Gerar opções alternativas para o cliente
   */
  static gerarOpcoes(dados: EntradaDados): ResultadoObjetivo[] {
    const resultadoPrincipal = this.processarObjetivoCliente(dados);
    const opcoes: ResultadoObjetivo[] = [resultadoPrincipal];
    
    // Opção conservadora (90% do principal)
    const dadosConservador = { ...dados };
    dadosConservador.cliente = {
      ...dados.cliente,
      perfilCompensacao: dados.cliente.perfilCompensacao * 0.9
    };
    opcoes.push(this.processarObjetivoCliente(dadosConservador));
    
    // Opção agressiva (110% do principal)
    const dadosAgressivo = { ...dados };
    dadosAgressivo.cliente = {
      ...dados.cliente,
      perfilCompensacao: dados.cliente.perfilCompensacao * 1.1
    };
    opcoes.push(this.processarObjetivoCliente(dadosAgressivo));
    
    return opcoes;
  }
  
  /**
   * Validar resultado do objetivo
   */
  static validarResultado(resultado: ResultadoObjetivo): string[] {
    const erros: string[] = [];
    
    if (resultado.numeroModulos <= 0) {
      erros.push('Número de módulos deve ser maior que zero');
    }
    
    if (resultado.potenciaInstalada <= 0) {
      erros.push('Potência instalada deve ser maior que zero');
    }
    
    if (resultado.geracaoEstimada <= 0) {
      erros.push('Geração estimada deve ser maior que zero');
    }
    
    // Alertas para valores extremos
    if (resultado.percentualCompensacao < 50) {
      erros.push('Sistema pode estar subdimensionado (< 50% de compensação)');
    }
    
    if (resultado.percentualCompensacao > 150) {
      erros.push('Sistema pode estar superdimensionado (> 150% de compensação)');
    }
    
    return erros;
  }
}