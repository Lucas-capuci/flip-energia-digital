
import React, { useState } from 'react';
import { Zap, Check, Upload, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';

const PartnerSection = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    averageConsumption: '',
    invoice: null as File | null
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, invoice: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados do formulário:', formData);
    // Aqui seria integrado com o backend da Flip
    alert('Cadastro realizado com sucesso! Entraremos em contato em breve.');
  };

  const benefits = [
    'Sem investimento inicial',
    'Sem instalação de equipamentos',
    'Economia garantida na primeira fatura',
    'Energia 100% limpa e renovável'
  ];

  return (
    <section id="parceiros" className="py-20 bg-gradient-to-br from-flip-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Zap className="h-8 w-8 text-flip-blue-500 mr-2" />
            <h2 className="text-4xl md:text-5xl font-bold text-flip-gray-900">
              Seja um Parceiro Flip
            </h2>
          </div>
          
          <h3 className="text-2xl md:text-3xl font-semibold text-flip-gray-800 mb-4">
            Reduza sua conta de energia — sem precisar investir em placas solares!
          </h3>
          
          <p className="text-lg text-flip-gray-600 max-w-3xl mx-auto mb-8">
            Com a <strong>Geração Compartilhada da Flip</strong>, você economiza até{' '}
            <span className="text-4xl font-bold gradient-text-glow-alternate">40%</span>{' '}
            de forma simples, rápida e sem burocracia.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Benefícios */}
          <div className="space-y-8">
            <div>
              <h4 className="text-2xl font-bold text-flip-gray-900 mb-6">
                Como funciona?
              </h4>
              <p className="text-lg text-flip-gray-600 mb-8">
                Você pode reduzir sua conta de luz em até <strong>40%</strong> — mesmo sem ter placas solares! 
                Com a Geração Compartilhada da Flip, você acessa energia limpa e mais barata, 
                direto da nossa rede de parceiros solares.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-flip-gray-700 font-medium">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-flip-blue-500 to-flip-blue-600 rounded-2xl p-8 text-white">
              <div className="text-center">
                <div className="text-6xl font-bold mb-2">40%</div>
                <div className="text-xl font-semibold mb-2">de economia</div>
                <div className="text-flip-blue-100">na sua conta de luz</div>
              </div>
            </div>
          </div>

          {/* Formulário */}
          <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h4 className="text-2xl font-bold text-flip-gray-900 mb-2">
                  Preencha o formulário e comece a economizar:
                </h4>
                <div className="flex items-center justify-center text-sm text-flip-gray-600">
                  <Shield className="h-4 w-4 mr-2" />
                  Seus dados estão seguros com a gente.
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-flip-gray-700 mb-2">
                    Nome completo *
                  </label>
                  <Input
                    required
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="Ex: João da Silva"
                    className="border-flip-blue-200 focus:border-flip-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-flip-gray-700 mb-2">
                      E-mail *
                    </label>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="seu@email.com"
                      className="border-flip-blue-200 focus:border-flip-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-flip-gray-700 mb-2">
                      Telefone com DDD *
                    </label>
                    <Input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="(62) 99999-9999"
                      className="border-flip-blue-200 focus:border-flip-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-flip-gray-700 mb-2">
                      Cidade *
                    </label>
                    <Input
                      required
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="Ex: Goiânia"
                      className="border-flip-blue-200 focus:border-flip-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-flip-gray-700 mb-2">
                      Estado *
                    </label>
                    <Input
                      required
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      placeholder="Ex: GO"
                      className="border-flip-blue-200 focus:border-flip-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-flip-gray-700 mb-2">
                    Consumo médio de energia (opcional)
                  </label>
                  <Input
                    value={formData.averageConsumption}
                    onChange={(e) => handleInputChange('averageConsumption', e.target.value)}
                    placeholder="Ex: 500 kWh/mês"
                    className="border-flip-blue-200 focus:border-flip-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-flip-gray-700 mb-2">
                    Upload da última fatura (opcional)
                  </label>
                  <div className="border-2 border-dashed border-flip-blue-300 rounded-lg p-6 text-center hover:border-flip-blue-500 transition-colors">
                    <Upload className="h-8 w-8 text-flip-blue-400 mx-auto mb-2" />
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="invoice-upload"
                    />
                    <label
                      htmlFor="invoice-upload"
                      className="cursor-pointer text-flip-blue-600 hover:text-flip-blue-700 font-medium"
                    >
                      Clique para selecionar o arquivo
                    </label>
                    <p className="text-sm text-flip-gray-500 mt-1">
                      PDF, JPG ou PNG até 5MB
                    </p>
                    {formData.invoice && (
                      <p className="text-sm text-green-600 mt-2">
                        ✓ {formData.invoice.name}
                      </p>
                    )}
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-flip-blue-500 to-flip-blue-600 hover:from-flip-blue-600 hover:to-flip-blue-700 text-white text-lg font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Zap className="h-5 w-5 mr-2" />
                  Quero Economizar Agora
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;
