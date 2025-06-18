
import React from 'react';
import { Network, Shield, TrendingDown, Zap, CheckCircle, Settings, Monitor, Wrench } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

const NetworkSection = () => {
  const benefits = [
    {
      icon: Shield,
      title: 'Segurança Máxima',
      description: 'Rede privada com proteções avançadas contra interrupções e falhas do sistema público.',
      color: 'from-flip-red-500 to-flip-red-600',
      delay: '0s'
    },
    {
      icon: CheckCircle,
      title: 'Confiabilidade',
      description: 'Fornecimento ininterrupto de energia com redundâncias e sistemas de backup.',
      color: 'from-green-500 to-emerald-600',
      delay: '0.2s'
    },
    {
      icon: TrendingDown,
      title: 'Redução de Custos',
      description: 'Eliminação de perdas na transmissão e taxas de distribuição pública.',
      color: 'from-flip-blue-500 to-flip-blue-600',
      delay: '0.4s'
    }
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
    {
      icon: Settings,
      title: 'Projeto Personalizado',
      description: 'Projeto personalizado para cada necessidade específica do cliente'
    },
    {
      icon: Zap,
      title: 'Instalação Completa',
      description: 'Instalação de redes de média e baixa tensão com qualidade superior'
    },
    {
      icon: Shield,
      title: 'Sistemas de Proteção',
      description: 'Sistemas de proteção e automação de última geração'
    },
    {
      icon: Monitor,
      title: 'Monitoramento 24/7',
      description: 'Monitoramento remoto contínuo para máxima eficiência'
    },
    {
      icon: Wrench,
      title: 'Manutenção Completa',
      description: 'Manutenção preventiva e corretiva especializada'
    },
    {
      icon: CheckCircle,
      title: 'Conformidade',
      description: 'Total conformidade com normas ABNT e ANEEL'
    }
  ];

  return (
    <section id="redes" className="py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header renovado */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-flip-blue-500 to-flip-red-500 rounded-full blur opacity-30 animate-pulse"></div>
              <div className="relative bg-white p-4 rounded-full shadow-xl">
                <Network className="h-12 w-12 text-flip-blue-500" />
              </div>
            </div>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-flip-gray-900 to-flip-gray-700 bg-clip-text text-transparent">
              Redes de Distribuição
            </span>
            <br />
            <span className="bg-gradient-to-r from-flip-blue-500 via-flip-red-500 to-flip-blue-600 bg-clip-text text-transparent animate-gradient-x">
              Privadas
            </span>
          </h2>
          
          <p className="text-xl text-flip-gray-600 max-w-4xl mx-auto leading-relaxed">
            Projetamos e executamos redes elétricas de média e baixa tensão para 
            garantir <span className="font-bold text-flip-blue-500">autonomia</span>, <span className="font-bold text-flip-red-500">segurança</span> e eficiência energética total.
          </p>
        </div>

        {/* Benefits renovados */}
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Applications renovado */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-flip-blue-500 to-flip-red-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
            
            <Card className="relative bg-white/90 backdrop-blur-xl rounded-3xl border-0 shadow-2xl h-full">
              <CardHeader className="bg-gradient-to-r from-flip-blue-500 to-flip-red-500 text-white rounded-t-3xl">
                <CardTitle className="flex items-center text-2xl">
                  <Zap className="h-6 w-6 mr-3" />
                  Aplicações
                </CardTitle>
                <CardDescription className="text-blue-100">
                  Ideal para diversos tipos de empreendimentos
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-4">
                  {applications.map((application, index) => (
                    <div 
                      key={index} 
                      className="flex items-center p-4 bg-gradient-to-r from-white/80 to-blue-50/50 rounded-xl hover:from-flip-blue-50/50 hover:to-flip-red-50/50 transition-all duration-300 group/item"
                    >
                      <span className="text-2xl mr-4">{application.icon}</span>
                      <span className="text-flip-gray-700 font-medium group-hover/item:text-flip-blue-600 transition-colors">
                        {application.text}
                      </span>
                      <CheckCircle className="h-5 w-5 text-green-500 ml-auto opacity-0 group-hover/item:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Services renovado */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-flip-red-500 to-flip-blue-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
            
            <Card className="relative bg-white/90 backdrop-blur-xl rounded-3xl border-0 shadow-2xl h-full">
              <CardHeader className="bg-gradient-to-r from-flip-red-500 to-flip-blue-500 text-white rounded-t-3xl">
                <CardTitle className="flex items-center text-2xl">
                  <Shield className="h-6 w-6 mr-3" />
                  Nossos Serviços
                </CardTitle>
                <CardDescription className="text-red-100">
                  Soluções completas em infraestrutura elétrica
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 gap-4">
                  {services.map((service, index) => (
                    <div 
                      key={index}
                      className="flex items-start space-x-4 p-4 bg-gradient-to-r from-white/80 to-red-50/50 rounded-xl hover:from-flip-red-50/50 hover:to-flip-blue-50/50 transition-all duration-300 group/service"
                    >
                      <div className="bg-gradient-to-r from-flip-blue-500 to-flip-red-500 p-2 rounded-lg group-hover/service:scale-110 transition-transform">
                        <service.icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-flip-gray-900 mb-1 group-hover/service:text-flip-blue-600 transition-colors">
                          {service.title}
                        </h4>
                        <p className="text-sm text-flip-gray-600 leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="relative group inline-block">
            <div className="absolute -inset-1 bg-gradient-to-r from-flip-red-500 to-flip-blue-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
            <Button className="relative bg-gradient-to-r from-flip-red-500 to-flip-blue-500 hover:from-flip-red-600 hover:to-flip-blue-600 text-white text-lg font-semibold px-12 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
              Solicitar Orçamento para Rede Privada
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NetworkSection;
