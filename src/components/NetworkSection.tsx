import React from 'react';
import { Network, Shield, TrendingDown, Zap, CheckCircle, Settings, Wrench, Power, Cable } from 'lucide-react';

const NetworkSection = () => {
  const benefits = [
    { icon: Shield, title: 'Segurança Máxima', description: 'Rede privada com proteções avançadas contra interrupções e falhas do sistema público.', delay: '0s' },
    { icon: CheckCircle, title: 'Confiabilidade', description: 'Fornecimento ininterrupto de energia com redundâncias e sistemas de backup.', delay: '0.2s' },
    { icon: TrendingDown, title: 'Redução de Custos', description: 'Eliminação de perdas na transmissão e taxas de distribuição pública.', delay: '0.4s' }
  ];

  const applications = [
    { text: 'Condomínios residenciais e comerciais', icon: '🏢' },
    { text: 'Complexos industriais', icon: '🏭' },
    { text: 'Fazendas e propriedades rurais', icon: '🚜' },
    { text: 'Centros comerciais e shopping centers', icon: '🛒' },
    { text: 'Hospitais e clínicas', icon: '🏥' },
    { text: 'Instituições de ensino', icon: '🎓' }
  ];

  const services = [
    { icon: Settings, title: 'Projeto Personalizado', description: 'Projeto personalizado para cada necessidade específica do cliente' },
    { icon: Zap, title: 'Instalação Completa', description: 'Instalação de redes de média e baixa tensão com qualidade superior' },
    { icon: Shield, title: 'Sistemas de Proteção', description: 'Sistemas de proteção e automação de última geração' },
    { icon: Wrench, title: 'Manutenção Completa', description: 'Manutenção preventiva e corretiva especializada' },
    { icon: CheckCircle, title: 'Conformidade', description: 'Total conformidade com normas ABNT e ANEEL' }
  ];

  const networkFeatures = [
    { icon: Power, title: 'Subestações Inteligentes', description: 'Transformadores de alta eficiência com monitoramento automático' },
    { icon: Cable, title: 'Cabos de Alta Performance', description: 'Cabos especiais para minimizar perdas e maximizar segurança' },
    { icon: Shield, title: 'Proteção Avançada', description: 'Sistemas de proteção contra surtos e sobrecargas' },
    { icon: Network, title: 'Topologia Otimizada', description: 'Distribuição inteligente para máxima eficiência' },
    { icon: Zap, title: 'Backup Automático', description: 'Sistemas redundantes para fornecimento contínuo' }
  ];

  return (
    <section id="redes" className="responsive-py-lg bg-background relative bg-orbs overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern z-0"></div>
      <div className="responsive-container relative z-10">
        {/* Header */}
        <div className="text-center responsive-py-md animate-fade-in">
          <div className="flex justify-center mb-4 sm:mb-6 lg:mb-8">
            <div className="relative">
              <div className="absolute -inset-2 sm:-inset-3 bg-gradient-to-r from-[#7F00FF]/40 to-[#E100FF]/40 rounded-full blur-xl sm:blur-2xl animate-pulse"></div>
              <div className="relative glass p-4 sm:p-5 lg:p-6 rounded-full">
                <Network className="responsive-icon-xl text-[#E100FF]" />
              </div>
            </div>
          </div>
          
          <h2 className="responsive-text-5xl font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">Redes de Distribuição</span>
            <br />
            <span className="gradient-text">Privadas</span>
          </h2>
          
          <div className="w-20 sm:w-24 lg:w-32 h-1 bg-gradient-to-r from-[#7F00FF] to-[#E100FF] mx-auto mb-4 sm:mb-6 rounded-full"></div>
          
          <p className="responsive-text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Projetamos e executamos redes elétricas de média e baixa tensão para 
            garantir <span className="font-bold text-[#E100FF]">autonomia</span>, 
            <span className="font-bold text-[#7F00FF]"> segurança</span> e eficiência energética total.
          </p>
        </div>

        {/* Benefits */}
        <div className="responsive-grid-3 responsive-gap-lg mb-12 sm:mb-16 lg:mb-20">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="group relative animate-fade-in" style={{ animationDelay: benefit.delay }}>
              <div className="glass-card p-6 sm:p-8 h-full text-center">
                <div className="btn-glow p-3 sm:p-4 lg:p-5 rounded-xl sm:rounded-2xl w-fit mx-auto mb-4 sm:mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="responsive-icon-lg text-white" />
                </div>
                <h3 className="responsive-text-2xl font-bold text-foreground mb-2 sm:mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed responsive-text-base">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Network Features */}
        <div className="mb-12 sm:mb-16">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="responsive-text-4xl font-bold text-foreground mb-4">
              Tecnologia de <span className="gradient-text">Distribuição</span>
            </h3>
            <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-[#7F00FF] to-[#E100FF] mx-auto mb-4 rounded-full"></div>
            <p className="responsive-text-lg text-muted-foreground max-w-3xl mx-auto">
              Infraestrutura elétrica de alta performance para máxima confiabilidade
            </p>
          </div>

          <div className="responsive-grid-3 responsive-gap">
            {networkFeatures.map((feature) => (
              <div key={feature.title} className="group">
                <div className="glass-card p-4 sm:p-6 h-full">
                  <div className="btn-glow p-2 sm:p-3 rounded-lg sm:rounded-xl w-fit mb-3 sm:mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="responsive-icon-md text-white" />
                  </div>
                  <h4 className="font-bold text-foreground mb-2 responsive-text-lg group-hover:text-[#E100FF] transition-colors">{feature.title}</h4>
                  <p className="text-muted-foreground responsive-text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="responsive-grid-2 responsive-gap-lg">
          {/* Applications */}
          <div className="glass-card overflow-hidden h-full">
            <div className="h-1 bg-gradient-to-r from-[#7F00FF] to-[#E100FF]"></div>
            <div className="p-6 sm:p-8">
              <div className="flex items-center mb-6">
                <div className="btn-glow p-2 rounded-lg mr-3"><Zap className="responsive-icon-md text-white" /></div>
                <div>
                  <h3 className="responsive-text-2xl font-bold text-foreground">Aplicações</h3>
                  <p className="text-muted-foreground responsive-text-base">Ideal para diversos tipos de empreendimentos</p>
                </div>
              </div>
              <div className="space-y-3 sm:space-y-4">
                {applications.map((app, i) => (
                  <div key={i} className="flex items-center p-3 sm:p-4 glass rounded-lg sm:rounded-xl hover:border-[#E100FF]/30 transition-all duration-300 group/item">
                    <span className="text-xl sm:text-2xl mr-3 sm:mr-4">{app.icon}</span>
                    <span className="text-muted-foreground font-medium group-hover/item:text-foreground transition-colors flex-1 responsive-text-base">{app.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="glass-card overflow-hidden h-full">
            <div className="h-1 bg-gradient-to-r from-[#E100FF] to-[#7F00FF]"></div>
            <div className="p-6 sm:p-8">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-br from-[#E100FF] to-[#7F00FF] p-2 rounded-lg mr-3 shadow-lg"><Shield className="responsive-icon-md text-white" /></div>
                <div>
                  <h3 className="responsive-text-2xl font-bold text-foreground">Nossos Serviços</h3>
                  <p className="text-muted-foreground responsive-text-base">Soluções completas em infraestrutura elétrica</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:gap-4">
                {services.map((service, i) => (
                  <div key={i} className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 glass rounded-lg sm:rounded-xl hover:border-[#E100FF]/30 transition-all duration-300 group/service">
                    <div className="btn-glow p-2 sm:p-3 rounded-lg sm:rounded-xl group-hover/service:shadow-lg transition-all duration-300 transform group-hover/service:scale-110 flex-shrink-0">
                      <service.icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-foreground mb-1 group-hover/service:text-[#E100FF] transition-colors responsive-text-base">{service.title}</h4>
                      <p className="responsive-text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NetworkSection;
