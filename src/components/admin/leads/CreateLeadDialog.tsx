
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Checkbox } from '../../ui/checkbox';
import { Textarea } from '../../ui/textarea';
import { useForm } from 'react-hook-form';

interface Lead {
  name: string;
  email: string;
  phone: string;
  property_type: string;
  services: string[];
  description?: string;
}

interface CreateLeadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (lead: Omit<Lead, 'id'>) => void;
}

const serviceOptions = [
  'Energia Solar',
  'Redes de Distribuição',
  'Projetos Elétricos',
  'Automação',
  'Manutenção'
];

const CreateLeadDialog: React.FC<CreateLeadDialogProps> = ({
  isOpen,
  onClose,
  onSave
}) => {
  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<Lead>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      property_type: '',
      services: [],
      description: ''
    }
  });

  const selectedServices = watch('services') || [];
  const selectedPropertyType = watch('property_type');

  const onSubmit = (data: Lead) => {
    console.log('Submitting lead data:', data);
    
    // Ensure all required fields are present
    if (!data.name || !data.email || !data.phone || !data.property_type || !data.services.length) {
      console.error('Missing required fields:', data);
      return;
    }

    onSave(data);
    reset();
  };

  const handleServiceChange = (service: string, checked: boolean) => {
    const currentServices = selectedServices;
    if (checked) {
      setValue('services', [...currentServices, service]);
    } else {
      setValue('services', currentServices.filter(s => s !== service));
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Criar Novo Lead</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Nome *</Label>
              <Input 
                id="name"
                placeholder="Nome completo" 
                {...register('name', { required: 'Nome é obrigatório' })} 
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input 
                id="email"
                type="email" 
                placeholder="email@exemplo.com" 
                {...register('email', { required: 'Email é obrigatório' })} 
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Telefone *</Label>
              <Input 
                id="phone"
                placeholder="(11) 99999-9999" 
                {...register('phone', { required: 'Telefone é obrigatório' })} 
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
            </div>
            <div>
              <Label htmlFor="property_type">Tipo de Imóvel *</Label>
              <Select 
                value={selectedPropertyType} 
                onValueChange={(value) => setValue('property_type', value)}
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
              {errors.property_type && <p className="text-red-500 text-sm">Tipo de imóvel é obrigatório</p>}
            </div>
          </div>

          <div>
            <Label>Serviços de Interesse *</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {serviceOptions.map((service) => (
                <div key={service} className="flex items-center space-x-2">
                  <Checkbox
                    id={service}
                    checked={selectedServices.includes(service)}
                    onCheckedChange={(checked) => handleServiceChange(service, checked as boolean)}
                  />
                  <Label htmlFor={service} className="text-sm font-normal">
                    {service}
                  </Label>
                </div>
              ))}
            </div>
            {selectedServices.length === 0 && <p className="text-red-500 text-sm">Selecione pelo menos um serviço</p>}
          </div>

          <div>
            <Label htmlFor="description">Descrição</Label>
            <Textarea 
              id="description"
              placeholder="Detalhes adicionais sobre o projeto" 
              {...register('description')} 
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button type="submit">Criar Lead</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateLeadDialog;
