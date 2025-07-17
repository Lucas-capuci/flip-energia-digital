import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface Despesa {
  id: string;
  tipo_despesa: string;
  projeto_id?: string | null;
  fornecedor: string;
  categoria: string;
  valor: number;
  forma_pagamento: string;
  data_saida: string;
  tipo_custo: string;
  eh_recorrente: boolean;
  frequencia?: string | null;
  duracao_meses?: number | null;
  indefinida: boolean;
  observacoes?: string | null;
  projects?: {
    name: string;
  };
}

interface Projeto {
  id: string;
  name: string;
}

interface EditDespesaDialogProps {
  despesa: Despesa | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function EditDespesaDialog({ despesa, isOpen, onClose, onSuccess }: EditDespesaDialogProps) {
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
    observacoes: ''
  });

  useEffect(() => {
    if (despesa) {
      setFormData({
        tipo_despesa: despesa.tipo_despesa,
        projeto_id: despesa.projeto_id || 'none',
        fornecedor: despesa.fornecedor,
        categoria: despesa.categoria,
        valor: despesa.valor.toString(),
        forma_pagamento: despesa.forma_pagamento,
        data_saida: despesa.data_saida,
        tipo_custo: despesa.tipo_custo,
        eh_recorrente: despesa.eh_recorrente,
        frequencia: despesa.frequencia || '',
        duracao_meses: despesa.duracao_meses?.toString() || '',
        indefinida: despesa.indefinida,
        observacoes: despesa.observacoes || ''
      });
    }
  }, [despesa]);

  useEffect(() => {
    const loadProjetos = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('id, name')
        .order('name');

      if (error) {
        console.error('Erro ao carregar projetos:', error);
        return;
      }

      setProjetos(data || []);
    };

    if (isOpen) {
      loadProjetos();
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!despesa) return;

    try {
      const { error } = await supabase
        .from('despesas')
        .update({
          tipo_despesa: formData.tipo_despesa,
          projeto_id: formData.projeto_id === 'none' ? null : formData.projeto_id || null,
          fornecedor: formData.fornecedor,
          categoria: formData.categoria,
          valor: parseFloat(formData.valor),
          forma_pagamento: formData.forma_pagamento,
          data_saida: formData.data_saida,
          tipo_custo: formData.tipo_custo,
          eh_recorrente: formData.eh_recorrente,
          frequencia: formData.eh_recorrente ? formData.frequencia : null,
          duracao_meses: (formData.eh_recorrente && !formData.indefinida && formData.duracao_meses) 
            ? parseInt(formData.duracao_meses) : null,
          indefinida: formData.eh_recorrente ? formData.indefinida : false,
          observacoes: formData.observacoes || null
        })
        .eq('id', despesa.id);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Despesa atualizada com sucesso!"
      });

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Erro ao atualizar despesa:', error);
      toast({
        title: "Erro",
        description: "Erro ao atualizar despesa. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Despesa</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="tipo_despesa">Tipo de Despesa</Label>
              <Select value={formData.tipo_despesa} onValueChange={(value) => setFormData({...formData, tipo_despesa: value})}>
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

            <div>
              <Label htmlFor="projeto_id">Projeto (Opcional)</Label>
              <Select value={formData.projeto_id} onValueChange={(value) => setFormData({...formData, projeto_id: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um projeto" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Nenhum projeto</SelectItem>
                  {projetos.map((projeto) => (
                    <SelectItem key={projeto.id} value={projeto.id}>
                      {projeto.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fornecedor">Fornecedor</Label>
              <Input
                id="fornecedor"
                value={formData.fornecedor}
                onChange={(e) => setFormData({...formData, fornecedor: e.target.value})}
                required
              />
            </div>

            <div>
              <Label htmlFor="categoria">Categoria</Label>
              <Input
                id="categoria"
                value={formData.categoria}
                onChange={(e) => setFormData({...formData, categoria: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="valor">Valor (R$)</Label>
              <Input
                id="valor"
                type="number"
                step="0.01"
                value={formData.valor}
                onChange={(e) => setFormData({...formData, valor: e.target.value})}
                required
              />
            </div>

            <div>
              <Label htmlFor="forma_pagamento">Forma de Pagamento</Label>
              <Select value={formData.forma_pagamento} onValueChange={(value) => setFormData({...formData, forma_pagamento: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dinheiro">Dinheiro</SelectItem>
                  <SelectItem value="cartao_credito">Cartão de Crédito</SelectItem>
                  <SelectItem value="cartao_debito">Cartão de Débito</SelectItem>
                  <SelectItem value="transferencia">Transferência</SelectItem>
                  <SelectItem value="boleto">Boleto</SelectItem>
                  <SelectItem value="pix">PIX</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="data_saida">Data de Saída</Label>
              <Input
                id="data_saida"
                type="date"
                value={formData.data_saida}
                onChange={(e) => setFormData({...formData, data_saida: e.target.value})}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="tipo_custo">Tipo de Custo</Label>
            <Select value={formData.tipo_custo} onValueChange={(value) => setFormData({...formData, tipo_custo: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fixo">Fixo</SelectItem>
                <SelectItem value="variavel">Variável</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4 border p-4 rounded">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="eh_recorrente"
                checked={formData.eh_recorrente}
                onCheckedChange={(checked) => setFormData({...formData, eh_recorrente: !!checked})}
              />
              <Label htmlFor="eh_recorrente">Despesa Recorrente</Label>
            </div>

            {formData.eh_recorrente && (
              <>
                <div>
                  <Label htmlFor="frequencia">Frequência</Label>
                  <Select value={formData.frequencia} onValueChange={(value) => setFormData({...formData, frequencia: value})}>
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
                    onCheckedChange={(checked) => setFormData({...formData, indefinida: !!checked})}
                  />
                  <Label htmlFor="indefinida">Duração Indefinida</Label>
                </div>

                {!formData.indefinida && (
                  <div>
                    <Label htmlFor="duracao_meses">Duração (meses)</Label>
                    <Input
                      id="duracao_meses"
                      type="number"
                      min="1"
                      value={formData.duracao_meses}
                      onChange={(e) => setFormData({...formData, duracao_meses: e.target.value})}
                    />
                  </div>
                )}
              </>
            )}
          </div>

          <div>
            <Label htmlFor="observacoes">Observações</Label>
            <Textarea
              id="observacoes"
              value={formData.observacoes}
              onChange={(e) => setFormData({...formData, observacoes: e.target.value})}
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              Atualizar Despesa
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}