import React from 'react';
import { MapPin, Phone, Mail, Instagram, Facebook, Linkedin, ArrowRight, Zap, Home, Network } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contato" className="relative bg-background overflow-hidden border-t border-border">
      {/* Background orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-[#7F00FF]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 right-32 w-24 h-24 bg-[#E100FF]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="space-y-4">
              <img
                src="/lovable-uploads/128626de-5c4d-45a6-a710-143c406139e6.png"
                alt="FLIP Engenharia"
                className="h-16 w-auto drop-shadow-md"
              />
              <p className="text-muted-foreground leading-relaxed text-sm">
                Soluções integradas em energia solar, automação residencial e redes de distribuição com tecnologia de ponta.
              </p>
            </div>
            
            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com/flip_energy/profilecard/?igsh=MTE0Z3ZzeWM5aWxhOA%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="group glass p-3 rounded-full hover:bg-[#E100FF]/20 hover:border-[#E100FF]/30 transition-all duration-300"
              >
                <Instagram className="h-5 w-5 text-muted-foreground group-hover:text-[#E100FF] transition-colors" />
              </a>
              <a 
                href="#" 
                className="group glass p-3 rounded-full hover:bg-[#7F00FF]/20 hover:border-[#7F00FF]/30 transition-all duration-300"
              >
                <Facebook className="h-5 w-5 text-muted-foreground group-hover:text-[#7F00FF] transition-colors" />
              </a>
              <a 
                href="#" 
                className="group glass p-3 rounded-full hover:bg-[#7F00FF]/20 hover:border-[#7F00FF]/30 transition-all duration-300"
              >
                <Linkedin className="h-5 w-5 text-muted-foreground group-hover:text-[#7F00FF] transition-colors" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            <h3 className="text-xl font-bold text-foreground mb-6 relative">
              Contato
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-[#7F00FF] to-[#E100FF] rounded-full"></div>
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start group">
                <div className="glass p-2 rounded-lg mr-4 group-hover:bg-[#E100FF]/20 transition-colors">
                  <MapPin className="h-4 w-4 text-muted-foreground group-hover:text-[#E100FF]" />
                </div>
                <span className="text-muted-foreground group-hover:text-foreground transition-colors">Goiânia-GO</span>
              </div>
              
              <div className="flex items-start group">
                <div className="glass p-2 rounded-lg mr-4 group-hover:bg-[#E100FF]/20 transition-colors">
                  <Phone className="h-4 w-4 text-muted-foreground group-hover:text-[#E100FF]" />
                </div>
                <a href="tel:+5562931754984" className="text-muted-foreground hover:text-foreground transition-colors">
                  (62) 93175-4984
                </a>
              </div>
            </div>

            <div className="space-y-3">
              <div className="glass-card p-4 group">
                <div className="flex items-start">
                  <Mail className="h-4 w-4 mr-3 text-[#E100FF] mt-1 flex-shrink-0" />
                  <div className="space-y-1 min-w-0 flex-1">
                    <a href="mailto:lucas.capuci@flipeng.com.br" className="text-[#E100FF]/80 hover:text-[#E100FF] text-sm font-medium block transition-colors break-all">
                      lucas.capuci@flipeng.com.br
                    </a>
                    <p className="text-muted-foreground text-xs">Redes de distribuição</p>
                  </div>
                </div>
              </div>
              
              <div className="glass-card p-4 group">
                <div className="flex items-start">
                  <Mail className="h-4 w-4 mr-3 text-[#E100FF] mt-1 flex-shrink-0" />
                  <div className="space-y-1 min-w-0 flex-1">
                    <a href="mailto:joao.pedro@flipeng.br" className="text-[#E100FF]/80 hover:text-[#E100FF] text-sm font-medium block transition-colors break-all">
                      joao.pedro@flipeng.br
                    </a>
                    <p className="text-muted-foreground text-xs">Energia solar</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-1 space-y-6">
            <h3 className="text-xl font-bold text-foreground mb-6 relative">
              Serviços
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-[#7F00FF] to-[#E100FF] rounded-full"></div>
            </h3>
            
            <div className="space-y-3">
              <a 
                href="/solucoes"
                className="group flex items-center p-3 rounded-lg hover:bg-[#E100FF]/10 transition-all duration-300 w-full text-left"
              >
                <Home className="h-5 w-5 text-[#E100FF] mr-3 group-hover:text-[#E100FF]" />
                <span className="text-muted-foreground group-hover:text-foreground transition-colors">Automação Residencial</span>
                <ArrowRight className="h-4 w-4 ml-auto text-muted-foreground group-hover:text-[#E100FF] opacity-0 group-hover:opacity-100 transition-all" />
              </a>
              
              <a 
                href="/redes-distribuicao"
                className="group flex items-center p-3 rounded-lg hover:bg-[#E100FF]/10 transition-all duration-300 w-full text-left"
              >
                <Network className="h-5 w-5 text-[#E100FF] mr-3 group-hover:text-[#E100FF]" />
                <span className="text-muted-foreground group-hover:text-foreground transition-colors">Redes de Distribuição</span>
                <ArrowRight className="h-4 w-4 ml-auto text-muted-foreground group-hover:text-[#E100FF] opacity-0 group-hover:opacity-100 transition-all" />
              </a>
              
              <a 
                href="/seja-parceiro"
                className="group flex items-center p-3 rounded-lg hover:bg-[#E100FF]/10 transition-all duration-300 border border-[#E100FF]/20 w-full text-left"
              >
                <div className="h-5 w-5 bg-gradient-to-br from-[#7F00FF] to-[#E100FF] rounded mr-3 flex items-center justify-center">
                  <span className="text-xs font-bold text-white">%</span>
                </div>
                <span className="text-muted-foreground group-hover:text-foreground transition-colors">Seja um Parceiro Flip</span>
                <ArrowRight className="h-4 w-4 ml-auto text-muted-foreground group-hover:text-[#E100FF] opacity-0 group-hover:opacity-100 transition-all" />
              </a>
            </div>
          </div>

          {/* CTA Section */}
          <div className="lg:col-span-1 space-y-6">
            <h3 className="text-xl font-bold text-foreground mb-6 relative">
              Comece Agora
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-[#7F00FF] to-[#E100FF] rounded-full"></div>
            </h3>
            
            <div className="glass-card p-6">
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                Transforme sua energia com nossas soluções sustentáveis e tecnológicas.
              </p>
              
              <a 
                href="/solar"
                className="inline-flex items-center btn-glow text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 group w-full justify-center"
              >
                Calcular Economia
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-sm">
              &copy; 2024 FLIP Engenharia. Todos os direitos reservados.
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Política de Privacidade</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Termos de Uso</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
