
import React, { useState, useEffect } from 'react';
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
  Car,
  Battery,
  Sparkles,
  ArrowRight,
  Target,
  Award,
  Users
} from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const Portfolio = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const pillars = [
    {
      icon: Zap,
      title: "Tecnologia",
      description: "Soluções inteligentes e integradas que otimizam cada etapa da cadeia energética.",
      gradient: "from-yellow-400 via-orange-500 to-red-500",
      bgGradient: "from-yellow-50 to-orange-50"
    },
    {
      icon: Leaf,
      title: "Sustentabilidade", 
      description: "Compromisso com fontes renováveis e redução de impacto ambiental.",
      gradient: "from-green-400 via-emerald-500 to-teal-500",
      bgGradient: "from-green-50 to-emerald-50"
    },
    {
      icon: Shield,
      title: "Confiabilidade",
      description: "Energia estável, segura e projetada para demandas atuais e futuras.",
      gradient: "from-blue-400 via-indigo-500 to-purple-500",
      bgGradient: "from-blue-50 to-indigo-50"
    }
  ];

  const services = [
    {
      icon: Network,
      title: "Redes MT e BT",
      description: "Projetos e instalações de redes de média e baixa tensão com foco em eficiência, confiabilidade e segurança operacional.",
      gradient: "from-blue-500 to-cyan-500",
      features: ["Projetos técnicos", "Instalação completa", "Segurança operacional"]
    },
    {
      icon: Building2,
      title: "RDU e RDR", 
      description: "Construção e manutenção de Redes de Distribuição Urbana e Rural, garantindo qualidade no fornecimento de energia em qualquer cenário.",
      gradient: "from-purple-500 to-pink-500",
      features: ["Redes urbanas", "Redes rurais", "Manutenção preventiva"]
    },
    {
      icon: Sun,
      title: "Energia Solar Fotovoltaica",
      description: "Projetos personalizados on-grid e off-grid + usinas solares de investimento para rentabilização de capital através da geração e comercialização de energia.",
      gradient: "from-yellow-500 to-orange-500",
      features: ["Sistemas on-grid", "Sistemas off-grid", "Usinas de investimento"]
    },
    {
      icon: Car,
      title: "Carregadores de Veículos Elétricos",
      description: "Infraestrutura completa para carregamento de veículos elétricos, desde projetos residenciais até pontos de recarga comerciais e industriais com tecnologia de ponta.",
      gradient: "from-emerald-500 to-teal-500",
      features: ["Carregadores residenciais", "Pontos comerciais", "Infraestrutura industrial"]
    },
    {
      icon: Building2,
      title: "Subestações Particulares", 
      description: "Projetos, construção e manutenção de subestações sob medida, assegurando estabilidade e proteção para demandas específicas.",
      gradient: "from-indigo-500 to-purple-500",
      features: ["Projetos customizados", "Construção completa", "Manutenção especializada"]
    },
    {
      icon: Wrench,
      title: "Manutenção de Inversores + Monitoramento",
      description: "Diagnóstico, manutenção preventiva e corretiva de inversores + sistema completo de monitoramento para garantir máxima performance e rápida resolução de falhas.",
      gradient: "from-red-500 to-pink-500",
      features: ["Manutenção preventiva", "Diagnóstico avançado", "Monitoramento 24/7"]
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
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl"
          style={{
            left: `${mousePosition.x / 10}px`,
            top: `${mousePosition.y / 10}px`,
            transform: 'translate(-50%, -50%)',
            transition: 'all 0.3s ease-out'
          }}
        />
      </div>

      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="relative responsive-container z-10">
          <div className="text-center max-w-5xl mx-auto">
            <div className="mb-8 animate-fade-in">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 text-primary text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4 mr-2" />
                Energia do Futuro, Hoje
              </span>
            </div>
            
            <h1 className="responsive-text-5xl font-black mb-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
              <span className="bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-x">
                Transformando a Energia
              </span>
              <br />
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent animate-gradient-x" style={{ animationDelay: '400ms' }}>
                em Autonomia e Futuro
              </span>
            </h1>
            
            <p className="responsive-text-xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '600ms' }}>
              Soluções integradas de <span className="text-primary font-semibold">geração</span>, <span className="text-secondary font-semibold">distribuição</span> e <span className="text-accent font-semibold">gestão de energia</span> para empresas, propriedades rurais e residências.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{ animationDelay: '800ms' }}>
              <Button 
                onClick={handleWhatsAppClick}
                size="lg"
                className="group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-6 text-lg font-semibold shadow-2xl hover:shadow-emerald-500/25 transform hover:scale-105 transition-all duration-500"
              >
                <span className="relative z-10 flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                  Fale Conosco Agora
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </Button>
              
              <Button 
                variant="outline"
                size="lg"
                className="group border-2 border-primary/30 hover:border-primary/60 bg-background/80 backdrop-blur-sm px-8 py-6 text-lg hover:bg-primary/5 transition-all duration-300"
              >
                <Target className="w-5 h-5 mr-2 group-hover:rotate-45 transition-transform duration-300" />
                Nossos Projetos
              </Button>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-40 right-10 w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
      </section>

      {/* Our Pillars */}
      <section className="relative responsive-py-lg z-10">
        <div className="responsive-container">
          <div className="text-center mb-20 animate-fade-in">
            <h2 className="responsive-text-4xl font-black mb-6">
              <span className="bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Nossos Pilares
              </span>
            </h2>
            <p className="responsive-text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Os valores fundamentais que guiam cada projeto e solução que desenvolvemos
            </p>
          </div>
          
          <div className="responsive-grid-3 responsive-gap-lg">
            {pillars.map((pillar, index) => (
              <Card 
                key={index} 
                className="group relative overflow-hidden bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl border-0 shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-4 animate-fade-in"
                style={{ animationDelay: `${index * 300}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${pillar.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
                <CardContent className="responsive-card-padding text-center relative z-10">
                  <div className={`relative inline-flex items-center justify-center w-20 h-20 rounded-3xl mb-8 bg-gradient-to-r ${pillar.gradient} p-[2px] group-hover:scale-110 transition-transform duration-500`}>
                    <div className="flex items-center justify-center w-full h-full bg-background rounded-3xl">
                      <pillar.icon className="w-10 h-10 text-transparent bg-gradient-to-r bg-clip-text group-hover:scale-110 transition-transform duration-500" style={{ 
                        backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text'
                      }} />
                    </div>
                  </div>
                  <h3 className="responsive-text-2xl font-black mb-6 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text transition-all duration-500" style={{
                    backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`
                  }}>
                    {pillar.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-500">
                    {pillar.description}
                  </p>
                </CardContent>
                
                {/* Animated border */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${pillar.gradient} p-[2px]`}>
                    <div className="w-full h-full rounded-xl bg-background"></div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="relative responsive-py-lg z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-muted/20 via-transparent to-secondary/10"></div>
        <div className="responsive-container relative">
          <div className="text-center mb-20 animate-fade-in">
            <h2 className="responsive-text-4xl font-black mb-6">
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Nossos Serviços
              </span>
            </h2>
            <p className="responsive-text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Soluções completas e integradas para todas as suas necessidades energéticas, desde projetos residenciais até complexas infraestruturas industriais
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card 
                key={index}
                className="group relative overflow-hidden cursor-pointer border-0 bg-gradient-to-br from-background/90 to-background/60 backdrop-blur-xl hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-2 animate-fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
                onClick={() => toggleCard(index)}
              >
                {/* Animated gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-700`}></div>
                
                <CardContent className="responsive-card-padding relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className={`relative p-4 rounded-2xl bg-gradient-to-r ${service.gradient} group-hover:scale-110 transition-all duration-500`}>
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className={`p-2 rounded-full bg-gradient-to-r ${service.gradient} transition-transform duration-300 ${expandedCard === index ? 'rotate-180' : ''}`}>
                      <ChevronDown className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="responsive-text-xl font-black mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text transition-all duration-500" style={{
                    backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`
                  }}>
                    {service.title}
                  </h3>
                  
                  <div className={`overflow-hidden transition-all duration-700 ${
                    expandedCard === index ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0'
                  }`}>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {service.description}
                    </p>
                    
                    <div className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-muted-foreground">
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.gradient} mr-3`}></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {expandedCard !== index && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="group/btn w-full justify-between text-muted-foreground hover:text-foreground transition-all duration-300"
                    >
                      <span>Descobrir mais</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </Button>
                  )}
                </CardContent>
                
                {/* Animated border */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${service.gradient} p-[1px]`}>
                    <div className="w-full h-full rounded-xl bg-background"></div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Value Case Section */}
      <section className="relative responsive-py-lg z-10">
        <div className="responsive-container">
          <Card className="relative overflow-hidden bg-gradient-to-br from-background/95 to-background/80 backdrop-blur-2xl border-0 shadow-3xl animate-fade-in">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 animate-gradient-x"></div>
            
            <CardContent className="responsive-card-padding text-center relative z-10">
              <div className="mb-8">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-primary to-secondary rounded-full mb-6 animate-float">
                  <BarChart3 className="w-12 h-12 text-white" />
                </div>
              </div>
              
              <h2 className="responsive-text-3xl font-black mb-8 max-w-4xl mx-auto">
                <span className="bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Mais do que energia:
                </span>
                <br />
                <span className="text-foreground">
                  base para desenvolvimento, produtividade e autonomia
                </span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 mb-12">
                {[
                  { number: "95%", label: "Redução nos custos de energia", icon: Target, color: "from-emerald-500 to-teal-500" },
                  { number: "500+", label: "Projetos executados", icon: Award, color: "from-blue-500 to-purple-500" },
                  { number: "10 anos", label: "De experiência no mercado", icon: Users, color: "from-orange-500 to-red-500" }
                ].map((stat, index) => (
                  <div key={index} className="group text-center animate-fade-in" style={{ animationDelay: `${index * 300}ms` }}>
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-500`}>
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className={`responsive-text-4xl font-black mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-500`}>
                      {stat.number}
                    </div>
                    <p className="text-muted-foreground font-medium">{stat.label}</p>
                  </div>
                ))}
              </div>
              
              <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 mt-12">
                <Battery className="w-12 h-12 mx-auto mb-4 text-primary animate-float" />
                <p className="responsive-text-lg text-foreground font-semibold max-w-4xl mx-auto">
                  "Utilizamos o software <span className="text-primary font-black">REVIT</span> para garantir precisão técnica e qualidade excepcional em todos os nossos projetos elétricos, proporcionando soluções inovadoras e confiáveis."
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative responsive-py-lg overflow-hidden z-10">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        
        <div className="responsive-container text-center relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="mb-12 animate-fade-in">
              <h2 className="responsive-text-4xl font-black mb-8">
                <span className="bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Pronto para transformar
                </span>
                <br />
                <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                  sua relação com a energia?
                </span>
              </h2>
              <p className="responsive-text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Entre em contato e descubra como podemos <span className="text-primary font-semibold">personalizar uma solução</span> perfeita para suas necessidades energéticas.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12 animate-fade-in" style={{ animationDelay: '300ms' }}>
              <Button 
                onClick={handleWhatsAppClick}
                size="lg"
                className="group relative overflow-hidden bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-10 py-6 text-xl font-bold shadow-2xl hover:shadow-green-500/25 transform hover:scale-105 transition-all duration-500"
              >
                <span className="relative z-10 flex items-center">
                  <MessageCircle className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                  Fale pelo WhatsApp
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </Button>
              
              <Button 
                variant="outline"
                size="lg"
                asChild
                className="group border-2 border-primary/40 hover:border-primary/80 bg-background/90 backdrop-blur-sm px-10 py-6 text-xl font-bold hover:bg-primary/10 transition-all duration-500 transform hover:scale-105"
              >
                <a href="https://www.flipeng.com.br" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                  Visite nosso site
                </a>
              </Button>
            </div>
            
            {/* Social Media */}
            <div className="flex justify-center items-center gap-6 animate-fade-in" style={{ animationDelay: '600ms' }}>
              <span className="text-lg text-muted-foreground font-medium">Nos siga nas redes:</span>
              <Button 
                variant="ghost" 
                size="lg"
                asChild
                className="group relative p-4 rounded-2xl bg-gradient-to-r from-pink-500/10 to-purple-500/10 hover:from-pink-500/20 hover:to-purple-500/20 transition-all duration-500 transform hover:scale-110"
              >
                <a href="https://instagram.com/flip_energy" target="_blank" rel="noopener noreferrer">
                  <Instagram className="w-8 h-8 text-pink-500 group-hover:rotate-12 transition-transform duration-300" />
                </a>
              </Button>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full blur-2xl animate-float"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '3s' }}></div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Portfolio;
