
import React from 'react';
import Navigation from '../components/Navigation';
import PartnerSection from '../components/PartnerSection';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

const SejaParceiro = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-16">
        <PartnerSection />
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default SejaParceiro;
