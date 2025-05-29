
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const QuestionnaireForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: '',
    services: [] as string[],
    budget: '',
    description: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleServiceChange = (service: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      services: checked 
        ? [...prev.services, service]
        : prev.services.filter(s => s !== service)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      console.log('Enviando dados do questionário:', formData);
      
      // Inserir os dados na tabela budget_requests do Supabase
      const { data, error } = await supabase
        .from('budget_requests')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            property_type: formData.propertyType,
            services: formData.services,
            budget: formData.budget,
            description: formData.description
          }
        ]);

      if (error) {
        console.error('Erro ao salvar questionário:', error);
        throw error;
      }

      console.log('Questionário salvo com sucesso:', data);
      
      toast({
        title: "Questionário enviado com sucesso!",
        description: "Entraremos em contato em breve para elaborar seu orçamento.",
      });

      // Limpar o formulário após envio bem-sucedido
      setFormData({
        name: '',
        email: '',
        phone: '',
        propertyType: '',
        services: [],
        budget: '',
        description: ''
      });

    } catch (error) {
      console.error('Erro ao enviar questionário:', error);
      toast({
        title: "Erro ao enviar questionário",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Nome completo</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            required
            disabled={isSubmitting}
          />
        </div>
        
        <div>
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            required
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone">Telefone</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            required
            disabled={isSubmitting}
          />
        </div>
        
        <div>
          <Label htmlFor="propertyType">Tipo de propriedade</Label>
          <Select 
            onValueChange={(value) => setFormData(prev => ({ ...prev, propertyType: value }))}
            value={formData.propertyType}
            disabled={isSubmitting}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="residencial">Residencial</SelectItem>
              <SelectItem value="comercial">Comercial</SelectItem>
              <SelectItem value="industrial">Industrial</SelectItem>
              <SelectItem value="rural">Rural</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label>Serviços de interesse:</Label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
          {[
            'Energia Solar',
            'Automação Residencial',
            'Redes Privadas',
            'Monitoramento',
            'Manutenção',
            'Consultoria'
          ].map((service) => (
            <div key={service} className="flex items-center space-x-2">
              <Checkbox
                id={service}
                checked={formData.services.includes(service)}
                onCheckedChange={(checked) => handleServiceChange(service, checked as boolean)}
                disabled={isSubmitting}
              />
              <Label htmlFor={service} className="text-sm">{service}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="budget">Orçamento aproximado</Label>
        <Select 
          onValueChange={(value) => setFormData(prev => ({ ...prev, budget: value }))}
          value={formData.budget}
          disabled={isSubmitting}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione a faixa" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ate-50k">Até R$ 50.000</SelectItem>
            <SelectItem value="50k-100k">R$ 50.000 - R$ 100.000</SelectItem>
            <SelectItem value="100k-200k">R$ 100.000 - R$ 200.000</SelectItem>
            <SelectItem value="acima-200k">Acima de R$ 200.000</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="description">Descrição do projeto (opcional)</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Descreva brevemente seu projeto ou necessidades específicas..."
          rows={4}
          disabled={isSubmitting}
        />
      </div>

      <Button 
        type="submit" 
        className="w-full bg-flip-blue-500 hover:bg-flip-blue-600"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Enviando...' : 'Enviar Questionário'}
      </Button>
    </form>
  );
};

export default QuestionnaireForm;
