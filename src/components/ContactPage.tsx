
import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import QuestionnaireForm from './QuestionnaireForm';

const ContactPage = () => {
  const [formData, setFormData] = useState({ nome: '', email: '', telefone: '', empresa: '', assunto: '', mensagem: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('contact_messages').insert([formData]);
      if (error) throw error;
      toast({ title: "Mensagem enviada com sucesso!", description: "Entraremos em contato em até 24 horas." });
      setFormData({ nome: '', email: '', telefone: '', empresa: '', assunto: '', mensagem: '' });
    } catch (error) {
      toast({ title: "Erro ao enviar mensagem", description: "Tente novamente ou entre em contato por telefone.", variant: "destructive" });
    } finally { setIsSubmitting(false); }
  };

  const contactInfo = [
    { icon: MapPin, title: 'Endereço', content: 'Avenida PL-3 n 205\nCEP: 74884-115\nGoiânia, GO' },
    { icon: Phone, title: 'Telefone', content: '(62) 9 3175-4998\n(62) 3000-0000' },
    { icon: Mail, title: 'E-mail', content: 'Lucas.capuci@flipeng.com.br\nEduardo.gomes@flipeng.com.br\nJoao.pedro@flipeng.com.br' },
    { icon: Clock, title: 'Horário de Funcionamento', content: 'Segunda a Sexta: 8h às 18h\nSábado: 8h às 12h' }
  ];

  const services = ['Energia Solar Fotovoltaica', 'Redes de Distribuição Privadas', 'Projetos Elétricos', 'Automação Residencial', 'Consultoria Energética', 'Manutenção Preventiva'];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="relative bg-orbs bg-dark-base py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern z-[1]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">Entre em </span>
            <span className="gradient-text">Contato</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Estamos prontos para transformar suas ideias em realidade. 
            Entre em contato conosco e descubra como podemos ajudar.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="glass-card overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-[#7F00FF] to-[#E100FF]"></div>
            <div className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">Envie sua Mensagem</h2>
              <p className="text-muted-foreground mb-6">Preencha o formulário abaixo e entraremos em contato em até 24 horas.</p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nome" className="text-foreground">Nome *</Label>
                    <Input id="nome" name="nome" value={formData.nome} onChange={handleChange} required className="mt-1 bg-secondary border-border text-foreground" disabled={isSubmitting} />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-foreground">E-mail *</Label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required className="mt-1 bg-secondary border-border text-foreground" disabled={isSubmitting} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="telefone" className="text-foreground">Telefone *</Label>
                    <Input id="telefone" name="telefone" value={formData.telefone} onChange={handleChange} required className="mt-1 bg-secondary border-border text-foreground" disabled={isSubmitting} />
                  </div>
                  <div>
                    <Label htmlFor="empresa" className="text-foreground">Empresa</Label>
                    <Input id="empresa" name="empresa" value={formData.empresa} onChange={handleChange} className="mt-1 bg-secondary border-border text-foreground" disabled={isSubmitting} />
                  </div>
                </div>

                <div>
                  <Label htmlFor="assunto" className="text-foreground">Assunto *</Label>
                  <Input id="assunto" name="assunto" value={formData.assunto} onChange={handleChange} required className="mt-1 bg-secondary border-border text-foreground" disabled={isSubmitting} />
                </div>

                <div>
                  <Label htmlFor="mensagem" className="text-foreground">Mensagem *</Label>
                  <Textarea id="mensagem" name="mensagem" value={formData.mensagem} onChange={handleChange} required rows={5} className="mt-1 bg-secondary border-border text-foreground" placeholder="Descreva seu projeto ou dúvida..." disabled={isSubmitting} />
                </div>

                <Button type="submit" className="w-full btn-glow rounded-xl font-semibold" disabled={isSubmitting}>
                  <Send className="w-4 h-4 mr-2" />
                  {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                </Button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Informações de Contato</h2>
              <div className="grid grid-cols-1 gap-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="glass-card p-6 hover:border-[#E100FF]/30 transition-all">
                    <div className="flex items-start space-x-4">
                      <div className="btn-glow p-3 rounded-full flex-shrink-0">
                        <info.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">{info.title}</h3>
                        <p className="text-muted-foreground whitespace-pre-line">{info.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="glass-card overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-[#E100FF] to-[#7F00FF]"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-4">Nossos Serviços</h3>
                <div className="grid grid-cols-1 gap-3">
                  {services.map((service, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                      <span className="text-muted-foreground">{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="glass-card overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-[#7F00FF] to-[#E100FF]"></div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-foreground mb-2">Precisa de um Orçamento?</h3>
                <p className="mb-4 text-muted-foreground">Solicite um orçamento personalizado para seu projeto.</p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="btn-glow rounded-full px-6 font-semibold">Solicitar Orçamento</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader><DialogTitle>Questionário para Orçamento</DialogTitle></DialogHeader>
                    <QuestionnaireForm />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>

        {/* Map placeholder */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Nossa Localização</h2>
          <div className="glass-card overflow-hidden">
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-[#E100FF] mx-auto mb-2" />
                <p className="text-muted-foreground">Mapa interativo em breve</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
