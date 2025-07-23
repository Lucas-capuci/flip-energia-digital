
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../../integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Phone, Mail, MessageCircle, Users, Calendar, CheckCircle, Clock } from 'lucide-react';
import { useToast } from '../../../hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../ui/dialog';
import { Textarea } from '../../ui/textarea';
import { Label } from '../../ui/label';

interface FollowUp {
  id: string;
  lead_id: string;
  type: string;
  follow_up_date: string;
  notes: string;
  completed: boolean;
  completed_at: string;
  created_by: string;
  created_at: string;
  budget_requests: {
    name: string;
    email: string;
    phone: string;
  };
}

const FollowUpsList = () => {
  const [completingFollowUp, setCompletingFollowUp] = useState<string | null>(null);
  const [completionNotes, setCompletionNotes] = useState('');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: followUps, isLoading } = useQuery({
    queryKey: ['follow-ups'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('lead_follow_ups')
        .select(`
          *,
          budget_requests (
            name,
            email,
            phone
          )
        `)
        .order('follow_up_date', { ascending: true });
      
      if (error) throw error;
      return data || [];
    },
  });

  const completeFollowUpMutation = useMutation({
    mutationFn: async ({ id, notes }: { id: string; notes: string }) => {
      const { error } = await supabase
        .from('lead_follow_ups')
        .update({
          completed: true,
          completed_at: new Date().toISOString(),
          notes: notes
        })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['follow-ups'] });
      toast({
        title: 'Follow-up concluído!',
        description: 'O follow-up foi marcado como concluído.',
      });
      setCompletingFollowUp(null);
      setCompletionNotes('');
    },
    onError: (error) => {
      console.error('Erro ao completar follow-up:', error);
      toast({
        title: 'Erro ao completar follow-up',
        description: 'Tente novamente.',
        variant: 'destructive',
      });
    },
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'call':
        return <Phone className="h-4 w-4" />;
      case 'email':
        return <Mail className="h-4 w-4" />;
      case 'whatsapp':
        return <MessageCircle className="h-4 w-4" />;
      case 'meeting':
        return <Users className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case 'call':
        return 'Ligação';
      case 'email':
        return 'Email';
      case 'whatsapp':
        return 'WhatsApp';
      case 'meeting':
        return 'Reunião';
      default:
        return type;
    }
  };

  const isOverdue = (date: string) => {
    return new Date(date) < new Date() && new Date(date).toDateString() !== new Date().toDateString();
  };

  const isToday = (date: string) => {
    return new Date(date).toDateString() === new Date().toDateString();
  };

  const pendingFollowUps = followUps?.filter(f => !f.completed) || [];
  const completedFollowUps = followUps?.filter(f => f.completed) || [];

  const handleCompleteFollowUp = (id: string) => {
    setCompletingFollowUp(id);
  };

  const handleConfirmCompletion = () => {
    if (completingFollowUp) {
      completeFollowUpMutation.mutate({
        id: completingFollowUp,
        notes: completionNotes
      });
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Carregando follow-ups...</div>;
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pending" className="flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span>Pendentes ({pendingFollowUps.length})</span>
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4" />
            <span>Concluídos ({completedFollowUps.length})</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingFollowUps.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Nenhum follow-up pendente</p>
              </CardContent>
            </Card>
          ) : (
            pendingFollowUps.map((followUp) => (
              <Card key={followUp.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getTypeIcon(followUp.type)}
                      <div>
                        <CardTitle className="text-lg">{followUp.budget_requests.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {getTypeName(followUp.type)} • {new Date(followUp.follow_up_date).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {isOverdue(followUp.follow_up_date) && (
                        <Badge variant="destructive">Atrasado</Badge>
                      )}
                      {isToday(followUp.follow_up_date) && (
                        <Badge variant="default">Hoje</Badge>
                      )}
                      <Button
                        size="sm"
                        onClick={() => handleCompleteFollowUp(followUp.id)}
                        disabled={completeFollowUpMutation.isPending}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Concluir
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p><strong>Email:</strong> {followUp.budget_requests.email}</p>
                    <p><strong>Telefone:</strong> {followUp.budget_requests.phone}</p>
                    {followUp.notes && (
                      <p><strong>Observações:</strong> {followUp.notes}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedFollowUps.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <CheckCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Nenhum follow-up concluído</p>
              </CardContent>
            </Card>
          ) : (
            completedFollowUps.map((followUp) => (
              <Card key={followUp.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getTypeIcon(followUp.type)}
                      <div>
                        <CardTitle className="text-lg">{followUp.budget_requests.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {getTypeName(followUp.type)} • Concluído em {new Date(followUp.completed_at).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-green-500">Concluído</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p><strong>Email:</strong> {followUp.budget_requests.email}</p>
                    <p><strong>Telefone:</strong> {followUp.budget_requests.phone}</p>
                    {followUp.notes && (
                      <p><strong>Observações:</strong> {followUp.notes}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={!!completingFollowUp} onOpenChange={() => setCompletingFollowUp(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Concluir Follow-up</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="completion_notes">Observações da conclusão</Label>
              <Textarea
                id="completion_notes"
                value={completionNotes}
                onChange={(e) => setCompletionNotes(e.target.value)}
                placeholder="Descreva o que foi realizado neste follow-up..."
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCompletingFollowUp(null)}>
              Cancelar
            </Button>
            <Button onClick={handleConfirmCompletion} disabled={completeFollowUpMutation.isPending}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Concluir Follow-up
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FollowUpsList;
