// src/components/Navigation.tsx

import React, { useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from './ui/button';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    { label: 'Início', id: 'inicio' },
    { label: 'Soluções', id: 'solucoes' },
    { label: 'Orçamento', id: 'orcamento' },
    { label: 'Portfólio', id: 'portfolio' },
    { label: 'Calculadora', id: 'calculadora' },
    { label: 'Contato', id: 'contato' }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-flip-blue-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/lovable-uploads/3e92ace1-6d32-4bd6-a522-f7a41940d2f8.png"
              alt="FLIP Engenharia"
              className="h-12 w-auto"
            />
          </div>

          {/* Navegação Desktop */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.id)}
                  className="text-flip-gray-600 hover:text-flip-blue-500 transition-colors duration-200 font-medium"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Botão de Contato */}
          <div className="hidden md:block">
            <Button
              className="bg-flip-blue-500 hover:bg-flip-blue-600 text-white"
              onClick={() => scrollToSection('contato')}
            >
              <Phone className="w-4 h-4 mr-2" />
              Contato
            </Button>
          </div>

          {/* Botão do Menu Mobile */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              onClick={() => setIsOpen(!isOpen)}
              className="text-flip-gray-600"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Navegação Mobile */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-flip-blue-100">
            {navigationItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.id)}
                className="block px-3 py-2 text-flip-gray-600 hover:text-flip-blue-500 font-medium w-full text-left"
              >
                {item.label}
              </button>
            ))}
            <div className="px-3 py-2">
              <Button
                className="w-full bg-flip-blue-500 hover:bg-flip-blue-600 text-white"
                onClick={() => scrollToSection('contato')}
              >
                <Phone className="w-4 h-4 mr-2" />
                Contato
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
