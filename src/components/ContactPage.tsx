
import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import QuestionnaireForm from './QuestionnaireForm';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    empresa: '',
    assunto: '',
    mensagem: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([formData]);

      if (error) {
        throw error;
      }

      toast({
        title: "Mensagem enviada com sucesso!",
        description: "Entraremos em contato em até 24 horas.",
      });

      // Limpar formulário
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        empresa: '',
        assunto: '',
        mensagem: ''
      });

    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      toast({
        title: "Erro ao enviar mensagem",
        description: "Tente novamente ou entre em contato por telefone.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Endereço',
      content: 'Avenida PL-3 n 205\nCEP: 74884-115\nGoiânia, GO',
      color: 'text-blue-600'
    },
    {
      icon: Phone,
      title: 'Telefone',
      content: '(62) 9 3175-4998\n(62) 3000-0000',
      color: 'text-green-600'
    },
    {
      icon: Mail,
      title: 'E-mail',
      content: 'Lucas.capuci@flipeng.com.br\nEduardo.gomes@flipeng.com.br\nJoao.pedro@flipeng.com.br',
      color: 'text-purple-600'
    },
    {
      icon: Clock,
      title: 'Horário de Funcionamento',
      content: 'Segunda a Sexta: 8h às 18h\nSábado: 8h às 12h',
      color: 'text-orange-600'
    }
  ];

  const services = [
    'Energia Solar Fotovoltaica',
    'Redes de Distribuição Privadas',
    'Projetos Elétricos',
    'Automação Residencial',
    'Consultoria Energética',
    'Manutenção Preventiva'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-flip-blue-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-flip-blue-600 to-flip-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Entre em Contato
          </h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Estamos prontos para transformar suas ideias em realidade. 
            Entre em contato conosco e descubra como podemos ajudar.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Formulário de Contato */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-flip-gray-900">
                Envie sua Mensagem
              </CardTitle>
              <CardDescription>
                Preencha o formulário abaixo e entraremos em contato em até 24 horas.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nome">Nome *</Label>
                    <Input
                      id="nome"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      required
                      className="mt-1"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">E-mail *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="mt-1"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="telefone">Telefone *</Label>
                    <Input
                      id="telefone"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleChange}
                      required
                      className="mt-1"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <Label htmlFor="empresa">Empresa</Label>
                    <Input
                      id="empresa"
                      name="empresa"
                      value={formData.empresa}
                      onChange={handleChange}
                      className="mt-1"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="assunto">Assunto *</Label>
                  <Input
                    id="assunto"
                    name="assunto"
                    value={formData.assunto}
                    onChange={handleChange}
                    required
                    className="mt-1"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <Label htmlFor="mensagem">Mensagem *</Label>
                  <Textarea
                    id="mensagem"
                    name="mensagem"
                    value={formData.mensagem}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="mt-1"
                    placeholder="Descreva seu projeto ou dúvida..."
                    disabled={isSubmitting}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-flip-blue-600 hover:bg-flip-blue-700"
                  disabled={isSubmitting}
                >
                  <Send className="w-4 h-4 mr-2" />
                  {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Informações de Contato */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-flip-gray-900 mb-6">
                Informações de Contato
              </h2>
              <div className="grid grid-cols-1 gap-6">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="hover-scale">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className={`${info.color} bg-gray-50 p-3 rounded-full`}>
                          <info.icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-flip-gray-900 mb-2">
                            {info.title}
                          </h3>
                          <p className="text-flip-gray-600 whitespace-pre-line">
                            {info.content}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Nossos Serviços */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-flip-gray-900">
                  Nossos Serviços
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-3">
                  {services.map((service, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-flip-gray-700">{service}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Call to Action */}
            <Card className="bg-gradient-to-r from-flip-blue-600 to-flip-blue-700 text-white">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold mb-2">
                  Precisa de um Orçamento?
                </h3>
                <p className="mb-4 opacity-90">
                  Solicite um orçamento personalizado para seu projeto.
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="secondary" className="bg-white text-flip-blue-600 hover:bg-gray-100">
                      Solicitar Orçamento
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Questionário para Orçamento</DialogTitle>
                    </DialogHeader>
                    <QuestionnaireForm />
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Mapa (Placeholder) */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-flip-gray-900 mb-6 text-center">
            Nossa Localização
          </h2>
          <Card className="overflow-hidden">
            <div className="bg-gray-200 h-64 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-flip-blue-600 mx-auto mb-2" />
                <p className="text-flip-gray-600">Mapa interativo em breve</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
