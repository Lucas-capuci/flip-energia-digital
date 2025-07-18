
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
      color: "from-flip-blue-500 to-cyan-500",
      image: "/lovable-uploads/8caad8a8-5ecd-474b-90c0-b2ec116e5353.png"
    },
    {
      title: "Redes de Distribuição",
      description: "Infraestrutura elétrica segura e confiável para condomínios, empresas e propriedades rurais com sistemas de distribuição privados.",
      icon: Network,
      link: "/redes-distribuicao",
      color: "from-emerald-500 to-teal-500",
      image: "/lovable-uploads/babb7af6-dbb6-4095-87ea-6f672ba555db.png"
    },
    {
      title: "Seja um Parceiro",
      description: "Junte-se à rede Flip e tenha acesso a condições especiais, suporte técnico e oportunidades de negócio no setor energético.",
      icon: Users,
      link: "/seja-parceiro",
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Portfólio",
      description: "Conheça nossos projetos realizados e veja como transformamos energia em economia e sustentabilidade para nossos clientes.",
      icon: Briefcase,
      link: "/portfolio",
      color: "from-indigo-500 to-purple-500"
    },
    {
      title: "Contato",
      description: "Entre em contato conosco para tirar dúvidas, solicitar orçamentos ou conhecer nossas soluções personalizadas para seu projeto.",
      icon: Phone,
      link: "/contato",
      color: "from-pink-500 to-rose-500"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Nossas{' '}
            <span className="bg-gradient-to-r from-flip-blue-600 to-purple-600 bg-clip-text text-transparent">
              Soluções
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Descubra como podemos transformar sua propriedade em um ecossistema energético inteligente, 
            sustentável e econômico com nossas soluções especializadas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sections.map((section, index) => (
            <div key={section.title} className="group relative">
              <div className={`absolute -inset-1 bg-gradient-to-r ${section.color} rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200`}></div>
              <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col">
                {/* Imagem de fundo para cards com imagem */}
                {section.image && (
                  <div className="relative h-48 overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat transform group-hover:scale-110 transition-transform duration-700"
                      style={{
                        backgroundImage: `url('${section.image}')`
                      }}
                    />
                    {/* Overlay gradiente elegante */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent`}></div>
                    <div className={`absolute inset-0 bg-gradient-to-br ${section.color} opacity-20 mix-blend-multiply`}></div>
                    
                    {/* Ícone posicionado sobre a imagem */}
                    <div className="absolute bottom-4 left-4">
                      <div className={`bg-white/20 backdrop-blur-md p-3 rounded-xl shadow-lg border border-white/30`}>
                        <section.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Card sem imagem mantém o layout original */}
                {!section.image && (
                  <div className="p-8 pb-0">
                    <div className={`bg-gradient-to-br ${section.color} p-4 rounded-2xl shadow-lg w-fit mb-6`}>
                      <section.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                )}
                
                <div className="p-8 flex-grow flex flex-col">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{section.title}</h3>
                  <p className="text-slate-600 mb-6 flex-grow leading-relaxed">{section.description}</p>
                  
                  <Link to={section.link}>
                    <Button 
                      className="group/btn w-full bg-gradient-to-r from-flip-blue-500 to-flip-blue-600 hover:from-flip-blue-600 hover:to-flip-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
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
