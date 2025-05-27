
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
      <Hero />
      
      <div id="solucoes">
        <SolarSection />
        <AutomationSection />
        <NetworkSection />
      </div>
      
      <IntegrationSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
