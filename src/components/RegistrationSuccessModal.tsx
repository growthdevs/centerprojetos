import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle2 } from "lucide-react";

interface RegistrationSuccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userType: "shopowner" | "client" | "designer";
}

const RegistrationSuccessModal = ({
  open,
  onOpenChange,
  userType,
}: RegistrationSuccessModalProps) => {
  const getContent = () => {
    if (userType === "shopowner") {
      return {
        title: "Cadastro Enviado com Sucesso!",
        icon: <Clock className="w-16 h-16 text-amber-500 mx-auto" />,
        message: (
          <>
            <p className="text-muted-foreground mb-4">
              Seu cadastro foi recebido e está em análise pela equipe Center Projetos.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-left">
              <h4 className="font-semibold text-amber-800 mb-2">⏳ Prazo de Análise</h4>
              <p className="text-amber-700 text-sm">
                Nossa equipe irá verificar as informações enviadas em até <strong>3 dias úteis</strong>.
                Você receberá uma notificação assim que a análise for concluída.
              </p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left mt-4">
              <h4 className="font-semibold text-blue-800 mb-2">📋 Próximos Passos</h4>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• Aguarde a aprovação do seu cadastro</li>
                <li>• Após aprovado, você poderá cadastrar projetistas</li>
                <li>• Acompanhe o status pelas notificações</li>
              </ul>
            </div>
          </>
        ),
      };
    }

    return {
      title: "Cadastro Realizado!",
      icon: <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />,
      message: (
        <p className="text-muted-foreground">
          Sua conta foi criada com sucesso. Você já pode começar a usar a plataforma!
        </p>
      ),
    };
  };

  const content = getContent();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-background border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-primary">
            {content.title}
          </DialogTitle>
        </DialogHeader>

        <div className="py-6 text-center">
          {content.icon}
          <div className="mt-6">{content.message}</div>
        </div>

        <Button
          variant="accent"
          className="w-full"
          onClick={() => onOpenChange(false)}
        >
          Entendi
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationSuccessModal;
