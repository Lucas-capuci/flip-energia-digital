
import React from 'react';
import { Home, Shield, DollarSign, Smartphone, Lightbulb, Thermometer, Camera, Mic } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

const AutomationSection = () => {
  const benefits = [
    {
      icon: Home,
      title: 'Conforto Máximo',
      description: 'Controle toda sua casa com um toque. Iluminação, temperatura e entretenimento na palma da mão.',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Shield,
      title: 'Segurança Avançada',
      description: 'Monitoramento 24h, cameras inteligentes e alertas em tempo real para total tranquilidade.',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: DollarSign,
      title: 'Economia Inteligente',
      description: 'Otimização automática do consumo de energia, reduzindo custos operacionais em até 30%.',
      color: 'bg-yellow-100 text-yellow-600'
    }
  ];

  const useCases = [
    {
      icon: Lightbulb,
      title: 'Iluminação Inteligente',
      description: 'Controle de intensidade, cor e programação automática baseada na presença e horário.'
    },
    {
      icon: Thermometer,
      title: 'Climatização',
      description: 'Ar condicionado e aquecimento com controle de temperatura por ambiente e programação.'
    },
    {
      icon: Camera,
      title: 'Segurança',
      description: 'Câmeras, sensores de movimento, alarmes e controle de acesso integrados.'
    },
    {
      icon: Mic,
      title: 'Comandos por Voz',
      description: 'Integração com assistentes virtuais para controle total por comandos de voz.'
    }
  ];

  return (
    <section id="automacao" className="py-20 gradient-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="bg-flip-blue-100 p-3 rounded-full">
              <Home className="h-8 w-8 text-flip-blue-500" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-flip-gray-900 mb-4">
            Automação Residencial
          </h2>
          <p className="text-lg text-flip-gray-600 max-w-3xl mx-auto">
            Transforme sua casa em um ambiente inteligente, seguro e eficiente. 
            Controle tudo remotamente e otimize o uso da energia solar.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center hover-scale bg-white/80 backdrop-blur-sm">
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

        {/* Use Cases */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-flip-gray-900 text-center mb-12">
            Casos de Uso
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => (
              <Card key={index} className="hover-scale bg-white/80 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <div className="bg-flip-blue-100 p-3 rounded-full w-fit mx-auto mb-3">
                    <useCase.icon className="h-5 w-5 text-flip-blue-500" />
                  </div>
                  <CardTitle className="text-lg">{useCase.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-flip-gray-600">{useCase.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Integration with Solar */}
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-flip-gray-900">
              Integração com Energia Solar
            </CardTitle>
            <CardDescription className="text-lg">
              A automação potencializa os benefícios da energia solar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-flip-blue-100 p-4 rounded-full w-fit mx-auto mb-4">
                  <Smartphone className="h-8 w-8 text-flip-blue-500" />
                </div>
                <h4 className="font-semibold text-flip-gray-900 mb-2">Monitoramento</h4>
                <p className="text-sm text-flip-gray-600">
                  Acompanhe a geração e consumo de energia em tempo real
                </p>
              </div>
              <div className="text-center">
                <div className="bg-flip-blue-100 p-4 rounded-full w-fit mx-auto mb-4">
                  <DollarSign className="h-8 w-8 text-flip-blue-500" />
                </div>
                <h4 className="font-semibold text-flip-gray-900 mb-2">Otimização</h4>
                <p className="text-sm text-flip-gray-600">
                  Uso inteligente de equipamentos nos horários de maior geração
                </p>
              </div>
              <div className="text-center">
                <div className="bg-flip-blue-100 p-4 rounded-full w-fit mx-auto mb-4">
                  <Shield className="h-8 w-8 text-flip-blue-500" />
                </div>
                <h4 className="font-semibold text-flip-gray-900 mb-2">Controle</h4>
                <p className="text-sm text-flip-gray-600">
                  Gestão automatizada para máxima eficiência energética
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AutomationSection;
