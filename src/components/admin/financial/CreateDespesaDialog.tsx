import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface CreateDespesaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Projeto {
  id: string;
  name: string;
}

export const CreateDespesaDialog: React.FC<CreateDespesaDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const [loading, setLoading] = useState(false);
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [formData, setFormData] = useState({
    tipo_despesa: '',
    projeto_id: '',
    fornecedor: '',
    categoria: '',
    valor: '',
    forma_pagamento: '',
    data_saida: '',
    tipo_custo: '',
    eh_recorrente: false,
    frequencia: '',
    duracao_meses: '',
    indefinida: false,
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
        data_saida: new Date().toISOString().split('T')[0]
      }));
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('despesas')
        .insert([{
          tipo_despesa: formData.tipo_despesa,
          projeto_id: formData.projeto_id || null,
          fornecedor: formData.fornecedor,
          categoria: formData.categoria,
          valor: parseFloat(formData.valor),
          forma_pagamento: formData.forma_pagamento,
          data_saida: formData.data_saida,
          tipo_custo: formData.tipo_custo,
          eh_recorrente: formData.eh_recorrente,
          frequencia: formData.eh_recorrente ? formData.frequencia : null,
          duracao_meses: (formData.eh_recorrente && !formData.indefinida && formData.duracao_meses) 
            ? parseInt(formData.duracao_meses) 
            : null,
          indefinida: formData.eh_recorrente ? formData.indefinida : false,
          observacoes: formData.observacoes || null,
        }]);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Despesa criada com sucesso",
      });

      // Reset form
      setFormData({
        tipo_despesa: '',
        projeto_id: '',
        fornecedor: '',
        categoria: '',
        valor: '',
        forma_pagamento: '',
        data_saida: '',
        tipo_custo: '',
        eh_recorrente: false,
        frequencia: '',
        duracao_meses: '',
        indefinida: false,
        observacoes: '',
      });

      onOpenChange(false);
    } catch (error) {
      console.error('Erro ao criar despesa:', error);
      toast({
        title: "Erro",
        description: "Erro ao criar despesa",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nova Despesa</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="tipo_despesa">Tipo de Despesa *</Label>
            <Select
              value={formData.tipo_despesa}
              onValueChange={(value) => handleInputChange('tipo_despesa', value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="operacional">Operacional</SelectItem>
                <SelectItem value="administrativa">Administrativa</SelectItem>
                <SelectItem value="projeto">Projeto</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="manutencao">Manutenção</SelectItem>
                <SelectItem value="comercial">Comercial</SelectItem>
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
            <Label htmlFor="fornecedor">Fornecedor *</Label>
            <Input
              id="fornecedor"
              value={formData.fornecedor}
              onChange={(e) => handleInputChange('fornecedor', e.target.value)}
              placeholder="Nome do fornecedor"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="categoria">Categoria *</Label>
            <Input
              id="categoria"
              value={formData.categoria}
              onChange={(e) => handleInputChange('categoria', e.target.value)}
              placeholder="Ex: Aluguel, Material, Combustível, etc."
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
            <Label htmlFor="data_saida">Data da Despesa *</Label>
            <Input
              id="data_saida"
              type="date"
              value={formData.data_saida}
              onChange={(e) => handleInputChange('data_saida', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tipo_custo">Tipo de Custo *</Label>
            <Select
              value={formData.tipo_custo}
              onValueChange={(value) => handleInputChange('tipo_custo', value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fixo">Fixo</SelectItem>
                <SelectItem value="variavel">Variável</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Recorrência */}
          <div className="space-y-4 border-t pt-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="eh_recorrente"
                checked={formData.eh_recorrente}
                onCheckedChange={(checked) => handleInputChange('eh_recorrente', checked as boolean)}
              />
              <Label htmlFor="eh_recorrente">Esta é uma despesa recorrente</Label>
            </div>

            {formData.eh_recorrente && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="frequencia">Frequência *</Label>
                  <Select
                    value={formData.frequencia}
                    onValueChange={(value) => handleInputChange('frequencia', value)}
                    required={formData.eh_recorrente}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a frequência" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mensal">Mensal</SelectItem>
                      <SelectItem value="bimestral">Bimestral</SelectItem>
                      <SelectItem value="trimestral">Trimestral</SelectItem>
                      <SelectItem value="semestral">Semestral</SelectItem>
                      <SelectItem value="anual">Anual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="indefinida"
                    checked={formData.indefinida}
                    onCheckedChange={(checked) => handleInputChange('indefinida', checked as boolean)}
                  />
                  <Label htmlFor="indefinida">Duração indefinida</Label>
                </div>

                {!formData.indefinida && (
                  <div className="space-y-2">
                    <Label htmlFor="duracao_meses">Duração (meses)</Label>
                    <Input
                      id="duracao_meses"
                      type="number"
                      min="1"
                      value={formData.duracao_meses}
                      onChange={(e) => handleInputChange('duracao_meses', e.target.value)}
                      placeholder="Quantos meses repetir"
                    />
                  </div>
                )}
              </>
            )}
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
              {loading ? 'Criando...' : 'Criar Despesa'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};