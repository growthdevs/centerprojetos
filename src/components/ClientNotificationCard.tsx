import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, CheckCircle, FileText, ClipboardList, PenTool } from "lucide-react";
import type { ClientNotification } from "@/data/mockClientNotifications";

interface ClientNotificationCardProps {
  notification: ClientNotification;
  onClick: () => void;
}

const getNotificationIcon = (type: ClientNotification["type"]) => {
  switch (type) {
    case "response":
      return { icon: MessageSquare, bgColor: "bg-primary/10", iconColor: "text-primary" };
    case "budget_confirmation":
      return { icon: CheckCircle, bgColor: "bg-emerald-100", iconColor: "text-emerald-600" };
    case "project_submission":
      return { icon: FileText, bgColor: "bg-blue-100", iconColor: "text-blue-600" };
    case "addendum_signature":
      return { icon: PenTool, bgColor: "bg-amber-100", iconColor: "text-amber-600" };
    case "process_checklist":
      return { icon: ClipboardList, bgColor: "bg-purple-100", iconColor: "text-purple-600" };
    default:
      return { icon: MessageSquare, bgColor: "bg-primary/10", iconColor: "text-primary" };
  }
};

const getNotificationLabel = (type: ClientNotification["type"]) => {
  switch (type) {
    case "response":
      return null; // Show message preview
    case "budget_confirmation":
      return "📋 Confirmação de Pedido de Orçamento";
    case "project_submission":
      return "📐 Projeto Enviado";
    case "addendum_signature":
      return "✍️ Assinatura de Termo Aditivo";
    case "process_checklist":
      return "📊 Acompanhamento do Processo";
    default:
      return null;
  }
};

const ClientNotificationCard = ({ notification, onClick }: ClientNotificationCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
    });
  };

  const { icon: Icon, bgColor, iconColor } = getNotificationIcon(notification.type);
  const label = getNotificationLabel(notification.type);

  return (
    <Card
      className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md hover:border-accent/50 ${
        !notification.isRead ? "border-l-4 border-l-accent bg-accent/5" : ""
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${bgColor}`}>
            <Icon className={`w-5 h-5 ${iconColor}`} />
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
              {label || notification.message}
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
