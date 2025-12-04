import jsPDF from 'jspdf';
import { numberToWords, formatCurrency } from '@/utils/numberToWords';

interface ContractData {
  nome: string;
  cpf: string;
  endereco: string;
  geracao: string;
  valor: number;
  tipodepagamento: string;
  data: string;
}

export async function generateContractPDF(data: ContractData): Promise<void> {
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = 210;
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);
  
  // Load logo
  const logoImg = await loadImage('/images/flip-logo-contract.jpg');
  
  // Colors
  const blueColor: [number, number, number] = [0, 82, 147]; // flip-blue
  const blackColor: [number, number, number] = [0, 0, 0];
  
  // ============ PAGE 1 ============
  let y = 15;
  
  // Logo centered
  if (logoImg) {
    const logoWidth = 40;
    const logoHeight = 20;
    doc.addImage(logoImg, 'JPEG', (pageWidth - logoWidth) / 2, y, logoWidth, logoHeight);
    y += logoHeight + 10;
  }
  
  // Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(...blueColor);
  const title = 'CONTRATO DE PRESTAÇÃO DE SERVIÇOS E FORNECIMENTO DE SISTEMA FOTOVOLTAICO';
  const titleLines = doc.splitTextToSize(title, contentWidth);
  doc.text(titleLines, pageWidth / 2, y, { align: 'center' });
  y += titleLines.length * 6 + 8;
  
  // CONTRATANTE
  doc.setFontSize(11);
  doc.setTextColor(...blueColor);
  doc.text('CONTRATANTE (Cliente):', margin, y);
  y += 7;
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(...blackColor);
  doc.text(`Nome: ${data.nome}`, margin, y);
  y += 5;
  doc.text(`CPF/CNPJ: ${data.cpf}`, margin, y);
  y += 5;
  doc.text(`Endereço: ${data.endereco}`, margin, y);
  y += 10;
  
  // CONTRATADA
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...blueColor);
  doc.text('CONTRATADA (Empresa):', margin, y);
  y += 7;
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(...blackColor);
  doc.text('Nome: FLIP Soluções em energia', margin, y);
  y += 5;
  doc.text('CNPJ: 61.775.834/0001-63', margin, y);
  y += 5;
  doc.text('Endereço: AV pl-3, Parque Lozandes, N° 205', margin, y);
  y += 5;
  doc.text('Representante legal: Lucas Capuci Arroyo Souza', margin, y);
  y += 12;
  
  // CLÁUSULA 1
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...blueColor);
  doc.text('CLÁUSULA 1 – OBJETO', margin, y);
  y += 7;
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(...blackColor);
  const clausula1 = `O presente contrato tem por objeto a venda, elaboração de projeto elétrico, homologação junto à concessionária de energia e instalação de sistema de geração de energia solar fotovoltaica, conforme dimensionamento aprovado pelo CONTRATANTE de ${data.geracao} kwh/mês.`;
  const clausula1Lines = doc.splitTextToSize(clausula1, contentWidth);
  doc.text(clausula1Lines, margin, y);
  y += clausula1Lines.length * 5 + 8;
  
  // CLÁUSULA 2
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...blueColor);
  doc.text('CLÁUSULA 2 – ESCOPO DOS SERVIÇOS', margin, y);
  y += 7;
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(...blackColor);
  doc.text('A CONTRATADA se responsabiliza por:', margin, y);
  y += 6;
  
  const escopoItems = [
    'a) Fornecimento de módulos fotovoltaicos, inversores e demais equipamentos necessários;',
    'b) Elaboração do projeto elétrico e entrada de solicitação de acesso junto à concessionária;',
    'c) Acompanhamento da homologação e emissão de parecer técnico da distribuidora;',
    'd) Execução da instalação do sistema em local indicado pelo CONTRATANTE;',
    'e) Testes, comissionamento e entrega do sistema em pleno funcionamento.'
  ];
  
  escopoItems.forEach(item => {
    const itemLines = doc.splitTextToSize(item, contentWidth - 5);
    doc.text(itemLines, margin + 5, y);
    y += itemLines.length * 5 + 2;
  });
  y += 5;
  
  // CLÁUSULA 3
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...blueColor);
  doc.text('CLÁUSULA 3 – VALOR E FORMA DE PAGAMENTO', margin, y);
  y += 7;
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(...blackColor);
  const valorFormatado = formatCurrency(data.valor);
  const valorExtenso = numberToWords(data.valor);
  const clausula3 = `O valor total do contrato é de R$ ${valorFormatado} (${valorExtenso}).`;
  const clausula3Lines = doc.splitTextToSize(clausula3, contentWidth);
  doc.text(clausula3Lines, margin, y);
  y += clausula3Lines.length * 5 + 4;
  
  doc.text('O pagamento será realizado da seguinte forma:', margin, y);
  y += 5;
  const pagamentoLines = doc.splitTextToSize(data.tipodepagamento + '.', contentWidth);
  doc.text(pagamentoLines, margin, y);
  y += pagamentoLines.length * 5 + 8;
  
  // CLÁUSULA 4
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...blueColor);
  doc.text('CLÁUSULA 4 – GARANTIAS', margin, y);
  y += 7;
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(...blackColor);
  doc.text('a) Os módulos fotovoltaicos possuem garantia especificada pela fábrica.', margin + 5, y);
  y += 5;
  doc.text('b) O inversor possui garantia especificada pela fábrica.', margin + 5, y);
  
  // Footer logo page 1
  if (logoImg) {
    doc.addImage(logoImg, 'JPEG', (pageWidth - 30) / 2, 275, 30, 15);
  }
  
  // ============ PAGE 2 ============
  doc.addPage();
  y = 15;
  
  // Logo
  if (logoImg) {
    doc.addImage(logoImg, 'JPEG', (pageWidth - 40) / 2, y, 40, 20);
    y += 30;
  }
  
  // Continue CLÁUSULA 4
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(...blackColor);
  doc.text('c) A instalação e serviços prestados possuem garantia de 12 meses pela CONTRATADA.', margin + 5, y);
  y += 12;
  
  // CLÁUSULA 5
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...blueColor);
  doc.text('CLÁUSULA 5 – OBRIGAÇÕES DAS PARTES', margin, y);
  y += 8;
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...blueColor);
  doc.text('Da CONTRATADA:', margin, y);
  y += 6;
  
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...blackColor);
  doc.text('• Cumprir as normas técnicas aplicáveis;', margin + 5, y);
  y += 5;
  doc.text('• Entregar o sistema em pleno funcionamento;', margin + 5, y);
  y += 5;
  doc.text('• Fornecer suporte técnico durante o período de garantia.', margin + 5, y);
  y += 8;
  
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...blueColor);
  doc.text('Do CONTRATANTE:', margin, y);
  y += 6;
  
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...blackColor);
  doc.text('• Disponibilizar acesso ao local da instalação;', margin + 5, y);
  y += 5;
  doc.text('• Fornecer documentos solicitados para homologação;', margin + 5, y);
  y += 5;
  doc.text('• Cumprir com os pagamentos nas condições acordadas.', margin + 5, y);
  y += 12;
  
  // CLÁUSULA 6
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...blueColor);
  doc.text('CLÁUSULA 6 – RESCISÃO E MULTAS', margin, y);
  y += 7;
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(...blackColor);
  const clausula6 = 'Em caso de desistência do CONTRATANTE após início do processo de homologação, será cobrada multa de 10% do valor do contrato, referente a custos administrativos, projeto e taxas.';
  const clausula6Lines = doc.splitTextToSize(clausula6, contentWidth);
  doc.text(clausula6Lines, margin, y);
  y += clausula6Lines.length * 5 + 8;
  
  const acordo = 'E por estarem de pleno acordo, assinam as partes o presente contrato em duas vias de igual teor.';
  const acordoLines = doc.splitTextToSize(acordo, contentWidth);
  doc.text(acordoLines, margin, y);
  y += acordoLines.length * 5 + 10;
  
  // City and Date
  doc.text('Cidade: GOIÂNIA - GO', margin, y);
  y += 6;
  doc.text(`Data: ${data.data}`, margin, y);
  y += 15;
  
  // Signatures
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...blueColor);
  doc.text('CONTRATANTE:', margin, y);
  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...blackColor);
  doc.text('Assinatura: _____________________________________', margin, y);
  y += 15;
  
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...blueColor);
  doc.text('CONTRATADA:', margin, y);
  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...blackColor);
  doc.text('Assinatura: _____________________________________', margin, y);
  
  // Footer logo page 2
  if (logoImg) {
    doc.addImage(logoImg, 'JPEG', (pageWidth - 30) / 2, 275, 30, 15);
  }
  
  // Save
  const fileName = `CONTRATO_${data.nome.replace(/\s+/g, '_').toUpperCase()}.pdf`;
  doc.save(fileName);
}

async function loadImage(src: string): Promise<string | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0);
      resolve(canvas.toDataURL('image/jpeg'));
    };
    img.onerror = () => resolve(null);
    img.src = src;
  });
}
