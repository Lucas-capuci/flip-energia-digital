
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Edit, Trash2 } from 'lucide-react';

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

interface LeadsTableProps {
  leads: Lead[];
  onEdit: (lead: Lead) => void;
  onDelete: (id: string) => void;
}

const LeadsTable: React.FC<LeadsTableProps> = ({ leads, onEdit, onDelete }) => {
  const getStatusBadge = (request: Lead) => {
    const createdDate = new Date(request.created_at);
    const currentDate = new Date();
    const daysSinceCreated = Math.floor((currentDate.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysSinceCreated === 0) return <Badge variant="default">Novo</Badge>;
    if (daysSinceCreated <= 3) return <Badge variant="secondary">Em Análise</Badge>;
    if (daysSinceCreated <= 7) return <Badge variant="outline">Aguardando</Badge>;
    return <Badge variant="destructive">Atrasado</Badge>;
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
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onDelete(request.id)}
                  className="text-red-600 hover:text-red-800"
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
