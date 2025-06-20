
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Edit, Trash2, RefreshCw, History } from 'lucide-react';

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

interface LeadsTableProps {
  leads: Lead[];
  onEdit: (lead: Lead) => void;
  onDelete: (id: string) => void;
  onUpdateStatus: (lead: Lead) => void;
  onViewHistory: (leadId: string) => void;
}

const LeadsTable: React.FC<LeadsTableProps> = ({ 
  leads, 
  onEdit, 
  onDelete, 
  onUpdateStatus, 
  onViewHistory 
}) => {
  const getStatusBadge = (lead: Lead) => {
    if (!lead.status) {
      const createdDate = new Date(lead.created_at);
      const currentDate = new Date();
      const daysSinceCreated = Math.floor((currentDate.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysSinceCreated === 0) return <Badge variant="default">Novo</Badge>;
      if (daysSinceCreated <= 3) return <Badge variant="secondary">Em Análise</Badge>;
      if (daysSinceCreated <= 7) return <Badge variant="outline">Aguardando</Badge>;
      return <Badge variant="destructive">Atrasado</Badge>;
    }

    switch (lead.status) {
      case 'novo': return <Badge variant="default">Novo</Badge>;
      case 'em_analise': return <Badge variant="secondary">Em Análise</Badge>;
      case 'proposta_enviada': return <Badge variant="outline">Proposta Enviada</Badge>;
      case 'negociacao': return <Badge variant="secondary">Negociação</Badge>;
      case 'aprovado': return <Badge className="bg-green-500">Aprovado</Badge>;
      case 'rejeitado': return <Badge variant="destructive">Rejeitado</Badge>;
      case 'cancelado': return <Badge variant="destructive">Cancelado</Badge>;
      default: return <Badge variant="outline">{lead.status}</Badge>;
    }
  };

  return (
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
        {leads.map((request) => (
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
              <div className="flex space-x-1">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onEdit(request)}
                  title="Editar"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onUpdateStatus(request)}
                  title="Atualizar Status"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onViewHistory(request.id)}
                  title="Ver Histórico"
                >
                  <History className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onDelete(request.id)}
                  className="text-red-600 hover:text-red-800"
                  title="Excluir"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default LeadsTable;
