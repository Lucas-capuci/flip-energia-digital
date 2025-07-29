// Tipos e interfaces para o sistema modular de propostas solares

// MÓDULO 1 - Entrada de Dados
export interface DadosLocal {
  cidade: string;
  estado: string;
  coordenadas?: {
    latitude: number;
    longitude: number;
  };
  tipoInstalacao: 'telhado' | 'solo' | 'carport';
  inclinacao: number;
  orientacao: number; // azimute
  irradiacaoMedia: number; // kWh/m²/dia
}

export interface DadosCliente {
  nome: string;
  consumoMedioMensal: number; // kWh
  tipoCliente: 'residencial' | 'rural' | 'industrial' | 'comercial';
  perfilCompensacao: number; // percentual (ex: 100, 80, 120)
  objetivoCliente: 'gerar_kwh' | 'definir_potencia' | 'usar_modulos' | 'zerar_conta';
  valorObjetivo?: number; // kWh, kWp ou número de módulos
}

export interface DadosEquipamentos {
  modulo: {
    marca: string;
    potencia: number; // W
    tensaoOperacao: number; // Vmp
    tensaoCircuitoAberto: number; // Voc
    correnteOperacao: number; // Imp
    correnteCurtoCircuito: number; // Isc
    dimensoes: {
      largura: number; // metros
      altura: number; // metros
      area: number; // m²
    };
  };
  inversor: {
    marca: string;
    potenciaNominal: number; // W
    tensaoMpptMin: number; // V
    tensaoMpptMax: number; // V
    tensaoMaxEntrada: number; // V
    correnteMaxEntrada: number; // A
    numeroMppt: number;
  };
  eficienciaSystem: number; // Performance Ratio (0.75-0.85)
  fatorPerdas: number; // 0.80-0.95
}

export interface EntradaDados {
  local: DadosLocal;
  cliente: DadosCliente;
  equipamentos: DadosEquipamentos;
}

// MÓDULO 2 - Geração de Energia
export interface CalculoGeracao {
  energiaMensalPorModulo: number; // kWh
  energiaMensalTotal: number; // kWh
  energiaAnualTotal: number; // kWh
  numeroModulos: number;
  potenciaInstalada: number; // kWp
}

// MÓDULO 3 - Fluxos por Objetivo
export interface ResultadoObjetivo {
  numeroModulos: number;
  potenciaInstalada: number; // kWp
  geracaoEstimada: number; // kWh/mês
  percentualCompensacao: number;
}

// MÓDULO 4 - Compatibilidade Técnica
export interface VerificacaoTecnica {
  inversor: {
    compativel: boolean;
    razaoPotencia: number; // Pmodulos/Pinversor
    observacoes: string[];
  };
  strings: {
    modulosPorString: number;
    numeroStrings: number;
    tensaoString: number;
    correnteString: number;
    compativel: boolean;
    observacoes: string[];
  };
  area: {
    areaOcupada: number; // m²
    fatorCompactacao: number;
    observacoes: string[];
  };
}

// MÓDULO 5 - Cálculos Adicionais
export interface CalculosAdicionais {
  geracaoAnual: number; // kWh
  economiaMensal: number; // R$
  economiaAnual: number; // R$
  payback: number; // anos
  reducaoCO2: number; // tCO₂/ano
  valorInvestimento: number; // R$
  custoPorWp: number; // R$/Wp
}

// MÓDULO 6 - Relatório Final
export interface RelatorioTecnicoComercial {
  dadosCliente: DadosCliente;
  dadosInstalacao: DadosLocal;
  resumoTecnico: {
    potenciaInstalada: number;
    numeroModulos: number;
    numeroInversores: number;
    areaOcupada: number;
  };
  projecaoEnergetica: {
    geracaoMensal: number;
    geracaoAnual: number;
    percentualCompensacao: number;
  };
  analiseFinanceira: CalculosAdicionais;
  verificacaoTecnica: VerificacaoTecnica;
  observacoes: string[];
  recomendacoes: string[];
}

// Resultado completo do sistema
export interface ResultadoCompleto {
  entradaDados: EntradaDados;
  calculoGeracao: CalculoGeracao;
  resultadoObjetivo: ResultadoObjetivo;
  verificacaoTecnica: VerificacaoTecnica;
  calculosAdicionais: CalculosAdicionais;
  relatorioFinal: RelatorioTecnicoComercial;
  valido: boolean;
  erros: string[];
}