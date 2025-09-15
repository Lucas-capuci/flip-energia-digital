import React from 'react';
import Navigation from '../components/Navigation';
import ElectricalSection from '../components/ElectricalSection';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

const ProjetosEletricos = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-16">
        <ElectricalSection />
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ProjetosEletricos;