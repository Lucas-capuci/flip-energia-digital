import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';
import LeadsTable from './leads/LeadsTable';
import LeadsFilters from './leads/LeadsFilters';
import CreateLeadDialog from './leads/CreateLeadDialog';
import EditLeadDialog from './leads/EditLeadDialog';
import StatusUpdateDialog from './leads/StatusUpdateDialog';
import StatusHistoryDialog from './leads/StatusHistoryDialog';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  property_type: string;
  services: string[];
  created_at: string;
  description?: string;
  status?: string;
}

const LeadsManagement = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterService, setFilterService] = useState('all');
  const [filterDate, setFilterDate] = useState('all');
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [statusUpdateLead, setStatusUpdateLead] = useState<Lead | null>(null);
  const [historyLeadId, setHistoryLeadId] = useState<string | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: leadsData, isLoading, isError, refetch } = useQuery({
    queryKey: ['leads'],
    queryFn: async () => {
      console.log('Fetching leads...');
      const { data, error } = await supabase.from('budget_requests').select('*').order('created_at', { ascending: false });
      if (error) {
        console.error('Error fetching leads:', error);
        throw new Error(error.message);
      }
      console.log('Leads fetched:', data);
      return data || [];
    },
  });

  useEffect(() => {
    if (leadsData) {
      setLeads(leadsData);
    }
  }, [leadsData]);

  const createLeadMutation = useMutation({
    mutationFn: async (newLead: Omit<Lead, 'id' | 'created_at'>) => {
      console.log('Creating lead with data:', newLead);
      
      // Ensure all required fields are present
      const leadData = {
        name: newLead.name,
        email: newLead.email,
        phone: newLead.phone,
        property_type: newLead.property_type,
        services: newLead.services,
        description: newLead.description || '',
        status: 'novo'
      };

      console.log('Sending lead data to Supabase:', leadData);
      
      const { data, error } = await supabase
        .from('budget_requests')
        .insert([leadData])
        .select();
        
      if (error) {
        console.error('Supabase error:', error);
        throw new Error(error.message);
      }
      console.log('Lead created successfully:', data);
      return data;
    },
    onSuccess: () => {
      console.log('Lead creation successful, refetching data...');
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      refetch();
      toast({
        title: 'Lead criado com sucesso!',
      });
      setShowCreateDialog(false);
    },
    onError: (error: any) => {
      console.error('Lead creation failed:', error);
      toast({
        title: 'Erro ao criar lead.',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const updateLeadMutation = useMutation({
    mutationFn: async (updatedLead: Lead) => {
      console.log('Updating lead:', updatedLead);
      const { data, error } = await supabase
        .from('budget_requests')
        .update({
          name: updatedLead.name,
          email: updatedLead.email,
          phone: updatedLead.phone,
          property_type: updatedLead.property_type,
          services: updatedLead.services,
          description: updatedLead.description,
          status: updatedLead.status
        })
        .eq('id', updatedLead.id)
        .select();

      if (error) {
        console.error('Update error:', error);
        throw new Error(error.message);
      }
      return data;
    },
    onSuccess: () => {
      console.log('Lead update successful');
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      refetch();
      toast({
        title: 'Lead atualizado com sucesso!',
      });
      setEditingLead(null);
    },
    onError: (error: any) => {
      console.error('Lead update failed:', error);
      toast({
        title: 'Erro ao atualizar lead.',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ leadId, status, observation }: { leadId: string; status: string; observation: string }) => {
      console.log('Updating status for lead:', leadId, 'to:', status);
      
      // Update the lead status
      const { error: leadError } = await supabase
        .from('budget_requests')
        .update({ status })
        .eq('id', leadId);

      if (leadError) {
        console.error('Lead status update error:', leadError);
        throw new Error(leadError.message);
      }

      // Add status history entry
      const { error: historyError } = await supabase
        .from('lead_status_history')
        .insert([{
          lead_id: leadId,
          status,
          observation,
          changed_by: 'Usuário Admin'
        }]);

      if (historyError) {
        console.error('Status history error:', historyError);
        throw new Error(historyError.message);
      }

      return { leadId, status };
    },
    onSuccess: () => {
      console.log('Status update successful');
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      queryClient.invalidateQueries({ queryKey: ['lead-status-history'] });
      refetch();
      toast({
        title: 'Status atualizado com sucesso!',
      });
      setStatusUpdateLead(null);
    },
    onError: (error: any) => {
      console.error('Status update failed:', error);
      toast({
        title: 'Erro ao atualizar status.',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const deleteLeadMutation = useMutation({
    mutationFn: async (id: string) => {
      console.log('Deleting lead:', id);
      const { error } = await supabase.from('budget_requests').delete().eq('id', id);
      if (error) {
        console.error('Delete error:', error);
        throw new Error(error.message);
      }
      return { id };
    },
    onSuccess: () => {
      console.log('Lead deletion successful');
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      refetch();
      toast({
        title: 'Lead removido com sucesso!',
      });
    },
    onError: (error: any) => {
      console.error('Lead deletion failed:', error);
      toast({
        title: 'Erro ao remover lead.',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const handleEdit = (lead: Lead) => {
    setEditingLead(lead);
  };

  const handleSave = async (lead: Lead) => {
    await updateLeadMutation.mutateAsync(lead);
  };

  const handleDelete = async (id: string) => {
    await deleteLeadMutation.mutateAsync(id);
  };

  const handleUpdateStatus = (lead: Lead) => {
    setStatusUpdateLead(lead);
  };

  const handleStatusUpdate = async (status: string, observation: string) => {
    if (statusUpdateLead) {
      await updateStatusMutation.mutateAsync({
        leadId: statusUpdateLead.id,
        status,
        observation
      });
    }
  };

  const handleViewHistory = (leadId: string) => {
    setHistoryLeadId(leadId);
  };

  const handleCreateLead = async (newLead: Omit<Lead, 'id' | 'created_at'>) => {
    console.log('HandleCreateLead called with:', newLead);
    await createLeadMutation.mutateAsync(newLead);
  };

  const filteredLeads = leads?.filter((lead) => {
    const searchTermLower = searchTerm.toLowerCase();
    const nameMatch = lead.name.toLowerCase().includes(searchTermLower);
    const emailMatch = lead.email.toLowerCase().includes(searchTermLower);

    let serviceMatch = true;
    if (filterService !== 'all') {
      serviceMatch = lead.services.includes(filterService);
    }

    let dateMatch = true;
    if (filterDate !== 'all') {
      const leadDate = new Date(lead.created_at);
      const today = new Date();
      const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
      const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);

      if (filterDate === 'today') {
        dateMatch = leadDate.toDateString() === new Date().toDateString();
      } else if (filterDate === 'week') {
        dateMatch = leadDate >= weekStart;
      } else if (filterDate === 'month') {
        dateMatch = leadDate >= monthStart;
      }
    }

    return (nameMatch || emailMatch) && serviceMatch && dateMatch;
  });

  const exportToCSV = () => {
    if (leads.length === 0) return;
    
    const csvRows = [];
    const headers = Object.keys(leads[0]);
    csvRows.push(headers.join(','));

    for (const lead of leads) {
      const values = headers.map((header) => {
        const value = lead[header as keyof Lead];
        return typeof value === 'string' ? `"${value}"` : value;
      });
      csvRows.push(values.join(','));
    }

    const csvData = csvRows.join('\n');
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'leads.csv');
    a.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Gerenciamento de Leads</h2>
        <Button onClick={() => setShowCreateDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Lead
        </Button>
      </div>

      <LeadsFilters
        searchTerm={searchTerm}
        filterService={filterService}
        filterDate={filterDate}
        onSearchChange={setSearchTerm}
        onServiceFilterChange={setFilterService}
        onDateFilterChange={setFilterDate}
        onExport={exportToCSV}
      />

      <Card>
        <CardHeader>
          <CardTitle>Lista de Leads ({filteredLeads.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <LeadsTable
            leads={filteredLeads}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onUpdateStatus={handleUpdateStatus}
            onViewHistory={handleViewHistory}
          />
        </CardContent>
      </Card>

      <CreateLeadDialog
        isOpen={showCreateDialog}
        onClose={() => setShowCreateDialog(false)}
        onSave={handleCreateLead}
      />

      <EditLeadDialog
        lead={editingLead}
        isOpen={!!editingLead}
        onClose={() => setEditingLead(null)}
        onSave={handleSave}
      />

      <StatusUpdateDialog
        isOpen={!!statusUpdateLead}
        onClose={() => setStatusUpdateLead(null)}
        onUpdate={handleStatusUpdate}
        currentStatus={statusUpdateLead?.status || 'novo'}
      />

      <StatusHistoryDialog
        isOpen={!!historyLeadId}
        onClose={() => setHistoryLeadId(null)}
        leadId={historyLeadId || ''}
      />
    </div>
  );
};

export default LeadsManagement;
