
import React from 'react';
import { ArrowRight, Zap, Home, Network, Users, Briefcase, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

const HomeHub = () => {
  const sections = [
    {
      title: "Energia Solar",
      description: "Descubra como nossa tecnologia solar pode revolucionar sua energia, com economia de até 95% na conta de luz e retorno do investimento garantido.",
      icon: Zap,
      link: "/solar",
      image: "/lovable-uploads/8caad8a8-5ecd-474b-90c0-b2ec116e5353.png"
    },
    {
      title: "Redes de Distribuição",
      description: "Infraestrutura elétrica segura e confiável para condomínios, empresas e propriedades rurais com sistemas de distribuição.",
      icon: Network,
      link: "/redes-distribuicao",
      image: "/lovable-uploads/babb7af6-dbb6-4095-87ea-6f672ba555db.png"
    },
    {
      title: "Projetos Elétricos",
      description: "Subestações, SPDA, carregadores VE e projetos residenciais/comerciais com tecnologia REVIT.",
      icon: Zap,
      link: "/projetos-eletricos",
      image: "/lovable-uploads/e626b717-323c-4fdc-a854-900602c999b9.png"
    },
    {
      title: "Seja um Parceiro",
      description: "Junte-se à rede Flip e tenha acesso a condições especiais, suporte técnico e oportunidades de negócio no setor energético.",
      icon: Users,
      link: "/seja-parceiro",
    },
    {
      title: "Portfólio",
      description: "Conheça nossos projetos realizados e veja como transformamos energia em economia e sustentabilidade para nossos clientes.",
      icon: Briefcase,
      link: "/portfolio",
    },
    {
      title: "Contato",
      description: "Entre em contato conosco para tirar dúvidas, solicitar orçamentos ou conhecer nossas soluções personalizadas para seu projeto.",
      icon: Phone,
      link: "/contato",
    }
  ];

  return (
    <section className="py-20 px-4 bg-background relative bg-orbs">
      <div className="absolute inset-0 bg-grid-pattern z-0"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">Nossas </span>
            <span className="gradient-text">Soluções</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Descubra como podemos transformar sua propriedade em um ecossistema energético inteligente, 
            sustentável e econômico com nossas soluções especializadas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sections.map((section) => (
            <div key={section.title} className="group relative">
              <div className="glass-card overflow-hidden h-full flex flex-col">
                {/* Image */}
                {section.image && (
                  <div className="relative h-48 overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat transform group-hover:scale-110 transition-transform duration-700"
                      style={{ backgroundImage: `url('${section.image}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <div className="glass p-3 rounded-xl">
                        <section.icon className="h-6 w-6 text-[#E100FF]" />
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Card without image */}
                {!section.image && (
                  <div className="p-8 pb-0">
                    <div className="btn-glow p-4 rounded-2xl w-fit mb-6">
                      <section.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                )}
                
                <div className="p-8 flex-grow flex flex-col">
                  <h3 className="text-2xl font-bold text-foreground mb-4">{section.title}</h3>
                  <p className="text-muted-foreground mb-6 flex-grow leading-relaxed">{section.description}</p>
                  
                  <Link to={section.link}>
                    <Button 
                      className="group/btn w-full btn-glow rounded-xl font-semibold"
                    >
                      Ver mais
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeHub;
