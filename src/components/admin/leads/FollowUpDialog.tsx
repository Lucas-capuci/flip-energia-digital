
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Textarea } from '../../ui/textarea';
import { Calendar, Phone, Mail, MessageCircle, Users } from 'lucide-react';

interface FollowUpDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (followUp: {
    type: string;
    follow_up_date: string;
    notes: string;
  }) => void;
  leadName: string;
}

const FollowUpDialog: React.FC<FollowUpDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  leadName
}) => {
  const [type, setType] = useState('');
  const [followUpDate, setFollowUpDate] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (type && followUpDate) {
      onSave({
        type,
        follow_up_date: followUpDate,
        notes
      });
      // Reset form
      setType('');
      setFollowUpDate('');
      setNotes('');
      onClose();
    }
  };

  const getDateSuggestion = (selectedType: string) => {
    const today = new Date();
    let suggestedDate = new Date(today);
    
    switch (selectedType) {
      case 'call':
        suggestedDate.setDate(today.getDate() + 1); // Próximo dia
        break;
      case 'email':
        suggestedDate.setDate(today.getDate() + 2); // 2 dias
        break;
      case 'whatsapp':
        suggestedDate.setDate(today.getDate() + 1); // Próximo dia
        break;
      case 'meeting':
        suggestedDate.setDate(today.getDate() + 7); // 1 semana
        break;
      default:
        suggestedDate.setDate(today.getDate() + 3); // 3 dias
    }
    
    return suggestedDate.toISOString().split('T')[0];
  };

  const handleTypeChange = (selectedType: string) => {
    setType(selectedType);
    setFollowUpDate(getDateSuggestion(selectedType));
  };

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agendar Follow-up</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Lead: {leadName}
          </p>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">Tipo de Follow-up</Label>
            <Select value={type} onValueChange={handleTypeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="call">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4" />
                    <span>Ligação</span>
                  </div>
                </SelectItem>
                <SelectItem value="email">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>Email</span>
                  </div>
                </SelectItem>
                <SelectItem value="whatsapp">
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="h-4 w-4" />
                    <span>WhatsApp</span>
                  </div>
                </SelectItem>
                <SelectItem value="meeting">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span>Reunião</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="follow_up_date">Data do Follow-up</Label>
            <Input
              id="follow_up_date"
              type="date"
              value={followUpDate}
              onChange={(e) => setFollowUpDate(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Observações</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Adicione observações sobre este follow-up..."
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={!type || !followUpDate}>
              <Calendar className="h-4 w-4 mr-2" />
              Agendar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FollowUpDialog;
