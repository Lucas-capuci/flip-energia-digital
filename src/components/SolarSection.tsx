
import React, { useState } from 'react';
import { Sun, TrendingDown, Leaf, Home, Calculator, Send, Zap, ChevronRight, Shield, Battery } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

const SolarSection = () => {
  const [formData, setFormData] = useState({
    nome: '', email: '', telefone: '', endereco: '', consumo: '', espaco: '', observacoes: ''
  });
  
  const [calculatorData, setCalculatorData] = useState({ consumo: '', tarifa: '0.75' });

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
    const economiaPercentual = 0.9;
    const economiaMensal = custoMensal * economiaPercentual;
    return {
      economiaMensal,
      economia5Anos: economiaMensal * 12 * 5,
      economia10Anos: economiaMensal * 12 * 10,
      economia25Anos: economiaMensal * 12 * 25,
      co2Reducao: consumoMensal * 0.0817 * 12
    };
  };

  const savings = calculateSavings();

  const benefits = [
    { icon: TrendingDown, title: "Economia Financeira", description: "Reduza sua conta de luz em até 95% e tenha retorno do investimento em 4 a 6 anos.", delay: "0s" },
    { icon: Leaf, title: "Sustentabilidade", description: "Contribua para um planeta mais limpo reduzindo até 3 toneladas de CO₂ por ano.", delay: "0.2s" },
    { icon: Home, title: "Valorização", description: "Aumente o valor do seu imóvel em até 8% com nossa solução de energia renovável.", delay: "0.4s" }
  ];

  const solarFeatures = [
    { icon: Sun, title: 'Painéis de Alta Eficiência', description: 'Painéis solares com tecnologia de ponta e máxima conversão de energia' },
    { icon: Battery, title: 'Sistema de Armazenamento', description: 'Baterias inteligentes para energia disponível 24/7' },
    { icon: Zap, title: 'Inversor Inteligente', description: 'Conversão eficiente com monitoramento remoto em tempo real' },
    { icon: Shield, title: 'Proteção Avançada', description: 'Sistemas de proteção contra surtos e intempéries' },
    { icon: Home, title: 'Integração Residencial', description: 'Instalação harmoniosa com a arquitetura do seu imóvel' },
    { icon: Calculator, title: 'Monitoramento Inteligente', description: 'Acompanhe a geração e economia através de aplicativo' }
  ];

  return (
    <section id="energia-solar" className="py-20 bg-background relative bg-orbs overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern z-0"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute -inset-3 bg-gradient-to-r from-[#7F00FF]/40 to-[#E100FF]/40 rounded-full blur-2xl animate-pulse"></div>
              <div className="relative glass p-6 rounded-full">
                <Sun className="h-12 w-12 text-[#E100FF]" />
              </div>
            </div>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">Energia Solar</span>
            <br />
            <span className="gradient-text">Fotovoltaica</span>
          </h2>
          
          <div className="w-32 h-1 bg-gradient-to-r from-[#7F00FF] to-[#E100FF] mx-auto mb-6 rounded-full"></div>
          
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Transforme a luz do sol em <span className="font-bold text-[#E100FF]">economia real</span>. 
            Nossa solução de energia solar reduz sua conta de luz em até <span className="font-bold text-[#E100FF]">95%</span> e valoriza seu imóvel.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="group relative animate-fade-in" style={{ animationDelay: benefit.delay }}>
              <div className="glass-card p-8 h-full text-center">
                <div className="btn-glow p-5 rounded-2xl w-fit mx-auto mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Solar Features */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-foreground">Tecnologia </span>
              <span className="gradient-text">Solar Avançada</span>
            </h3>
            <div className="w-20 h-1 bg-gradient-to-r from-[#7F00FF] to-[#E100FF] mx-auto mb-4 rounded-full"></div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Componentes de alta qualidade para máxima eficiência energética
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solarFeatures.map((feature) => (
              <div key={feature.title} className="group">
                <div className="glass-card p-6 h-full">
                  <div className="btn-glow p-3 rounded-xl w-fit mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-bold text-foreground mb-2 text-lg group-hover:text-[#E100FF] transition-colors">{feature.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Calculator */}
          <div className="glass-card overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-[#7F00FF] to-[#E100FF]"></div>
            <div className="p-8">
              <div className="flex items-center mb-6">
                <div className="btn-glow p-2 rounded-lg mr-3">
                  <Calculator className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Calculadora de Economia</h3>
                  <p className="text-muted-foreground text-sm">Descubra quanto você pode economizar</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="calc-consumo" className="text-foreground font-medium">Consumo Mensal (kWh)</Label>
                  <Input id="calc-consumo" name="consumo" type="number" value={calculatorData.consumo} onChange={handleCalculatorChange} placeholder="300" className="bg-secondary border-border text-foreground" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="calc-tarifa" className="text-foreground font-medium">Tarifa (R$/kWh)</Label>
                  <Input id="calc-tarifa" name="tarifa" type="number" step="0.01" value={calculatorData.tarifa} onChange={handleCalculatorChange} placeholder="0.75" className="bg-secondary border-border text-foreground" />
                </div>
              </div>

              {calculatorData.consumo && (
                <div className="space-y-6 animate-fade-in">
                  <div className="glass p-6 rounded-2xl">
                    <h4 className="font-semibold text-foreground mb-4 text-lg flex items-center">
                      <Zap className="h-5 w-5 text-[#E100FF] mr-2" />
                      Economia Estimada:
                    </h4>
                    <div className="space-y-3">
                      {[
                        { label: 'Mensal', value: savings.economiaMensal.toFixed(2) },
                        { label: '5 anos', value: savings.economia5Anos.toFixed(0) },
                        { label: '10 anos', value: savings.economia10Anos.toFixed(0) },
                        { label: '25 anos', value: savings.economia25Anos.toFixed(0) },
                      ].map((item) => (
                        <div key={item.label} className="flex justify-between items-center p-4 glass rounded-xl">
                          <span className="text-muted-foreground font-medium">{item.label}:</span>
                          <span className="font-bold gradient-text text-lg">R$ {item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="glass p-6 rounded-2xl border border-green-500/20">
                    <h4 className="font-semibold text-foreground mb-3 text-lg flex items-center">
                      <Leaf className="h-5 w-5 text-green-400 mr-2" />
                      Impacto Ambiental:
                    </h4>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground font-medium">CO₂ evitado/ano:</span>
                      <span className="font-bold text-green-400 text-lg">{savings.co2Reducao.toFixed(0)} kg</span>
                    </div>
                  </div>

                  <Button className="w-full btn-glow rounded-xl text-lg font-medium py-4 group/btn">
                    Solicitar Orçamento Personalizado
                    <ChevronRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Info section */}
          <div className="space-y-8">
            <div className="glass-card overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-[#E100FF] to-[#7F00FF]"></div>
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-br from-[#E100FF] to-[#7F00FF] p-2 rounded-lg mr-3">
                    <Sun className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Por que energia solar?</h3>
                </div>

                <div className="space-y-4">
                  {[
                    { icon: TrendingDown, title: 'Economia Imediata', desc: 'Comece a economizar desde a primeira fatura com redução de até 95% nos custos.' },
                    { icon: Home, title: 'Valorização do Imóvel', desc: 'Aumente o valor do seu imóvel e tenha um diferencial competitivo no mercado.' },
                    { icon: Leaf, title: 'Responsabilidade Ambiental', desc: 'Contribua para um futuro sustentável com energia 100% limpa e renovável.' },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start space-x-4 p-4 glass rounded-xl hover:border-[#E100FF]/30 transition-all duration-300 group/item">
                      <div className="btn-glow p-3 rounded-xl transform group-hover/item:scale-110 transition-transform flex-shrink-0">
                        <item.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2 group-hover/item:text-[#E100FF] transition-colors">{item.title}</h4>
                        <p className="text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolarSection;
