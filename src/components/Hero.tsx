
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
        {/* Gradient orbs mais sutis e menores */}
        <div className="absolute top-16 left-8 w-48 h-48 bg-gradient-to-r from-flip-blue-200/10 to-slate-200/8 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-32 right-8 w-64 h-64 bg-gradient-to-r from-slate-200/8 to-flip-blue-200/8 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-16 left-1/4 w-52 h-52 bg-gradient-to-r from-slate-200/6 to-slate-300/6 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
        
        {/* Grid pattern mais sutil */}
        <div className="absolute inset-0 bg-grid-pattern opacity-2"></div>
        
        {/* Floating particles mais discretas */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-flip-blue-300/30 rounded-full animate-float"></div>
          <div className="absolute top-1/3 right-1/3 w-0.5 h-0.5 bg-slate-400/25 rounded-full animate-float delay-1000"></div>
          <div className="absolute bottom-1/3 left-1/5 w-0.5 h-0.5 bg-flip-blue-300/25 rounded-full animate-float delay-2000"></div>
          <div className="absolute top-2/3 right-1/4 w-0.5 h-0.5 bg-slate-400/20 rounded-full animate-float delay-3000"></div>
        </div>
      </div>

      {/* Main content container com altura reduzida */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12 items-center min-h-[70vh]">
            {/* Content com tamanhos reduzidos */}
            <div className={`space-y-4 lg:space-y-6 transition-all duration-1000 ease-out ${
              isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}>
              {/* Badge menor */}
              <div className={`inline-flex items-center px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200/60 shadow-sm transition-all duration-700 delay-300 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-4'
              }`}>
                <Sparkles className="w-3 h-3 text-flip-blue-500 mr-2" />
                <span className="text-xs font-medium text-slate-700">Tecnologia Sustentável</span>
              </div>

              <div className={`transition-all duration-1000 delay-200 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 leading-tight">
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
                <p className="mt-4 lg:mt-6 text-base lg:text-lg text-slate-600 leading-relaxed max-w-xl">
                  Energia solar, automação residencial e redes de distribuição privadas. 
                  Transformamos sua propriedade em um <span className="font-semibold text-flip-blue-700">ecossistema energético inteligente</span>, 
                  sustentável e econômico.
                </p>
              </div>

              <div className={`flex flex-col sm:flex-row gap-3 lg:gap-4 transition-all duration-1000 delay-500 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      size="lg" 
                      className="group bg-flip-blue-600 hover:bg-flip-blue-700 text-white px-6 lg:px-8 py-2.5 lg:py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      <span className="flex items-center">
                        Solicitar Orçamento
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
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
                    className="group border-2 border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 px-6 lg:px-8 py-2.5 lg:py-3 rounded-xl backdrop-blur-sm bg-white/60 shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <Play className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                    Calcular Economia
                  </Button>
                </Link>
              </div>

              {/* Stats menores */}
              <div className={`grid grid-cols-3 gap-3 lg:gap-4 pt-4 lg:pt-6 transition-all duration-1000 delay-700 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}>
                <div className="text-center">
                  <div className="text-xl lg:text-2xl font-bold text-flip-blue-700">95%</div>
                  <div className="text-xs text-slate-500">Economia</div>
                </div>
                <div className="text-center">
                  <div className="text-xl lg:text-2xl font-bold text-slate-700">100+</div>
                  <div className="text-xs text-slate-500">Projetos</div>
                </div>
                <div className="text-center">
                  <div className="text-xl lg:text-2xl font-bold text-slate-600">24/7</div>
                  <div className="text-xs text-slate-500">Suporte</div>
                </div>
              </div>
            </div>

            {/* Visual Elements menores */}
            <div className={`relative transition-all duration-1200 delay-400 ${
              isVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-8'
            }`}>
              {/* Cards menores */}
              <div className="grid grid-cols-1 gap-4 lg:gap-6">
                {/* Energy Card */}
                <div className={`group relative transition-all duration-700 delay-600 ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-6'
                }`}>
                  <div className="absolute -inset-1 bg-gradient-to-r from-flip-blue-300/20 to-slate-300/15 rounded-2xl blur opacity-15 group-hover:opacity-30 transition duration-500"></div>
                  <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl p-4 lg:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-200/40">
                    <div className="flex items-center space-x-3 lg:space-x-4">
                      <div className="bg-gradient-to-br from-flip-blue-500 to-flip-blue-600 p-2.5 lg:p-3 rounded-xl shadow-md">
                        <Zap className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-base lg:text-lg font-bold text-slate-900">Energia Solar</h3>
                        <p className="text-slate-600 mt-1 text-sm">Economia de até 95% na conta de luz</p>
                        <div className="mt-1.5 lg:mt-2 text-lg lg:text-xl font-bold text-flip-blue-600">R$ 2.500</div>
                        <div className="text-xs text-slate-500">economia anual média</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Automation Card */}
                <div className={`group relative ml-4 lg:ml-8 transition-all duration-700 delay-800 ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-6'
                }`}>
                  <div className="absolute -inset-1 bg-gradient-to-r from-slate-300/15 to-slate-400/10 rounded-2xl blur opacity-15 group-hover:opacity-30 transition duration-500"></div>
                  <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl p-4 lg:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-200/40">
                    <div className="flex items-center space-x-3 lg:space-x-4">
                      <div className="bg-gradient-to-br from-slate-600 to-slate-700 p-2.5 lg:p-3 rounded-xl shadow-md">
                        <Home className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-base lg:text-lg font-bold text-slate-900">Automação</h3>
                        <p className="text-slate-600 mt-1 text-sm">Conforto e eficiência inteligente</p>
                        <div className="mt-1.5 lg:mt-2 text-lg lg:text-xl font-bold text-slate-700">30%</div>
                        <div className="text-xs text-slate-500">redução no consumo</div>
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
                  <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl p-4 lg:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-200/40">
                    <div className="flex items-center space-x-3 lg:space-x-4">
                      <div className="bg-gradient-to-br from-flip-blue-600 to-flip-blue-700 p-2.5 lg:p-3 rounded-xl shadow-md">
                        <Network className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-base lg:text-lg font-bold text-slate-900">Redes Privadas</h3>
                        <p className="text-slate-600 mt-1 text-sm">Infraestrutura segura e confiável</p>
                        <div className="mt-1.5 lg:mt-2 text-lg lg:text-xl font-bold text-flip-blue-600">99.9%</div>
                        <div className="text-xs text-slate-500">disponibilidade</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Indicador para rolar mais abaixo e menor */}
      <div className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 transition-all duration-1000 delay-1200 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-4'
      }`}>
        <div className="flex flex-col items-center animate-bounce">
          <div className="text-xs text-slate-500 mb-1 opacity-60">Role para baixo</div>
          <ChevronDown className="w-3 h-3 text-slate-500 opacity-60" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
