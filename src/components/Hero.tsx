import React, { useState } from 'react';
import { ArrowRight, Zap, Home, Network, Sparkles, Play } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Link } from 'react-router-dom';
import QuestionnaireForm from './QuestionnaireForm';

const Hero = () => {
  return (
    <section id="inicio" className="min-h-screen relative overflow-hidden">
      {/* Background moderno com gradientes animados */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Gradient orbs animados */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-flip-blue-400/30 to-purple-400/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-r from-cyan-300/20 to-flip-blue-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-purple-300/20 to-pink-300/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
        
        {/* Grid pattern moderno */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-flip-blue-400 rounded-full animate-float"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-float delay-1000"></div>
          <div className="absolute bottom-1/3 left-1/5 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-float delay-2000"></div>
          <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-pink-400 rounded-full animate-float delay-3000"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content com animações mais modernas */}
          <div className="space-y-8 animate-fade-in">
            {/* Badge moderno */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-flip-blue-200/50 shadow-lg">
              <Sparkles className="w-4 h-4 text-flip-blue-500 mr-2" />
              <span className="text-sm font-medium text-flip-blue-700">Tecnologia Sustentável</span>
            </div>

            <div>
              <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-tight">
                Soluções{' '}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-flip-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent animate-gradient-x">
                    Inteligentes
                  </span>
                  <div className="absolute -inset-1 bg-gradient-to-r from-flip-blue-600/20 via-purple-600/20 to-cyan-600/20 blur-lg -z-10 animate-pulse"></div>
                </span>
                {' '}em{' '}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-flip-blue-600 bg-clip-text text-transparent animate-gradient-x delay-1000">
                    Energia
                  </span>
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600/20 via-teal-600/20 to-flip-blue-600/20 blur-lg -z-10 animate-pulse delay-1000"></div>
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
                    className="group bg-gradient-to-r from-flip-blue-600 to-flip-blue-700 hover:from-flip-blue-700 hover:to-flip-blue-800 text-white px-10 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
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
              
              <Link to="/como-funciona">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="group border-2 border-flip-blue-500/50 text-flip-blue-700 hover:bg-flip-blue-50 hover:border-flip-blue-500 px-10 py-4 rounded-2xl backdrop-blur-sm bg-white/50 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Play className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Calcular Economia
                </Button>
              </Link>
            </div>

            {/* Stats modernos */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-flip-blue-700">95%</div>
                <div className="text-sm text-slate-600">Economia</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600">100+</div>
                <div className="text-sm text-slate-600">Projetos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">24/7</div>
                <div className="text-sm text-slate-600">Suporte</div>
              </div>
            </div>
          </div>

          {/* Visual Elements modernizados */}
          <div className="relative">
            {/* Cards flutuantes com design moderno */}
            <div className="grid grid-cols-1 gap-8">
              {/* Energy Card */}
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-flip-blue-500 to-cyan-500 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="flex items-center space-x-6">
                    <div className="bg-gradient-to-br from-flip-blue-500 to-cyan-500 p-4 rounded-2xl shadow-lg">
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
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="flex items-center space-x-6">
                    <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-2xl shadow-lg">
                      <Home className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">Automação</h3>
                      <p className="text-slate-600 mt-1">Conforto e eficiência inteligente</p>
                      <div className="mt-3 text-2xl font-bold text-purple-600">30%</div>
                      <div className="text-sm text-slate-500">redução no consumo</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Network Card */}
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="flex items-center space-x-6">
                    <div className="bg-gradient-to-br from-emerald-500 to-teal-500 p-4 rounded-2xl shadow-lg">
                      <Network className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">Redes Privadas</h3>
                      <p className="text-slate-600 mt-1">Infraestrutura segura e confiável</p>
                      <div className="mt-3 text-2xl font-bold text-emerald-600">99.9%</div>
                      <div className="text-sm text-slate-500">disponibilidade</div>
                    </div>
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
