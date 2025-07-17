import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface Receita {
  id: string;
  tipo_receita: string;
  projeto_id?: string | null;
  cliente: string;
  categoria: string;
  valor: number;
  forma_pagamento: string;
  data_entrada: string;
  observacoes?: string | null;
  projects?: {
    name: string;
  };
}

interface Projeto {
  id: string;
  name: string;
}

interface EditReceitaDialogProps {
  receita: Receita | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function EditReceitaDialog({ receita, isOpen, onClose, onSuccess }: EditReceitaDialogProps) {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [formData, setFormData] = useState({
    tipo_receita: '',
    projeto_id: '',
    cliente: '',
    categoria: '',
    valor: '',
    forma_pagamento: '',
    data_entrada: '',
    observacoes: ''
  });

  useEffect(() => {
    if (receita) {
      setFormData({
        tipo_receita: receita.tipo_receita,
        projeto_id: receita.projeto_id || 'none',
        cliente: receita.cliente,
        categoria: receita.categoria,
        valor: receita.valor.toString(),
        forma_pagamento: receita.forma_pagamento,
        data_entrada: receita.data_entrada,
        observacoes: receita.observacoes || ''
      });
    }
  }, [receita]);

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
    
    if (!receita) return;

    try {
      const { error } = await supabase
        .from('receitas')
        .update({
          tipo_receita: formData.tipo_receita,
          projeto_id: formData.projeto_id === 'none' ? null : formData.projeto_id || null,
          cliente: formData.cliente,
          categoria: formData.categoria,
          valor: parseFloat(formData.valor),
          forma_pagamento: formData.forma_pagamento,
          data_entrada: formData.data_entrada,
          observacoes: formData.observacoes || null
        })
        .eq('id', receita.id);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Receita atualizada com sucesso!"
      });

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Erro ao atualizar receita:', error);
      toast({
        title: "Erro",
        description: "Erro ao atualizar receita. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Editar Receita</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="tipo_receita">Tipo de Receita</Label>
              <Select value={formData.tipo_receita} onValueChange={(value) => setFormData({...formData, tipo_receita: value})}>
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
              <Label htmlFor="cliente">Cliente</Label>
              <Input
                id="cliente"
                value={formData.cliente}
                onChange={(e) => setFormData({...formData, cliente: e.target.value})}
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
              <Label htmlFor="data_entrada">Data de Entrada</Label>
              <Input
                id="data_entrada"
                type="date"
                value={formData.data_entrada}
                onChange={(e) => setFormData({...formData, data_entrada: e.target.value})}
                required
              />
            </div>
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
              Atualizar Receita
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}