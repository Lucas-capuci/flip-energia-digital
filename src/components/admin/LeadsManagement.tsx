
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Eye, Download, Filter, Search, Calendar, Edit } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';

const LeadsManagement = () => {
  const [budgetRequests, setBudgetRequests] = useState([]);
  const [partnerRegistrations, setPartnerRegistrations] = useState([]);
  const [filteredBudgetRequests, setFilteredBudgetRequests] = useState([]);
  const [filteredPartnerRegistrations, setFilteredPartnerRegistrations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterService, setFilterService] = useState('all');
  const [filterDate, setFilterDate] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [editingLead, setEditingLead] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      property_type: '',
      services: [],
      description: ''
    }
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [budgetRequests, partnerRegistrations, searchTerm, filterService, filterDate]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      
      // Fetch budget requests
      const { data: budgetData, error: budgetError } = await supabase
        .from('budget_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (budgetError) throw budgetError;

      // Fetch partner registrations
      const { data: partnerData, error: partnerError } = await supabase
        .from('partner_registrations')
        .select('*')
        .order('created_at', { ascending: false });

      if (partnerError) throw partnerError;

      setBudgetRequests(budgetData || []);
      setPartnerRegistrations(partnerData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar os dados.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filteredBudget = budgetRequests;
    let filteredPartner = partnerRegistrations;

    // Filtro por texto de busca
    if (searchTerm) {
      filteredBudget = filteredBudget.filter(request =>
        request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.phone.includes(searchTerm)
      );

      filteredPartner = filteredPartner.filter(partner =>
        partner.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        partner.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        partner.phone.includes(searchTerm) ||
        partner.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro por serviço (apenas para budget requests)
    if (filterService !== 'all') {
      filteredBudget = filteredBudget.filter(request =>
        request.services.some(service => 
          service.toLowerCase().includes(filterService.toLowerCase())
        )
      );
    }

    // Filtro por data
    if (filterDate !== 'all') {
      const today = new Date();
      const filterDate_fn = (date) => {
        const itemDate = new Date(date);
        switch (filterDate) {
          case 'today':
            return itemDate.toDateString() === today.toDateString();
          case 'week':
            const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
            return itemDate >= weekAgo;
          case 'month':
            const monthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
            return itemDate >= monthAgo;
          default:
            return true;
        }
      };

      filteredBudget = filteredBudget.filter(request => filterDate_fn(request.created_at));
      filteredPartner = filteredPartner.filter(partner => filterDate_fn(partner.created_at));
    }

    setFilteredBudgetRequests(filteredBudget);
    setFilteredPartnerRegistrations(filteredPartner);
  };

  const getStatusBadge = (request) => {
    const createdDate = new Date(request.created_at);
    const currentDate = new Date();
    const daysSinceCreated = Math.floor((currentDate.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysSinceCreated === 0) return <Badge variant="default">Novo</Badge>;
    if (daysSinceCreated <= 3) return <Badge variant="secondary">Em Análise</Badge>;
    if (daysSinceCreated <= 7) return <Badge variant="outline">Aguardando</Badge>;
    return <Badge variant="destructive">Atrasado</Badge>;
  };

  const handleEditLead = (lead) => {
    setEditingLead(lead);
    form.reset({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      property_type: lead.property_type,
      services: lead.services || [],
      description: lead.description || ''
    });
    setIsEditDialogOpen(true);
  };

  const onSubmitEdit = async (data) => {
    try {
      const { error } = await supabase
        .from('budget_requests')
        .update({
          name: data.name,
          email: data.email,
          phone: data.phone,
          property_type: data.property_type,
          services: data.services,
          description: data.description
        })
        .eq('id', editingLead.id);

      if (error) throw error;

      await fetchData();
      setIsEditDialogOpen(false);
      setEditingLead(null);
      
      toast({
        title: 'Lead atualizado',
        description: 'O lead foi atualizado com sucesso.',
      });
    } catch (error) {
      console.error('Error updating lead:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível atualizar o lead.',
        variant: 'destructive',
      });
    }
  };

  const exportData = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Nome,Email,Telefone,Tipo,Serviços,Data\n"
      + filteredBudgetRequests.map(row => 
          `${row.name},${row.email},${row.phone},${row.property_type},"${row.services.join(', ')}",${new Date(row.created_at).toLocaleDateString()}`
        ).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "leads_orcamento.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return <div className="flex justify-center py-8">Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filtros e Busca</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por nome ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterService} onValueChange={setFilterService}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por serviço" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os serviços</SelectItem>
                <SelectItem value="solar">Energia Solar</SelectItem>
                <SelectItem value="eletrica">Instalação Elétrica</SelectItem>
                <SelectItem value="redes">Redes de Distribuição</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterDate} onValueChange={setFilterDate}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os períodos</SelectItem>
                <SelectItem value="today">Hoje</SelectItem>
                <SelectItem value="week">Esta semana</SelectItem>
                <SelectItem value="month">Este mês</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={exportData} variant="outline" className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Exportar CSV</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Budget Requests */}
      <Card>
        <CardHeader>
          <CardTitle>Solicitações de Orçamento ({filteredBudgetRequests.length})</CardTitle>
          <CardDescription>Leads gerados através do formulário de orçamento</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Tipo de Imóvel</TableHead>
                <TableHead>Serviços</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBudgetRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">{request.name}</TableCell>
                  <TableCell>{request.email}</TableCell>
                  <TableCell>{request.phone}</TableCell>
                  <TableCell className="capitalize">{request.property_type}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {request.services.map((service, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(request)}</TableCell>
                  <TableCell>{new Date(request.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditLead(request)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Partner Registrations */}
      <Card>
        <CardHeader>
          <CardTitle>Cadastros de Parceiros ({filteredPartnerRegistrations.length})</CardTitle>
          <CardDescription>Pessoas interessadas em ser parceiros</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Cidade</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Consumo Médio</TableHead>
                <TableHead>Data</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPartnerRegistrations.map((partner) => (
                <TableRow key={partner.id}>
                  <TableCell className="font-medium">{partner.full_name}</TableCell>
                  <TableCell>{partner.email}</TableCell>
                  <TableCell>{partner.phone}</TableCell>
                  <TableCell>{partner.city}</TableCell>
                  <TableCell>{partner.state}</TableCell>
                  <TableCell>{partner.average_consumption || 'N/A'}</TableCell>
                  <TableCell>{new Date(partner.created_at).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Lead Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Lead</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitEdit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome completo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="email@exemplo.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <Input placeholder="(11) 99999-9999" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="property_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Imóvel</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="residencial">Residencial</SelectItem>
                          <SelectItem value="comercial">Comercial</SelectItem>
                          <SelectItem value="industrial">Industrial</SelectItem>
                          <SelectItem value="rural">Rural</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Input placeholder="Detalhes adicionais" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">Salvar Alterações</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LeadsManagement;
