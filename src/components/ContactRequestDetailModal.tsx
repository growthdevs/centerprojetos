import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MessageSquare, Calendar } from "lucide-react";
import type { ContactRequest } from "@/data/mockContactRequests";
interface ContactRequestDetailModalProps {
  request: ContactRequest | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
const ContactRequestDetailModal = ({
  request,
  open,
  onOpenChange
}: ContactRequestDetailModalProps) => {
  if (!request) return null;
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
  const handleWhatsAppClick = () => {
    const phone = request.clientPhone.replace(/\D/g, "");
    const message = encodeURIComponent(`Olá ${request.clientName}! Recebi sua solicitação de contato através da Center Projetos. Como posso ajudá-lo(a)?`);
    window.open(`https://wa.me/55${phone}?text=${message}`, "_blank");
  };
  const handleEmailClick = () => {
    const subject = encodeURIComponent("Re: Solicitação de Contato - Center Projetos");
    const body = encodeURIComponent(`Olá ${request.clientName},\n\nRecebi sua mensagem e agradeço pelo interesse!\n\nVamos conversar sobre seu projeto?\n\nAtenciosamente`);
    window.open(`mailto:${request.clientEmail}?subject=${subject}&body=${body}`, "_blank");
  };
  return <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="h-full max-h-screen w-full max-w-full rounded-none p-0 sm:h-auto sm:max-h-[85vh] sm:max-w-lg sm:rounded-lg sm:p-6">
        <div className="flex flex-col h-full overflow-y-auto p-6 sm:p-0">
          <DialogHeader>
            <DialogTitle className="text-xl">Solicitação de Contato</DialogTitle>
            <DialogDescription className="sr-only">Detalhes da solicitação de contato.</DialogDescription>
          </DialogHeader>

          <div className="space-y-6 flex-1 mx-0 mt-4">
          {/* Client Info */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground text-lg">
              {request.clientName}
            </h3>

            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm">{request.clientEmail}</span>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm">{request.clientPhone}</span>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm">{formatDate(request.createdAt)}</span>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-foreground font-medium">
              <MessageSquare className="w-4 h-4" />
              <span>Mensagem</span>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm text-foreground leading-relaxed">
                {request.message}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button onClick={handleWhatsAppClick} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white">
              <Phone className="w-4 h-4 mr-2" />
              Responder via WhatsApp
            </Button>
            <Button onClick={handleEmailClick} variant="outline" className="flex-1">
              <Mail className="w-4 h-4 mr-2" />
              Responder via E-mail
            </Button>
          </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>;
};
export default ContactRequestDetailModal;