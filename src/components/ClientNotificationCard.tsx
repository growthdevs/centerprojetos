import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, CheckCircle } from "lucide-react";
import type { ClientNotification } from "@/data/mockClientNotifications";

interface ClientNotificationCardProps {
  notification: ClientNotification;
  onClick: () => void;
}

const ClientNotificationCard = ({ notification, onClick }: ClientNotificationCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
    });
  };

  const isResponse = notification.type === "response";

  return (
    <Card
      className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md hover:border-accent/50 ${
        !notification.isRead ? "border-l-4 border-l-accent bg-accent/5" : ""
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
            isResponse ? "bg-primary/10" : "bg-emerald-100"
          }`}>
            {isResponse ? (
              <MessageSquare className="w-5 h-5 text-primary" />
            ) : (
              <CheckCircle className="w-5 h-5 text-emerald-600" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h3 className="font-semibold text-foreground truncate">
                {notification.designerName}
              </h3>
              {!notification.isRead && (
                <Badge variant="default" className="text-xs px-1.5 py-0.5 bg-accent">
                  Nova
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground mb-1">
              {notification.designerStore}
            </p>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {isResponse ? notification.message : "📋 Confirmação de Pedido de Orçamento"}
            </p>
          </div>
        </div>
        <span className="text-xs text-muted-foreground whitespace-nowrap flex-shrink-0">
          {formatDate(notification.createdAt)}
        </span>
      </div>
    </Card>
  );
};

export default ClientNotificationCard;
