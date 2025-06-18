
import React, { useState } from 'react';
import { Sun, TrendingDown, Leaf, Home, Calculator, Send, Zap, ChevronRight } from 'lucide-react';
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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCalculatorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCalculatorData({
      ...calculatorData,
      [e.target.name]: e.target.value
    });
  };

  const calculateSavings = () => {
    const consumoMensal = parseFloat(calculatorData.consumo) || 0;
    const tarifa = parseFloat(calculatorData.tarifa) || 0;
    const custoMensal = consumoMensal * tarifa;
    const economiaPercentual = 0.9;

    const economiaMensal = custoMensal * economiaPercentual;
    const economia5Anos = economiaMensal * 12 * 5;
    const economia10Anos = economiaMensal * 12 * 10;
    const economia25Anos = economiaMensal * 12 * 25;
    const co2Reducao = consumoMensal * 0.0817 * 12;

    return {
      economiaMensal,
      economia5Anos,
      economia10Anos,
      economia25Anos,
      co2Reducao
    };
  };

  const savings = calculateSavings();

  const benefits = [
    {
      icon: TrendingDown,
      title: "Economia Financeira",
      description: "Reduza sua conta de luz em até 95% e tenha retorno do investimento em 4 a 6 anos.",
      color: "from-flip-red-500 to-flip-red-600",
      delay: "0s"
    },
    {
      icon: Leaf,
      title: "Sustentabilidade",
      description: "Contribua para um planeta mais limpo reduzindo até 3 toneladas de CO₂ por ano.",
      color: "from-emerald-500 to-green-600",
      delay: "0.2s"
    },
    {
      icon: Home,
      title: "Valorização",
      description: "Aumente o valor do seu imóvel em até 8% com nossa solução de energia renovável.",
      color: "from-flip-blue-500 to-flip-blue-600",
      delay: "0.4s"
    }
  ];

  return (
    <section id="energia-solar" className="py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header com animação */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-flip-red-500 to-flip-blue-500 rounded-full blur opacity-30 animate-pulse"></div>
              <div className="relative bg-white p-4 rounded-full shadow-xl">
                <Sun className="h-12 w-12 text-flip-red-500" />
              </div>
            </div>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-flip-gray-900 to-flip-gray-700 bg-clip-text text-transparent">
              Energia Solar
            </span>
            <br />
            <span className="bg-gradient-to-r from-flip-red-500 via-flip-blue-500 to-flip-blue-600 bg-clip-text text-transparent animate-gradient-x">
              Fotovoltaica
            </span>
          </h2>
          
          <p className="text-xl text-flip-gray-600 max-w-4xl mx-auto leading-relaxed">
            Transforme a luz do sol em economia real. Nossa solução de energia solar 
            reduz sua conta de luz em até <span className="font-bold text-flip-red-500">95%</span> e valoriza seu imóvel.
          </p>
        </div>

        {/* Benefits com animações em cascata */}
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Calculadora renovada */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-flip-blue-500 to-flip-red-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
            
            <Card className="relative bg-white/90 backdrop-blur-xl rounded-3xl border-0 shadow-2xl">
              <CardHeader className="bg-gradient-to-r from-flip-blue-500 to-flip-red-500 text-white rounded-t-3xl">
                <CardTitle className="flex items-center text-2xl">
                  <Calculator className="h-6 w-6 mr-3" />
                  Calculadora de Economia
                </CardTitle>
                <CardDescription className="text-blue-100">
                  Descubra quanto você pode economizar com energia solar
                </CardDescription>
              </CardHeader>
              
              <CardContent className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="calc-consumo" className="text-flip-gray-700 font-medium">
                      Consumo Mensal (kWh)
                    </Label>
                    <Input 
                      id="calc-consumo" 
                      name="consumo" 
                      type="number" 
                      value={calculatorData.consumo} 
                      onChange={handleCalculatorChange} 
                      placeholder="300"
                      className="border-flip-blue-200 focus:border-flip-red-500 focus:ring-flip-red-500/20 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="calc-tarifa" className="text-flip-gray-700 font-medium">
                      Tarifa (R$/kWh)
                    </Label>
                    <Input 
                      id="calc-tarifa" 
                      name="tarifa" 
                      type="number" 
                      step="0.01" 
                      value={calculatorData.tarifa} 
                      onChange={handleCalculatorChange} 
                      placeholder="0.75"
                      className="border-flip-blue-200 focus:border-flip-red-500 focus:ring-flip-red-500/20 rounded-xl"
                    />
                  </div>
                </div>

                {calculatorData.consumo && (
                  <div className="mt-8 space-y-6 animate-fade-in">
                    <div className="bg-gradient-to-br from-flip-blue-50 to-flip-red-50 p-6 rounded-2xl border border-flip-blue-100">
                      <h4 className="font-bold text-flip-gray-900 mb-4 text-lg flex items-center">
                        <Zap className="h-5 w-5 mr-2 text-flip-red-500" />
                        Economia Estimada:
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-white/70 rounded-xl">
                          <span className="text-flip-gray-600 font-medium">Mensal:</span>
                          <span className="font-bold text-flip-red-600 text-lg">
                            R$ {savings.economiaMensal.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white/70 rounded-xl">
                          <span className="text-flip-gray-600 font-medium">5 anos:</span>
                          <span className="font-bold text-flip-blue-600 text-lg">
                            R$ {savings.economia5Anos.toFixed(0)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white/70 rounded-xl">
                          <span className="text-flip-gray-600 font-medium">10 anos:</span>
                          <span className="font-bold text-flip-blue-600 text-lg">
                            R$ {savings.economia10Anos.toFixed(0)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                          <span className="text-flip-gray-600 font-medium">25 anos:</span>
                          <span className="font-bold text-green-600 text-xl">
                            R$ {savings.economia25Anos.toFixed(0)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200">
                      <h4 className="font-bold text-flip-gray-900 mb-3 text-lg flex items-center">
                        <Leaf className="h-5 w-5 mr-2 text-green-600" />
                        Impacto Ambiental:
                      </h4>
                      <div className="flex justify-between items-center">
                        <span className="text-flip-gray-600 font-medium">CO₂ evitado/ano:</span>
                        <span className="font-bold text-green-600 text-lg">
                          {savings.co2Reducao.toFixed(0)} kg
                        </span>
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-flip-red-500 to-flip-red-600 hover:from-flip-red-600 hover:to-flip-red-700 text-white text-lg font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                      Solicitar Orçamento Personalizado
                      <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Seção de informações adicionais */}
          <div className="space-y-8">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-flip-red-500 to-flip-blue-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
              
              <Card className="relative bg-white/90 backdrop-blur-xl rounded-3xl border-0 shadow-2xl">
                <CardHeader className="bg-gradient-to-r from-flip-red-500 to-flip-blue-500 text-white rounded-t-3xl">
                  <CardTitle className="text-2xl">
                    Por que escolher energia solar?
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-gradient-to-r from-flip-red-500 to-flip-red-600 p-2 rounded-lg">
                        <TrendingDown className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-flip-gray-900 mb-2">Economia Imediata</h4>
                        <p className="text-flip-gray-600">Comece a economizar desde a primeira fatura com redução de até 95% nos custos.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="bg-gradient-to-r from-flip-blue-500 to-flip-blue-600 p-2 rounded-lg">
                        <Home className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-flip-gray-900 mb-2">Valorização do Imóvel</h4>
                        <p className="text-flip-gray-600">Aumente o valor do seu imóvel e tenha um diferencial competitivo no mercado.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-2 rounded-lg">
                        <Leaf className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-flip-gray-900 mb-2">Responsabilidade Ambiental</h4>
                        <p className="text-flip-gray-600">Contribua para um futuro sustentável com energia 100% limpa e renovável.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolarSection;
