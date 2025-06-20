
import React from 'react';
import { Input } from '../../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Search } from 'lucide-react';

interface ProjectsFiltersProps {
  searchTerm: string;
  statusFilter: string;
  typeFilter: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onTypeChange: (value: string) => void;
}

const ProjectsFilters: React.FC<ProjectsFiltersProps> = ({
  searchTerm,
  statusFilter,
  typeFilter,
  onSearchChange,
  onStatusChange,
  onTypeChange
}) => {
  return (
    <div className="flex space-x-2">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Buscar projetos..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 w-64"
        />
      </div>
      <Select value={statusFilter} onValueChange={onStatusChange}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todos">Todos Status</SelectItem>
          <SelectItem value="planejamento">Planejamento</SelectItem>
          <SelectItem value="em_andamento">Em Andamento</SelectItem>
          <SelectItem value="pausado">Pausado</SelectItem>
          <SelectItem value="concluido">Concluído</SelectItem>
          <SelectItem value="cancelado">Cancelado</SelectItem>
          <SelectItem value="atrasado">Atrasados</SelectItem>
        </SelectContent>
      </Select>
      <Select value={typeFilter} onValueChange={onTypeChange}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Tipo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todos">Todos Tipos</SelectItem>
          <SelectItem value="Energia Solar">Energia Solar</SelectItem>
          <SelectItem value="Projeto Elétrico">Projeto Elétrico</SelectItem>
          <SelectItem value="Redes de Distribuição">Redes de Distribuição</SelectItem>
          <SelectItem value="Automação">Automação</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ProjectsFilters;
