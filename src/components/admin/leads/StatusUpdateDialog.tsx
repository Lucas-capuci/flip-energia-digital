
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Textarea } from '../../ui/textarea';
import { useForm } from 'react-hook-form';

interface StatusUpdateDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (status: string, observation: string) => void;
  currentStatus: string;
}

interface StatusUpdateForm {
  status: string;
  observation: string;
}

const StatusUpdateDialog: React.FC<StatusUpdateDialogProps> = ({
  isOpen,
  onClose,
  onUpdate,
  currentStatus
}) => {
  const { register, handleSubmit, setValue, watch, reset } = useForm<StatusUpdateForm>({
    defaultValues: {
      status: currentStatus,
      observation: ''
    }
  });

  const onSubmit = (data: StatusUpdateForm) => {
    onUpdate(data.status, data.observation);
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Atualizar Status do Lead</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="status">Status</Label>
            <Select 
              value={watch('status')} 
              onValueChange={(value) => setValue('status', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="novo">Novo</SelectItem>
                <SelectItem value="em_analise">Em Análise</SelectItem>
                <SelectItem value="proposta_enviada">Proposta Enviada</SelectItem>
                <SelectItem value="negociacao">Negociação</SelectItem>
                <SelectItem value="aprovado">Aprovado</SelectItem>
                <SelectItem value="rejeitado">Rejeitado</SelectItem>
                <SelectItem value="cancelado">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="observation">Observação</Label>
            <Textarea 
              id="observation"
              placeholder="Adicione uma observação sobre esta alteração..."
              {...register('observation')}
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Atualizar Status</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default StatusUpdateDialog;
