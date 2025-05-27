
import React from 'react';
import { ArrowRight, Sun, Home, Network, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

const IntegrationSection = () => {
  return (
    <section id="integracao" className="py-20 gradient-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-flip-gray-900 mb-4">
            Como Tudo se Conecta
          </h2>
          <p className="text-lg text-flip-gray-600 max-w-3xl mx-auto">
            Nossas soluções trabalham em perfeita harmonia, criando um ecossistema 
            energético inteligente, eficiente e completamente integrado.
          </p>
        </div>

        {/* Integration Flow */}
        <div className="relative">
          {/* Desktop Flow */}
          <div className="hidden lg:block">
            <div className="flex items-center justify-between">
              {/* Solar */}
              <Card className="w-64 hover-scale bg-white/80 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <div className="bg-yellow-100 p-4 rounded-full w-fit mx-auto mb-4">
                    <Sun className="h-8 w-8 text-yellow-600" />
                  </div>
                  <CardTitle className="text-lg">Energia Solar</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-flip-gray-600">
                    Captação e conversão da energia solar em eletricidade limpa
                  </p>
                </CardContent>
              </Card>

              <ArrowRight className="h-8 w-8 text-flip-blue-500" />

              {/* Network */}
              <Card className="w-64 hover-scale bg-white/80 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <div className="bg-blue-100 p-4 rounded-full w-fit mx-auto mb-4">
                    <Network className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">Rede Privada</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-flip-gray-600">
                    Distribuição segura e eficiente sem perdas na transmissão
                  </p>
                </CardContent>
              </Card>

              <ArrowRight className="h-8 w-8 text-flip-blue-500" />

              {/* Automation */}
              <Card className="w-64 hover-scale bg-white/80 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <div className="bg-green-100 p-4 rounded-full w-fit mx-auto mb-4">
                    <Home className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-lg">Automação</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-flip-gray-600">
                    Gestão inteligente do consumo e otimização automática
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Mobile Flow */}
          <div className="lg:hidden space-y-6">
            <Card className="hover-scale bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center">
                  <div className="bg-yellow-100 p-3 rounded-full mr-4">
                    <Sun className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <CardTitle>Energia Solar</CardTitle>
                    <CardDescription>Captação e conversão</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <div className="flex justify-center">
              <ArrowRight className="h-6 w-6 text-flip-blue-500 rotate-90" />
            </div>

            <Card className="hover-scale bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <Network className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle>Rede Privada</CardTitle>
                    <CardDescription>Distribuição segura</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <div className="flex justify-center">
              <ArrowRight className="h-6 w-6 text-flip-blue-500 rotate-90" />
            </div>

            <Card className="hover-scale bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <Home className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <CardTitle>Automação</CardTitle>
                    <CardDescription>Gestão inteligente</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* Benefits of Integration */}
        <div className="mt-16">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-flip-gray-900 mb-4">
                Benefícios da Integração
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-flip-blue-100 p-4 rounded-full w-fit mx-auto mb-4">
                    <Zap className="h-8 w-8 text-flip-blue-500" />
                  </div>
                  <h4 className="font-semibold text-flip-gray-900 mb-2">
                    Eficiência Máxima
                  </h4>
                  <p className="text-flip-gray-600">
                    A energia solar alimenta diretamente a automação através da rede privada, 
                    eliminando perdas e maximizando o aproveitamento.
                  </p>
                </div>

                <div className="text-center">
                  <div className="bg-flip-blue-100 p-4 rounded-full w-fit mx-auto mb-4">
                    <Network className="h-8 w-8 text-flip-blue-500" />
                  </div>
                  <h4 className="font-semibold text-flip-gray-900 mb-2">
                    Controle Total
                  </h4>
                  <p className="text-flip-gray-600">
                    A automação otimiza o uso da energia gerada, priorizando equipamentos 
                    durante picos de produção solar.
                  </p>
                </div>

                <div className="text-center">
                  <div className="bg-flip-blue-100 p-4 rounded-full w-fit mx-auto mb-4">
                    <Home className="h-8 w-8 text-flip-blue-500" />
                  </div>
                  <h4 className="font-semibold text-flip-gray-900 mb-2">
                    Autonomia Completa
                  </h4>
                  <p className="text-flip-gray-600">
                    Independência da rede pública com geração própria, distribuição privada 
                    e gestão inteligente automatizada.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default IntegrationSection;
