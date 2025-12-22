import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { Minus, Plus, RefreshCw } from 'lucide-react';

interface QuickDespesaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId?: string;
  onSuccess?: () => void;
}

interface Projeto {
  id: string;
  name: string;
}

const CATEGORIAS_RAPIDAS = [
  'Material',
  'Mão de Obra',
  'Equipamento',
  'Transporte',
  'Alimentação',
  'Combustível',
];

const FORNECEDORES_RECENTES = [
  'Fornecedor Geral',
];

export const QuickDespesaDialog: React.FC<QuickDespesaDialogProps> = ({
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
  const [fornecedor, setFornecedor] = useState('');
  const [ehRecorrente, setEhRecorrente] = useState(false);
  const [frequencia, setFrequencia] = useState('mensal');
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
      .select('id, name')
      .order('name');
    setProjetos(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const categoriaFinal = categoria === 'outro' ? customCategoria : categoria;
    const valorNum = parseFloat(valor);

    try {
      const { error } = await supabase.from('despesas').insert([{
        tipo_despesa: selectedProject ? 'projeto' : 'operacional',
        projeto_id: selectedProject || null,
        fornecedor: fornecedor || 'Fornecedor',
        categoria: categoriaFinal,
        valor: valorNum,
        valor_total: valorNum,
        valor_pago: 0,
        status_pagamento: 'pendente',
        forma_pagamento: 'pix',
        data_saida: new Date().toISOString().split('T')[0],
        tipo_custo: ehRecorrente ? 'fixo' : 'variavel',
        eh_recorrente: ehRecorrente,
        frequencia: ehRecorrente ? frequencia : null,
        indefinida: ehRecorrente,
      }]);

      if (error) throw error;

      toast({ 
        title: "Despesa lançada!", 
        description: `${categoriaFinal}: R$ ${valor}${ehRecorrente ? ' (recorrente)' : ''}` 
      });
      
      // Reset
      setValor('');
      setCategoria('');
      setCustomCategoria('');
      setFornecedor('');
      setEhRecorrente(false);
      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      console.error('Erro:', error);
      toast({ title: "Erro", description: "Erro ao criar despesa", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Minus className="h-5 w-5 text-red-600" />
            Lançar Despesa
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Projeto (opcional)</Label>
            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger>
                <SelectValue placeholder="Sem projeto" />
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
            <Label>Fornecedor</Label>
            <Input
              value={fornecedor}
              onChange={(e) => setFornecedor(e.target.value)}
              placeholder="Nome do fornecedor"
            />
          </div>

          <div className="space-y-2">
            <Label>Categoria *</Label>
            <div className="grid grid-cols-3 gap-2">
              {CATEGORIAS_RAPIDAS.map(cat => (
                <Button
                  key={cat}
                  type="button"
                  variant={categoria === cat ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCategoria(cat)}
                  className="text-xs px-2"
                >
                  {cat}
                </Button>
              ))}
            </div>
            <Button
              type="button"
              variant={categoria === 'outro' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCategoria('outro')}
              className="w-full text-xs"
            >
              <Plus className="h-3 w-3 mr-1" /> Outra Categoria
            </Button>
            {categoria === 'outro' && (
              <Input
                value={customCategoria}
                onChange={(e) => setCustomCategoria(e.target.value)}
                placeholder="Digite a categoria"
                required
              />
            )}
          </div>

          {/* Recorrência simplificada */}
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <Checkbox
              id="recorrente"
              checked={ehRecorrente}
              onCheckedChange={(checked) => setEhRecorrente(checked as boolean)}
            />
            <Label htmlFor="recorrente" className="flex items-center gap-2 cursor-pointer">
              <RefreshCw className="h-4 w-4" />
              Despesa recorrente
            </Label>
            {ehRecorrente && (
              <Select value={frequencia} onValueChange={setFrequencia}>
                <SelectTrigger className="w-28 h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mensal">Mensal</SelectItem>
                  <SelectItem value="bimestral">Bimestral</SelectItem>
                  <SelectItem value="trimestral">Trimestral</SelectItem>
                  <SelectItem value="anual">Anual</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>

          <Button 
            type="submit" 
            disabled={loading || !valor || (!categoria || (categoria === 'outro' && !customCategoria))} 
            className="w-full"
            variant="destructive"
          >
            {loading ? 'Salvando...' : 'Lançar Despesa'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
