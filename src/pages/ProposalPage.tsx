import React from 'react';
import { useAuth } from '../hooks/useAuth';
import LoginPage from '../components/LoginPage';
import ProposalGenerator from '../components/ProposalGenerator';
import AdminDashboard from '../components/admin/AdminDashboard';

const ProposalPage = () => {
  const { isAuthenticated, isLoading, hasPermission } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  // Se tem permissão para propostas, mostra o gerador
  if (hasPermission('proposals', 'view')) {
    return <ProposalGenerator />;
  }

  // Se não tem permissão para propostas mas está autenticado, mostra o dashboard admin
  return <AdminDashboard />;
};

export default ProposalPage;
