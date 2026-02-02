import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Check, Crown } from "lucide-react";
import logoColor from "@/assets/logo-color.png";
import { useAuth } from "@/contexts/AuthContext";
import LoginModal from "@/components/LoginModal";
import SearchWizard from "@/components/search/SearchWizard";

const premiumBenefits = [
  "10% de desconto em todas as lojas",
  "Projetista Center exclusivo para você",
  "Desenvolvimento de projeto",
  "Até 5 Orçamentos",
  "Acompanhamento até às lojas",
  "Análise de orçamentos",
  "Análise de projeto Final",
  "Acompanhamento de montagem",
  "Intermediação",
  "Vistoria Final",
];

const SejaPremium = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showWizard, setShowWizard] = useState(false);

  const handleContinue = () => {
    if (!isAuthenticated) {
      setShowLogin(true);
    } else {
      setShowWizard(true);
    }
  };

  const handleLoginSuccess = () => {
    setShowLogin(false);
    setShowWizard(true);
  };

  const handleWizardClose = () => {
    setShowWizard(false);
  };

  return (
    <>
      <div className="min-h-screen bg-background flex flex-col">
        {/* Header */}
        <header className="flex-shrink-0 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <img 
                src={logoColor} 
                alt="Center Projetos" 
                className="h-10 w-auto cursor-pointer" 
                onClick={() => navigate("/")}
              />
              <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <main className="container mx-auto px-4 py-6 md:py-8 flex flex-col items-center pb-24">
            <div className="text-center mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Seja Premium
              </h1>
              <p className="text-muted-foreground">
                Aproveite todos os benefícios de um atendimento exclusivo
              </p>
            </div>

            <div className="max-w-md w-full">
              {/* Premium Plan Card */}
              <Card className="p-6 relative overflow-hidden border-2 border-accent mb-6">
                <div className="absolute top-0 right-0 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
                  RECOMENDADO
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <Crown className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">Consultoria Premium</h3>
                    <p className="text-sm text-muted-foreground">Plano Pago</p>
                  </div>
                </div>

                <ul className="space-y-2 mb-6">
                  {premiumBenefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>

                <div className="text-sm text-muted-foreground mb-6">
                  Redução máxima de riscos e total previsibilidade.
                </div>

                <Button 
                  onClick={handleContinue}
                  variant="accent"
                  size="lg"
                  className="w-full"
                >
                  Continuar
                </Button>
              </Card>
            </div>
          </main>
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal
        open={showLogin}
        onOpenChange={(open) => {
          setShowLogin(open);
        }}
        defaultTab="client"
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Search Wizard - starts from terms step with pre-selected plan */}
      <SearchWizard
        isOpen={showWizard}
        onClose={handleWizardClose}
        initialPlan="pago"
      />
    </>
  );
};

export default SejaPremium;
