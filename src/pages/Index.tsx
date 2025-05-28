// src/pages/Index.tsx

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
      <Navigation />
      
      <section id="inicio">
        <Hero />
      </section>

      <section id="solucoes">
        
        <AutomationSection />
        <NetworkSection />
      </section>

      {/* Removida a seção id="orcamento" vazia */}

      <section id="portfolio">
        {/* Conteúdo da seção de Portfólio */}
      </section>

      <section id="calculadora">
        <SolarSection />
      </section>

      <section id="contato">
        <Footer />
      </section>

      <WhatsAppButton />
    </div>
  );
};

export default Index;
