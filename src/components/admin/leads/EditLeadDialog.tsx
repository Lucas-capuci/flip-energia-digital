
import React, { useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { useForm } from 'react-hook-form';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  property_type: string;
  services: string[];
  created_at: string;
  description?: string;
}

interface EditLeadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead | null;
  onSave: (lead: Lead) => void;
}

const EditLeadDialog: React.FC<EditLeadDialogProps> = ({
  isOpen,
  onClose,
  lead,
  onSave
}) => {
  const { register, handleSubmit, setValue, watch, reset } = useForm<Lead>();

  useEffect(() => {
    if (lead) {
      reset(lead);
    }
  }, [lead, reset]);

  const onSubmit = (data: Lead) => {
    if (lead) {
      onSave({ ...data, id: lead.id });
    }
  };

  if (!lead) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Editar Lead</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Nome</Label>
              <Input 
                id="name"
                placeholder="Nome completo" 
                {...register('name', { required: true })} 
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email"
                type="email" 
                placeholder="email@exemplo.com" 
                {...register('email', { required: true })} 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Telefone</Label>
              <Input 
                id="phone"
                placeholder="(11) 99999-9999" 
                {...register('phone', { required: true })} 
              />
            </div>
            <div>
              <Label htmlFor="property_type">Tipo de Imóvel</Label>
              <Select 
                value={watch('property_type')} 
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
            </div>
          </div>

          <div>
            <Label htmlFor="description">Descrição</Label>
            <Input 
              id="description"
              placeholder="Detalhes adicionais" 
              {...register('description')} 
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Salvar Alterações</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditLeadDialog;
