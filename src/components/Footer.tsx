
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
    <footer id="contato" className="relative bg-gradient-to-br from-flip-gray-900 via-flip-gray-800 to-flip-blue-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 border border-white rounded-full"></div>
        <div className="absolute bottom-32 right-32 w-24 h-24 border border-white rounded-full"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 border border-white rounded-full"></div>
      </div>

      <div className="relative w-full max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="space-y-4">
              <img
                src="/lovable-uploads/991c4431-4337-4433-bb3e-106163a18763.png"
                alt="FLIP Engenharia"
                className="h-16 w-auto drop-shadow-md"
              />
              <p className="text-flip-gray-300 leading-relaxed text-sm">
                Soluções integradas em energia solar, automação residencial e redes de distribuição privadas com tecnologia de ponta.
              </p>
            </div>
            
            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com/flip_energy/profilecard/?igsh=MTE0Z3ZzeWM5aWxhOA%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-flip-blue-600/20 p-3 rounded-full border border-flip-blue-400/30 hover:bg-flip-red-500 hover:border-flip-red-400 transition-all duration-300"
              >
                <Instagram className="h-5 w-5 text-flip-blue-300 group-hover:text-white transition-colors" />
              </a>
              <a 
                href="#" 
                className="group bg-flip-blue-600/20 p-3 rounded-full border border-flip-blue-400/30 hover:bg-flip-blue-500 hover:border-flip-blue-400 transition-all duration-300"
              >
                <Facebook className="h-5 w-5 text-flip-blue-300 group-hover:text-white transition-colors" />
              </a>
              <a 
                href="#" 
                className="group bg-flip-blue-600/20 p-3 rounded-full border border-flip-blue-400/30 hover:bg-flip-blue-500 hover:border-flip-blue-400 transition-all duration-300"
              >
                <Linkedin className="h-5 w-5 text-flip-blue-300 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            <h3 className="text-xl font-bold text-white mb-6 relative">
              Contato
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-flip-red-400 to-flip-red-600 rounded-full"></div>
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start group">
                <div className="bg-flip-blue-600/20 p-2 rounded-lg mr-4 group-hover:bg-flip-red-500 transition-colors">
                  <MapPin className="h-4 w-4 text-flip-blue-400 group-hover:text-white" />
                </div>
                <span className="text-flip-gray-300 group-hover:text-white transition-colors">Goiânia-GO</span>
              </div>
              
              <div className="flex items-start group">
                <div className="bg-flip-blue-600/20 p-2 rounded-lg mr-4 group-hover:bg-flip-red-500 transition-colors">
                  <Phone className="h-4 w-4 text-flip-blue-400 group-hover:text-white" />
                </div>
                <a href="tel:+5562984496914" className="text-flip-gray-300 hover:text-white transition-colors">
                  (62) 98449-6914
                </a>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-flip-gray-800/50 p-4 rounded-lg border border-flip-gray-700/50 hover:border-flip-red-400/50 transition-colors group">
                <div className="flex items-start">
                  <Mail className="h-4 w-4 mr-3 text-flip-red-400 mt-1 flex-shrink-0" />
                  <div className="space-y-1">
                    <a href="mailto:lucas.capuci@flipeng.com.br" className="text-flip-blue-300 hover:text-flip-blue-200 text-sm font-medium block transition-colors">
                      lucas.capuci@flipeng.com.br
                    </a>
                    <p className="text-flip-gray-400 text-xs">Redes de distribuição</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-flip-gray-800/50 p-4 rounded-lg border border-flip-gray-700/50 hover:border-flip-red-400/50 transition-colors group">
                <div className="flex items-start">
                  <Mail className="h-4 w-4 mr-3 text-flip-red-400 mt-1 flex-shrink-0" />
                  <div className="space-y-1">
                    <a href="mailto:eduardo.gomes@flipeng.com.br" className="text-flip-blue-300 hover:text-flip-blue-200 text-sm font-medium block transition-colors">
                      eduardo.gomes@flipeng.com.br
                    </a>
                    <p className="text-flip-gray-400 text-xs">Projetos Residencial</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-flip-gray-800/50 p-4 rounded-lg border border-flip-gray-700/50 hover:border-flip-red-400/50 transition-colors group">
                <div className="flex items-start">
                  <Mail className="h-4 w-4 mr-3 text-flip-red-400 mt-1 flex-shrink-0" />
                  <div className="space-y-1">
                    <a href="mailto:joao.pedro@flipeng.br" className="text-flip-blue-300 hover:text-flip-blue-200 text-sm font-medium block transition-colors">
                      joao.pedro@flipeng.br
                    </a>
                    <p className="text-flip-gray-400 text-xs">Energia solar</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-1 space-y-6">
            <h3 className="text-xl font-bold text-white mb-6 relative">
              Serviços
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-flip-red-400 to-flip-red-600 rounded-full"></div>
            </h3>
            
            <div className="space-y-3">
              <button 
                onClick={() => scrollToSection('calculadora')} 
                className="group flex items-center p-3 rounded-lg hover:bg-flip-red-600/20 transition-all duration-300 w-full text-left"
              >
                <Zap className="h-5 w-5 text-flip-red-400 mr-3 group-hover:text-flip-red-300" />
                <span className="text-flip-gray-300 group-hover:text-white transition-colors">Energia Solar</span>
                <ArrowRight className="h-4 w-4 ml-auto text-flip-gray-500 group-hover:text-flip-red-400 opacity-0 group-hover:opacity-100 transition-all" />
              </button>
              
              <button 
                onClick={() => scrollToSection('solucoes')} 
                className="group flex items-center p-3 rounded-lg hover:bg-flip-red-600/20 transition-all duration-300 w-full text-left"
              >
                <Home className="h-5 w-5 text-flip-red-400 mr-3 group-hover:text-flip-red-300" />
                <span className="text-flip-gray-300 group-hover:text-white transition-colors">Automação Residencial</span>
                <ArrowRight className="h-4 w-4 ml-auto text-flip-gray-500 group-hover:text-flip-red-400 opacity-0 group-hover:opacity-100 transition-all" />
              </button>
              
              <button 
                onClick={() => scrollToSection('solucoes')} 
                className="group flex items-center p-3 rounded-lg hover:bg-flip-red-600/20 transition-all duration-300 w-full text-left"
              >
                <Network className="h-5 w-5 text-flip-red-400 mr-3 group-hover:text-flip-red-300" />
                <span className="text-flip-gray-300 group-hover:text-white transition-colors">Redes de Distribuição</span>
                <ArrowRight className="h-4 w-4 ml-auto text-flip-gray-500 group-hover:text-flip-red-400 opacity-0 group-hover:opacity-100 transition-all" />
              </button>
              
              <button 
                onClick={() => scrollToSection('parceiros')} 
                className="group flex items-center p-3 rounded-lg hover:bg-flip-red-600/20 transition-all duration-300 border border-flip-red-400/30 w-full text-left"
              >
                <div className="h-5 w-5 bg-gradient-to-br from-flip-red-400 to-flip-red-600 rounded mr-3 flex items-center justify-center">
                  <span className="text-xs font-bold text-white">%</span>
                </div>
                <span className="text-flip-gray-300 group-hover:text-white transition-colors">Seja um Parceiro Flip</span>
                <ArrowRight className="h-4 w-4 ml-auto text-flip-gray-500 group-hover:text-flip-red-400 opacity-0 group-hover:opacity-100 transition-all" />
              </button>
            </div>
          </div>

          {/* CTA Section */}
          <div className="lg:col-span-1 space-y-6">
            <h3 className="text-xl font-bold text-white mb-6 relative">
              Comece Agora
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-flip-red-400 to-flip-red-600 rounded-full"></div>
            </h3>
            
            <div className="bg-gradient-to-br from-flip-blue-600/20 to-flip-blue-800/20 p-6 rounded-xl border border-flip-blue-400/30">
              <p className="text-flip-gray-300 text-sm mb-4 leading-relaxed">
                Transforme sua energia com nossas soluções sustentáveis e tecnológicas.
              </p>
              
              <button 
                onClick={() => scrollToSection('calculadora')}
                className="inline-flex items-center bg-gradient-to-r from-flip-red-500 to-flip-red-600 hover:from-flip-red-600 hover:to-flip-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 group w-full justify-center"
              >
                Calcular Economia
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-flip-gray-700/50 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-flip-gray-400 text-sm">
              &copy; 2024 FLIP Engenharia. Todos os direitos reservados.
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-flip-gray-400 hover:text-white transition-colors">Política de Privacidade</a>
              <a href="#" className="text-flip-gray-400 hover:text-white transition-colors">Termos de Uso</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
