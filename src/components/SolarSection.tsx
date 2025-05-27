
import React, { useState } from 'react';
import { Sun, TrendingDown, Leaf, Home, Calculator, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

const SolarSection = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    endereco: '',
    consumo: '',
    espaco: '',
    observacoes: ''
  });

  const [calculatorData, setCalculatorData] = useState({
    consumo: '',
    tarifa: '0.75'
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCalculatorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCalculatorData({ ...calculatorData, [e.target.name]: e.target.value });
  };

  const calculateSavings = () => {
    const consumoMensal = parseFloat(calculatorData.consumo) || 0;
    const tarifa = parseFloat(calculatorData.tarifa) || 0;
    const custoMensal = consumoMensal * tarifa;
    const economiaPercentual = 0.9; // 90% de economia
    
    const economiaMensal = custoMensal * economiaPercentual;
    const economia5Anos = economiaMensal * 12 * 5;
    const economia10Anos = economiaMensal * 12 * 10;
    const economia25Anos = economiaMensal * 12 * 25;
    const co2Reducao = consumoMensal * 0.0817 * 12; // kg CO2/ano

    return {
      economiaMensal,
      economia5Anos,
      economia10Anos,
      economia25Anos,
      co2Reducao
    };
  };

  const savings = calculateSavings();

  return (
    <section id="energia-solar" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="bg-flip-blue-100 p-3 rounded-full">
              <Sun className="h-8 w-8 text-flip-blue-500" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-flip-gray-900 mb-4">
            Energia Solar Fotovoltaica
          </h2>
          <p className="text-lg text-flip-gray-600 max-w-3xl mx-auto">
            Transforme a luz do sol em economia real. Nossa solução de energia solar 
            reduz sua conta de luz em até 95% e valoriza seu imóvel.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center hover-scale">
            <CardHeader>
              <div className="bg-green-100 p-3 rounded-full w-fit mx-auto mb-4">
                <TrendingDown className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-flip-gray-900">Economia Financeira</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-flip-gray-600">
                Reduza sua conta de luz em até 95% e tenha retorno do investimento 
                em 4 a 6 anos.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover-scale">
            <CardHeader>
              <div className="bg-green-100 p-3 rounded-full w-fit mx-auto mb-4">
                <Leaf className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-flip-gray-900">Sustentabilidade</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-flip-gray-600">
                Contribua para um planeta mais limpo reduzindo até 3 toneladas 
                de CO₂ por ano.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover-scale">
            <CardHeader>
              <div className="bg-green-100 p-3 rounded-full w-fit mx-auto mb-4">
                <Home className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-flip-gray-900">Valorização</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-flip-gray-600">
                Aumente o valor do seu imóvel em até 8% com nossa solução 
                de energia renovável.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Quote Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Send className="h-5 w-5 mr-2 text-flip-blue-500" />
                Solicite seu Orçamento
              </CardTitle>
              <CardDescription>
                Preencha os dados abaixo e receba uma proposta personalizada
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nome">Nome Completo</Label>
                  <Input
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleFormChange}
                    placeholder="Seu nome completo"
                  />
                </div>
                <div>
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input
                    id="telefone"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleFormChange}
                    placeholder="(11) 99999-9999"
                  />
                </div>
                <div>
                  <Label htmlFor="consumo">Consumo Médio (kWh)</Label>
                  <Input
                    id="consumo"
                    name="consumo"
                    type="number"
                    value={formData.consumo}
                    onChange={handleFormChange}
                    placeholder="300"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="endereco">Endereço da Instalação</Label>
                <Input
                  id="endereco"
                  name="endereco"
                  value={formData.endereco}
                  onChange={handleFormChange}
                  placeholder="Rua, número, bairro, cidade"
                />
              </div>

              <div>
                <Label htmlFor="espaco">Espaço Disponível</Label>
                <Input
                  id="espaco"
                  name="espaco"
                  value={formData.espaco}
                  onChange={handleFormChange}
                  placeholder="Área do telhado ou terreno em m²"
                />
              </div>

              <div>
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea
                  id="observacoes"
                  name="observacoes"
                  value={formData.observacoes}
                  onChange={handleFormChange}
                  placeholder="Informações adicionais sobre o projeto"
                  rows={3}
                />
              </div>

              <Button className="w-full bg-flip-blue-500 hover:bg-flip-blue-600">
                <Send className="h-4 w-4 mr-2" />
                Enviar Solicitação
              </Button>
            </CardContent>
          </Card>

          {/* Calculator */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="h-5 w-5 mr-2 text-flip-blue-500" />
                Calculadora de Economia
              </CardTitle>
              <CardDescription>
                Descubra quanto você pode economizar com energia solar
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="calc-consumo">Consumo Mensal (kWh)</Label>
                  <Input
                    id="calc-consumo"
                    name="consumo"
                    type="number"
                    value={calculatorData.consumo}
                    onChange={handleCalculatorChange}
                    placeholder="300"
                  />
                </div>
                <div>
                  <Label htmlFor="calc-tarifa">Tarifa (R$/kWh)</Label>
                  <Input
                    id="calc-tarifa"
                    name="tarifa"
                    type="number"
                    step="0.01"
                    value={calculatorData.tarifa}
                    onChange={handleCalculatorChange}
                    placeholder="0.75"
                  />
                </div>
              </div>

              {calculatorData.consumo && (
                <div className="mt-6 space-y-4">
                  <div className="bg-flip-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-flip-gray-900 mb-3">Economia Estimada:</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-flip-gray-600">Mensal:</span>
                        <span className="font-semibold text-flip-blue-600">
                          R$ {savings.economiaMensal.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-flip-gray-600">5 anos:</span>
                        <span className="font-semibold text-flip-blue-600">
                          R$ {savings.economia5Anos.toFixed(0)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-flip-gray-600">10 anos:</span>
                        <span className="font-semibold text-flip-blue-600">
                          R$ {savings.economia10Anos.toFixed(0)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-flip-gray-600">25 anos:</span>
                        <span className="font-semibold text-green-600 text-lg">
                          R$ {savings.economia25Anos.toFixed(0)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-flip-gray-900 mb-2">Impacto Ambiental:</h4>
                    <div className="flex justify-between">
                      <span className="text-flip-gray-600">CO₂ evitado/ano:</span>
                      <span className="font-semibold text-green-600">
                        {savings.co2Reducao.toFixed(0)} kg
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SolarSection;
