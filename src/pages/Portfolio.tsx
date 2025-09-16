import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import {
  Zap,
  Settings,
  Sun,
  Building2,
  Wrench,
  Phone,
  Globe,
  Instagram,
  ArrowRight,
  Target,
  Shield,
  Lightbulb,
  Car,
  ChevronRight
} from "lucide-react";
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

const Portfolio = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.fade-in-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      id: 1,
      title: "Redes MT e BT",
      description: "Projetos e instalações de redes de média e baixa tensão com foco em eficiência e segurança.",
      icon: Zap,
      category: "Infraestrutura"
    },
    {
      id: 2,
      title: "Redes de Distribuição",
      description: "Construção e manutenção de Redes de Distribuição Urbana e Rural para qualidade no fornecimento.",
      icon: Settings,
      category: "Distribuição"
    },
    {
      id: 3,
      title: "Energia Solar Fotovoltaica",
      description: "Projetos on-grid e off-grid + usinas solares para rentabilização através da geração de energia.",
      icon: Sun,
      category: "Renovável"
    },
    {
      id: 4,
      title: "Subestações Particulares",
      description: "Projetos, construção e manutenção de subestações sob medida para demandas específicas.",
      icon: Building2,
      category: "Infraestrutura"
    },
    {
      id: 5,
      title: "Carregadores de Veículos Elétricos",
      description: "Infraestrutura completa para estações de carregamento de veículos elétricos.",
      icon: Car,
      category: "Mobilidade"
    },
    {
      id: 6,
      title: "Manutenção e Monitoramento",
      description: "Diagnóstico e manutenção de inversores + monitoramento completo de geração.",
      icon: Wrench,
      category: "Manutenção"
    }
  ];

  const pillars = [
    {
      icon: Lightbulb,
      title: "Tecnologia",
      description: "Soluções inteligentes que otimizam cada etapa da cadeia energética."
    },
    {
      icon: Target,
      title: "Sustentabilidade", 
      description: "Compromisso com fontes renováveis e redução de impacto ambiental."
    },
    {
      icon: Shield,
      title: "Confiabilidade",
      description: "Energia estável, segura e projetada para demandas atuais e futuras."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative py-32 lg:py-40 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-12">
            <div className="fade-in-on-scroll space-y-6">
              <h1 className="text-5xl lg:text-7xl font-light text-foreground tracking-tight leading-tight">
                Transformando Energia
                <span className="block text-primary font-medium">em Autonomia</span>
              </h1>
            </div>
            
            <div className="fade-in-on-scroll">
              <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light">
                Soluções integradas de geração, distribuição e gestão de energia 
                para empresas, propriedades rurais e residências.
              </p>
            </div>

            <div className="fade-in-on-scroll pt-8">
              <Button 
                size="lg"
                className="text-base px-12 py-6 rounded-full bg-primary hover:bg-primary/90 transition-all duration-300 font-medium"
                onClick={() => window.open('https://wa.me/5562993175498', '_blank')}
              >
                Entre em Contato
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-24 bg-muted/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-16">
            {pillars.map((pillar, index) => (
              <div 
                key={index}
                className="fade-in-on-scroll text-center space-y-6"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="w-20 h-20 mx-auto bg-primary/10 rounded-3xl flex items-center justify-center">
                  <pillar.icon className="h-10 w-10 text-primary" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-medium text-foreground">{pillar.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg font-light">{pillar.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 fade-in-on-scroll space-y-4">
            <h2 className="text-4xl lg:text-5xl font-light text-foreground">
              Nossos Serviços
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-light">
              Soluções completas em energia, do projeto à manutenção.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={service.id}
                className="fade-in-on-scroll group bg-card border border-border/50 rounded-3xl p-10 hover:border-primary/20 hover:shadow-lg transition-all duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="space-y-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <service.icon className="h-8 w-8 text-primary" />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="text-xs font-medium text-primary uppercase tracking-wider">
                      {service.category}
                    </div>
                    <h3 className="text-xl font-medium text-foreground">
                      {service.title}
                    </h3>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed font-light">
                    {service.description}
                  </p>
                  
                  <div className="pt-2">
                    <div className="flex items-center text-primary group-hover:translate-x-1 transition-transform duration-300">
                      <span className="text-sm font-medium">Saiba mais</span>
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-muted/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="fade-in-on-scroll space-y-12">
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-light text-foreground">
                Pronto para transformar sua relação com a energia?
              </h2>
              
              <p className="text-xl text-muted-foreground font-light">
                Entre em contato e descubra como podemos personalizar uma solução para você.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                size="lg"
                onClick={() => window.open('https://wa.me/5562993175498', '_blank')}
                className="text-base px-12 py-6 rounded-full bg-primary hover:bg-primary/90 font-medium"
              >
                <Phone className="mr-3 h-5 w-5" />
                Fale pelo WhatsApp
              </Button>
              
              <Button 
                variant="outline"
                size="lg"
                onClick={() => window.open('https://www.flipeng.com.br', '_blank')}
                className="text-base px-12 py-6 rounded-full border-2 border-border hover:border-primary/20 font-medium"
              >
                <Globe className="mr-3 h-5 w-5" />
                Visite nosso site
              </Button>
            </div>
            
            <div className="pt-8">
              <Button
                variant="ghost"
                onClick={() => window.open('https://instagram.com/flip_energy', '_blank')}
                className="text-muted-foreground hover:text-primary font-light"
              >
                <Instagram className="mr-2 h-5 w-5" />
                @flip_energy
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Portfolio;