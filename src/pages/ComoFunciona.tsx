
import React from 'react';
import Navigation from '../components/Navigation';
import SolarSection from '../components/SolarSection';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

const ComoFunciona = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-16">
        <SolarSection />
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ComoFunciona;
