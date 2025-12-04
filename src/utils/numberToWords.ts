const unidades = ['', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove'];
const especiais = ['dez', 'onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove'];
const dezenas = ['', '', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'];
const centenas = ['', 'cento', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos', 'seiscentos', 'setecentos', 'oitocentos', 'novecentos'];

function converterGrupo(n: number): string {
  if (n === 0) return '';
  if (n === 100) return 'cem';
  
  let resultado = '';
  
  const c = Math.floor(n / 100);
  const resto = n % 100;
  
  if (c > 0) {
    resultado += centenas[c];
    if (resto > 0) resultado += ' e ';
  }
  
  if (resto >= 10 && resto <= 19) {
    resultado += especiais[resto - 10];
  } else {
    const d = Math.floor(resto / 10);
    const u = resto % 10;
    
    if (d > 0) {
      resultado += dezenas[d];
      if (u > 0) resultado += ' e ';
    }
    
    if (u > 0) {
      resultado += unidades[u];
    }
  }
  
  return resultado;
}

export function numberToWords(valor: number): string {
  if (valor === 0) return 'zero reais';
  if (valor === 1) return 'um real';
  
  const inteiro = Math.floor(valor);
  const centavos = Math.round((valor - inteiro) * 100);
  
  let resultado = '';
  
  // Milhões
  const milhoes = Math.floor(inteiro / 1000000);
  const resto1 = inteiro % 1000000;
  
  // Milhares
  const milhares = Math.floor(resto1 / 1000);
  const resto2 = resto1 % 1000;
  
  // Centenas
  const centenasFinal = resto2;
  
  if (milhoes > 0) {
    resultado += converterGrupo(milhoes);
    resultado += milhoes === 1 ? ' milhão' : ' milhões';
    if (milhares > 0 || centenasFinal > 0) {
      if (milhares === 0 && centenasFinal > 0 && centenasFinal < 100) {
        resultado += ' e ';
      } else {
        resultado += ', ';
      }
    }
  }
  
  if (milhares > 0) {
    if (milhares === 1) {
      resultado += 'mil';
    } else {
      resultado += converterGrupo(milhares) + ' mil';
    }
    if (centenasFinal > 0) {
      if (centenasFinal < 100) {
        resultado += ' e ';
      } else {
        resultado += ', ';
      }
    }
  }
  
  if (centenasFinal > 0) {
    resultado += converterGrupo(centenasFinal);
  }
  
  resultado += inteiro === 1 ? ' real' : ' reais';
  
  if (centavos > 0) {
    resultado += ' e ' + converterGrupo(centavos);
    resultado += centavos === 1 ? ' centavo' : ' centavos';
  }
  
  return resultado.toUpperCase();
}

export function formatCurrency(valor: number): string {
  return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function formatCPF(cpf: string): string {
  const numbers = cpf.replace(/\D/g, '');
  if (numbers.length <= 11) {
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
  return numbers.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
}
