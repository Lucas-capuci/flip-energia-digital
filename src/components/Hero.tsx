
import React, { useState, useEffect } from 'react';
import { ArrowRight, Zap, Home, Network, Sparkles, Play, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Link } from 'react-router-dom';
import QuestionnaireForm from './QuestionnaireForm';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="inicio" className="min-h-screen relative overflow-hidden flex flex-col">
      {/* Background mais sutil com gradientes suaves */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100">
        {/* Gradient orbs mais sutis */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-flip-blue-200/15 to-slate-200/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-r from-slate-200/10 to-flip-blue-200/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-slate-200/8 to-slate-300/8 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
        
        {/* Grid pattern mais sutil */}
        <div className="absolute inset-0 bg-grid-pattern opacity-2"></div>
        
        {/* Floating particles mais discretas */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 bg-flip-blue-300/40 rounded-full animate-float"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-slate-400/30 rounded-full animate-float delay-1000"></div>
          <div className="absolute bottom-1/3 left-1/5 w-1 h-1 bg-flip-blue-300/30 rounded-full animate-float delay-2000"></div>
          <div className="absolute top-2/3 right-1/4 w-0.5 h-0.5 bg-slate-400/25 rounded-full animate-float delay-3000"></div>
        </div>
      </div>

      {/* Main content container with better height distribution */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 items-center min-h-[80vh]">
            {/* Content com animações elegantes */}
            <div className={`space-y-6 lg:space-y-8 transition-all duration-1000 ease-out ${
              isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}>
              {/* Badge mais discreto com animação */}
              <div className={`inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200/60 shadow-sm transition-all duration-700 delay-300 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-4'
              }`}>
                <Sparkles className="w-4 h-4 text-flip-blue-500 mr-2" />
                <span className="text-sm font-medium text-slate-700">Tecnologia Sustentável</span>
              </div>

              <div className={`transition-all duration-1000 delay-200 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 leading-tight">
                  Soluções{' '}
                  <span className="relative inline-block">
                    <span className="bg-gradient-to-r from-flip-blue-600 to-flip-blue-700 bg-clip-text text-transparent">
                      Inteligentes
                    </span>
                    <div className="absolute -inset-1 bg-gradient-to-r from-flip-blue-600/8 to-flip-blue-700/8 blur-lg -z-10"></div>
                  </span>
                  {' '}em{' '}
                  <span className="relative inline-block">
                    <span className="bg-gradient-to-r from-slate-700 to-slate-800 bg-clip-text text-transparent">
                      Energia
                    </span>
                    <div className="absolute -inset-1 bg-gradient-to-r from-slate-700/8 to-slate-800/8 blur-lg -z-10"></div>
                  </span>
                </h1>
                <p className="mt-6 lg:mt-8 text-lg lg:text-xl text-slate-600 leading-relaxed max-w-2xl">
                  Energia solar, automação residencial e redes de distribuição privadas. 
                  Transformamos sua propriedade em um <span className="font-semibold text-flip-blue-700">ecossistema energético inteligente</span>, 
                  sustentável e econômico.
                </p>
              </div>

              <div className={`flex flex-col sm:flex-row gap-4 lg:gap-6 transition-all duration-1000 delay-500 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      size="lg" 
                      className="group bg-flip-blue-600 hover:bg-flip-blue-700 text-white px-8 lg:px-10 py-3 lg:py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      <span className="flex items-center">
                        Solicitar Orçamento
                        <ArrowRight className="ml-3 h-4 w-4 lg:h-5 lg:w-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Questionário para Orçamento</DialogTitle>
                    </DialogHeader>
                    <QuestionnaireForm />
                  </DialogContent>
                </Dialog>
                
                <Link to="/solar">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="group border-2 border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 px-8 lg:px-10 py-3 lg:py-4 rounded-xl backdrop-blur-sm bg-white/60 shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <Play className="mr-3 h-4 w-4 lg:h-5 lg:w-5 group-hover:scale-110 transition-transform" />
                    Calcular Economia
                  </Button>
                </Link>
              </div>

              {/* Stats com animação escalonada */}
              <div className={`grid grid-cols-3 gap-4 lg:gap-6 pt-6 lg:pt-8 transition-all duration-1000 delay-700 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}>
                <div className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-flip-blue-700">95%</div>
                  <div className="text-xs lg:text-sm text-slate-500">Economia</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-slate-700">100+</div>
                  <div className="text-xs lg:text-sm text-slate-500">Projetos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-slate-600">24/7</div>
                  <div className="text-xs lg:text-sm text-slate-500">Suporte</div>
                </div>
              </div>
            </div>

            {/* Visual Elements com animações mais suaves */}
            <div className={`relative transition-all duration-1200 delay-400 ${
              isVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-8'
            }`}>
              {/* Cards flutuantes com design mais minimalista e animações */}
              <div className="grid grid-cols-1 gap-6 lg:gap-8">
                {/* Energy Card */}
                <div className={`group relative transition-all duration-700 delay-600 ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-6'
                }`}>
                  <div className="absolute -inset-1 bg-gradient-to-r from-flip-blue-300/20 to-slate-300/15 rounded-2xl blur opacity-15 group-hover:opacity-30 transition duration-500"></div>
                  <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-200/40">
                    <div className="flex items-center space-x-4 lg:space-x-6">
                      <div className="bg-gradient-to-br from-flip-blue-500 to-flip-blue-600 p-3 lg:p-4 rounded-xl shadow-md">
                        <Zap className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg lg:text-xl font-bold text-slate-900">Energia Solar</h3>
                        <p className="text-slate-600 mt-1 text-sm lg:text-base">Economia de até 95% na conta de luz</p>
                        <div className="mt-2 lg:mt-3 text-xl lg:text-2xl font-bold text-flip-blue-600">R$ 2.500</div>
                        <div className="text-xs lg:text-sm text-slate-500">economia anual média</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Automation Card */}
                <div className={`group relative ml-6 lg:ml-12 transition-all duration-700 delay-800 ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-6'
                }`}>
                  <div className="absolute -inset-1 bg-gradient-to-r from-slate-300/15 to-slate-400/10 rounded-2xl blur opacity-15 group-hover:opacity-30 transition duration-500"></div>
                  <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-200/40">
                    <div className="flex items-center space-x-4 lg:space-x-6">
                      <div className="bg-gradient-to-br from-slate-600 to-slate-700 p-3 lg:p-4 rounded-xl shadow-md">
                        <Home className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg lg:text-xl font-bold text-slate-900">Automação</h3>
                        <p className="text-slate-600 mt-1 text-sm lg:text-base">Conforto e eficiência inteligente</p>
                        <div className="mt-2 lg:mt-3 text-xl lg:text-2xl font-bold text-slate-700">30%</div>
                        <div className="text-xs lg:text-sm text-slate-500">redução no consumo</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Network Card */}
                <div className={`group relative transition-all duration-700 delay-1000 ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-6'
                }`}>
                  <div className="absolute -inset-1 bg-gradient-to-r from-slate-300/15 to-flip-blue-300/10 rounded-2xl blur opacity-15 group-hover:opacity-30 transition duration-500"></div>
                  <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-200/40">
                    <div className="flex items-center space-x-4 lg:space-x-6">
                      <div className="bg-gradient-to-br from-flip-blue-600 to-flip-blue-700 p-3 lg:p-4 rounded-xl shadow-md">
                        <Network className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg lg:text-xl font-bold text-slate-900">Redes Privadas</h3>
                        <p className="text-slate-600 mt-1 text-sm lg:text-base">Infraestrutura segura e confiável</p>
                        <div className="mt-2 lg:mt-3 text-xl lg:text-2xl font-bold text-flip-blue-600">99.9%</div>
                        <div className="text-xs lg:text-sm text-slate-500">disponibilidade</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Indicador para rolar melhor posicionado e com animação */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 transition-all duration-1000 delay-1200 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-4'
      }`}>
        <div className="flex flex-col items-center animate-bounce">
          <div className="text-xs lg:text-sm text-slate-500 mb-2 opacity-70">Role para baixo</div>
          <ChevronDown className="w-4 h-4 lg:w-5 lg:h-5 text-slate-500 opacity-70" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
