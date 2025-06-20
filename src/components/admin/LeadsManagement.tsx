import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../../integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Edit, Trash2, Plus } from 'lucide-react';
import { useToast } from '../../../hooks/use-toast';
import LeadsTable from './leads/LeadsTable';
import LeadsFilters from './leads/LeadsFilters';
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

const LeadsManagement = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterService, setFilterService] = useState('all');
  const [filterDate, setFilterDate] = useState('all');
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: leadsData, isLoading, isError, refetch } = useQuery({
    queryKey: ['leads'],
    queryFn: async () => {
      const { data, error } = await supabase.from('leads').select('*');
      if (error) {
        throw new Error(error.message);
      }
      return data || [];
    },
  });

  useEffect(() => {
    if (leadsData) {
      setLeads(leadsData);
    }
  }, [leadsData]);

  const createLeadMutation = useMutation(
    async (newLead: Omit<Lead, 'id'>) => {
      const { data, error } = await supabase.from('leads').insert([newLead]);
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['leads'] });
        toast({
          title: 'Lead criado com sucesso!',
        });
        setShowCreateDialog(false);
      },
      onError: (error: any) => {
        toast({
          title: 'Erro ao criar lead.',
          description: error.message,
          variant: 'destructive',
        });
      },
    }
  );

  const updateLeadMutation = useMutation(
    async (updatedLead: Lead) => {
      const { data, error } = await supabase
        .from('leads')
        .update(updatedLead)
        .eq('id', updatedLead.id);

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['leads'] });
        toast({
          title: 'Lead atualizado com sucesso!',
        });
        setEditingLead(null);
      },
      onError: (error: any) => {
        toast({
          title: 'Erro ao atualizar lead.',
          description: error.message,
          variant: 'destructive',
        });
      },
    }
  );

  const deleteLeadMutation = useMutation(
    async (id: string) => {
      const { data, error } = await supabase.from('leads').delete().eq('id', id);
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['leads'] });
        toast({
          title: 'Lead removido com sucesso!',
        });
      },
      onError: (error: any) => {
        toast({
          title: 'Erro ao remover lead.',
          description: error.message,
          variant: 'destructive',
        });
      },
    }
  );

  const handleEdit = (lead: Lead) => {
    setEditingLead(lead);
  };

  const handleSave = async (lead: Lead) => {
    await updateLeadMutation.mutateAsync(lead);
  };

  const handleDelete = async (id: string) => {
    await deleteLeadMutation.mutateAsync(id);
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
          />
        </CardContent>
      </Card>

      <EditLeadDialog
        lead={editingLead}
        isOpen={!!editingLead}
        onClose={() => setEditingLead(null)}
        onSave={handleSave}
      />
    </div>
  );
};

export default LeadsManagement;
