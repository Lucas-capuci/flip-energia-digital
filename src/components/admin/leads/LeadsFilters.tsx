
import React from 'react';
import { Input } from '../../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Button } from '../../ui/button';
import { Search, Download, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';

interface LeadsFiltersProps {
  searchTerm: string;
  filterService: string;
  filterDate: string;
  onSearchChange: (value: string) => void;
  onServiceFilterChange: (value: string) => void;
  onDateFilterChange: (value: string) => void;
  onExport: () => void;
}

const LeadsFilters: React.FC<LeadsFiltersProps> = ({
  searchTerm,
  filterService,
  filterDate,
  onSearchChange,
  onServiceFilterChange,
  onDateFilterChange,
  onExport
}) => {
  return (
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
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterService} onValueChange={onServiceFilterChange}>
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
          <Select value={filterDate} onValueChange={onDateFilterChange}>
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
          <Button onClick={onExport} variant="outline" className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Exportar CSV</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadsFilters;
