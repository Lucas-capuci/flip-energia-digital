
import React from 'react';
import { Home, Smartphone, Zap, Shield, Wifi, Lightbulb, Thermometer, Camera, Lock, Speaker } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

const AutomationSection = () => {
  const benefits = [
    {
      icon: Smartphone,
      title: 'Controle Inteligente',
      description: 'Controle total da sua casa através do smartphone, tablet ou comandos de voz.',
      color: 'from-flip-blue-500 to-flip-blue-600',
      delay: '0s'
    },
    {
      icon: Zap,
      title: 'Eficiência Energética',
      description: 'Reduza o consumo de energia com automação inteligente e monitoramento em tempo real.',
      color: 'from-flip-red-500 to-flip-red-600',
      delay: '0.2s'
    },
    {
      icon: Shield,
      title: 'Segurança Avançada',
      description: 'Sistemas integrados de segurança com monitoramento e alertas automáticos.',
      color: 'from-purple-500 to-purple-600',
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
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Camera,
      title: 'Sistema de Segurança',
      description: 'Câmeras inteligentes, sensores de movimento e alarmes integrados',
      color: 'from-red-500 to-pink-500'
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
      color: 'from-purple-500 to-indigo-500'
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
    <section id="automacao" className="py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-flip-red-500 to-flip-blue-500 rounded-full blur opacity-30 animate-pulse"></div>
              <div className="relative bg-white p-4 rounded-full shadow-xl">
                <Home className="h-12 w-12 text-flip-blue-500" />
              </div>
            </div>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-flip-gray-900 to-flip-gray-700 bg-clip-text text-transparent">
              Projetos Elétricos &
            </span>
            <br />
            <span className="bg-gradient-to-r from-flip-red-500 via-flip-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient-x">
              Automação Residencial
            </span>
          </h2>
          
          <p className="text-xl text-flip-gray-600 max-w-4xl mx-auto leading-relaxed">
            Transforme sua propriedade em um ambiente <span className="font-bold text-flip-blue-500">inteligente</span>, 
            <span className="font-bold text-flip-red-500"> seguro</span> e eficiente com nossas soluções de automação e projetos elétricos completos.
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
              <div className={`absolute -inset-1 bg-gradient-to-r ${benefit.color} rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500`}></div>
              
              <Card className="relative bg-white/80 backdrop-blur-xl rounded-3xl border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 h-full">
                <CardHeader className="text-center pb-4">
                  <div className={`bg-gradient-to-br ${benefit.color} p-4 rounded-2xl w-fit mx-auto mb-6 shadow-lg`}>
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
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-flip-gray-900 mb-4">
              Recursos de <span className="bg-gradient-to-r from-flip-red-500 to-flip-blue-500 bg-clip-text text-transparent">Automação</span>
            </h3>
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
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${feature.color} rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300`}></div>
                
                <Card className="relative bg-white/90 backdrop-blur-sm rounded-2xl border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full">
                  <CardContent className="p-6">
                    <div className={`bg-gradient-to-r ${feature.color} p-3 rounded-xl w-fit mb-4 shadow-md`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="font-bold text-flip-gray-900 mb-2 text-lg">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Electrical Services */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-flip-blue-500 to-flip-red-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
            
            <Card className="relative bg-white/90 backdrop-blur-xl rounded-3xl border-0 shadow-2xl h-full">
              <CardHeader className="bg-gradient-to-r from-flip-blue-500 to-flip-red-500 text-white rounded-t-3xl">
                <CardTitle className="flex items-center text-2xl">
                  <Zap className="h-6 w-6 mr-3" />
                  Serviços Elétricos
                </CardTitle>
                <CardDescription className="text-blue-100">
                  Projetos e instalações elétricas completas
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-4">
                  {electricalServices.map((service, index) => (
                    <div 
                      key={index} 
                      className="flex items-center p-3 bg-gradient-to-r from-white/80 to-blue-50/50 rounded-xl hover:from-flip-blue-50/50 hover:to-flip-red-50/50 transition-all duration-300 group/item"
                    >
                      <div className="bg-gradient-to-r from-flip-blue-500 to-flip-red-500 p-1.5 rounded-lg mr-4">
                        <Zap className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-flip-gray-700 font-medium group-hover/item:text-flip-blue-600 transition-colors">
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
            <div className="absolute -inset-1 bg-gradient-to-r from-flip-red-500 to-purple-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
            
            <Card className="relative bg-white/90 backdrop-blur-xl rounded-3xl border-0 shadow-2xl h-full">
              <CardHeader className="bg-gradient-to-r from-flip-red-500 to-purple-500 text-white rounded-t-3xl">
                <CardTitle className="flex items-center text-2xl">
                  <Smartphone className="h-6 w-6 mr-3" />
                  Integração Tecnológica
                </CardTitle>
                <CardDescription className="text-red-100">
                  Conectividade e controle total
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="text-center p-6 bg-gradient-to-br from-flip-blue-50 to-flip-red-50 rounded-2xl">
                    <Smartphone className="h-16 w-16 text-flip-blue-500 mx-auto mb-4" />
                    <h4 className="font-bold text-flip-gray-900 mb-2 text-xl">Controle via App</h4>
                    <p className="text-flip-gray-600">
                      Aplicativo personalizado para controle total da sua casa
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-white/80 rounded-xl border border-flip-blue-100">
                      <Wifi className="h-8 w-8 text-flip-blue-500 mx-auto mb-2" />
                      <h5 className="font-semibold text-flip-gray-900 text-sm">Conectividade</h5>
                      <p className="text-xs text-flip-gray-600">Wi-Fi 6 robusto</p>
                    </div>
                    
                    <div className="text-center p-4 bg-white/80 rounded-xl border border-flip-red-100">
                      <Shield className="h-8 w-8 text-flip-red-500 mx-auto mb-2" />
                      <h5 className="font-semibold text-flip-gray-900 text-sm">Segurança</h5>
                      <p className="text-xs text-flip-gray-600">Criptografia total</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="relative group inline-block">
            <div className="absolute -inset-1 bg-gradient-to-r from-flip-red-500 via-flip-blue-500 to-purple-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
            <Button className="relative bg-gradient-to-r from-flip-red-500 via-flip-blue-500 to-purple-500 hover:from-flip-red-600 hover:via-flip-blue-600 hover:to-purple-600 text-white text-lg font-semibold px-12 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
              Solicitar Projeto de Automação
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AutomationSection;
