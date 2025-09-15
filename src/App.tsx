
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import Index from "./pages/Index";
import Solar from "./pages/Solar";
import RedesDistribuicao from "./pages/RedesDistribuicao";
import ProjetosEletricos from "./pages/ProjetosEletricos";
import SejaParceiro from "./pages/SejaParceiro";
import Portfolio from "./pages/Portfolio";
import Contato from "./pages/Contato";
import ProposalPage from "./pages/ProposalPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/solar" element={<Solar />} />
            <Route path="/redes-distribuicao" element={<RedesDistribuicao />} />
            <Route path="/projetos-eletricos" element={<ProjetosEletricos />} />
            <Route path="/seja-parceiro" element={<SejaParceiro />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/propostas" element={<ProposalPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
