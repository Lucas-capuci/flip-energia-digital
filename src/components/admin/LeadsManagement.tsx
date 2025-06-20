import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import LeadsFilters from './leads/LeadsFilters';
import LeadsTable from './leads/LeadsTable';
import EditLeadDialog from './leads/EditLeadDialog';

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

interface Partner {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  average_consumption?: string;
  created_at: string;
}

const LeadsManagement = () => {
  const [budgetRequests, setBudgetRequests] = useState<Lead[]>([]);
  const [partnerRegistrations, setPartnerRegistrations] = useState<Partner[]>([]);
  const [filteredBudgetRequests, setFilteredBudgetRequests] = useState<Lead[]>([]);
  const [filteredPartnerRegistrations, setFilteredPartnerRegistrations] = useState<Partner[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterService, setFilterService] = useState('all');
  const [filterDate, setFilterDate] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
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
      
      const { data: budgetData, error: budgetError } = await supabase
        .from('budget_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (budgetError) throw budgetError;

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

    if (filterService !== 'all') {
      filteredBudget = filteredBudget.filter(request =>
        request.services.some(service => 
          service.toLowerCase().includes(filterService.toLowerCase())
        )
      );
    }

    if (filterDate !== 'all') {
      const today = new Date();
      const filterDate_fn = (date: string) => {
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

  const handleEditLead = (lead: Lead) => {
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

  const handleDeleteLead = async (id: string) => {
    try {
      const { error } = await supabase
        .from('budget_requests')
        .delete()
        .eq('id', id);

      if (error) throw error;

      await fetchData();
      toast({
        title: 'Lead removido',
        description: 'O lead foi removido com sucesso.',
      });
    } catch (error) {
      console.error('Error deleting lead:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível remover o lead.',
        variant: 'destructive',
      });
    }
  };

  const onSubmitEdit = async (data: any) => {
    if (!editingLead) return;

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
      <LeadsFilters
        searchTerm={searchTerm}
        filterService={filterService}
        filterDate={filterDate}
        onSearchChange={setSearchTerm}
        onServiceFilterChange={setFilterService}
        onDateFilterChange={setFilterDate}
        onExport={exportData}
      />

      <Card>
        <CardHeader>
          <CardTitle>Solicitações de Orçamento ({filteredBudgetRequests.length})</CardTitle>
          <CardDescription>Leads gerados através do formulário de orçamento</CardDescription>
        </CardHeader>
        <CardContent>
          <LeadsTable
            leads={filteredBudgetRequests}
            onEdit={handleEditLead}
            onDelete={handleDeleteLead}
          />
        </CardContent>
      </Card>

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

      <EditLeadDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        lead={editingLead}
        form={form}
        onSubmit={onSubmitEdit}
      />
    </div>
  );
};

export default LeadsManagement;
