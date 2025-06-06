
import React from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import HomeHub from '../components/HomeHub';
import WhatsAppButton from '../components/WhatsAppButton';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section id="inicio">
        <Hero />
      </section>

      <section id="hub">
        <HomeHub />
      </section>

      <section id="contato">
        <Footer />
      </section>

      <WhatsAppButton />
    </div>
  );
};

export default Index;
