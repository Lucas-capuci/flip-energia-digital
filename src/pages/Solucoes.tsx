
import React from 'react';
import Navigation from '../components/Navigation';
import AutomationSection from '../components/AutomationSection';
import NetworkSection from '../components/NetworkSection';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

const Solucoes = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-16">
        <AutomationSection />
        <NetworkSection />
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Solucoes;
