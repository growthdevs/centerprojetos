import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, MessageSquare, CheckCircle, Store, FileText, PenTool, ClipboardList, Tag, Check } from "lucide-react";
import type { ClientNotification } from "@/data/mockClientNotifications";

interface ClientNotificationDetailModalProps {
  notification: ClientNotification | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirmBudget?: () => void;
  onSignAddendum?: () => void;
}

const ClientNotificationDetailModal = ({
  notification,
  open,
  onOpenChange,
  onConfirmBudget,
  onSignAddendum
}: ClientNotificationDetailModalProps) => {
  const [couponCode, setCouponCode] = useState("");

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

  const getModalTitle = () => {
    switch (notification.type) {
      case "response":
        return "Resposta do Projetista";
      case "budget_confirmation":
        return "Confirmação de Orçamento";
      case "project_submission":
        return "Projeto Enviado";
      case "addendum_signature":
        return "Termo Aditivo";
      case "process_checklist":
        return "Acompanhamento do Processo";
      default:
        return "Notificação";
    }
  };

  const getTypeIcon = () => {
    switch (notification.type) {
      case "response":
        return <MessageSquare className="w-4 h-4" />;
      case "budget_confirmation":
        return <CheckCircle className="w-4 h-4 text-emerald-600" />;
      case "project_submission":
        return <FileText className="w-4 h-4 text-blue-600" />;
      case "addendum_signature":
        return <PenTool className="w-4 h-4 text-amber-600" />;
      case "process_checklist":
        return <ClipboardList className="w-4 h-4 text-purple-600" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getTypeLabel = () => {
    switch (notification.type) {
      case "response":
        return "Resposta";
      case "budget_confirmation":
        return "Confirmação";
      case "project_submission":
        return "Projeto";
      case "addendum_signature":
        return "Termo Aditivo";
      case "process_checklist":
        return "Checklist";
      default:
        return "Mensagem";
    }
  };

  const getMessageBgColor = () => {
    switch (notification.type) {
      case "budget_confirmation":
        return "bg-emerald-50 border border-emerald-200";
      case "project_submission":
        return "bg-blue-50 border border-blue-200";
      case "addendum_signature":
        return "bg-amber-50 border border-amber-200";
      case "process_checklist":
        return "bg-purple-50 border border-purple-200";
      default:
        return "bg-muted/50";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="h-full max-h-screen w-full max-w-full rounded-none p-0 sm:h-auto sm:max-h-[85vh] sm:max-w-lg sm:rounded-lg sm:p-6">
        <div className="flex flex-col h-full overflow-y-auto p-6 sm:p-0">
          <DialogHeader>
            <DialogTitle className="text-xl">
              {getModalTitle()}
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
            {notification.type === "response" && notification.originalMessage && (
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

            {/* Message Content */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-foreground font-medium">
                {getTypeIcon()}
                <span>{getTypeLabel()}</span>
              </div>
              <div className={`rounded-lg p-4 ${getMessageBgColor()}`}>
                <p className="text-sm text-foreground leading-relaxed">
                  {notification.message}
                </p>
              </div>
            </div>

            {/* Checklist for process_checklist type */}
            {notification.type === "process_checklist" && notification.checklistItems && (
              <div className="space-y-3">
                <h4 className="font-medium text-foreground">Status do Pedido:</h4>
                <div className="space-y-2">
                  {notification.checklistItems.map((item, index) => (
                    <div 
                      key={index} 
                      className={`flex items-center gap-3 p-3 rounded-lg ${
                        item.completed ? "bg-emerald-50 border border-emerald-200" : "bg-muted/30 border border-muted"
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        item.completed ? "bg-emerald-500 text-white" : "bg-muted border-2 border-muted-foreground/30"
                      }`}>
                        {item.completed && <Check className="w-3 h-3" />}
                      </div>
                      <span className={`text-sm ${item.completed ? "text-emerald-700" : "text-muted-foreground"}`}>
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Coupon Field for Budget Confirmation */}
            {notification.type === "budget_confirmation" && (
              <div className="space-y-3 border-t pt-4">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-accent" />
                  <Label htmlFor="coupon" className="font-medium">Código de Cupom</Label>
                </div>
                <p className="text-xs text-muted-foreground">
                  Se você possui um código promocional, insira abaixo. O desconto será aplicado no valor final do orçamento.
                </p>
                <Input
                  id="coupon"
                  placeholder="Ex: DESCONTO10"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  className="uppercase"
                />
              </div>
            )}

            {/* Action Buttons */}
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

            {notification.type === "addendum_signature" && (
              <div className="pt-2">
                <Button 
                  onClick={() => {
                    onSignAddendum?.();
                    onOpenChange(false);
                  }} 
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                >
                  <PenTool className="w-4 h-4 mr-2" />
                  Assinar Termo Aditivo
                </Button>
              </div>
            )}

            {notification.type === "project_submission" && (
              <div className="pt-2">
                <Button 
                  onClick={() => onOpenChange(false)} 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Visualizar Projeto
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
