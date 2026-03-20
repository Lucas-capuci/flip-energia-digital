import React from 'react';
import { Zap, Car, Sun, Building2, Home, Shield, Laptop } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import QuestionnaireForm from './QuestionnaireForm';

const ElectricalSection = () => {
  const services = [
    { title: "Projetos de Subestações", description: "Subestações aéreas e abrigadas até 2 kVA com projeto completo de infraestrutura elétrica.", icon: Zap },
    { title: "Infraestrutura para Carregadores VE", description: "Projetos especializados para instalação de carregadores de veículos elétricos residenciais e comerciais.", icon: Car },
    { title: "Sistemas de Energia Fotovoltaica", description: "Projetos elétricos completos para sistemas solares residenciais, comerciais e industriais.", icon: Sun },
    { title: "Múltiplas Unidades Consumidoras", description: "Projetos para condomínios e complexos com múltiplas unidades consumidoras independentes.", icon: Building2 },
    { title: "Projetos Residenciais e Comerciais", description: "Instalações elétricas completas para residências, comércios e pequenas indústrias.", icon: Home },
    { title: "Projeto de SPDA", description: "Sistema de Proteção contra Descargas Atmosféricas conforme normas técnicas vigentes.", icon: Shield }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-orbs bg-dark-base">
        <div className="absolute inset-0 bg-grid-pattern z-[1]"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-8">
              <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">Projetos </span>
              <span className="gradient-text">Elétricos</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto">
              Soluções completas em projetos elétricos com tecnologia REVIT para máxima precisão e qualidade
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="btn-glow rounded-full px-8 py-3 text-lg font-semibold">
                    Solicitar Orçamento
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <QuestionnaireForm />
                </DialogContent>
              </Dialog>
            </div>

            {/* REVIT highlight */}
            <div className="glass rounded-2xl p-6 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Laptop className="h-8 w-8 text-[#E100FF]" />
                <span className="text-2xl font-bold text-foreground">REVIT</span>
              </div>
              <p className="text-muted-foreground">
                Utilizamos o software REVIT para garantir projetos precisos, detalhados e em conformidade com as normas técnicas mais rigorosas
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">
            <span className="text-foreground">Nossos </span>
            <span className="gradient-text">Serviços</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Projetos elétricos especializados com tecnologia de ponta e total conformidade com normas técnicas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.title} className="group">
              <div className="glass-card p-8 h-full flex flex-col">
                <div className="btn-glow p-4 rounded-2xl w-fit mb-6">
                  <service.icon className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-foreground mb-4">{service.title}</h3>
                <p className="text-muted-foreground mb-6 flex-grow leading-relaxed">{service.description}</p>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full btn-glow rounded-xl font-semibold">
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
      <div className="relative bg-orbs bg-dark-base py-16">
        <div className="absolute inset-0 bg-grid-pattern z-0"></div>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Pronto para seu Projeto Elétrico?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Entre em contato e receba uma proposta personalizada para seu projeto
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="btn-glow rounded-full px-8 py-3 text-lg font-semibold">
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
