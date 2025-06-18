
import React from 'react';
import { Network, Shield, TrendingDown, Zap, CheckCircle, Settings, Monitor, Wrench } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

const NetworkSection = () => {
  const benefits = [
    {
      icon: Shield,
      title: 'Segurança Máxima',
      description: 'Rede privada com proteções avançadas contra interrupções e falhas do sistema público.',
      delay: '0s',
      gradient: 'from-flip-blue-500/10 to-flip-blue-600/5'
    },
    {
      icon: CheckCircle,
      title: 'Confiabilidade',
      description: 'Fornecimento ininterrupto de energia com redundâncias e sistemas de backup.',
      delay: '0.2s',
      gradient: 'from-flip-red-500/10 to-flip-red-600/5'
    },
    {
      icon: TrendingDown,
      title: 'Redução de Custos',
      description: 'Eliminação de perdas na transmissão e taxas de distribuição pública.',
      delay: '0.4s',
      gradient: 'from-purple-500/10 to-purple-600/5'
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
      description: 'Projeto personalizado para cada necessidade específica do cliente',
      color: 'text-flip-blue-600'
    },
    {
      icon: Zap,
      title: 'Instalação Completa',
      description: 'Instalação de redes de média e baixa tensão com qualidade superior',
      color: 'text-flip-red-600'
    },
    {
      icon: Shield,
      title: 'Sistemas de Proteção',
      description: 'Sistemas de proteção e automação de última geração',
      color: 'text-purple-600'
    },
    {
      icon: Monitor,
      title: 'Monitoramento 24/7',
      description: 'Monitoramento remoto contínuo para máxima eficiência',
      color: 'text-flip-blue-600'
    },
    {
      icon: Wrench,
      title: 'Manutenção Completa',
      description: 'Manutenção preventiva e corretiva especializada',
      color: 'text-flip-red-600'
    },
    {
      icon: CheckCircle,
      title: 'Conformidade',
      description: 'Total conformidade com normas ABNT e ANEEL',
      color: 'text-purple-600'
    }
  ];

  return (
    <section id="redes" className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header elegante */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-flip-blue-500/30 to-flip-red-500/30 rounded-full blur-xl animate-pulse"></div>
              <div className="relative bg-white p-6 rounded-full shadow-2xl border-2 border-gray-100">
                <Network className="h-12 w-12 text-flip-blue-600" />
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
            Redes de Distribuição
            <span className="block text-4xl md:text-5xl mt-2 bg-gradient-to-r from-flip-blue-600 to-flip-red-600 bg-clip-text text-transparent">
              Privadas
            </span>
          </h1>
          
          <div className="w-24 h-1 bg-gradient-to-r from-flip-blue-500 to-flip-red-500 mx-auto mb-6 rounded-full"></div>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Projetamos e executamos redes elétricas de média e baixa tensão para 
            garantir <span className="font-semibold text-flip-blue-600 bg-flip-blue-50 px-2 py-1 rounded">autonomia</span>, <span className="font-semibold text-flip-red-600 bg-flip-red-50 px-2 py-1 rounded">segurança</span> e eficiência energética total.
          </p>
        </div>

        {/* Benefits com mais vida */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {benefits.map((benefit, index) => (
            <div 
              key={benefit.title} 
              className="group animate-fade-in"
              style={{ animationDelay: benefit.delay }}
            >
              <Card className="h-full bg-white border-2 border-transparent hover:border-gray-200 hover:shadow-xl transition-all duration-500 group-hover:-translate-y-2 relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                <CardHeader className="text-center pb-4 relative z-10">
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-2xl w-fit mx-auto mb-6 group-hover:from-white group-hover:to-gray-50 transition-all duration-300 shadow-lg">
                    <benefit.icon className="h-8 w-8 text-gray-700 group-hover:text-flip-blue-600 transition-colors duration-300" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors">
                    {benefit.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 relative z-10">
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Applications com bordas coloridas */}
          <Card className="bg-white border-2 border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 h-full relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-flip-blue-500 to-flip-red-500"></div>
            
            <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
              <CardTitle className="flex items-center text-2xl text-gray-900">
                <div className="p-2 bg-gradient-to-r from-flip-blue-500 to-flip-blue-600 rounded-lg mr-3">
                  <Zap className="h-6 w-6 text-white" />
                </div>
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
                    className="flex items-center p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl hover:from-flip-blue-50 hover:to-flip-red-50 transition-all duration-300 group/item border border-transparent hover:border-gray-200"
                  >
                    <span className="text-2xl mr-4">{application.icon}</span>
                    <span className="text-gray-700 font-medium group-hover/item:text-flip-blue-700 transition-colors">
                      {application.text}
                    </span>
                    <CheckCircle className="h-5 w-5 text-green-500 ml-auto opacity-0 group-hover/item:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Services com ícones coloridos */}
          <Card className="bg-white border-2 border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 h-full relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-flip-red-500 to-purple-500"></div>
            
            <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
              <CardTitle className="flex items-center text-2xl text-gray-900">
                <div className="p-2 bg-gradient-to-r from-flip-red-500 to-flip-red-600 rounded-lg mr-3">
                  <Shield className="h-6 w-6 text-white" />
                </div>
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
                    className="flex items-start space-x-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl hover:from-gray-100 hover:to-gray-50 transition-all duration-300 group/service border border-transparent hover:border-gray-200"
                  >
                    <div className="bg-white p-3 rounded-xl shadow-md group-hover/service:shadow-lg transition-shadow border border-gray-100">
                      <service.icon className={`h-5 w-5 ${service.color} transition-transform group-hover/service:scale-110`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1 group-hover/service:text-flip-blue-700 transition-colors">
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
      </div>
    </section>
  );
};

export default NetworkSection;
