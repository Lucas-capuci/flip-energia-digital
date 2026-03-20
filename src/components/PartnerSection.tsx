
import React, { useState } from 'react';
import { Zap, Check, Upload, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const PartnerSection = () => {
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', city: '', state: '', averageConsumption: '', invoice: null as File | null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, invoice: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      let invoice_url = null;
      if (formData.invoice) {
        const fileExt = formData.invoice.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const { data: uploadData, error: uploadError } = await supabase.storage.from('invoices').upload(`partner-invoices/${fileName}`, formData.invoice);
        if (uploadError) { toast.error('Erro ao fazer upload da fatura. Continuando sem anexo...'); }
        else { const { data: { publicUrl } } = supabase.storage.from('invoices').getPublicUrl(`partner-invoices/${fileName}`); invoice_url = publicUrl; }
      }
      const { error } = await supabase.from('partner_registrations').insert({
        full_name: formData.fullName, email: formData.email, phone: formData.phone, city: formData.city, state: formData.state, average_consumption: formData.averageConsumption || null, invoice_url
      });
      if (error) { toast.error('Erro ao processar cadastro. Tente novamente.'); return; }
      toast.success('Cadastro realizado com sucesso! Entraremos em contato em breve.');
      setFormData({ fullName: '', email: '', phone: '', city: '', state: '', averageConsumption: '', invoice: null });
      const fileInput = document.getElementById('invoice-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } catch (error) { toast.error('Erro inesperado. Tente novamente.'); } finally { setIsSubmitting(false); }
  };

  const benefits = ['Sem investimento inicial', 'Sem instalação de equipamentos', 'Economia garantida na primeira fatura', 'Energia 100% limpa e renovável'];

  return (
    <section id="parceiros" className="py-20 bg-background relative bg-orbs overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern z-0"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Zap className="h-8 w-8 text-[#E100FF] mr-2" />
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">Seja um Parceiro Flip</h2>
          </div>
          
          <h3 className="text-2xl md:text-3xl font-semibold text-foreground/80 mb-4">
            Reduza sua conta de energia — sem precisar investir em placas solares!
          </h3>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Com a <strong className="text-foreground">Geração Compartilhada da Flip</strong>, você economiza até{' '}
            <span className="text-4xl font-bold gradient-text-glow-alternate">40%</span>{' '}
            de forma simples, rápida e sem burocracia.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Benefits */}
          <div className="space-y-8">
            <div>
              <h4 className="text-2xl font-bold text-foreground mb-6">Como funciona?</h4>
              <p className="text-lg text-muted-foreground mb-8">
                Você pode reduzir sua conta de luz em até <strong className="text-foreground">40%</strong> — mesmo sem ter placas solares! 
                Com a Geração Compartilhada da Flip, você acessa energia limpa e mais barata, direto da nossa rede de parceiros solares.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3 glass rounded-lg p-4">
                  <div className="bg-green-500/20 p-2 rounded-full">
                    <Check className="h-4 w-4 text-green-400" />
                  </div>
                  <span className="text-foreground/80 font-medium">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="btn-glow rounded-2xl p-8 text-white text-center">
              <div className="text-6xl font-bold mb-2">40%</div>
              <div className="text-xl font-semibold mb-2">de economia</div>
              <div className="text-white/70">na sua conta de luz</div>
            </div>
          </div>

          {/* Form */}
          <div className="glass-card p-8">
            <div className="text-center mb-6">
              <h4 className="text-2xl font-bold text-foreground mb-2">Preencha o formulário e comece a economizar:</h4>
              <div className="flex items-center justify-center text-sm text-muted-foreground">
                <Shield className="h-4 w-4 mr-2" />
                Seus dados estão seguros com a gente.
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">Nome completo *</label>
                <Input required value={formData.fullName} onChange={(e) => handleInputChange('fullName', e.target.value)} placeholder="Ex: João da Silva" className="bg-secondary border-border text-foreground" disabled={isSubmitting} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">E-mail *</label>
                  <Input type="email" required value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} placeholder="seu@email.com" className="bg-secondary border-border text-foreground" disabled={isSubmitting} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">Telefone com DDD *</label>
                  <Input type="tel" required value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} placeholder="(62) 99999-9999" className="bg-secondary border-border text-foreground" disabled={isSubmitting} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">Cidade *</label>
                  <Input required value={formData.city} onChange={(e) => handleInputChange('city', e.target.value)} placeholder="Ex: Goiânia" className="bg-secondary border-border text-foreground" disabled={isSubmitting} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">Estado *</label>
                  <Input required value={formData.state} onChange={(e) => handleInputChange('state', e.target.value)} placeholder="Ex: GO" className="bg-secondary border-border text-foreground" disabled={isSubmitting} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">Consumo médio de energia (opcional)</label>
                <Input value={formData.averageConsumption} onChange={(e) => handleInputChange('averageConsumption', e.target.value)} placeholder="Ex: 500 kWh/mês" className="bg-secondary border-border text-foreground" disabled={isSubmitting} />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">Upload da última fatura (opcional)</label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-[#E100FF]/30 transition-colors">
                  <Upload className="h-8 w-8 text-[#E100FF] mx-auto mb-2" />
                  <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileUpload} className="hidden" id="invoice-upload" disabled={isSubmitting} />
                  <label htmlFor="invoice-upload" className={`cursor-pointer text-[#E100FF] hover:text-[#E100FF]/80 font-medium ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    Clique para selecionar o arquivo
                  </label>
                  <p className="text-sm text-muted-foreground mt-1">PDF, JPG ou PNG até 5MB</p>
                  {formData.invoice && <p className="text-sm text-green-400 mt-2">✓ {formData.invoice.name}</p>}
                </div>
              </div>

              <Button type="submit" size="lg" disabled={isSubmitting} className="w-full btn-glow rounded-xl text-lg font-semibold py-4 disabled:opacity-50">
                <Zap className="h-5 w-5 mr-2" />
                {isSubmitting ? 'Processando...' : 'Quero Economizar Agora'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;
