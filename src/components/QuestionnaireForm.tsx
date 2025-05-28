
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { useToast } from '@/hooks/use-toast';

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
  
  const { toast } = useToast();

  const handleServiceChange = (service: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      services: checked 
        ? [...prev.services, service]
        : prev.services.filter(s => s !== service)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data:', formData);
    
    toast({
      title: "Questionário enviado!",
      description: "Entraremos em contato em breve para elaborar seu orçamento.",
    });
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
          />
        </div>
        
        <div>
          <Label htmlFor="propertyType">Tipo de propriedade</Label>
          <Select onValueChange={(value) => setFormData(prev => ({ ...prev, propertyType: value }))}>
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
                onCheckedChange={(checked) => handleServiceChange(service, checked as boolean)}
              />
              <Label htmlFor={service} className="text-sm">{service}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="budget">Orçamento aproximado</Label>
        <Select onValueChange={(value) => setFormData(prev => ({ ...prev, budget: value }))}>
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
        />
      </div>

      <Button type="submit" className="w-full bg-flip-blue-500 hover:bg-flip-blue-600">
        Enviar Questionário
      </Button>
    </form>
  );
};

export default QuestionnaireForm;
