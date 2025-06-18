
import React, { useState } from 'react';
import { Sun, TrendingDown, Leaf, Home, Calculator, Send, Zap, ChevronRight, Shield, Battery } from 'lucide-react';
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
      gradient: 'from-flip-red-500/10 to-flip-red-600/10',
      iconBg: 'from-flip-red-500 to-flip-red-600',
      delay: "0s"
    },
    {
      icon: Leaf,
      title: "Sustentabilidade",
      description: "Contribua para um planeta mais limpo reduzindo até 3 toneladas de CO₂ por ano.",
      gradient: 'from-green-500/10 to-green-600/10',
      iconBg: 'from-green-500 to-green-600',
      delay: "0.2s"
    },
    {
      icon: Home,
      title: "Valorização",
      description: "Aumente o valor do seu imóvel em até 8% com nossa solução de energia renovável.",
      gradient: 'from-flip-blue-500/10 to-flip-blue-600/10',
      iconBg: 'from-flip-blue-500 to-flip-blue-600',
      delay: "0.4s"
    }
  ];

  const solarFeatures = [
    {
      icon: Sun,
      title: 'Painéis de Alta Eficiência',
      description: 'Painéis solares com tecnologia de ponta e máxima conversão de energia',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Battery,
      title: 'Sistema de Armazenamento',
      description: 'Baterias inteligentes para energia disponível 24/7',
      color: 'from-flip-blue-500 to-flip-blue-600'
    },
    {
      icon: Zap,
      title: 'Inversor Inteligente',
      description: 'Conversão eficiente com monitoramento remoto em tempo real',
      color: 'from-flip-red-500 to-flip-red-600'
    },
    {
      icon: Shield,
      title: 'Proteção Avançada',
      description: 'Sistemas de proteção contra surtos e intempéries',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Home,
      title: 'Integração Residencial',
      description: 'Instalação harmoniosa com a arquitetura do seu imóvel',
      color: 'from-gray-600 to-gray-700'
    },
    {
      icon: Calculator,
      title: 'Monitoramento Inteligente',
      description: 'Acompanhe a geração e economia através de aplicativo',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <section id="energia-solar" className="py-20 bg-gradient-to-br from-slate-50 via-orange-50/20 to-yellow-50/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header moderno */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute -inset-3 bg-gradient-to-r from-flip-red-500/30 via-yellow-500/30 to-orange-500/30 rounded-full blur-2xl animate-pulse"></div>
              <div className="relative bg-white p-6 rounded-full shadow-2xl border-2 border-gray-100">
                <Sun className="h-12 w-12 text-flip-red-600" />
              </div>
            </div>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-flip-gray-900 to-flip-gray-700 bg-clip-text text-transparent">
              Energia Solar
            </span>
            <br />
            <span className="bg-gradient-to-r from-flip-red-600 via-yellow-600 to-orange-600 bg-clip-text text-transparent">
              Fotovoltaica
            </span>
          </h2>
          
          <div className="w-32 h-1 bg-gradient-to-r from-flip-red-500 via-yellow-500 to-orange-500 mx-auto mb-6 rounded-full"></div>
          
          <p className="text-xl text-flip-gray-600 max-w-4xl mx-auto leading-relaxed">
            Transforme a luz do sol em <span className="font-bold text-flip-red-600 bg-flip-red-50 px-2 py-1 rounded">economia real</span>. 
            Nossa solução de energia solar reduz sua conta de luz em até <span className="font-bold text-yellow-600 bg-yellow-50 px-2 py-1 rounded">95%</span> e valoriza seu imóvel.
          </p>
        </div>

        {/* Benefits com estilo moderno */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {benefits.map((benefit, index) => (
            <div 
              key={benefit.title} 
              className="group relative animate-fade-in"
              style={{ animationDelay: benefit.delay }}
            >
              <div className={`absolute -inset-1 bg-gradient-to-r ${benefit.gradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              <Card className="relative bg-white/90 backdrop-blur-sm rounded-3xl border-2 border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 h-full">
                <CardHeader className="text-center pb-4">
                  <div className={`bg-gradient-to-br ${benefit.iconBg} p-5 rounded-2xl w-fit mx-auto mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
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

        {/* Solar Features */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-flip-gray-900 mb-4">
              Tecnologia <span className="bg-gradient-to-r from-flip-red-600 to-yellow-600 bg-clip-text text-transparent">Solar Avançada</span>
            </h3>
            <div className="w-20 h-1 bg-gradient-to-r from-flip-red-500 to-yellow-500 mx-auto mb-4 rounded-full"></div>
            <p className="text-lg text-flip-gray-600 max-w-3xl mx-auto">
              Componentes de alta qualidade para máxima eficiência energética
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solarFeatures.map((feature, index) => (
              <div 
                key={feature.title}
                className="group relative"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`absolute -inset-1 bg-gradient-to-r ${feature.color} rounded-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-300`}></div>
                
                <Card className="relative bg-white/95 backdrop-blur-sm rounded-2xl border-2 border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full">
                  <CardContent className="p-6">
                    <div className={`bg-gradient-to-r ${feature.color} p-3 rounded-xl w-fit mb-4 shadow-md transform group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="font-bold text-flip-gray-900 mb-2 text-lg group-hover:text-flip-red-700 transition-colors">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Calculadora refinada */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-flip-red-500/20 to-yellow-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <Card className="relative bg-white/95 backdrop-blur-sm rounded-3xl border-2 border-gray-100 shadow-2xl">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-flip-red-500 to-yellow-500 rounded-t-3xl"></div>
              
              <CardHeader className="bg-gradient-to-r from-gray-50 to-white rounded-t-3xl border-b border-gray-100">
                <CardTitle className="flex items-center text-2xl text-gray-900">
                  <div className="p-2 bg-gradient-to-r from-flip-red-500 to-yellow-500 rounded-lg mr-3">
                    <Calculator className="h-6 w-6 text-white" />
                  </div>
                  Calculadora de Economia
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Descubra quanto você pode economizar com energia solar
                </CardDescription>
              </CardHeader>
              
              <CardContent className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="calc-consumo" className="text-gray-700 font-medium">
                      Consumo Mensal (kWh)
                    </Label>
                    <Input 
                      id="calc-consumo" 
                      name="consumo" 
                      type="number" 
                      value={calculatorData.consumo} 
                      onChange={handleCalculatorChange} 
                      placeholder="300"
                      className="border-gray-300 focus:border-flip-red-500 focus:ring-flip-red-500/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="calc-tarifa" className="text-gray-700 font-medium">
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
                      className="border-gray-300 focus:border-flip-red-500 focus:ring-flip-red-500/20"
                    />
                  </div>
                </div>

                {calculatorData.consumo && (
                  <div className="mt-8 space-y-6 animate-fade-in">
                    <div className="bg-gradient-to-r from-gray-50 to-yellow-50/30 p-6 rounded-2xl border border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-4 text-lg flex items-center">
                        <div className="p-2 bg-gradient-to-r from-flip-red-500 to-yellow-500 rounded-lg mr-3">
                          <Zap className="h-5 w-5 text-white" />
                        </div>
                        Economia Estimada:
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-4 bg-white/90 rounded-xl border-2 border-gray-100 hover:border-flip-red-200 transition-colors">
                          <span className="text-gray-600 font-medium">Mensal:</span>
                          <span className="font-bold text-flip-red-600 text-lg">
                            R$ {savings.economiaMensal.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-white/90 rounded-xl border-2 border-gray-100 hover:border-yellow-200 transition-colors">
                          <span className="text-gray-600 font-medium">5 anos:</span>
                          <span className="font-bold text-yellow-600 text-lg">
                            R$ {savings.economia5Anos.toFixed(0)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-white/90 rounded-xl border-2 border-gray-100 hover:border-orange-200 transition-colors">
                          <span className="text-gray-600 font-medium">10 anos:</span>
                          <span className="font-bold text-orange-600 text-lg">
                            R$ {savings.economia10Anos.toFixed(0)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-green-50/80 rounded-xl border-2 border-green-200 hover:border-green-300 transition-colors">
                          <span className="text-gray-600 font-medium">25 anos:</span>
                          <span className="font-bold text-green-600 text-xl">
                            R$ {savings.economia25Anos.toFixed(0)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-green-50/80 to-emerald-50/50 p-6 rounded-2xl border-2 border-green-200">
                      <h4 className="font-semibold text-gray-900 mb-3 text-lg flex items-center">
                        <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg mr-3">
                          <Leaf className="h-5 w-5 text-white" />
                        </div>
                        Impacto Ambiental:
                      </h4>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">CO₂ evitado/ano:</span>
                        <span className="font-bold text-green-600 text-lg">
                          {savings.co2Reducao.toFixed(0)} kg
                        </span>
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-flip-red-500 to-yellow-500 hover:from-flip-red-600 hover:to-yellow-600 text-white text-lg font-medium py-4 shadow-lg hover:shadow-xl transition-all duration-300 group/btn">
                      Solicitar Orçamento Personalizado
                      <ChevronRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Seção informativa elegante */}
          <div className="space-y-8">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <Card className="relative bg-white/95 backdrop-blur-sm rounded-3xl border-2 border-gray-100 shadow-2xl">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-t-3xl"></div>
                
                <CardHeader className="bg-gradient-to-r from-gray-50 to-white rounded-t-3xl border-b border-gray-100">
                  <CardTitle className="flex items-center text-2xl">
                    <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg mr-3">
                      <Sun className="h-6 w-6 text-white" />
                    </div>
                    Por que energia solar?
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-white/80 to-flip-red-50/30 rounded-xl hover:from-flip-red-50/50 hover:to-flip-red-50/30 transition-all duration-300 group/item border border-transparent hover:border-flip-red-200">
                      <div className="bg-gradient-to-r from-flip-red-500 to-flip-red-600 p-3 rounded-xl transform group-hover/item:scale-110 transition-transform">
                        <TrendingDown className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2 group-hover/item:text-flip-red-700 transition-colors">Economia Imediata</h4>
                        <p className="text-gray-600">Comece a economizar desde a primeira fatura com redução de até 95% nos custos.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-white/80 to-flip-blue-50/30 rounded-xl hover:from-flip-blue-50/50 hover:to-flip-blue-50/30 transition-all duration-300 group/item border border-transparent hover:border-flip-blue-200">
                      <div className="bg-gradient-to-r from-flip-blue-500 to-flip-blue-600 p-3 rounded-xl transform group-hover/item:scale-110 transition-transform">
                        <Home className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2 group-hover/item:text-flip-blue-700 transition-colors">Valorização do Imóvel</h4>
                        <p className="text-gray-600">Aumente o valor do seu imóvel e tenha um diferencial competitivo no mercado.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-white/80 to-green-50/30 rounded-xl hover:from-green-50/50 hover:to-green-50/30 transition-all duration-300 group/item border border-transparent hover:border-green-200">
                      <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-xl transform group-hover/item:scale-110 transition-transform">
                        <Leaf className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2 group-hover/item:text-green-700 transition-colors">Responsabilidade Ambiental</h4>
                        <p className="text-gray-600">Contribua para um futuro sustentável com energia 100% limpa e renovável.</p>
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
