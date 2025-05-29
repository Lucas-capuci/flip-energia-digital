
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
    <div className="max-h-full overflow-y-auto px-1">
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">Nome completo</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
              disabled={isSubmitting}
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">E-mail</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
              disabled={isSubmitting}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium">Telefone</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              required
              disabled={isSubmitting}
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="propertyType" className="text-sm font-medium">Tipo de propriedade</Label>
            <Select 
              onValueChange={(value) => setFormData(prev => ({ ...prev, propertyType: value }))}
              value={formData.propertyType}
              disabled={isSubmitting}
            >
              <SelectTrigger className="w-full">
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

        <div className="space-y-3">
          <Label className="text-sm font-medium">Serviços de interesse:</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

        <div className="space-y-2">
          <Label htmlFor="budget" className="text-sm font-medium">Orçamento aproximado</Label>
          <Select 
            onValueChange={(value) => setFormData(prev => ({ ...prev, budget: value }))}
            value={formData.budget}
            disabled={isSubmitting}
          >
            <SelectTrigger className="w-full">
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

        <div className="space-y-2">
          <Label htmlFor="description" className="text-sm font-medium">Descrição do projeto (opcional)</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Descreva brevemente seu projeto ou necessidades específicas..."
            rows={3}
            disabled={isSubmitting}
            className="w-full resize-none"
          />
        </div>

        <div className="pt-4">
          <Button 
            type="submit" 
            className="w-full bg-flip-blue-500 hover:bg-flip-blue-600 text-white py-3"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Questionário'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default QuestionnaireForm;
