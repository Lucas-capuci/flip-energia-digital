
import React from 'react';
import { Home, Smartphone, Zap, Shield, Wifi, Lightbulb, Thermometer, Camera, Lock, Speaker } from 'lucide-react';

const AutomationSection = () => {
  const benefits = [
    { icon: Smartphone, title: 'Controle Inteligente', description: 'Controle total da sua casa através do smartphone, tablet ou comandos de voz.', delay: '0s' },
    { icon: Zap, title: 'Eficiência Energética', description: 'Reduza o consumo de energia com automação inteligente e monitoramento em tempo real.', delay: '0.2s' },
    { icon: Shield, title: 'Segurança Avançada', description: 'Sistemas integrados de segurança com monitoramento e alertas automáticos.', delay: '0.4s' }
  ];

  const automationFeatures = [
    { icon: Lightbulb, title: 'Iluminação Inteligente', description: 'Controle de intensidade, cores e programação automática de todas as luzes' },
    { icon: Thermometer, title: 'Climatização', description: 'Controle automático de temperatura e qualidade do ar em cada ambiente' },
    { icon: Camera, title: 'Sistema de Segurança', description: 'Câmeras inteligentes, sensores de movimento e alarmes integrados' },
    { icon: Lock, title: 'Controle de Acesso', description: 'Fechaduras digitais, portões automáticos e controle de visitantes' },
    { icon: Speaker, title: 'Áudio Multiroom', description: 'Sistema de som integrado em todos os ambientes com controle centralizado' },
    { icon: Wifi, title: 'Conectividade Total', description: 'Rede robusta e confiável para todos os dispositivos inteligentes' }
  ];

  const electricalServices = [
    'Projetos elétricos residenciais e comerciais',
    'Instalações elétricas completas',
    'Sistemas de proteção contra raios',
    'Quadros elétricos inteligentes',
    'Cabeamento estruturado',
    'Sistemas de backup (nobreak/gerador)',
    'Adequação às normas técnicas',
    'Manutenção preventiva e corretiva'
  ];

  return (
    <section id="automacao" className="py-20 bg-background relative bg-orbs overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern z-0"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute -inset-3 bg-gradient-to-r from-[#7F00FF]/40 to-[#E100FF]/40 rounded-full blur-2xl animate-pulse"></div>
              <div className="relative glass p-6 rounded-full">
                <Home className="h-12 w-12 text-[#E100FF]" />
              </div>
            </div>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">Projetos Elétricos &</span>
            <br />
            <span className="gradient-text">Automação Residencial</span>
          </h2>
          
          <div className="w-32 h-1 bg-gradient-to-r from-[#7F00FF] to-[#E100FF] mx-auto mb-6 rounded-full"></div>
          
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Transforme sua propriedade em um ambiente <span className="font-bold text-[#E100FF]">inteligente</span>, 
            <span className="font-bold text-[#7F00FF]"> seguro</span> e eficiente com nossas soluções de automação e projetos elétricos completos.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="group relative animate-fade-in" style={{ animationDelay: benefit.delay }}>
              <div className="glass-card p-8 h-full text-center">
                <div className="btn-glow p-5 rounded-2xl w-fit mx-auto mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Automation Features */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-foreground">Recursos de </span>
              <span className="gradient-text">Automação</span>
            </h3>
            <div className="w-20 h-1 bg-gradient-to-r from-[#7F00FF] to-[#E100FF] mx-auto mb-4 rounded-full"></div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">Controle total do seu ambiente com tecnologia de ponta</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {automationFeatures.map((feature) => (
              <div key={feature.title} className="group">
                <div className="glass-card p-6 h-full">
                  <div className="btn-glow p-3 rounded-xl w-fit mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-bold text-foreground mb-2 text-lg group-hover:text-[#E100FF] transition-colors">{feature.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Electrical Services */}
          <div className="glass-card overflow-hidden h-full">
            <div className="h-1 bg-gradient-to-r from-[#7F00FF] to-[#E100FF]"></div>
            <div className="p-8">
              <div className="flex items-center mb-6">
                <div className="btn-glow p-2 rounded-lg mr-3"><Zap className="h-6 w-6 text-white" /></div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Serviços Elétricos</h3>
                  <p className="text-muted-foreground">Projetos e instalações elétricas completas</p>
                </div>
              </div>
              <div className="space-y-4">
                {electricalServices.map((service, i) => (
                  <div key={i} className="flex items-center p-4 glass rounded-xl hover:border-[#E100FF]/30 transition-all duration-300 group/item">
                    <div className="btn-glow p-2 rounded-lg mr-4 transform group-hover/item:scale-110 transition-transform">
                      <Zap className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-muted-foreground font-medium group-hover/item:text-foreground transition-colors">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Technology Integration */}
          <div className="glass-card overflow-hidden h-full">
            <div className="h-1 bg-gradient-to-r from-[#E100FF] to-[#7F00FF]"></div>
            <div className="p-8">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-br from-[#E100FF] to-[#7F00FF] p-2 rounded-lg mr-3 shadow-lg"><Smartphone className="h-6 w-6 text-white" /></div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Integração Tecnológica</h3>
                  <p className="text-muted-foreground">Conectividade e controle total</p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="text-center p-6 glass rounded-2xl">
                  <div className="btn-glow p-4 rounded-2xl w-fit mx-auto mb-4">
                    <Smartphone className="h-12 w-12 text-white" />
                  </div>
                  <h4 className="font-bold text-foreground mb-2 text-xl">Controle via App</h4>
                  <p className="text-muted-foreground">Aplicativo personalizado para controle total da sua casa</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 glass rounded-xl hover:border-[#7F00FF]/30 transition-colors">
                    <div className="btn-glow p-2 rounded-lg w-fit mx-auto mb-2"><Wifi className="h-6 w-6 text-white" /></div>
                    <h5 className="font-semibold text-foreground text-sm">Conectividade</h5>
                    <p className="text-xs text-muted-foreground">Wi-Fi 6 robusto</p>
                  </div>
                  <div className="text-center p-4 glass rounded-xl hover:border-[#E100FF]/30 transition-colors">
                    <div className="bg-gradient-to-br from-[#E100FF] to-[#7F00FF] p-2 rounded-lg w-fit mx-auto mb-2 shadow-lg"><Shield className="h-6 w-6 text-white" /></div>
                    <h5 className="font-semibold text-foreground text-sm">Segurança</h5>
                    <p className="text-xs text-muted-foreground">Criptografia total</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AutomationSection;
