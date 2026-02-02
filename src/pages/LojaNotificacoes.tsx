import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import {
  mockShopownerNotifications,
  ShopownerNotification,
  ShopownerNotificationType,
} from "@/data/mockShopownerNotifications";
import {
  CheckCircle2,
  AlertTriangle,
  Store,
  FileText,
  X,
  Phone,
  Mail,
  Calendar,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const getNotificationIcon = (type: ShopownerNotificationType) => {
  switch (type) {
    case "center_status":
      return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    case "pending_center":
      return <AlertTriangle className="w-5 h-5 text-amber-500" />;
    case "store_selected":
      return <Store className="w-5 h-5 text-blue-500" />;
    case "quote_request":
      return <FileText className="w-5 h-5 text-purple-500" />;
    default:
      return <FileText className="w-5 h-5 text-muted-foreground" />;
  }
};

const getNotificationColor = (type: ShopownerNotificationType) => {
  switch (type) {
    case "center_status":
      return "border-l-green-500";
    case "pending_center":
      return "border-l-amber-500";
    case "store_selected":
      return "border-l-blue-500";
    case "quote_request":
      return "border-l-purple-500";
    default:
      return "border-l-muted";
  }
};

const LojaNotificacoes = () => {
  const { isAuthenticated, userType, userName } = useAuth();
  const [selectedNotification, setSelectedNotification] = useState<ShopownerNotification | null>(
    null
  );

  if (!isAuthenticated || userType !== "shopowner") {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-32 pb-20 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Acesso Restrito</h1>
          <p className="text-muted-foreground">Faça login como lojista para ver as notificações.</p>
        </div>
        <Footer />
      </div>
    );
  }

  const unreadCount = mockShopownerNotifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 pt-28 pb-20">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Notificações da Loja</h1>
            <p className="text-muted-foreground">
              {unreadCount > 0 ? `${unreadCount} não lidas` : "Todas lidas"}
            </p>
          </div>

          {/* Notifications List */}
          <div className="space-y-4">
            {mockShopownerNotifications.map((notification) => (
              <Card
                key={notification.id}
                className={`cursor-pointer hover:shadow-md transition-shadow border-l-4 ${getNotificationColor(
                  notification.type
                )} ${!notification.read ? "bg-muted/30" : ""}`}
                onClick={() => setSelectedNotification(notification)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">{getNotificationIcon(notification.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-semibold text-foreground truncate">
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <Badge variant="default" className="bg-blue-500 text-xs shrink-0">
                            Nova
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {notification.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">{notification.date}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <Dialog open={!!selectedNotification} onOpenChange={() => setSelectedNotification(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedNotification && getNotificationIcon(selectedNotification.type)}
              {selectedNotification?.title}
            </DialogTitle>
          </DialogHeader>

          {selectedNotification && (
            <div className="space-y-4">
              <p className="text-muted-foreground">{selectedNotification.description}</p>

              {selectedNotification.details && (
                <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                  {selectedNotification.details.clientName && (
                    <div>
                      <p className="text-sm font-medium text-foreground">Cliente</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedNotification.details.clientName}
                      </p>
                    </div>
                  )}

                  {selectedNotification.details.clientEmail && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        {selectedNotification.details.clientEmail}
                      </p>
                    </div>
                  )}

                  {selectedNotification.details.clientPhone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        {selectedNotification.details.clientPhone}
                      </p>
                    </div>
                  )}

                  {selectedNotification.details.projectType && (
                    <div>
                      <p className="text-sm font-medium text-foreground">Tipo de Projeto</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedNotification.details.projectType}
                      </p>
                    </div>
                  )}

                  {selectedNotification.details.deadline && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Prazo: {selectedNotification.details.deadline}
                      </p>
                    </div>
                  )}

                  {selectedNotification.details.status && (
                    <div>
                      <p className="text-sm font-medium text-foreground">Status</p>
                      <Badge variant="outline">{selectedNotification.details.status}</Badge>
                    </div>
                  )}

                  {selectedNotification.details.message && (
                    <div>
                      <p className="text-sm font-medium text-foreground">Mensagem</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedNotification.details.message}
                      </p>
                    </div>
                  )}
                </div>
              )}

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setSelectedNotification(null)}>
                  Fechar
                </Button>
                {selectedNotification.type === "quote_request" && (
                  <Button variant="accent">Responder Cliente</Button>
                )}
                {selectedNotification.type === "pending_center" && (
                  <Button variant="accent">Resolver Pendência</Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <div className="hidden md:block">
        <Footer />
      </div>
    </div>
  );
};

export default LojaNotificacoes;
