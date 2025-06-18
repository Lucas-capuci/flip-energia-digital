
import React from 'react';
import { Network, Shield, TrendingDown, Zap, CheckCircle, Settings, Monitor, Wrench, Power, Cable } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

const NetworkSection = () => {
  const benefits = [
    {
      icon: Shield,
      title: 'Segurança Máxima',
      description: 'Rede privada com proteções avançadas contra interrupções e falhas do sistema público.',
      gradient: 'from-flip-blue-500/10 to-flip-blue-600/10',
      iconBg: 'from-flip-blue-500 to-flip-blue-600',
      delay: '0s'
    },
    {
      icon: CheckCircle,
      title: 'Confiabilidade',
      description: 'Fornecimento ininterrupto de energia com redundâncias e sistemas de backup.',
      gradient: 'from-flip-red-500/10 to-flip-red-600/10',
      iconBg: 'from-flip-red-500 to-flip-red-600',
      delay: '0.2s'
    },
    {
      icon: TrendingDown,
      title: 'Redução de Custos',
      description: 'Eliminação de perdas na transmissão e taxas de distribuição pública.',
      gradient: 'from-purple-500/10 to-purple-600/10',
      iconBg: 'from-purple-500 to-purple-600',
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
      description: 'Projeto personalizado para cada necessidade específica do cliente',
      color: 'from-flip-blue-500 to-flip-blue-600'
    },
    {
      icon: Zap,
      title: 'Instalação Completa',
      description: 'Instalação de redes de média e baixa tensão com qualidade superior',
      color: 'from-flip-red-500 to-flip-red-600'
    },
    {
      icon: Shield,
      title: 'Sistemas de Proteção',
      description: 'Sistemas de proteção e automação de última geração',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Monitor,
      title: 'Monitoramento 24/7',
      description: 'Monitoramento remoto contínuo para máxima eficiência',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Wrench,
      title: 'Manutenção Completa',
      description: 'Manutenção preventiva e corretiva especializada',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: CheckCircle,
      title: 'Conformidade',
      description: 'Total conformidade com normas ABNT e ANEEL',
      color: 'from-gray-600 to-gray-700'
    }
  ];

  const networkFeatures = [
    {
      icon: Power,
      title: 'Subestações Inteligentes',
      description: 'Transformadores de alta eficiência com monitoramento automático',
      color: 'from-flip-blue-500 to-flip-blue-600'
    },
    {
      icon: Cable,
      title: 'Cabos de Alta Performance',
      description: 'Cabos especiais para minimizar perdas e maximizar segurança',
      color: 'from-flip-red-500 to-flip-red-600'
    },
    {
      icon: Shield,
      title: 'Proteção Avançada',
      description: 'Sistemas de proteção contra surtos e sobrecargas',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Monitor,
      title: 'Controle Remoto',
      description: 'Monitoramento e controle via sistema SCADA',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Network,
      title: 'Topologia Otimizada',
      description: 'Distribuição inteligente para máxima eficiência',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: Zap,
      title: 'Backup Automático',
      description: 'Sistemas redundantes para fornecimento contínuo',
      color: 'from-yellow-500 to-yellow-600'
    }
  ];

  return (
    <section id="redes" className="responsive-py-lg bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50/20 overflow-hidden">
      <div className="responsive-container">
        {/* Header moderno */}
        <div className="text-center responsive-py-md animate-fade-in">
          <div className="flex justify-center mb-4 sm:mb-6 lg:mb-8">
            <div className="relative">
              <div className="absolute -inset-2 sm:-inset-3 bg-gradient-to-r from-flip-blue-500/30 via-flip-red-500/30 to-purple-500/30 rounded-full blur-xl sm:blur-2xl animate-pulse"></div>
              <div className="relative bg-white p-4 sm:p-5 lg:p-6 rounded-full shadow-xl sm:shadow-2xl border-2 border-gray-100">
                <Network className="responsive-icon-xl text-flip-blue-600" />
              </div>
            </div>
          </div>
          
          <h2 className="responsive-text-5xl font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-flip-gray-900 to-flip-gray-700 bg-clip-text text-transparent">
              Redes de Distribuição
            </span>
            <br />
            <span className="bg-gradient-to-r from-flip-blue-600 via-flip-red-600 to-purple-600 bg-clip-text text-transparent">
              Privadas
            </span>
          </h2>
          
          <div className="w-20 sm:w-24 lg:w-32 h-1 bg-gradient-to-r from-flip-blue-500 via-flip-red-500 to-purple-500 mx-auto mb-4 sm:mb-6 rounded-full"></div>
          
          <p className="responsive-text-xl text-flip-gray-600 max-w-4xl mx-auto leading-relaxed">
            Projetamos e executamos redes elétricas de média e baixa tensão para 
            garantir <span className="font-bold text-flip-blue-600 bg-flip-blue-50 px-2 py-1 rounded">autonomia</span>, 
            <span className="font-bold text-flip-red-600 bg-flip-red-50 px-2 py-1 rounded">segurança</span> e eficiência energética total.
          </p>
        </div>

        {/* Benefits com estilo moderno */}
        <div className="responsive-grid-3 responsive-gap-lg mb-12 sm:mb-16 lg:mb-20">
          {benefits.map((benefit, index) => (
            <div 
              key={benefit.title} 
              className="group relative animate-fade-in"
              style={{ animationDelay: benefit.delay }}
            >
              <div className={`absolute -inset-1 bg-gradient-to-r ${benefit.gradient} rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              <Card className="responsive-card h-full">
                <CardHeader className="text-center pb-2 sm:pb-4">
                  <div className={`bg-gradient-to-br ${benefit.iconBg} p-3 sm:p-4 lg:p-5 rounded-xl sm:rounded-2xl w-fit mx-auto mb-4 sm:mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                    <benefit.icon className="responsive-icon-lg text-white" />
                  </div>
                  <CardTitle className="responsive-text-2xl font-bold text-flip-gray-900 mb-2 sm:mb-3">
                    {benefit.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 responsive-card-padding">
                  <p className="text-flip-gray-600 leading-relaxed responsive-text-base">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Network Features */}
        <div className="mb-12 sm:mb-16">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="responsive-text-4xl font-bold text-flip-gray-900 mb-4">
              Tecnologia de <span className="bg-gradient-to-r from-flip-blue-600 to-flip-red-600 bg-clip-text text-transparent">Distribuição</span>
            </h3>
            <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-flip-blue-500 to-flip-red-500 mx-auto mb-4 rounded-full"></div>
            <p className="responsive-text-lg text-flip-gray-600 max-w-3xl mx-auto">
              Infraestrutura elétrica de alta performance para máxima confiabilidade
            </p>
          </div>

          <div className="responsive-grid-3 responsive-gap">
            {networkFeatures.map((feature, index) => (
              <div 
                key={feature.title}
                className="group relative"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`absolute -inset-1 bg-gradient-to-r ${feature.color} rounded-xl sm:rounded-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-300`}></div>
                
                <Card className="responsive-card h-full">
                  <CardContent className="responsive-card-padding">
                    <div className={`bg-gradient-to-r ${feature.color} p-2 sm:p-3 rounded-lg sm:rounded-xl w-fit mb-3 sm:mb-4 shadow-md transform group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="responsive-icon-md text-white" />
                    </div>
                    <h4 className="font-bold text-flip-gray-900 mb-2 responsive-text-lg group-hover:text-flip-blue-700 transition-colors">
                      {feature.title}
                    </h4>
                    <p className="text-flip-gray-600 responsive-text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        <div className="responsive-grid-2 responsive-gap-lg">
          {/* Applications com bordas coloridas */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-flip-blue-500/20 to-flip-red-500/20 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <Card className="responsive-card h-full">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-flip-blue-500 to-flip-red-500 rounded-t-2xl sm:rounded-t-3xl"></div>
              
              <CardHeader className="bg-gradient-to-r from-gray-50 to-white rounded-t-2xl sm:rounded-t-3xl border-b border-gray-100">
                <CardTitle className="flex items-center responsive-text-2xl">
                  <div className="p-2 bg-gradient-to-r from-flip-blue-500 to-flip-red-500 rounded-lg mr-3">
                    <Zap className="responsive-icon-md text-white" />
                  </div>
                  Aplicações
                </CardTitle>
                <CardDescription className="text-gray-600 responsive-text-base">
                  Ideal para diversos tipos de empreendimentos
                </CardDescription>
              </CardHeader>
              <CardContent className="responsive-card-padding">
                <div className="space-y-3 sm:space-y-4">
                  {applications.map((application, index) => (
                    <div 
                      key={index} 
                      className="flex items-center p-3 sm:p-4 bg-gradient-to-r from-white/80 to-flip-blue-50/30 rounded-lg sm:rounded-xl hover:from-flip-blue-50/50 hover:to-flip-red-50/30 transition-all duration-300 group/item border-2 border-transparent hover:border-gray-200"
                    >
                      <span className="text-xl sm:text-2xl mr-3 sm:mr-4">{application.icon}</span>
                      <span className="text-flip-gray-700 font-medium group-hover/item:text-flip-blue-700 transition-colors flex-1 responsive-text-base">
                        {application.text}
                      </span>
                      <div className="bg-gradient-to-r from-green-500 to-green-600 p-1 rounded-lg opacity-0 group-hover/item:opacity-100 transition-opacity">
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Services com ícones coloridos */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-flip-red-500/20 to-purple-500/20 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <Card className="responsive-card h-full">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-flip-red-500 to-purple-500 rounded-t-2xl sm:rounded-t-3xl"></div>
              
              <CardHeader className="bg-gradient-to-r from-gray-50 to-white rounded-t-2xl sm:rounded-t-3xl border-b border-gray-100">
                <CardTitle className="flex items-center responsive-text-2xl">
                  <div className="p-2 bg-gradient-to-r from-flip-red-500 to-purple-500 rounded-lg mr-3">
                    <Shield className="responsive-icon-md text-white" />
                  </div>
                  Nossos Serviços
                </CardTitle>
                <CardDescription className="text-gray-600 responsive-text-base">
                  Soluções completas em infraestrutura elétrica
                </CardDescription>
              </CardHeader>
              <CardContent className="responsive-card-padding">
                <div className="grid grid-cols-1 gap-3 sm:gap-4">
                  {services.map((service, index) => (
                    <div 
                      key={index}
                      className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gradient-to-r from-white/80 to-gray-50/30 rounded-lg sm:rounded-xl hover:from-gray-100/50 hover:to-gray-50/50 transition-all duration-300 group/service border-2 border-transparent hover:border-gray-200"
                    >
                      <div className={`bg-gradient-to-r ${service.color} p-2 sm:p-3 rounded-lg sm:rounded-xl shadow-md group-hover/service:shadow-lg transition-all duration-300 transform group-hover/service:scale-110 flex-shrink-0`}>
                        <service.icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-flip-gray-900 mb-1 group-hover/service:text-flip-blue-700 transition-colors responsive-text-base">
                          {service.title}
                        </h4>
                        <p className="responsive-text-sm text-flip-gray-600 leading-relaxed">
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
      </div>
    </section>
  );
};

export default NetworkSection;
