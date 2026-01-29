import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import PlansPage from "./pages/PlansPage";
import PortalProjetista from "./pages/PortalProjetista";
import ProjetistaDashboard from "./pages/ProjetistaDashboard";
import ProjetistaSolicitacoes from "./pages/ProjetistaSolicitacoes";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/planos" element={<PlansPage />} />
            <Route path="/portal-projetista" element={<PortalProjetista />} />
            <Route path="/projetista/dashboard" element={<ProjetistaDashboard />} />
            <Route path="/projetista/solicitacoes" element={<ProjetistaSolicitacoes />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
