
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
      delay: '0s'
    },
    {
      icon: CheckCircle,
      title: 'Confiabilidade',
      description: 'Fornecimento ininterrupto de energia com redundâncias e sistemas de backup.',
      delay: '0.2s'
    },
    {
      icon: TrendingDown,
      title: 'Redução de Custos',
      description: 'Eliminação de perdas na transmissão e taxas de distribuição pública.',
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
    <section id="redes" className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header elegante */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-flip-blue-500/20 to-flip-red-500/20 rounded-full blur"></div>
              <div className="relative bg-white p-5 rounded-full shadow-lg border border-gray-100">
                <Network className="h-10 w-10 text-flip-blue-500" />
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
            Redes de Distribuição
            <span className="block text-4xl md:text-5xl mt-2 bg-gradient-to-r from-flip-blue-500 to-flip-red-500 bg-clip-text text-transparent">
              Privadas
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Projetamos e executamos redes elétricas de média e baixa tensão para 
            garantir <span className="font-semibold text-flip-blue-500">autonomia</span>, <span className="font-semibold text-flip-red-500">segurança</span> e eficiência energética total.
          </p>
        </div>

        {/* Benefits refinados */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {benefits.map((benefit, index) => (
            <div 
              key={benefit.title} 
              className="group animate-fade-in"
              style={{ animationDelay: benefit.delay }}
            >
              <Card className="h-full bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                <CardHeader className="text-center pb-4">
                  <div className="bg-gray-50 p-4 rounded-xl w-fit mx-auto mb-6 group-hover:bg-gray-100 transition-colors">
                    <benefit.icon className="h-7 w-7 text-gray-700" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900 mb-3">
                    {benefit.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Applications refinado */}
          <Card className="bg-white border border-gray-200 shadow-lg h-full">
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="flex items-center text-2xl text-gray-900">
                <Zap className="h-6 w-6 mr-3 text-flip-blue-500" />
                Aplicações
              </CardTitle>
              <CardDescription className="text-gray-600">
                Ideal para diversos tipos de empreendimentos
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-4">
                {applications.map((application, index) => (
                  <div 
                    key={index} 
                    className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300 group/item"
                  >
                    <span className="text-2xl mr-4">{application.icon}</span>
                    <span className="text-gray-700 font-medium group-hover/item:text-flip-blue-600 transition-colors">
                      {application.text}
                    </span>
                    <CheckCircle className="h-5 w-5 text-green-500 ml-auto opacity-0 group-hover/item:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Services refinado */}
          <Card className="bg-white border border-gray-200 shadow-lg h-full">
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="flex items-center text-2xl text-gray-900">
                <Shield className="h-6 w-6 mr-3 text-flip-red-500" />
                Nossos Serviços
              </CardTitle>
              <CardDescription className="text-gray-600">
                Soluções completas em infraestrutura elétrica
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 gap-4">
                {services.map((service, index) => (
                  <div 
                    key={index}
                    className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300 group/service"
                  >
                    <div className="bg-white p-2 rounded-lg shadow-sm group-hover/service:shadow-md transition-shadow">
                      <service.icon className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1 group-hover/service:text-flip-blue-600 transition-colors">
                        {service.title}
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA elegante */}
        <div className="text-center">
          <Button className="bg-flip-red-500 hover:bg-flip-red-600 text-white text-lg font-medium px-12 py-4 shadow-lg hover:shadow-xl transition-all duration-300">
            Solicitar Orçamento para Rede Privada
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NetworkSection;
