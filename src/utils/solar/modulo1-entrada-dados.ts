// MÓDULO 1 — ENTRADA DE DADOS
// Este módulo recebe e valida todas as informações necessárias

import { EntradaDados, DadosLocal, DadosCliente, DadosEquipamentos } from './types';

export class EntradaDadosModule {
  
  // Validação dos dados do local
  static validarDadosLocal(dados: Partial<DadosLocal>): string[] {
    const erros: string[] = [];
    
    if (!dados.cidade) erros.push('Cidade é obrigatória');
    if (!dados.estado) erros.push('Estado é obrigatório');
    if (!dados.tipoInstalacao) erros.push('Tipo de instalação é obrigatório');
    if (dados.inclinacao === undefined || dados.inclinacao < 0 || dados.inclinacao > 90) {
      erros.push('Inclinação deve estar entre 0° e 90°');
    }
    if (dados.orientacao === undefined || dados.orientacao < 0 || dados.orientacao > 360) {
      erros.push('Orientação (azimute) deve estar entre 0° e 360°');
    }
    if (!dados.irradiacaoMedia || dados.irradiacaoMedia <= 0 || dados.irradiacaoMedia > 8) {
      erros.push('Irradiação média deve estar entre 0 e 8 kWh/m²/dia');
    }
    
    return erros;
  }
  
  // Validação dos dados do cliente
  static validarDadosCliente(dados: Partial<DadosCliente>): string[] {
    const erros: string[] = [];
    
    if (!dados.nome) erros.push('Nome do cliente é obrigatório');
    if (!dados.consumoMedioMensal || dados.consumoMedioMensal <= 0) {
      erros.push('Consumo médio mensal deve ser maior que zero');
    }
    if (!dados.tipoCliente) erros.push('Tipo de cliente é obrigatório');
    if (!dados.objetivoCliente) erros.push('Objetivo do cliente é obrigatório');
    if (!dados.perfilCompensacao || dados.perfilCompensacao <= 0) {
      erros.push('Perfil de compensação deve ser maior que zero');
    }
    
    // Validações específicas por objetivo
    if (dados.objetivoCliente === 'gerar_kwh' && (!dados.valorObjetivo || dados.valorObjetivo <= 0)) {
      erros.push('Valor de kWh desejado deve ser informado');
    }
    if (dados.objetivoCliente === 'definir_potencia' && (!dados.valorObjetivo || dados.valorObjetivo <= 0)) {
      erros.push('Potência desejada (kWp) deve ser informada');
    }
    if (dados.objetivoCliente === 'usar_modulos' && (!dados.valorObjetivo || dados.valorObjetivo <= 0)) {
      erros.push('Número de módulos deve ser informado');
    }
    
    return erros;
  }
  
  // Validação dos dados dos equipamentos
  static validarDadosEquipamentos(dados: Partial<DadosEquipamentos>): string[] {
    const erros: string[] = [];
    
    // Validação do módulo
    if (!dados.modulo) {
      erros.push('Dados do módulo são obrigatórios');
    } else {
      if (!dados.modulo.marca) erros.push('Marca do módulo é obrigatória');
      if (!dados.modulo.potencia || dados.modulo.potencia <= 0) {
        erros.push('Potência do módulo deve ser maior que zero');
      }
      if (!dados.modulo.tensaoOperacao || dados.modulo.tensaoOperacao <= 0) {
        erros.push('Tensão de operação (Vmp) deve ser maior que zero');
      }
      if (!dados.modulo.tensaoCircuitoAberto || dados.modulo.tensaoCircuitoAberto <= 0) {
        erros.push('Tensão de circuito aberto (Voc) deve ser maior que zero');
      }
      if (!dados.modulo.dimensoes || !dados.modulo.dimensoes.area || dados.modulo.dimensoes.area <= 0) {
        erros.push('Área do módulo deve ser informada');
      }
    }
    
    // Validação do inversor
    if (!dados.inversor) {
      erros.push('Dados do inversor são obrigatórios');
    } else {
      if (!dados.inversor.marca) erros.push('Marca do inversor é obrigatória');
      if (!dados.inversor.potenciaNominal || dados.inversor.potenciaNominal <= 0) {
        erros.push('Potência nominal do inversor deve ser maior que zero');
      }
      if (!dados.inversor.tensaoMpptMin || dados.inversor.tensaoMpptMin <= 0) {
        erros.push('Tensão MPPT mínima deve ser maior que zero');
      }
      if (!dados.inversor.tensaoMpptMax || dados.inversor.tensaoMpptMax <= dados.inversor.tensaoMpptMin) {
        erros.push('Tensão MPPT máxima deve ser maior que a mínima');
      }
    }
    
    // Validação de eficiências
    if (!dados.eficienciaSystem || dados.eficienciaSystem <= 0 || dados.eficienciaSystem > 1) {
      erros.push('Eficiência do sistema deve estar entre 0 e 1');
    }
    if (!dados.fatorPerdas || dados.fatorPerdas <= 0 || dados.fatorPerdas > 1) {
      erros.push('Fator de perdas deve estar entre 0 e 1');
    }
    
    return erros;
  }
  
