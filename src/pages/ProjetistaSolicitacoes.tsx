import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, Bell } from "lucide-react";
import logoColor from "@/assets/logo-color.png";
import { useAuth } from "@/contexts/AuthContext";
import ContactRequestCard from "@/components/ContactRequestCard";
import ContactRequestDetailModal from "@/components/ContactRequestDetailModal";
import { mockContactRequests, type ContactRequest } from "@/data/mockContactRequests";

const ProjetistaSolicitacoes = () => {
  const navigate = useNavigate();
  const { isAuthenticated, userType } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<ContactRequest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const unreadCount = mockContactRequests.filter((r) => !r.isRead).length;

  const filteredRequests = useMemo(() => {
    if (!searchTerm.trim()) return mockContactRequests;

    const term = searchTerm.toLowerCase();
    return mockContactRequests.filter(
      (request) =>
        request.clientName.toLowerCase().includes(term) ||
        request.clientEmail.toLowerCase().includes(term) ||
        request.clientPhone.includes(term)
    );
  }, [searchTerm]);

  const handleCardClick = (request: ContactRequest) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  // Redirect if not authenticated or not a designer
  useEffect(() => {
    if (!isAuthenticated || userType !== "designer") {
      navigate("/");
    }
  }, [isAuthenticated, userType, navigate]);

  if (!isAuthenticated || userType !== "designer") {
    return null;
  }

  return (
    <>
      <div className="min-h-screen bg-background flex flex-col">
        {/* Header */}
        <header className="flex-shrink-0 bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-40">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <img
                src={logoColor}
                alt="Center Projetos"
                className="h-10 w-auto cursor-pointer"
                onClick={() => navigate("/")}
              />
              <Button variant="ghost" size="icon" onClick={() => navigate("/projetista")}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto pb-24">
          <main className="container mx-auto px-4 py-6 md:py-8">
            {/* Title Section */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <Bell className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-foreground">
                  Solicitações de Contato
                </h1>
                <p className="text-sm text-muted-foreground">
                  {unreadCount > 0
                    ? `${unreadCount} nova${unreadCount > 1 ? "s" : ""} solicitaç${unreadCount > 1 ? "ões" : "ão"}`
                    : "Nenhuma nova solicitação"}
                </p>
              </div>
            </div>

            {/* Search Filter */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome, e-mail ou telefone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Request Cards */}
            <div className="space-y-3">
              {filteredRequests.length > 0 ? (
                filteredRequests.map((request) => (
                  <ContactRequestCard
                    key={request.id}
                    request={request}
                    onClick={() => handleCardClick(request)}
                  />
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    {searchTerm
                      ? "Nenhuma solicitação encontrada com esses termos."
                      : "Você ainda não recebeu solicitações de contato."}
                  </p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Detail Modal */}
      <ContactRequestDetailModal
        request={selectedRequest}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </>
  );
};

export default ProjetistaSolicitacoes;
