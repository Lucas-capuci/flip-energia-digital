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
  const pageHeight = 297;
  const marginLeft = 25;
  const marginRight = 25;
  const contentWidth = pageWidth - marginLeft - marginRight;
  const footerY = pageHeight - 15;
  const maxContentY = footerY - 20; // Área máxima de conteúdo antes do footer
  
  // Load logo
  const logoImg = await loadImage('/images/flip-logo-contract.png');
  
  // Colors - #490780 converted to RGB
  const primaryPurple: [number, number, number] = [73, 7, 128];
  const darkGray: [number, number, number] = [51, 51, 51];
  const mediumGray: [number, number, number] = [102, 102, 102];
  const lightGray: [number, number, number] = [200, 200, 200];
  
  // ============ PAGE 1 ============
  let y = 15;
  
  // Header with logo - properly sized maintaining aspect ratio
  if (logoImg) {
    const logoHeight = 22;
    const logoWidth = 22;
    doc.addImage(logoImg, 'PNG', (pageWidth - logoWidth) / 2, y, logoWidth, logoHeight);
    y += logoHeight + 8;
  }
  
  // Decorative line under logo
  doc.setDrawColor(...primaryPurple);
  doc.setLineWidth(0.5);
  doc.line(marginLeft, y, pageWidth - marginRight, y);
  y += 10;
  
  // Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(...primaryPurple);
  const title = 'CONTRATO DE PRESTAÇÃO DE SERVIÇOS E FORNECIMENTO DE SISTEMA FOTOVOLTAICO';
  const titleLines = doc.splitTextToSize(title, contentWidth);
  doc.text(titleLines, pageWidth / 2, y, { align: 'center' });
  y += titleLines.length * 5 + 10;
  
  // CONTRATANTE Section
  drawSectionHeader(doc, 'CONTRATANTE (Cliente)', marginLeft, y, contentWidth, primaryPurple);
  y += 10;
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...darkGray);
  
  y = drawLabelValue(doc, 'Nome:', data.nome, marginLeft, y, contentWidth);
  y = drawLabelValue(doc, 'CPF/CNPJ:', data.cpf, marginLeft, y, contentWidth);
  y = drawLabelValue(doc, 'Endereço:', data.endereco, marginLeft, y, contentWidth);
  y += 6;
  
  // CONTRATADA Section
  drawSectionHeader(doc, 'CONTRATADA (Empresa)', marginLeft, y, contentWidth, primaryPurple);
  y += 10;
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...darkGray);
  
  y = drawLabelValue(doc, 'Nome:', 'FLIP Soluções em energia', marginLeft, y, contentWidth);
  y = drawLabelValue(doc, 'CNPJ:', '61.775.834/0001-63', marginLeft, y, contentWidth);
  y = drawLabelValue(doc, 'Endereço:', 'AV pl-3, Parque Lozandes, N° 205', marginLeft, y, contentWidth);
  y = drawLabelValue(doc, 'Representante legal:', 'Lucas Capuci Arroyo Souza', marginLeft, y, contentWidth);
  y += 8;
  
  // CLÁUSULA 1
  y = drawClauseHeader(doc, 'CLÁUSULA 1 – OBJETO', marginLeft, y, primaryPurple);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...darkGray);
  const clausula1 = `O presente contrato tem por objeto a venda, elaboração de projeto elétrico, homologação junto à concessionária de energia e instalação de sistema de geração de energia solar fotovoltaica, conforme dimensionamento aprovado pelo CONTRATANTE de ${data.geracao} kwh/mês.`;
  const clausula1Lines = doc.splitTextToSize(clausula1, contentWidth);
  doc.text(clausula1Lines, marginLeft, y);
  y += clausula1Lines.length * 4 + 8;
  
  // CLÁUSULA 2
  y = drawClauseHeader(doc, 'CLÁUSULA 2 – ESCOPO DOS SERVIÇOS', marginLeft, y, primaryPurple);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...darkGray);
  doc.text('A CONTRATADA se responsabiliza por:', marginLeft, y);
  y += 5;
  
  const escopoItems = [
    'a) Fornecimento de módulos fotovoltaicos, inversores e demais equipamentos necessários;',
    'b) Elaboração do projeto elétrico e entrada de solicitação de acesso junto à concessionária;',
    'c) Acompanhamento da homologação e emissão de parecer técnico da distribuidora;',
    'd) Execução da instalação do sistema em local indicado pelo CONTRATANTE;',
    'e) Testes, comissionamento e entrega do sistema em pleno funcionamento.'
  ];
  
  escopoItems.forEach(item => {
    const itemLines = doc.splitTextToSize(item, contentWidth - 6);
    doc.text(itemLines, marginLeft + 6, y);
    y += itemLines.length * 4 + 1;
  });
  y += 6;
  
  // CLÁUSULA 3
  y = drawClauseHeader(doc, 'CLÁUSULA 3 – VALOR E FORMA DE PAGAMENTO', marginLeft, y, primaryPurple);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...darkGray);
  const valorFormatado = formatCurrency(data.valor);
  const valorExtenso = numberToWords(data.valor);
  const clausula3 = `O valor total do contrato é de R$ ${valorFormatado} (${valorExtenso}).`;
  const clausula3Lines = doc.splitTextToSize(clausula3, contentWidth);
  doc.text(clausula3Lines, marginLeft, y);
  y += clausula3Lines.length * 4 + 4;
  
  doc.text('O pagamento será realizado da seguinte forma:', marginLeft, y);
  y += 5;
  const pagamentoLines = doc.splitTextToSize(data.tipodepagamento + '.', contentWidth);
  doc.text(pagamentoLines, marginLeft, y);
  y += pagamentoLines.length * 4 + 8;
  
  // CLÁUSULA 4
  y = drawClauseHeader(doc, 'CLÁUSULA 4 – GARANTIAS', marginLeft, y, primaryPurple);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...darkGray);
  doc.text('a) Os módulos fotovoltaicos possuem garantia especificada pela fábrica.', marginLeft + 6, y);
  y += 5;
  doc.text('b) O inversor possui garantia especificada pela fábrica.', marginLeft + 6, y);
  
  // Footer page 1
  drawFooter(doc, logoImg, pageWidth, footerY, marginLeft, marginRight, lightGray);
  
  // ============ PAGE 2 ============
  doc.addPage();
  y = 15;
  
  // Header with logo - same size as page 1
  if (logoImg) {
    const logoHeight = 22;
    const logoWidth = 22;
    doc.addImage(logoImg, 'PNG', (pageWidth - logoWidth) / 2, y, logoWidth, logoHeight);
    y += logoHeight + 6;
  }
  
  // Decorative line
  doc.setDrawColor(...primaryPurple);
  doc.setLineWidth(0.5);
  doc.line(marginLeft, y, pageWidth - marginRight, y);
  y += 10;
  
  // Continue CLÁUSULA 4
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...darkGray);
  doc.text('c) A instalação e serviços prestados possuem garantia de 12 meses pela CONTRATADA.', marginLeft + 6, y);
  y += 10;
  
  // CLÁUSULA 5
  y = drawClauseHeader(doc, 'CLÁUSULA 5 – OBRIGAÇÕES DAS PARTES', marginLeft, y, primaryPurple);
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...primaryPurple);
  doc.text('Da CONTRATADA:', marginLeft, y);
  y += 5;
  
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...darkGray);
  const contratadaObrigacoes = [
    '• Cumprir as normas técnicas aplicáveis;',
    '• Entregar o sistema em pleno funcionamento;',
    '• Fornecer suporte técnico durante o período de garantia.'
  ];
  contratadaObrigacoes.forEach(item => {
    doc.text(item, marginLeft + 6, y);
    y += 5;
  });
  y += 4;
  
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...primaryPurple);
  doc.text('Do CONTRATANTE:', marginLeft, y);
  y += 5;
  
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...darkGray);
  const contratanteObrigacoes = [
    '• Disponibilizar acesso ao local da instalação;',
    '• Fornecer documentos solicitados para homologação;',
    '• Cumprir com os pagamentos nas condições acordadas.'
  ];
  contratanteObrigacoes.forEach(item => {
    doc.text(item, marginLeft + 6, y);
    y += 5;
  });
  y += 8;
  
  // CLÁUSULA 6
  y = drawClauseHeader(doc, 'CLÁUSULA 6 – RESCISÃO E MULTAS', marginLeft, y, primaryPurple);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...darkGray);
  const clausula6 = 'Em caso de desistência do CONTRATANTE após início do processo de homologação, será cobrada multa de 10% do valor do contrato, referente a custos administrativos, projeto e taxas.';
  const clausula6Lines = doc.splitTextToSize(clausula6, contentWidth);
  doc.text(clausula6Lines, marginLeft, y);
  y += clausula6Lines.length * 4 + 8;
  
  // Agreement text
  doc.setFont('helvetica', 'italic');
  const acordo = 'E por estarem de pleno acordo, assinam as partes o presente contrato em duas vias de igual teor.';
  const acordoLines = doc.splitTextToSize(acordo, contentWidth);
  doc.text(acordoLines, marginLeft, y);
  y += acordoLines.length * 4 + 12;
  
  // City and Date - centered
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...darkGray);
  doc.text(`Cidade: GOIÂNIA - GO`, pageWidth / 2, y, { align: 'center' });
  y += 5;
  doc.text(`Data: ${data.data}`, pageWidth / 2, y, { align: 'center' });
  y += 15;
  
  // Signatures - side by side
  const signatureWidth = (contentWidth - 30) / 2;
  const leftSignX = marginLeft;
  const rightSignX = marginLeft + signatureWidth + 30;
  
  // CONTRATANTE signature
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...primaryPurple);
  doc.text('CONTRATANTE:', leftSignX, y);
  y += 18;
  
  doc.setDrawColor(...darkGray);
  doc.setLineWidth(0.3);
  doc.line(leftSignX, y, leftSignX + signatureWidth, y);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...mediumGray);
  doc.text('Assinatura', leftSignX + signatureWidth / 2, y + 4, { align: 'center' });
  
  // CONTRATADA signature
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...primaryPurple);
  doc.text('CONTRATADA:', rightSignX, y - 18);
  
  doc.setDrawColor(...darkGray);
  doc.line(rightSignX, y, rightSignX + signatureWidth, y);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...mediumGray);
  doc.text('Assinatura', rightSignX + signatureWidth / 2, y + 4, { align: 'center' });
  
  // Footer page 2
  drawFooter(doc, logoImg, pageWidth, footerY, marginLeft, marginRight, lightGray);
  
  // Save
  const fileName = `CONTRATO_${data.nome.replace(/\s+/g, '_').toUpperCase()}.pdf`;
  doc.save(fileName);
}

