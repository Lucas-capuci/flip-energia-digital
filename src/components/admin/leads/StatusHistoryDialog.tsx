
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Badge } from '../../ui/badge';
import { ScrollArea } from '../../ui/scroll-area';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../../integrations/supabase/client';
import { Clock, User } from 'lucide-react';

interface StatusHistoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  leadId: string;
}

interface StatusHistory {
  id: string;
  status: string;
  observation: string | null;
  changed_by: string | null;
  created_at: string;
}

const StatusHistoryDialog: React.FC<StatusHistoryDialogProps> = ({
  isOpen,
  onClose,
  leadId
}) => {
  const { data: history, isLoading } = useQuery({
    queryKey: ['lead-status-history', leadId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('lead_status_history')
        .select('*')
        .eq('lead_id', leadId)
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(error.message);
      }
      return data as StatusHistory[];
    },
    enabled: isOpen && !!leadId
  });

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'novo': return 'default';
      case 'em_analise': return 'secondary';
      case 'proposta_enviada': return 'outline';
      case 'negociacao': return 'secondary';
      case 'aprovado': return 'default';
      case 'rejeitado': return 'destructive';
      case 'cancelado': return 'destructive';
      default: return 'outline';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'novo': return 'Novo';
      case 'em_analise': return 'Em Análise';
      case 'proposta_enviada': return 'Proposta Enviada';
      case 'negociacao': return 'Negociação';
      case 'aprovado': return 'Aprovado';
      case 'rejeitado': return 'Rejeitado';
      case 'cancelado': return 'Cancelado';
      default: return status;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Histórico de Status</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-96 w-full">
          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <p>Carregando histórico...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {history?.map((item, index) => (
                <div key={item.id} className="border rounded-lg p-4 relative">
                  {index !== (history.length - 1) && (
                    <div className="absolute left-6 top-16 w-0.5 h-8 bg-gray-300"></div>
                  )}
                  
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-3 h-3 bg-blue-500 rounded-full mt-1.5"></div>
                    
                    <div className="flex-grow">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant={getStatusBadgeVariant(item.status)}>
                          {getStatusLabel(item.status)}
                        </Badge>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="w-4 h-4 mr-1" />
                          {new Date(item.created_at).toLocaleString('pt-BR')}
                        </div>
                      </div>
                      
                      {item.observation && (
                        <p className="text-sm text-gray-700 mb-2">{item.observation}</p>
                      )}
                      
                      {item.changed_by && (
                        <div className="flex items-center text-xs text-gray-500">
                          <User className="w-3 h-3 mr-1" />
                          Alterado por: {item.changed_by}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default StatusHistoryDialog;
