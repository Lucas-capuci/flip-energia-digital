import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Download, Loader2 } from 'lucide-react';
import { generateContractPDF } from './ContractPDFGenerator';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';

const contractSchema = z.object({
  projeto_id: z.string().min(1, 'Selecione um projeto'),
  nome: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  cpf: z.string().min(11, 'CPF/CNPJ inválido'),
  endereco: z.string().min(10, 'Endereço deve ter pelo menos 10 caracteres'),
  geracao: z.string().min(1, 'Informe a geração estimada'),
  valor: z.string().min(1, 'Informe o valor'),
  tipodepagamento: z.string().min(5, 'Descreva a forma de pagamento'),
  data: z.string().min(1, 'Informe a data'),
});

type ContractFormData = z.infer<typeof contractSchema>;

const ContractGenerator = () => {
  const [isGenerating, setIsGenerating] = React.useState(false);

  const { data: projects, isLoading: loadingProjects } = useQuery({
    queryKey: ['projects-for-contracts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('id, name, client')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const form = useForm<ContractFormData>({
    resolver: zodResolver(contractSchema),
    defaultValues: {
      projeto_id: '',
      nome: '',
      cpf: '',
      endereco: '',
      geracao: '',
      valor: '',
      tipodepagamento: '',
      data: format(new Date(), 'dd/MM/yyyy'),
    },
  });

  const formatCPFInput = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }
    return numbers
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
  };

  const formatCurrencyInput = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    const numValue = parseInt(numbers) / 100;
    if (isNaN(numValue)) return '';
    return numValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const onSubmit = async (data: ContractFormData) => {
    try {
      setIsGenerating(true);
      const valorNumerico = parseFloat(data.valor.replace(/\./g, '').replace(',', '.'));
      
      // Salvar contrato no banco de dados
      const { error: insertError } = await supabase
        .from('contracts')
        .insert({
          project_id: data.projeto_id,
          nome_cliente: data.nome,
          cpf_cnpj: data.cpf,
          endereco: data.endereco,
          geracao: data.geracao,
          valor: valorNumerico,
          tipo_pagamento: data.tipodepagamento,
          data_contrato: new Date().toISOString().split('T')[0],
        });

      if (insertError) throw insertError;

      // Gerar PDF
      await generateContractPDF({
        nome: data.nome,
        cpf: data.cpf,
        endereco: data.endereco,
        geracao: data.geracao,
        valor: valorNumerico,
        tipodepagamento: data.tipodepagamento,
        data: data.data,
      });
      
      toast.success('Contrato salvo e PDF gerado com sucesso!');
      form.reset();
    } catch (error) {
      console.error('Erro ao gerar contrato:', error);
      toast.error('Erro ao gerar o contrato. Tente novamente.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Gerador de Contratos
          </CardTitle>
          <CardDescription>
            Preencha os dados do cliente para gerar o contrato de prestação de serviços
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="projeto_id"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Projeto Vinculado</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={loadingProjects ? "Carregando..." : "Selecione um projeto"} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {projects?.map((project) => (
                            <SelectItem key={project.id} value={project.id}>
                              {project.name} - {project.client}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="nome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Cliente</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome completo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cpf"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CPF/CNPJ</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="000.000.000-00"
                          {...field}
                          onChange={(e) => field.onChange(formatCPFInput(e.target.value))}
                          maxLength={18}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endereco"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Endereço Completo</FormLabel>
                      <FormControl>
                        <Input placeholder="Rua, número, bairro, cidade - UF" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="geracao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Geração Estimada (kWh/mês)</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: 500" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="valor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valor do Contrato (R$)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="0,00"
                          {...field}
                          onChange={(e) => field.onChange(formatCurrencyInput(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tipodepagamento"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Forma de Pagamento</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Ex: 50% de entrada e 50% na entrega do sistema"
                          className="min-h-[80px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="data"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data do Contrato</FormLabel>
                      <FormControl>
                        <Input placeholder="dd/mm/aaaa" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full md:w-auto" disabled={isGenerating}>
                {isGenerating ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Download className="h-4 w-4 mr-2" />
                )}
                {isGenerating ? 'Gerando...' : 'Gerar PDF do Contrato'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContractGenerator;