  // Método principal de validação
  static validarEntradaCompleta(dados: Partial<EntradaDados>): string[] {
    const erros: string[] = [];
    
    if (!dados.local) {
      erros.push('Dados do local são obrigatórios');
    } else {
      erros.push(...this.validarDadosLocal(dados.local));
    }
    
    if (!dados.cliente) {
      erros.push('Dados do cliente são obrigatórios');
    } else {
      erros.push(...this.validarDadosCliente(dados.cliente));
    }
    
    if (!dados.equipamentos) {
      erros.push('Dados dos equipamentos são obrigatórios');
    } else {
      erros.push(...this.validarDadosEquipamentos(dados.equipamentos));
    }
    
    return erros;
  }
  
  // Criar dados padrão para facilitar testes
  static criarDadosPadrao(): EntradaDados {
    return {
      local: {
        cidade: 'São Paulo',
        estado: 'SP',
        tipoInstalacao: 'telhado',
        inclinacao: 23,
        orientacao: 180, // Sul
        irradiacaoMedia: 4.5
      },
      cliente: {
        nome: '',
        consumoMedioMensal: 500,
        tipoCliente: 'residencial',
        perfilCompensacao: 100,
        objetivoCliente: 'zerar_conta'
      },
      equipamentos: {
        modulo: {
          marca: 'Canadian Solar',
          potencia: 550,
          tensaoOperacao: 41.7,
          tensaoCircuitoAberto: 49.9,
          correnteOperacao: 13.2,
          correnteCurtoCircuito: 13.9,
          dimensoes: {
            largura: 1.134,
            altura: 2.279,
            area: 2.58
          }
        },
        inversor: {
          marca: 'Growatt',
          potenciaNominal: 6000,
          tensaoMpptMin: 80,
          tensaoMpptMax: 550,
          tensaoMaxEntrada: 600,
          correnteMaxEntrada: 16,
          numeroMppt: 2
        },
        eficienciaSystem: 0.80,
        fatorPerdas: 0.85
      }
    };
  }
  
  // Obter irradiação por região (simplificado)
  static obterIrradiacaoPorRegiao(estado: string): number {
    const irradiacaoPorEstado: { [key: string]: number } = {
      'AC': 4.2, 'AL': 5.1, 'AP': 4.8, 'AM': 4.3, 'BA': 5.5,
      'CE': 5.7, 'DF': 5.2, 'ES': 4.8, 'GO': 5.3, 'MA': 5.2,
      'MT': 5.4, 'MS': 5.1, 'MG': 5.0, 'PA': 4.6, 'PB': 5.6,
      'PR': 4.4, 'PE': 5.5, 'PI': 5.4, 'RJ': 4.7, 'RN': 5.8,
      'RS': 4.2, 'RO': 4.5, 'RR': 4.9, 'SC': 4.1, 'SP': 4.5,
      'SE': 5.3, 'TO': 5.1
    };
    
    return irradiacaoPorEstado[estado] || 4.5;
  }
}