
import React from 'react';
import { MapPin, Phone, Mail, Instagram, Facebook, Linkedin } from 'lucide-react';
const Footer = () => {
  return <footer id="contato" className="bg-flip-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <img src="/lovable-uploads/3e92ace1-6d32-4bd6-a522-f7a41940d2f8.png" alt="FLIP Engenharia" className="h-12 w-auto brightness-0 invert" />
            <p className="text-flip-gray-300">
              Soluções integradas em energia solar, automação residencial e redes de distribuição privadas.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-flip-gray-300 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-flip-gray-300 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-flip-gray-300 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-3 text-flip-blue-400" />
                <span className="text-flip-gray-300 font-normal">
                  Goiania-Go
                </span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-3 text-flip-blue-400" />
                <span className="text-flip-gray-300">(62) 98449-6914</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-3 text-flip-blue-400" />
                <span className="text-flip-gray-300">Lucascapuciarroyo@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Serviços</h3>
            <ul className="space-y-2 text-flip-gray-300">
              <li>
                <a href="#energia-solar" className="hover:text-white transition-colors">
                  Energia Solar
                </a>
              </li>
              <li>
                <a href="#automacao" className="hover:text-white transition-colors">
                  Automação Residencial
                </a>
              </li>
              <li>
                <a href="#redes" className="hover:text-white transition-colors">
                  Redes de Distribuição
                </a>
              </li>
              <li>
                <a href="#calculadora" className="hover:text-white transition-colors">
                  Calculadora de Economia
                </a>
              </li>
            </ul>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Certificações</h3>
            <div className="space-y-2 text-flip-gray-300">
              <div>CREA-SP: 123456789</div>
              <div>ISO 9001:2015</div>
              <div>ISO 14001:2015</div>
              <div>ABNT NBR 16690</div>
              <div>Inmetro Classe A</div>
            </div>
          </div>
        </div>

        <div className="border-t border-flip-gray-800 mt-12 pt-8 text-center text-flip-gray-400">
          <p>&copy; 2024 FLIP Engenharia. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>;
};
export default Footer;
