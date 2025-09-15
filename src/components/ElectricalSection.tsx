import React from 'react';
import { Zap, Car, Sun, Building2, Home, Shield, Laptop } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import QuestionnaireForm from './QuestionnaireForm';

const ElectricalSection = () => {
  const services = [
    {
      title: "Projetos de Subestações",
      description: "Subestações aéreas e abrigadas até 2 kVA com projeto completo de infraestrutura elétrica.",
      icon: Zap,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Infraestrutura para Carregadores VE",
      description: "Projetos especializados para instalação de carregadores de veículos elétricos residenciais e comerciais.",
      icon: Car,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Sistemas de Energia Fotovoltaica",
      description: "Projetos elétricos completos para sistemas solares residenciais, comerciais e industriais.",
      icon: Sun,
      color: "from-yellow-500 to-orange-500"
    },
    {
      title: "Múltiplas Unidades Consumidoras",
      description: "Projetos para condomínios e complexos com múltiplas unidades consumidoras independentes.",
      icon: Building2,
      color: "from-indigo-500 to-purple-500"
    },
    {
      title: "Projetos Residenciais e Comerciais",
      description: "Instalações elétricas completas para residências, comércios e pequenas indústrias.",
      icon: Home,
      color: "from-pink-500 to-rose-500"
    },
    {
      title: "Projeto de SPDA",
      description: "Sistema de Proteção contra Descargas Atmosféricas conforme normas técnicas vigentes.",
      icon: Shield,
      color: "from-gray-600 to-gray-700"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-flip-gray-900 via-flip-blue-900 to-flip-gray-800">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-flip-blue-600/20 to-purple-600/20 mix-blend-multiply" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">
              Projetos{' '}
              <span className="bg-gradient-to-r from-flip-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Elétricos
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Soluções completas em projetos elétricos com tecnologia REVIT para máxima precisão e qualidade
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-flip-blue-500 to-flip-blue-600 hover:from-flip-blue-600 hover:to-flip-blue-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg">
                    Solicitar Orçamento
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <QuestionnaireForm />
                </DialogContent>
              </Dialog>
            </div>

            {/* Destaque REVIT */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 max-w-2xl mx-auto border border-white/20">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Laptop className="h-8 w-8 text-flip-blue-400" />
                <span className="text-2xl font-bold text-white">REVIT</span>
              </div>
              <p className="text-gray-300">
                Utilizamos o software REVIT para garantir projetos precisos, detalhados e em conformidade com as normas técnicas mais rigorosas
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">
            Nossos{' '}
            <span className="bg-gradient-to-r from-flip-blue-600 to-purple-600 bg-clip-text text-transparent">
              Serviços
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Projetos elétricos especializados com tecnologia de ponta e total conformidade com normas técnicas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={service.title} className="group relative">
              <div className={`absolute -inset-1 bg-gradient-to-r ${service.color} rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200`}></div>
              <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col">
                <div className={`bg-gradient-to-br ${service.color} p-4 rounded-2xl shadow-lg w-fit mb-6`}>
                  <service.icon className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{service.title}</h3>
                <p className="text-slate-600 mb-6 flex-grow leading-relaxed">{service.description}</p>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-gradient-to-r from-flip-blue-500 to-flip-blue-600 hover:from-flip-blue-600 hover:to-flip-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                      Solicitar Orçamento
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <QuestionnaireForm />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-flip-blue-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Pronto para seu Projeto Elétrico?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Entre em contato e receba uma proposta personalizada para seu projeto
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-white text-flip-blue-600 hover:bg-gray-100 px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg font-semibold">
                Falar com Especialista
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <QuestionnaireForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default ElectricalSection;