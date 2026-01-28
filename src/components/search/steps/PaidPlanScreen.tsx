import { Button } from "@/components/ui/button";
import { CheckCircle, Mail, Phone, ArrowRight } from "lucide-react";
import logoColor from "@/assets/logo-color.png";

interface PaidPlanScreenProps {
  onClose: () => void;
}

const PaidPlanScreen = ({ onClose }: PaidPlanScreenProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center">
            <img src={logoColor} alt="Center Projetos" className="h-10 w-auto" />
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center justify-center max-w-md text-center">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          Solicitação enviada!
        </h1>

        <p className="text-muted-foreground mb-8">
          Nossa equipe da <strong className="text-foreground">Center Plataforma</strong> entrará em contato com você em breve para dar continuidade ao seu projeto premium.
        </p>

        <div className="w-full bg-muted/50 rounded-lg p-6 mb-8">
          <h3 className="font-semibold text-foreground mb-4">Próximos passos:</h3>
          <ul className="space-y-3 text-left">
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-xs font-bold text-accent">1</span>
              </div>
              <span className="text-sm text-muted-foreground">
                Você receberá um contato da nossa equipe em até 24h úteis
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-xs font-bold text-accent">2</span>
              </div>
              <span className="text-sm text-muted-foreground">
                Apresentaremos opções de profissionais exclusivos para seu projeto
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-xs font-bold text-accent">3</span>
              </div>
              <span className="text-sm text-muted-foreground">
                Acompanharemos todo o desenvolvimento do seu projeto
              </span>
            </li>
          </ul>
        </div>

        <div className="w-full space-y-3 mb-8">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Mail className="w-4 h-4" />
            <span>contato@centerprojetos.com.br</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Phone className="w-4 h-4" />
            <span>(11) 9999-9999</span>
          </div>
        </div>

        <Button variant="accent" size="lg" className="w-full group" onClick={onClose}>
          Voltar para o início
          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </main>
    </div>
  );
};

export default PaidPlanScreen;
