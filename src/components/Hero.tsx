
import React, { useState, useEffect } from 'react';
import { ArrowRight, Zap, Home, Network, Sparkles, Play, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Link } from 'react-router-dom';
import QuestionnaireForm from './QuestionnaireForm';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="inicio" className="min-h-screen relative overflow-hidden flex flex-col bg-orbs bg-dark-base">
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern z-[1]"></div>

      {/* Floating particles */}
      <div className="absolute inset-0 z-[2]">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-[#E100FF]/40 rounded-full animate-float"></div>
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-[#7F00FF]/30 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/3 left-1/5 w-1 h-1 bg-[#E100FF]/25 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-2/3 right-1/4 w-0.5 h-0.5 bg-[#7F00FF]/35 rounded-full animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center min-h-0">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Content */}
              <div className={`space-y-4 sm:space-y-6 lg:space-y-8 transition-all duration-[1500ms] ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}>
                {/* Badge */}
                <div className={`inline-flex items-center px-3 py-1.5 rounded-full glass transition-all duration-[1000ms] delay-[800ms] ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}>
                  <Sparkles className="w-3 h-3 text-[#E100FF] mr-2" />
                  <span className="text-xs font-medium text-foreground/80">Tecnologia Sustentável</span>
                </div>

                <div className={`transition-all duration-[1500ms] delay-[600ms] ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                    <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">Soluções </span>
                    <span className="relative inline-block">
                      <span className="gradient-text">Inteligentes</span>
                    </span>
                    <span className="bg-gradient-to-r from-white/90 to-white/70 bg-clip-text text-transparent"> em </span>
                    <span className="relative inline-block">
                      <span className="bg-gradient-to-r from-white/80 to-white/60 bg-clip-text text-transparent">Energia</span>
                    </span>
                  </h1>
                  
                  <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed">
                    Energia solar, automação residencial e redes de distribuição. 
                    Transformamos sua propriedade em um <span className="font-semibold text-[#E100FF]">ecossistema energético inteligente</span>, 
                    sustentável e econômico.
                  </p>
                </div>

                {/* Buttons */}
                <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 transition-all duration-[1500ms] delay-[1200ms] ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        size="lg" 
                        className="group btn-glow px-6 py-3 text-sm sm:text-base rounded-full w-full sm:w-auto font-semibold"
                      >
                        <span className="flex items-center justify-center">
                          Solicitar Orçamento
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl mx-4">
                      <DialogHeader>
                        <DialogTitle>Questionário para Orçamento</DialogTitle>
                      </DialogHeader>
                      <QuestionnaireForm />
                    </DialogContent>
                  </Dialog>
                  
                  <Link to="/solar" className="w-full sm:w-auto">
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="group border-2 border-border text-foreground hover:bg-secondary hover:border-[#7F00FF]/30 px-6 py-3 text-sm sm:text-base rounded-full backdrop-blur-sm bg-secondary/30 shadow-md hover:shadow-lg transition-all duration-300 w-full"
                    >
                      <Play className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                      Calcular Economia
                    </Button>
                  </Link>
                </div>

                {/* Stats */}
                <div className={`grid grid-cols-3 gap-4 pt-6 transition-all duration-[1500ms] delay-[1800ms] ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}>
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl lg:text-3xl font-bold gradient-text">95%</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Economia</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">100+</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Projetos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground/80">24/7</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Suporte</div>
                  </div>
                </div>
              </div>

              {/* Visual Elements */}
              <div className={`relative mt-8 lg:mt-0 transition-all duration-[1800ms] delay-[1000ms] ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
              }`}>
                <div className="grid grid-cols-1 gap-4 sm:gap-6">
                  {/* Energy Card */}
                  <div className={`group relative transition-all duration-[1000ms] delay-[1400ms] ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}>
                    <div className="glass-card p-4 sm:p-6">
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        <div className="btn-glow p-3 rounded-xl flex-shrink-0">
                          <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-base sm:text-lg font-bold text-foreground">Energia Solar</h3>
                          <p className="text-muted-foreground mt-1 text-sm">Economia de até 95% na conta de luz</p>
                          <div className="mt-2 text-lg sm:text-xl font-bold gradient-text">R$ 2.500</div>
                          <div className="text-xs text-muted-foreground">economia anual média</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Automation Card */}
                  <div className={`group relative sm:ml-8 transition-all duration-[1000ms] delay-[1800ms] ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}>
                    <div className="glass-card p-4 sm:p-6">
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        <div className="bg-gradient-to-br from-[#7F00FF] to-[#5500aa] p-3 rounded-xl shadow-md flex-shrink-0">
                          <Home className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-base sm:text-lg font-bold text-foreground">Automação</h3>
                          <p className="text-muted-foreground mt-1 text-sm">Conforto e eficiência inteligente</p>
                          <div className="mt-2 text-lg sm:text-xl font-bold text-foreground">30%</div>
                          <div className="text-xs text-muted-foreground">redução no consumo</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Network Card */}
                  <div className={`group relative transition-all duration-[1000ms] delay-[2200ms] ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}>
                    <div className="glass-card p-4 sm:p-6">
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        <div className="bg-gradient-to-br from-[#E100FF] to-[#7F00FF] p-3 rounded-xl shadow-md flex-shrink-0">
                          <Network className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-base sm:text-lg font-bold text-foreground">Redes Privadas</h3>
                          <p className="text-muted-foreground mt-1 text-sm">Infraestrutura segura e confiável</p>
                          <div className="mt-2 text-lg sm:text-xl font-bold gradient-text">99.9%</div>
                          <div className="text-xs text-muted-foreground">disponibilidade</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={`absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-20 transition-all duration-[1500ms] delay-[2500ms] ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}>
        <div className="flex flex-col items-center animate-bounce">
          <div className="text-xs text-muted-foreground mb-1 opacity-60">Role para baixo</div>
          <ChevronDown className="w-3 h-3 text-muted-foreground opacity-60" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
