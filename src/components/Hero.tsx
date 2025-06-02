import React, { useState } from 'react';
import { ArrowRight, Zap, Home, Network } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import QuestionnaireForm from './QuestionnaireForm';

const Hero = () => {
  const handleCalculateClick = () => {
    const calculatorSection = document.getElementById('calculadora');
    if (calculatorSection) {
      calculatorSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section id="inicio" className="min-h-screen gradient-bg flex items-center pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-flip-gray-900 leading-tight">
                Soluções Integradas em{' '}
                <span className="gradient-text-glow-alternate">Energia</span>
              </h1>
              <p className="mt-6 text-lg text-flip-gray-600 leading-relaxed">
                Energia solar, automação residencial e redes de distribuição privadas. 
                Transformamos sua propriedade em um ecossistema energético inteligente, 
                sustentável e econômico.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    size="lg" 
                    className="bg-flip-blue-500 hover:bg-flip-blue-600 text-white px-8 py-3"
                  >
                    Solicitar Orçamento
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Questionário para Orçamento</DialogTitle>
                  </DialogHeader>
                  <QuestionnaireForm />
                </DialogContent>
              </Dialog>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-flip-blue-500 text-flip-blue-500 hover:bg-flip-blue-50 px-8 py-3"
                onClick={handleCalculateClick}
              >
                Calcular Economia
              </Button>
            </div>
          </div>

          {/* Visual Elements */}
          <div className="relative">
            <div className="grid grid-cols-1 gap-6">
              {/* Energy Card */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover-scale">
                <div className="flex items-center space-x-4">
                  <div className="bg-flip-blue-100 p-3 rounded-lg">
                    <Zap className="h-6 w-6 text-flip-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-flip-gray-900">Energia Solar</h3>
                    <p className="text-sm text-flip-gray-600">Economia de até 95% na conta de luz</p>
                  </div>
                </div>
              </div>

              {/* Automation Card */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover-scale ml-8">
                <div className="flex items-center space-x-4">
                  <div className="bg-flip-blue-100 p-3 rounded-lg">
                    <Home className="h-6 w-6 text-flip-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-flip-gray-900">Automação</h3>
                    <p className="text-sm text-flip-gray-600">Conforto e eficiência inteligente</p>
                  </div>
                </div>
              </div>

              {/* Network Card */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover-scale">
                <div className="flex items-center space-x-4">
                  <div className="bg-flip-blue-100 p-3 rounded-lg">
                    <Network className="h-6 w-6 text-flip-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-flip-gray-900">Redes Privadas</h3>
                    <p className="text-sm text-flip-gray-600">Infraestrutura segura e confiável</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
