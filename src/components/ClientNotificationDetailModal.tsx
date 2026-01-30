import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, MessageSquare, CheckCircle, Store } from "lucide-react";
import type { ClientNotification } from "@/data/mockClientNotifications";

interface ClientNotificationDetailModalProps {
  notification: ClientNotification | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirmBudget?: () => void;
}

const ClientNotificationDetailModal = ({
  notification,
  open,
  onOpenChange,
  onConfirmBudget
}: ClientNotificationDetailModalProps) => {
  if (!notification) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const isResponse = notification.type === "response";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="h-full max-h-screen w-full max-w-full rounded-none p-0 sm:h-auto sm:max-h-[85vh] sm:max-w-lg sm:rounded-lg sm:p-6">
        <div className="flex flex-col h-full overflow-y-auto p-6 sm:p-0">
          <DialogHeader>
            <DialogTitle className="text-xl">
              {isResponse ? "Resposta do Projetista" : "Confirmação de Orçamento"}
            </DialogTitle>
            <DialogDescription className="sr-only">
              Detalhes da notificação do projetista.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 flex-1 mx-0 mt-4">
            {/* Designer Info */}
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground text-lg">
                {notification.designerName}
              </h3>

              <div className="flex items-center gap-2 text-muted-foreground">
                <Store className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">{notification.designerStore}</span>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">{formatDate(notification.createdAt)}</span>
              </div>
            </div>

            {/* Original Message (if response) */}
            {isResponse && notification.originalMessage && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground font-medium text-sm">
                  <span>Sua mensagem original:</span>
                </div>
                <div className="bg-muted/30 rounded-lg p-3 border-l-2 border-muted">
                  <p className="text-sm text-muted-foreground italic">
                    "{notification.originalMessage}"
                  </p>
                </div>
              </div>
            )}

            {/* Designer Message */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-foreground font-medium">
                {isResponse ? (
                  <MessageSquare className="w-4 h-4" />
                ) : (
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                )}
                <span>{isResponse ? "Resposta" : "Confirmação"}</span>
              </div>
              <div className={`rounded-lg p-4 ${isResponse ? "bg-muted/50" : "bg-emerald-50 border border-emerald-200"}`}>
                <p className="text-sm text-foreground leading-relaxed">
                  {notification.message}
                </p>
              </div>
            </div>

            {/* Action Button for Budget Confirmation */}
            {notification.type === "budget_confirmation" && (
              <div className="pt-2">
                <Button 
                  onClick={() => {
                    onConfirmBudget?.();
                    onOpenChange(false);
                  }} 
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Confirmar Pedido de Orçamento
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ClientNotificationDetailModal;