function drawSectionHeader(
  doc: jsPDF, 
  text: string, 
  x: number, 
  y: number, 
  width: number,
  color: [number, number, number]
): void {
  doc.setFillColor(...color);
  doc.rect(x, y - 4, width, 7, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text(text, x + 3, y + 1);
}

function drawClauseHeader(
  doc: jsPDF, 
  text: string, 
  x: number, 
  y: number,
  color: [number, number, number]
): number {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...color);
  doc.text(text, x, y);
  // Linha decorativa abaixo do título
  doc.setDrawColor(...color);
  doc.setLineWidth(0.3);
  const textWidth = doc.getTextWidth(text);
  doc.line(x, y + 1, x + textWidth, y + 1);
  return y + 7;
}

function drawLabelValue(
  doc: jsPDF,
  label: string,
  value: string,
  x: number,
  y: number,
  maxWidth: number
): number {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text(label, x, y);
  
  const labelWidth = doc.getTextWidth(label) + 2;
  doc.setFont('helvetica', 'normal');
  
  const valueLines = doc.splitTextToSize(value, maxWidth - labelWidth - 5);
  doc.text(valueLines, x + labelWidth, y);
  
  return y + (valueLines.length * 4) + 2;
}

function drawFooter(
  doc: jsPDF,
  logoImg: string | null,
  pageWidth: number,
  footerY: number,
  marginLeft: number,
  marginRight: number,
  lineColor: [number, number, number]
): void {
  // Line above footer
  doc.setDrawColor(...lineColor);
  doc.setLineWidth(0.3);
  doc.line(marginLeft, footerY - 8, pageWidth - marginRight, footerY - 8);
  
  // Small logo in footer - maintaining aspect ratio
  if (logoImg) {
    const footerLogoSize = 10;
    doc.addImage(logoImg, 'PNG', (pageWidth - footerLogoSize) / 2, footerY - 6, footerLogoSize, footerLogoSize);
  }
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
      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = () => resolve(null);
    img.src = src;
  });
}
