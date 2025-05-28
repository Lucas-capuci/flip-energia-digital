import React from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import SolarSection from '../components/SolarSection';
import AutomationSection from '../components/AutomationSection';
import NetworkSection from '../components/NetworkSection';
import IntegrationSection from '../components/IntegrationSection';
import WhatsAppButton from '../components/WhatsAppButton';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <div id="inicio">
        <Navigation />
        <Hero />
      </div>

      <div id="solucoes">
        <SolarSection />
        <AutomationSection />
        <NetworkSection />
      </div>

      <div id="orcamento" className="h-screen bg-gray-100 flex items-center justify-center text-2xl font-semibold">
        Seção Orçamento
      </div>

      <div id="portfolio" className="h-screen bg-gray-200 flex items-center justify-center text-2xl font-semibold">
        Seção Portfólio
      </div>

      <div id="calculadora" className="h-screen bg-gray-300 flex items-center justify-center text-2xl font-semibold">
        Seção Calculadora
      </div>

      <div id="contato" className="h-screen bg-gray-400 flex items-center justify-center text-2xl font-semibold">
        Seção Contato
      </div>

      <IntegrationSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
