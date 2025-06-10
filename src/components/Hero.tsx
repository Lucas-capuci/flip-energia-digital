
import React, { useState } from 'react';
import { ArrowRight, Zap, Home, Network, Sparkles, Play, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Link } from 'react-router-dom';
import QuestionnaireForm from './QuestionnaireForm';

const Hero = () => {
  return (
    <section id="inicio" className="min-h-screen relative overflow-hidden">
      {/* Background mais sutil com gradientes suaves */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100">
        {/* Gradient orbs mais sutis */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-flip-blue-200/20 to-slate-200/15 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-r from-slate-200/15 to-flip-blue-200/15 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-slate-200/10 to-slate-300/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
        
        {/* Grid pattern mais sutil */}
        <div className="absolute inset-0 bg-grid-pattern opacity-3"></div>
        
        {/* Floating particles mais discretas */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 bg-flip-blue-300/60 rounded-full animate-float"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-slate-400/50 rounded-full animate-float delay-1000"></div>
          <div className="absolute bottom-1/3 left-1/5 w-1 h-1 bg-flip-blue-300/50 rounded-full animate-float delay-2000"></div>
          <div className="absolute top-2/3 right-1/4 w-0.5 h-0.5 bg-slate-400/40 rounded-full animate-float delay-3000"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[calc(100vh-200px)]">
          {/* Content com cores mais sutis */}
          <div className="space-y-8 animate-fade-in">
            {/* Badge mais discreto */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 shadow-sm">
              <Sparkles className="w-4 h-4 text-flip-blue-500 mr-2" />
              <span className="text-sm font-medium text-slate-700">Tecnologia Sustentável</span>
            </div>

            <div>
              <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-tight">
                Soluções{' '}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-flip-blue-600 to-flip-blue-700 bg-clip-text text-transparent">
                    Inteligentes
                  </span>
                  <div className="absolute -inset-1 bg-gradient-to-r from-flip-blue-600/10 to-flip-blue-700/10 blur-lg -z-10"></div>
                </span>
                {' '}em{' '}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-slate-700 to-slate-800 bg-clip-text text-transparent">
                    Energia
                  </span>
                  <div className="absolute -inset-1 bg-gradient-to-r from-slate-700/10 to-slate-800/10 blur-lg -z-10"></div>
                </span>
              </h1>
              <p className="mt-8 text-xl text-slate-600 leading-relaxed max-w-2xl">
                Energia solar, automação residencial e redes de distribuição privadas. 
                Transformamos sua propriedade em um <span className="font-semibold text-flip-blue-700">ecossistema energético inteligente</span>, 
                sustentável e econômico.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    size="lg" 
                    className="group bg-flip-blue-600 hover:bg-flip-blue-700 text-white px-10 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <span className="flex items-center">
                      Solicitar Orçamento
                      <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
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
                  className="group border-2 border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 px-10 py-4 rounded-xl backdrop-blur-sm bg-white/70 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <Play className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Calcular Economia
                </Button>
              </Link>
            </div>

            {/* Stats com cores mais neutras */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-flip-blue-700">95%</div>
                <div className="text-sm text-slate-500">Economia</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-700">100+</div>
                <div className="text-sm text-slate-500">Projetos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-600">24/7</div>
                <div className="text-sm text-slate-500">Suporte</div>
              </div>
            </div>
          </div>

          {/* Visual Elements com cores mais suaves */}
          <div className="relative">
            {/* Cards flutuantes com design mais minimalista */}
            <div className="grid grid-cols-1 gap-8">
              {/* Energy Card */}
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-flip-blue-300/30 to-slate-300/20 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-200/50">
                  <div className="flex items-center space-x-6">
                    <div className="bg-gradient-to-br from-flip-blue-500 to-flip-blue-600 p-4 rounded-xl shadow-md">
                      <Zap className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">Energia Solar</h3>
                      <p className="text-slate-600 mt-1">Economia de até 95% na conta de luz</p>
                      <div className="mt-3 text-2xl font-bold text-flip-blue-600">R$ 2.500</div>
                      <div className="text-sm text-slate-500">economia anual média</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Automation Card */}
              <div className="group relative ml-12">
                <div className="absolute -inset-1 bg-gradient-to-r from-slate-300/20 to-slate-400/15 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-200/50">
                  <div className="flex items-center space-x-6">
                    <div className="bg-gradient-to-br from-slate-600 to-slate-700 p-4 rounded-xl shadow-md">
                      <Home className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">Automação</h3>
                      <p className="text-slate-600 mt-1">Conforto e eficiência inteligente</p>
                      <div className="mt-3 text-2xl font-bold text-slate-700">30%</div>
                      <div className="text-sm text-slate-500">redução no consumo</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Network Card */}
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-slate-300/20 to-flip-blue-300/15 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-200/50">
                  <div className="flex items-center space-x-6">
                    <div className="bg-gradient-to-br from-flip-blue-600 to-flip-blue-700 p-4 rounded-xl shadow-md">
                      <Network className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">Redes Privadas</h3>
                      <p className="text-slate-600 mt-1">Infraestrutura segura e confiável</p>
                      <div className="mt-3 text-2xl font-bold text-flip-blue-600">99.9%</div>
                      <div className="text-sm text-slate-500">disponibilidade</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Indicador para rolar mais discreto */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center animate-bounce">
          <div className="text-sm text-slate-500 mb-2 opacity-60">Role para baixo</div>
          <ChevronDown className="w-5 h-5 text-slate-500 opacity-60" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
