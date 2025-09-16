
import React, { useState } from 'react';
import { 
  Zap, 
  Leaf, 
  Shield, 
  Network, 
  Sun, 
  Building2, 
  Wrench, 
  BarChart3,
  MessageCircle,
  ExternalLink,
  Instagram,
  ChevronDown,
  ChevronUp,
  Play
} from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const Portfolio = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const pillars = [
    {
      icon: Zap,
      title: "Tecnologia",
      description: "Soluções inteligentes e integradas que otimizam cada etapa da cadeia energética."
    },
    {
      icon: Leaf,
      title: "Sustentabilidade", 
      description: "Compromisso com fontes renováveis e redução de impacto ambiental."
    },
    {
      icon: Shield,
      title: "Confiabilidade",
      description: "Energia estável, segura e projetada para demandas atuais e futuras."
    }
  ];

  const services = [
    {
      icon: Network,
      title: "Redes MT e BT",
      description: "Projetos e instalações de redes de média e baixa tensão com foco em eficiência, confiabilidade e segurança operacional."
    },
    {
      icon: Building2,
      title: "RDU e RDR", 
      description: "Construção e manutenção de Redes de Distribuição Urbana e Rural, garantindo qualidade no fornecimento de energia em qualquer cenário."
    },
    {
      icon: Sun,
      title: "Energia Solar Fotovoltaica",
      description: "Projetos personalizados on-grid e off-grid + usinas solares de investimento para rentabilização de capital através da geração e comercialização de energia."
    },
    {
      icon: Building2,
      title: "Subestações Particulares", 
      description: "Projetos, construção e manutenção de subestações sob medida, assegurando estabilidade e proteção para demandas específicas."
    },
    {
      icon: Wrench,
      title: "Manutenção de Inversores + Monitoramento",
      description: "Diagnóstico, manutenção preventiva e corretiva de inversores + sistema completo de monitoramento para garantir máxima performance e rápida resolução de falhas."
    }
  ];

  const handleWhatsAppClick = () => {
    const phoneNumber = '556293175498';
    const message = 'Olá! Gostaria de saber mais sobre as soluções da FLIP Engenharia.';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const toggleCard = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10">
        <div className="absolute inset-0 bg-grid-pattern opacity-50"></div>
        <div className="relative responsive-container">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <h1 className="responsive-text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent animate-gradient-x">
              Transformando a Energia em Autonomia e Futuro
            </h1>
            <p className="responsive-text-xl text-muted-foreground mb-8 leading-relaxed">
              Soluções integradas de geração, distribuição e gestão de energia para empresas, propriedades rurais e residências.
            </p>
            <Button 
              onClick={handleWhatsAppClick}
              size="lg"
              className="responsive-text-lg px-8 py-6 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <MessageCircle className="responsive-icon-md mr-2" />
              Entre em Contato
            </Button>
          </div>
        </div>
        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
          <div className="w-20 h-20 bg-primary/10 rounded-full animate-float"></div>
        </div>
      </section>

      {/* Our Pillars */}
      <section className="responsive-py-lg">
        <div className="responsive-container">
          <div className="text-center mb-16">
            <h2 className="responsive-text-4xl font-bold mb-4 text-foreground">
              Nossos Pilares
            </h2>
            <p className="responsive-text-lg text-muted-foreground max-w-2xl mx-auto">
              Os valores que guiam cada projeto e solução
            </p>
          </div>
          
          <div className="responsive-grid-3 responsive-gap-lg">
            {pillars.map((pillar, index) => (
              <Card 
                key={index} 
                className="responsive-card group hover:shadow-2xl transition-all duration-500 animate-fade-in border-0 bg-gradient-to-br from-card to-card/50"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardContent className="responsive-card-padding text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                    <pillar.icon className="responsive-icon-xl text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="responsive-text-2xl font-bold mb-4 text-foreground">
                    {pillar.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {pillar.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="responsive-py-lg bg-gradient-to-br from-muted/30 to-background">
        <div className="responsive-container">
          <div className="text-center mb-16">
            <h2 className="responsive-text-4xl font-bold mb-4 text-foreground">
              Nossos Serviços
            </h2>
            <p className="responsive-text-lg text-muted-foreground max-w-3xl mx-auto">
              Soluções completas para todas as suas necessidades energéticas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card 
                key={index}
                className="responsive-card group cursor-pointer border-0 bg-gradient-to-br from-card to-card/80 animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
                onClick={() => toggleCard(index)}
              >
                <CardContent className="responsive-card-padding">
                  <div className="flex items-center justify-between mb-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors duration-300">
                      <service.icon className="responsive-icon-lg text-primary group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    {expandedCard === index ? 
                      <ChevronUp className="responsive-icon-md text-primary transition-transform duration-300" /> :
                      <ChevronDown className="responsive-icon-md text-muted-foreground transition-transform duration-300" />
                    }
                  </div>
                  
                  <h3 className="responsive-text-xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <div className={`overflow-hidden transition-all duration-500 ${
                    expandedCard === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <p className="text-muted-foreground leading-relaxed pb-4">
                      {service.description}
                    </p>
                  </div>
                  
                  {expandedCard !== index && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="mt-2 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                    >
                      Saiba Mais
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Value Case Section */}
      <section className="responsive-py-lg">
        <div className="responsive-container">
          <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20 animate-fade-in">
            <CardContent className="responsive-card-padding text-center">
              <BarChart3 className="w-16 h-16 mx-auto mb-6 text-primary animate-float" />
              <h2 className="responsive-text-3xl font-bold mb-6 text-foreground">
                Mais do que energia: base para desenvolvimento, produtividade e autonomia
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="responsive-text-4xl font-bold text-primary mb-2">95%</div>
                  <p className="text-muted-foreground">Redução nos custos de energia</p>
                </div>
                <div className="text-center">
                  <div className="responsive-text-4xl font-bold text-primary mb-2">500+</div>
                  <p className="text-muted-foreground">Projetos executados</p>
                </div>
                <div className="text-center">
                  <div className="responsive-text-4xl font-bold text-primary mb-2">10 anos</div>
                  <p className="text-muted-foreground">De experiência no mercado</p>
                </div>
              </div>
              <p className="responsive-text-lg text-muted-foreground mt-8 max-w-3xl mx-auto italic">
                "Utilizamos o software REVIT para garantir precisão técnica e qualidade excepcional em todos os nossos projetos elétricos."
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Final CTA */}
      <section className="responsive-py-lg bg-gradient-to-br from-primary/5 via-background to-primary/10">
        <div className="responsive-container text-center">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h2 className="responsive-text-4xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
              Pronto para transformar sua relação com a energia?
            </h2>
            <p className="responsive-text-xl text-muted-foreground mb-8 leading-relaxed">
              Entre em contato e descubra como podemos personalizar uma solução para você.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button 
                onClick={handleWhatsAppClick}
                size="lg"
                className="responsive-text-lg px-8 py-6 bg-green-500 hover:bg-green-600 text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <MessageCircle className="responsive-icon-md mr-2" />
                Fale pelo WhatsApp
              </Button>
              
              <Button 
                variant="outline"
                size="lg"
                asChild
                className="responsive-text-lg px-8 py-6 hover:bg-primary hover:text-primary-foreground transform hover:scale-105 transition-all duration-300"
              >
                <a href="https://www.flipeng.com.br" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="responsive-icon-md mr-2" />
                  Visite nosso site
                </a>
              </Button>
            </div>
            
            <div className="flex justify-center items-center gap-4">
              <span className="text-muted-foreground">Nos siga nas redes:</span>
              <Button 
                variant="ghost" 
                size="sm"
                asChild
                className="hover:text-pink-500 transition-colors duration-300 hover:scale-110"
              >
                <a href="https://instagram.com/flip_energy" target="_blank" rel="noopener noreferrer">
                  <Instagram className="responsive-icon-md" />
                </a>
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
