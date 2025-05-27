
import React from 'react';
import { Network, Shield, TrendingDown, Zap, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

const NetworkSection = () => {
  const benefits = [
    {
      icon: Shield,
      title: 'Segurança Máxima',
      description: 'Rede privada com proteções avançadas contra interrupções e falhas do sistema público.',
      color: 'bg-red-100 text-red-600'
    },
    {
      icon: CheckCircle,
      title: 'Confiabilidade',
      description: 'Fornecimento ininterrupto de energia com redundâncias e sistemas de backup.',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: TrendingDown,
      title: 'Redução de Custos',
      description: 'Eliminação de perdas na transmissão e taxas de distribuição pública.',
      color: 'bg-blue-100 text-blue-600'
    }
  ];

  const applications = [
    'Condomínios residenciais e comerciais',
    'Complexos industriais',
    'Fazendas e propriedades rurais',
    'Centros comerciais e shopping centers',
    'Hospitais e clínicas',
    'Instituições de ensino'
  ];

  const features = [
    'Projeto personalizado para cada necessidade',
    'Instalação de redes de média e baixa tensão',
    'Sistemas de proteção e automação',
    'Monitoramento remoto 24/7',
    'Manutenção preventiva e corretiva',
    'Conformidade com normas ABNT e ANEEL'
  ];

  return (
    <section id="redes" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="bg-flip-blue-100 p-3 rounded-full">
              <Network className="h-8 w-8 text-flip-blue-500" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-flip-gray-900 mb-4">
            Redes de Distribuição Privadas
          </h2>
          <p className="text-lg text-flip-gray-600 max-w-3xl mx-auto">
            Projetamos e executamos redes elétricas de média e baixa tensão para 
            garantir autonomia, segurança e eficiência energética total.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center hover-scale">
              <CardHeader>
                <div className={`${benefit.color} p-3 rounded-full w-fit mx-auto mb-4`}>
                  <benefit.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-flip-gray-900">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-flip-gray-600">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Applications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 mr-2 text-flip-blue-500" />
                Aplicações
              </CardTitle>
              <CardDescription>
                Ideal para diversos tipos de empreendimentos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {applications.map((application, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-flip-gray-700">{application}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-flip-blue-500" />
                Nossos Serviços
              </CardTitle>
              <CardDescription>
                Soluções completas em infraestrutura elétrica
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-flip-blue-500 mr-3 flex-shrink-0" />
                    <span className="text-flip-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Technical Highlights */}
        <div className="mt-16">
          <Card className="bg-flip-blue-50">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-flip-gray-900">
                Expertise Técnica
              </CardTitle>
              <CardDescription className="text-lg">
                Mais de 15 anos projetando infraestrutura elétrica de alto padrão
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-flip-blue-500 mb-2">500+</div>
                  <div className="text-flip-gray-600">Projetos Executados</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-flip-blue-500 mb-2">99.9%</div>
                  <div className="text-flip-gray-600">Disponibilidade</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-flip-blue-500 mb-2">24/7</div>
                  <div className="text-flip-gray-600">Monitoramento</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default NetworkSection;
