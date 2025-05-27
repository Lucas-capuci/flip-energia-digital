
import React, { useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from './ui/button';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    { label: 'Início', href: '#inicio' },
    { label: 'Soluções', href: '#solucoes' },
    { label: 'Orçamento', href: '#orcamento' },
    { label: 'Portfólio', href: '#portfolio' },
    { label: 'Calculadora', href: '#calculadora' },
    { label: 'Contato', href: '#contato' }
  ];

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

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigationItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-flip-gray-600 hover:text-flip-blue-500 transition-colors duration-200 font-medium"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Button */}
          <div className="hidden md:block">
            <Button className="bg-flip-blue-500 hover:bg-flip-blue-600 text-white">
              <Phone className="w-4 h-4 mr-2" />
              Contato
            </Button>
          </div>

          {/* Mobile menu button */}
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

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-flip-blue-100">
            {navigationItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-flip-gray-600 hover:text-flip-blue-500 font-medium"
              >
                {item.label}
              </a>
            ))}
            <div className="px-3 py-2">
              <Button className="w-full bg-flip-blue-500 hover:bg-flip-blue-600 text-white">
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
