
import React from 'react';
import { LogOut, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const ProposalHeader: React.FC = () => {
  const { logout } = useAuth();
  
  return (
    <div className="bg-white/90 backdrop-blur-sm border-b border-flip-blue-100 px-6 py-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            size="sm"
            asChild
            className="text-flip-blue-500 border-flip-blue-500 hover:bg-flip-blue-50"
          >
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar ao Menu
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-flip-gray-900">Gerador de Propostas</h1>
            <p className="text-flip-gray-600">Flip Energy - Área Restrita</p>
          </div>
        </div>
        <Button 
          variant="outline" 
          onClick={logout}
          className="text-flip-blue-500 border-flip-blue-500 hover:bg-flip-blue-50"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sair
        </Button>
      </div>
    </div>
  );
};

export default ProposalHeader;
