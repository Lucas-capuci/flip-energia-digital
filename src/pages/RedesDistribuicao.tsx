
import React from 'react';
import Navigation from '../components/Navigation';
import NetworkSection from '../components/NetworkSection';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

const RedesDistribuicao = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-16">
        <NetworkSection />
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default RedesDistribuicao;
