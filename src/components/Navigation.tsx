
import React, { useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Link, useLocation } from 'react-router-dom';
import QuestionnaireForm from './QuestionnaireForm';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { label: 'Início', path: '/' },
    { label: 'Solar', path: '/solar' },
    { label: 'Redes de Distribuição', path: '/redes-distribuicao' },
    { label: 'Projetos Elétricos', path: '/projetos-eletricos' },
    { label: 'Seja Parceiro', path: '/seja-parceiro' },
    { label: 'Portfólio', path: '/portfolio' },
    { label: 'Contato', path: '/contato' }
  ];

  const navigateToProposals = () => {
    window.location.href = '/propostas';
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-flip-blue-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/">
              <img
                src="/lovable-uploads/128626de-5c4d-45a6-a710-143c406139e6.png"
                alt="FLIP Engenharia"
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Navegação Desktop */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {navigationItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`transition-colors duration-200 font-medium text-sm ${
                    isActivePath(item.path)
                      ? 'text-flip-blue-600 font-semibold border-b-2 border-flip-blue-600'
                      : item.label === 'Seja Parceiro' 
                        ? 'text-flip-blue-500 hover:text-flip-blue-600 font-semibold' 
                        : 'text-flip-gray-600 hover:text-flip-blue-500'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Botão de Orçamento separado */}
              <Dialog>
                <DialogTrigger asChild>
                  <button className="text-flip-gray-600 hover:text-flip-blue-500 transition-colors duration-200 font-medium text-sm">
                    Orçamento
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Questionário para Orçamento</DialogTitle>
                  </DialogHeader>
                  <QuestionnaireForm />
                </DialogContent>
              </Dialog>

              {/* Botão de Propostas */}
              <button
                onClick={navigateToProposals}
                className="text-flip-gray-600 hover:text-flip-blue-500 transition-colors duration-200 font-medium text-sm"
              >
                Restrito
              </button>
            </div>
          </div>

          {/* Botão de Contato */}
          <div className="hidden md:block">
            <Link to="/contato">
              <Button className="bg-flip-red-500 hover:bg-flip-red-600 text-white">
                <Phone className="w-4 h-4 mr-2" />
                Contato
              </Button>
            </Link>
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
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 font-medium w-full text-left ${
                  isActivePath(item.path)
                    ? 'text-flip-blue-600 font-semibold bg-flip-blue-50'
                    : item.label === 'Seja Parceiro' 
                      ? 'text-flip-blue-500 font-semibold' 
                      : 'text-flip-gray-600 hover:text-flip-blue-500'
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Botão de Orçamento no mobile */}
            <Dialog>
              <DialogTrigger asChild>
                <button className="block px-3 py-2 text-flip-gray-600 hover:text-flip-blue-500 font-medium w-full text-left">
                  Orçamento
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Questionário para Orçamento</DialogTitle>
                </DialogHeader>
                <QuestionnaireForm />
              </DialogContent>
            </Dialog>

            {/* Botão de Propostas no mobile */}
            <button
              onClick={navigateToProposals}
              className="block px-3 py-2 text-flip-gray-600 hover:text-flip-blue-500 font-medium w-full text-left"
            >
              Restrito
            </button>
            
            <div className="px-3 py-2">
              <Link to="/contato" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-flip-red-500 hover:bg-flip-red-600 text-white">
                  <Phone className="w-4 h-4 mr-2" />
                  Contato
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
