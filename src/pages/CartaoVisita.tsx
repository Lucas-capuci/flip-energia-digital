
import React, { useRef } from 'react';
import { Sun, Zap, Home, Network, Phone, Mail, MapPin, Instagram, ExternalLink, Download, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const services = [
  { icon: Sun, title: 'Energia Solar', desc: 'Projetos fotovoltaicos completos para economia e sustentabilidade.' },
  { icon: Zap, title: 'Projetos Elétricos', desc: 'Dimensionamento, laudos e projetos de subestações.' },
  { icon: Network, title: 'Redes de Distribuição', desc: 'Extensão, melhoria e adequação de redes elétricas.' },
  { icon: Home, title: 'Automação', desc: 'Automação residencial e comercial com tecnologia de ponta.' },
];

const CartaoVisita = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleExportPDF = async () => {
    if (!cardRef.current) return;

    const canvas = await html2canvas(cardRef.current, {
      scale: 2,
      backgroundColor: '#0a0a0f',
      useCORS: true,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('FLIP_Energia_Cartao.pdf');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 sm:p-8">
      {/* Export button fixed */}
      <button
        onClick={handleExportPDF}
        className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full glass border border-border hover:border-[#7F00FF]/50 text-foreground text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-[#7F00FF]/20 print:hidden"
      >
        <Download className="h-4 w-4" />
        Exportar PDF
      </button>

      <div ref={cardRef} className="w-full max-w-lg mx-auto">
        {/* Card container */}
        <div className="relative rounded-3xl overflow-hidden border border-border bg-background shadow-2xl shadow-[#7F00FF]/10">
          {/* Background effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#7F00FF]/15 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-[#E100FF]/10 rounded-full blur-3xl" />
            <div className="absolute inset-0 bg-grid-pattern opacity-30" />
          </div>

          <div className="relative z-10">
            {/* Header */}
            <div className="flex flex-col items-center pt-10 pb-6 px-6">
              <div className="w-28 h-28 rounded-2xl glass border border-border flex items-center justify-center mb-5 shadow-lg shadow-[#7F00FF]/10">
                <img
                  src="/lovable-uploads/128626de-5c4d-45a6-a710-143c406139e6.png"
                  alt="FLIP Engenharia"
                  className="h-20 w-auto object-contain"
                />
              </div>
              <h1 className="text-2xl font-bold text-foreground tracking-tight">FLIP Engenharia</h1>
              <p className="text-sm text-muted-foreground mt-1">Soluções Integradas em Energia</p>
              <div className="mt-3 h-0.5 w-16 rounded-full bg-gradient-to-r from-[#7F00FF] to-[#E100FF]" />
            </div>

            {/* Services */}
            <div className="px-6 pb-6">
              <div className="grid grid-cols-2 gap-3">
                {services.map((s) => (
                  <div key={s.title} className="glass rounded-xl p-4 border border-border hover:border-[#7F00FF]/30 transition-all duration-300 group">
                    <s.icon className="h-5 w-5 text-[#7F00FF] mb-2 group-hover:text-[#E100FF] transition-colors" />
                    <h3 className="text-xs font-semibold text-foreground mb-1">{s.title}</h3>
                    <p className="text-[10px] leading-tight text-muted-foreground">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="mx-6 h-px bg-border" />

            {/* Contact info */}
            <div className="px-6 py-5 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <div className="glass p-2 rounded-lg">
                  <Phone className="h-3.5 w-3.5 text-[#7F00FF]" />
                </div>
                <a href="tel:+5562931754984" className="text-muted-foreground hover:text-foreground transition-colors">(62) 93175-4984</a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="glass p-2 rounded-lg">
                  <Mail className="h-3.5 w-3.5 text-[#7F00FF]" />
                </div>
                <a href="mailto:contato@flipeng.com.br" className="text-muted-foreground hover:text-foreground transition-colors">contato@flipeng.com.br</a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="glass p-2 rounded-lg">
                  <MapPin className="h-3.5 w-3.5 text-[#7F00FF]" />
                </div>
                <span className="text-muted-foreground">Goiânia - GO</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="glass p-2 rounded-lg">
                  <Instagram className="h-3.5 w-3.5 text-[#E100FF]" />
                </div>
                <a
                  href="https://www.instagram.com/flip_energy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  @flip_energy
                </a>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="px-6 pb-8 flex flex-col gap-3">
              <a
                href="/"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-[#7F00FF] to-[#E100FF] text-white font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-[#7F00FF]/30 hover:scale-[1.02]"
              >
                <Globe className="h-4 w-4" />
                Conheça nosso site
              </a>
              <a
                href="https://wa.me/5562931754984?text=Olá! Vi o cartão da FLIP e gostaria de saber mais."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl glass border border-border text-foreground font-semibold text-sm transition-all duration-300 hover:border-[#7F00FF]/50 hover:shadow-lg hover:shadow-[#7F00FF]/10"
              >
                <Phone className="h-4 w-4" />
                Fale conosco no WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartaoVisita;
