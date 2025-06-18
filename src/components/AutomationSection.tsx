
import React from 'react';
import { Home, Smartphone, Zap, Shield, Wifi, Lightbulb, Thermometer, Camera, Lock, Speaker } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

const AutomationSection = () => {
  const benefits = [
    {
      icon: Smartphone,
      title: 'Controle Inteligente',
      description: 'Controle total da sua casa através do smartphone, tablet ou comandos de voz.',
      gradient: 'from-flip-blue-500/10 to-flip-blue-600/10',
      iconBg: 'from-flip-blue-500 to-flip-blue-600',
      delay: '0s'
    },
    {
      icon: Zap,
      title: 'Eficiência Energética',
      description: 'Reduza o consumo de energia com automação inteligente e monitoramento em tempo real.',
      gradient: 'from-flip-red-500/10 to-flip-red-600/10',
      iconBg: 'from-flip-red-500 to-flip-red-600',
      delay: '0.2s'
    },
    {
      icon: Shield,
      title: 'Segurança Avançada',
      description: 'Sistemas integrados de segurança com monitoramento e alertas automáticos.',
      gradient: 'from-purple-500/10 to-purple-600/10',
      iconBg: 'from-purple-500 to-purple-600',
      delay: '0.4s'
    }
  ];

  const automationFeatures = [
    {
      icon: Lightbulb,
      title: 'Iluminação Inteligente',
      description: 'Controle de intensidade, cores e programação automática de todas as luzes',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Thermometer,
      title: 'Climatização',
      description: 'Controle automático de temperatura e qualidade do ar em cada ambiente',
      color: 'from-flip-blue-500 to-flip-blue-600'
    },
    {
      icon: Camera,
      title: 'Sistema de Segurança',
      description: 'Câmeras inteligentes, sensores de movimento e alarmes integrados',
      color: 'from-flip-red-500 to-flip-red-600'
    },
    {
      icon: Lock,
      title: 'Controle de Acesso',
      description: 'Fechaduras digitais, portões automáticos e controle de visitantes',
      color: 'from-gray-600 to-gray-700'
    },
    {
      icon: Speaker,
      title: 'Áudio Multiroom',
      description: 'Sistema de som integrado em todos os ambientes com controle centralizado',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Wifi,
      title: 'Conectividade Total',
      description: 'Rede robusta e confiável para todos os dispositivos inteligentes',
      color: 'from-green-500 to-emerald-500'
    }
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
    <section id="automacao" className="py-20 bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute -inset-3 bg-gradient-to-r from-flip-red-500/30 via-flip-blue-500/30 to-purple-500/30 rounded-full blur-2xl animate-pulse"></div>
              <div className="relative bg-white p-6 rounded-full shadow-2xl border-2 border-gray-100">
                <Home className="h-12 w-12 text-flip-blue-600" />
              </div>
            </div>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-flip-gray-900 to-flip-gray-700 bg-clip-text text-transparent">
              Projetos Elétricos &
            </span>
            <br />
            <span className="bg-gradient-to-r from-flip-red-600 via-flip-blue-600 to-purple-600 bg-clip-text text-transparent">
              Automação Residencial
            </span>
          </h2>
          
          <div className="w-32 h-1 bg-gradient-to-r from-flip-red-500 via-flip-blue-500 to-purple-500 mx-auto mb-6 rounded-full"></div>
          
          <p className="text-xl text-flip-gray-600 max-w-4xl mx-auto leading-relaxed">
            Transforme sua propriedade em um ambiente <span className="font-bold text-flip-blue-600 bg-flip-blue-50 px-2 py-1 rounded">inteligente</span>, 
            <span className="font-bold text-flip-red-600 bg-flip-red-50 px-2 py-1 rounded"> seguro</span> e eficiente com nossas soluções de automação e projetos elétricos completos.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {benefits.map((benefit, index) => (
            <div 
              key={benefit.title} 
              className="group relative animate-fade-in"
              style={{ animationDelay: benefit.delay }}
            >
              <div className={`absolute -inset-1 bg-gradient-to-r ${benefit.gradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              <Card className="relative bg-white/90 backdrop-blur-sm rounded-3xl border-2 border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 h-full">
                <CardHeader className="text-center pb-4">
                  <div className={`bg-gradient-to-br ${benefit.iconBg} p-5 rounded-2xl w-fit mx-auto mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                    <benefit.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-flip-gray-900 mb-3">
                    {benefit.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-flip-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Automation Features */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-flip-gray-900 mb-4">
              Recursos de <span className="bg-gradient-to-r from-flip-red-600 to-flip-blue-600 bg-clip-text text-transparent">Automação</span>
            </h3>
            <div className="w-20 h-1 bg-gradient-to-r from-flip-red-500 to-flip-blue-500 mx-auto mb-4 rounded-full"></div>
            <p className="text-lg text-flip-gray-600 max-w-3xl mx-auto">
              Controle total do seu ambiente com tecnologia de ponta
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {automationFeatures.map((feature, index) => (
              <div 
                key={feature.title}
                className="group relative"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`absolute -inset-1 bg-gradient-to-r ${feature.color} rounded-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-300`}></div>
                
                <Card className="relative bg-white/95 backdrop-blur-sm rounded-2xl border-2 border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full">
                  <CardContent className="p-6">
                    <div className={`bg-gradient-to-r ${feature.color} p-3 rounded-xl w-fit mb-4 shadow-md transform group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="font-bold text-flip-gray-900 mb-2 text-lg group-hover:text-flip-blue-700 transition-colors">
                      {feature.title}
                    </h4>
                    <p className="text-flip-gray-600 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Electrical Services */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-flip-blue-500/20 to-flip-red-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <Card className="relative bg-white/95 backdrop-blur-sm rounded-3xl border-2 border-gray-100 shadow-2xl h-full">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-flip-blue-500 to-flip-red-500 rounded-t-3xl"></div>
              
              <CardHeader className="bg-gradient-to-r from-gray-50 to-white rounded-t-3xl border-b border-gray-100">
                <CardTitle className="flex items-center text-2xl">
                  <div className="p-2 bg-gradient-to-r from-flip-blue-500 to-flip-red-500 rounded-lg mr-3">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  Serviços Elétricos
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Projetos e instalações elétricas completas
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-4">
                  {electricalServices.map((service, index) => (
                    <div 
                      key={index} 
                      className="flex items-center p-4 bg-gradient-to-r from-white/80 to-blue-50/30 rounded-xl hover:from-flip-blue-50/50 hover:to-flip-red-50/30 transition-all duration-300 group/item border border-transparent hover:border-gray-200"
                    >
                      <div className="bg-gradient-to-r from-flip-blue-500 to-flip-red-500 p-2 rounded-lg mr-4 transform group-hover/item:scale-110 transition-transform">
                        <Zap className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-flip-gray-700 font-medium group-hover/item:text-flip-blue-700 transition-colors">
                        {service}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Technology Integration */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-flip-red-500/20 to-purple-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <Card className="relative bg-white/95 backdrop-blur-sm rounded-3xl border-2 border-gray-100 shadow-2xl h-full">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-flip-red-500 to-purple-500 rounded-t-3xl"></div>
              
              <CardHeader className="bg-gradient-to-r from-gray-50 to-white rounded-t-3xl border-b border-gray-100">
                <CardTitle className="flex items-center text-2xl">
                  <div className="p-2 bg-gradient-to-r from-flip-red-500 to-purple-500 rounded-lg mr-3">
                    <Smartphone className="h-6 w-6 text-white" />
                  </div>
                  Integração Tecnológica
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Conectividade e controle total
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="text-center p-6 bg-gradient-to-br from-flip-blue-50/50 to-flip-red-50/50 rounded-2xl border border-gray-100">
                    <div className="bg-gradient-to-r from-flip-blue-500 to-flip-red-500 p-4 rounded-2xl w-fit mx-auto mb-4">
                      <Smartphone className="h-12 w-12 text-white" />
                    </div>
                    <h4 className="font-bold text-flip-gray-900 mb-2 text-xl">Controle via App</h4>
                    <p className="text-flip-gray-600">
                      Aplicativo personalizado para controle total da sua casa
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-white/90 rounded-xl border-2 border-flip-blue-100 hover:border-flip-blue-300 transition-colors">
                      <div className="bg-gradient-to-r from-flip-blue-500 to-flip-blue-600 p-2 rounded-lg w-fit mx-auto mb-2">
                        <Wifi className="h-6 w-6 text-white" />
                      </div>
                      <h5 className="font-semibold text-flip-gray-900 text-sm">Conectividade</h5>
                      <p className="text-xs text-flip-gray-600">Wi-Fi 6 robusto</p>
                    </div>
                    
                    <div className="text-center p-4 bg-white/90 rounded-xl border-2 border-flip-red-100 hover:border-flip-red-300 transition-colors">
                      <div className="bg-gradient-to-r from-flip-red-500 to-flip-red-600 p-2 rounded-lg w-fit mx-auto mb-2">
                        <Shield className="h-6 w-6 text-white" />
                      </div>
                      <h5 className="font-semibold text-flip-gray-900 text-sm">Segurança</h5>
                      <p className="text-xs text-flip-gray-600">Criptografia total</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AutomationSection;
