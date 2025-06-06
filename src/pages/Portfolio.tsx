
import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

const Portfolio = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-16">
        <div className="py-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-flip-gray-900 mb-8">
              Nosso Portfólio
            </h2>
            <p className="text-lg text-flip-gray-600 mb-12">
              Conheça alguns dos nossos projetos realizados
            </p>
            <div className="bg-flip-blue-50 rounded-lg p-12">
              <p className="text-flip-gray-600">
                Seção em desenvolvimento - Em breve você poderá ver nossos principais projetos
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Portfolio;
