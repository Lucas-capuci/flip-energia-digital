
import React from 'react';
import Navigation from '../components/Navigation';
import ContactPage from '../components/ContactPage';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

const Contato = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-16">
        <ContactPage />
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Contato;
