import React from 'react';
import { useAuth } from '../hooks/useAuth';
import LoginPage from '../components/LoginPage';
import ProposalGenerator from '../components/ProposalGenerator';

const ProposalPage = () => {
  const { isAuthenticated, isLoading } = useAuth(); // ADICIONADO isLoading

  if (isLoading) {
    // Evita exibir LoginPage enquanto verifica autenticação
    return <div>Carregando...</div>;
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return <ProposalGenerator />;
};

export default ProposalPage;
