
import React from 'react';
import Navigation from '../components/Navigation';
import AutomationSection from '../components/AutomationSection';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

const ProjetosEletricos = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-16">
        <AutomationSection />
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ProjetosEletricos;
