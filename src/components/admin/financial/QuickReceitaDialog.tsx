import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, DollarSign } from 'lucide-react';

interface QuickReceitaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId?: string;
  onSuccess?: () => void;
}

interface Projeto {
  id: string;
  name: string;
  client: string;
}

const CATEGORIAS_RAPIDAS = [
  'Instalação Solar',
  'Consultoria',
  'Manutenção',
  'Projeto Elétrico',
  'Venda Equipamentos',
  'Serviço Técnico',
];

export const QuickReceitaDialog: React.FC<QuickReceitaDialogProps> = ({
  open,
  onOpenChange,
  projectId,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [selectedProject, setSelectedProject] = useState<string>(projectId || '');
  const [valor, setValor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [customCategoria, setCustomCategoria] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      loadProjetos();
      if (projectId) setSelectedProject(projectId);
    }
  }, [open, projectId]);

  const loadProjetos = async () => {
    const { data } = await supabase
      .from('projects')
      .select('id, name, client')
      .order('name');
    setProjetos(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const categoriaFinal = categoria === 'outro' ? customCategoria : categoria;
    const projeto = projetos.find(p => p.id === selectedProject);

    try {
      const { error } = await supabase.from('receitas').insert([{
        tipo_receita: 'projeto',
        projeto_id: selectedProject || null,
        cliente: projeto?.client || 'Cliente',
        categoria: categoriaFinal,
        valor: parseFloat(valor),
        forma_pagamento: 'pix',
        data_entrada: new Date().toISOString().split('T')[0],
      }]);

      if (error) throw error;

      toast({ title: "Receita lançada!", description: `${categoriaFinal}: R$ ${valor}` });
      
      // Reset
      setValor('');
      setCategoria('');
      setCustomCategoria('');
      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      console.error('Erro:', error);
      toast({ title: "Erro", description: "Erro ao criar receita", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            Lançar Receita
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Projeto</Label>
            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Sem projeto</SelectItem>
                {projetos.map(p => (
                  <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Valor (R$) *</Label>
            <Input
              type="number"
              step="0.01"
              min="0"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              placeholder="0,00"
              required
              className="text-lg font-semibold"
            />
          </div>

          <div className="space-y-2">
            <Label>Categoria *</Label>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIAS_RAPIDAS.map(cat => (
                <Button
                  key={cat}
                  type="button"
                  variant={categoria === cat ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCategoria(cat)}
                  className="justify-start text-xs"
                >
                  {cat}
                </Button>
              ))}
              <Button
                type="button"
                variant={categoria === 'outro' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCategoria('outro')}
                className="justify-start text-xs col-span-2"
              >
                <Plus className="h-3 w-3 mr-1" /> Outra
              </Button>
            </div>
            {categoria === 'outro' && (
              <Input
                value={customCategoria}
                onChange={(e) => setCustomCategoria(e.target.value)}
                placeholder="Digite a categoria"
                required
              />
            )}
          </div>

          <Button 
            type="submit" 
            disabled={loading || !valor || (!categoria || (categoria === 'outro' && !customCategoria))} 
            className="w-full"
          >
            {loading ? 'Salvando...' : 'Lançar Receita'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
