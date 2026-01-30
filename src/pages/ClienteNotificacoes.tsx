import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, Bell } from "lucide-react";
import logoColor from "@/assets/logo-color.png";
import { useAuth } from "@/contexts/AuthContext";
import ClientNotificationCard from "@/components/ClientNotificationCard";
import ClientNotificationDetailModal from "@/components/ClientNotificationDetailModal";
import { getNotificationsByPlan, type ClientNotification } from "@/data/mockClientNotifications";
import { useToast } from "@/hooks/use-toast";

const ClienteNotificacoes = () => {
  const navigate = useNavigate();
  const { isAuthenticated, userType, clientPlan } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNotification, setSelectedNotification] = useState<ClientNotification | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const notifications = useMemo(() => getNotificationsByPlan(clientPlan), [clientPlan]);
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const filteredNotifications = useMemo(() => {
    if (!searchTerm.trim()) return notifications;

    const term = searchTerm.toLowerCase();
    return notifications.filter(
      (notification) =>
        notification.designerName.toLowerCase().includes(term) ||
        notification.designerStore.toLowerCase().includes(term)
    );
  }, [searchTerm, notifications]);

  const handleCardClick = (notification: ClientNotification) => {
    setSelectedNotification(notification);
    setIsModalOpen(true);
  };

  const handleConfirmBudget = () => {
    toast({
      title: "Pedido confirmado!",
      description: "O projetista será notificado e entrará em contato em breve.",
    });
  };

  const handleSignAddendum = () => {
    toast({
      title: "Termo assinado!",
      description: "O termo aditivo foi assinado com sucesso. O projetista dará continuidade ao processo.",
    });
  };

  // Redirect if not authenticated or not a client
  useEffect(() => {
    if (!isAuthenticated || userType !== "client") {
      navigate("/");
    }
  }, [isAuthenticated, userType, navigate]);

  if (!isAuthenticated || userType !== "client") {
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
              <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
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
                  Minhas Notificações
                </h1>
                <p className="text-sm text-muted-foreground">
                  {unreadCount > 0
                    ? `${unreadCount} nova${unreadCount > 1 ? "s" : ""} notificaç${unreadCount > 1 ? "ões" : "ão"}`
                    : "Nenhuma nova notificação"}
                </p>
              </div>
            </div>

            {/* Search Filter */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por projetista ou loja..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Notification Cards */}
            <div className="space-y-3">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notification) => (
                  <ClientNotificationCard
                    key={notification.id}
                    notification={notification}
                    onClick={() => handleCardClick(notification)}
                  />
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    {searchTerm
                      ? "Nenhuma notificação encontrada com esses termos."
                      : "Você ainda não recebeu notificações."}
                  </p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Detail Modal */}
      <ClientNotificationDetailModal
        notification={selectedNotification}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onConfirmBudget={handleConfirmBudget}
        onSignAddendum={handleSignAddendum}
      />
    </>
  );
};

export default ClienteNotificacoes;
