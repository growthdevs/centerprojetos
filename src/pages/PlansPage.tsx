import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Check, Crown, Zap } from "lucide-react";
import logoColor from "@/assets/logo-color.png";
import { useAuth } from "@/contexts/AuthContext";
import LoginModal from "@/components/LoginModal";
import SearchWizard from "@/components/search/SearchWizard";
import type { PlanType } from "@/components/search/SearchWizard";

const smartBenefits = [
  "Acesso à vitrine de lojas",
  "Suporte básico",
  "Monitoramento de prazos",
  "Vistoria final técnica",
  "Desconto adicional em todas as lojas",
];

const premiumBenefits = [
  "10% de desconto em todas as lojas",
  "Projetista Center exclusivo para você",
  "Desenvolvimento de projeto",
  "Acompanhamento até às lojas",
  "Análise de orçamentos",
  "Análise de projeto Final",
  "Acompanhamento de montagem",
  "Intermediação",
  "Vistoria Final",
];

const PlansPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showWizard, setShowWizard] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanType>(null);

  const handlePlanSelect = (plan: PlanType) => {
    if (!isAuthenticated) {
      setSelectedPlan(plan);
      setShowLogin(true);
    } else {
      setSelectedPlan(plan);
      setShowWizard(true);
    }
  };

  const handleLoginSuccess = () => {
    setShowLogin(false);
    setShowWizard(true);
  };

  const handleWizardClose = () => {
    setShowWizard(false);
    setSelectedPlan(null);
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
              <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
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
                Nossos Planos
              </h1>
              <p className="text-muted-foreground">
                Escolha o plano ideal para sua jornada de móveis planejados
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl w-full">
              {/* Free Plan */}
              <Card
                className="p-6 cursor-pointer transition-all duration-300 hover:shadow-lg border-border hover:border-accent/50"
                onClick={() => handlePlanSelect("gratuito")}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">Consultoria Smart</h3>
                    <p className="text-sm text-muted-foreground">Plano Gratuito</p>
                  </div>
                </div>

                <ul className="space-y-2 mb-6">
                  {smartBenefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>

                <div className="text-2xl font-bold text-foreground">
                  R$ 0<span className="text-sm font-normal text-muted-foreground">,00</span>
                </div>
              </Card>

              {/* Paid Plan */}
              <Card
                className="p-6 cursor-pointer transition-all duration-300 hover:shadow-lg relative overflow-hidden border-2 border-accent"
                onClick={() => handlePlanSelect("pago")}
              >
                <div className="absolute top-0 right-0 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
                  MAIS ESCOLHIDO
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

                <div className="text-sm text-muted-foreground">
                  Redução máxima de riscos e total previsibilidade.
                </div>
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
          if (!open) setSelectedPlan(null);
        }}
        defaultTab="client"
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Search Wizard - starts from terms step with pre-selected plan */}
      <SearchWizard
        isOpen={showWizard}
        onClose={handleWizardClose}
        initialPlan={selectedPlan}
      />
    </>
  );
};

export default PlansPage;
