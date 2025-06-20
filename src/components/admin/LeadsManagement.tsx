
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Eye, Download, Filter, Search, Calendar } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const LeadsManagement = () => {
  const [budgetRequests, setBudgetRequests] = useState([]);
  const [partnerRegistrations, setPartnerRegistrations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterService, setFilterService] = useState('all');
  const [filterDate, setFilterDate] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

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

  const getStatusBadge = (request) => {
    // Simple logic for demo - you can implement more complex status tracking
    const createdDate = new Date(request.created_at);
    const currentDate = new Date();
    const daysSinceCreated = Math.floor((currentDate.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysSinceCreated === 0) return <Badge variant="default">Novo</Badge>;
    if (daysSinceCreated <= 3) return <Badge variant="secondary">Em Análise</Badge>;
    if (daysSinceCreated <= 7) return <Badge variant="outline">Aguardando</Badge>;
    return <Badge variant="destructive">Atrasado</Badge>;
  };

  const exportData = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Nome,Email,Telefone,Tipo,Serviços,Data\n"
      + budgetRequests.map(row => 
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
          <CardTitle>Solicitações de Orçamento ({budgetRequests.length})</CardTitle>
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
              {budgetRequests.map((request) => (
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
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
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
          <CardTitle>Cadastros de Parceiros ({partnerRegistrations.length})</CardTitle>
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
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {partnerRegistrations.map((partner) => (
                <TableRow key={partner.id}>
                  <TableCell className="font-medium">{partner.full_name}</TableCell>
                  <TableCell>{partner.email}</TableCell>
                  <TableCell>{partner.phone}</TableCell>
                  <TableCell>{partner.city}</TableCell>
                  <TableCell>{partner.state}</TableCell>
                  <TableCell>{partner.average_consumption || 'N/A'}</TableCell>
                  <TableCell>{new Date(partner.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeadsManagement;
