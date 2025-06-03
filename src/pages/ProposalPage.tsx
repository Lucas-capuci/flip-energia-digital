
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import LoginPage from '../components/LoginPage';
import ProposalGenerator from '../components/ProposalGenerator';

const ProposalPage = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return <ProposalGenerator />;
};

export default ProposalPage;
