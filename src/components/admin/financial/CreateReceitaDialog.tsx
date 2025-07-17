import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface CreateReceitaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Projeto {
  id: string;
  name: string;
}

export const CreateReceitaDialog: React.FC<CreateReceitaDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const [loading, setLoading] = useState(false);
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [formData, setFormData] = useState({
    tipo_receita: '',
    projeto_id: '',
    cliente: '',
    categoria: '',
    valor: '',
    forma_pagamento: '',
    data_entrada: '',
    observacoes: '',
  });
  const { toast } = useToast();

  const loadProjetos = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('id, name')
        .order('name');

      if (error) throw error;
      setProjetos(data || []);
    } catch (error) {
      console.error('Erro ao carregar projetos:', error);
    }
  };

  useEffect(() => {
    if (open) {
      loadProjetos();
      // Definir data de hoje como padrão
      setFormData(prev => ({
        ...prev,
        data_entrada: new Date().toISOString().split('T')[0]
      }));
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('receitas')
        .insert([{
          tipo_receita: formData.tipo_receita,
          projeto_id: formData.projeto_id || null,
          cliente: formData.cliente,
          categoria: formData.categoria,
          valor: parseFloat(formData.valor),
          forma_pagamento: formData.forma_pagamento,
          data_entrada: formData.data_entrada,
          observacoes: formData.observacoes || null,
        }]);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Receita criada com sucesso",
      });

      // Reset form
      setFormData({
        tipo_receita: '',
        projeto_id: '',
        cliente: '',
        categoria: '',
        valor: '',
        forma_pagamento: '',
        data_entrada: '',
        observacoes: '',
      });

      onOpenChange(false);
    } catch (error) {
      console.error('Erro ao criar receita:', error);
      toast({
        title: "Erro",
        description: "Erro ao criar receita",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nova Receita</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="tipo_receita">Tipo de Receita *</Label>
            <Select
              value={formData.tipo_receita}
              onValueChange={(value) => handleInputChange('tipo_receita', value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="projeto">Projeto</SelectItem>
                <SelectItem value="servico">Serviço</SelectItem>
                <SelectItem value="venda">Venda</SelectItem>
                <SelectItem value="outro">Outro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="projeto_id">Projeto (Opcional)</Label>
            <Select
              value={formData.projeto_id}
              onValueChange={(value) => handleInputChange('projeto_id', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione um projeto" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Nenhum projeto</SelectItem>
                {projetos.map((projeto) => (
                  <SelectItem key={projeto.id} value={projeto.id}>
                    {projeto.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cliente">Cliente *</Label>
            <Input
              id="cliente"
              value={formData.cliente}
              onChange={(e) => handleInputChange('cliente', e.target.value)}
              placeholder="Nome do cliente"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="categoria">Categoria *</Label>
            <Input
              id="categoria"
              value={formData.categoria}
              onChange={(e) => handleInputChange('categoria', e.target.value)}
              placeholder="Ex: Instalação Solar, Consultoria, etc."
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="valor">Valor (R$) *</Label>
            <Input
              id="valor"
              type="number"
              step="0.01"
              min="0"
              value={formData.valor}
              onChange={(e) => handleInputChange('valor', e.target.value)}
              placeholder="0,00"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="forma_pagamento">Forma de Pagamento *</Label>
            <Select
              value={formData.forma_pagamento}
              onValueChange={(value) => handleInputChange('forma_pagamento', value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a forma" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dinheiro">Dinheiro</SelectItem>
                <SelectItem value="pix">PIX</SelectItem>
                <SelectItem value="transferencia">Transferência Bancária</SelectItem>
                <SelectItem value="cartao_credito">Cartão de Crédito</SelectItem>
                <SelectItem value="cartao_debito">Cartão de Débito</SelectItem>
                <SelectItem value="boleto">Boleto</SelectItem>
                <SelectItem value="cheque">Cheque</SelectItem>
                <SelectItem value="outro">Outro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="data_entrada">Data de Entrada *</Label>
            <Input
              id="data_entrada"
              type="date"
              value={formData.data_entrada}
              onChange={(e) => handleInputChange('data_entrada', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="observacoes">Observações</Label>
            <Textarea
              id="observacoes"
              value={formData.observacoes}
              onChange={(e) => handleInputChange('observacoes', e.target.value)}
              placeholder="Observações adicionais..."
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Criando...' : 'Criar Receita'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};