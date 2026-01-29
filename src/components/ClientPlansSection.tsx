import { useState } from "react";
import { Check, Crown, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import LoginModal from "@/components/LoginModal";
import SearchWizard from "@/components/search/SearchWizard";

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

type PlanType = "gratuito" | "pago";

const ClientPlansSection = () => {
  const { isAuthenticated } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showWizard, setShowWizard] = useState(false);
  const [pendingPlan, setPendingPlan] = useState<PlanType | null>(null);

  const handlePlanSelect = (plan: PlanType) => {
    if (!isAuthenticated) {
      setPendingPlan(plan);
      setShowLogin(true);
    } else {
      setPendingPlan(plan);
      setShowWizard(true);
    }
  };

  const handleLoginSuccess = () => {
    setShowLogin(false);
    setShowWizard(true);
  };

  return (
    <>
      <section id="para-clientes" className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
            <span className="text-sm font-semibold text-accent uppercase tracking-widest">
              Para Clientes
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-primary mt-2 mb-4">
              Nossos Serviços
            </h2>
            <p className="text-muted-foreground text-base md:text-lg">
              Escolha o plano ideal para sua jornada de móveis planejados
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Smart Plan */}
            <Card
              className="p-6 md:p-8 border-border hover:border-accent/50 transition-all duration-300 hover:shadow-lg flex flex-col"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Consultoria Smart</h3>
                  <p className="text-sm text-muted-foreground">Gratuita</p>
                </div>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {smartBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground text-sm md:text-base">{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="mb-6">
                <div className="text-3xl font-bold text-foreground">
                  R$ 0<span className="text-base font-normal text-muted-foreground">,00</span>
                </div>
              </div>

              <Button
                variant="outline"
                size="lg"
                className="w-full font-semibold"
                onClick={() => handlePlanSelect("gratuito")}
              >
                Começar Agora
              </Button>
            </Card>

            {/* Premium Plan */}
            <Card
              className="p-6 md:p-8 border-2 border-accent bg-accent/5 transition-all duration-300 hover:shadow-lg flex flex-col relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
                MAIS ESCOLHIDO
              </div>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Crown className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Consultoria Premium</h3>
                  <p className="text-sm text-muted-foreground">Paga</p>
                </div>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {premiumBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground text-sm md:text-base">{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="mb-6">
                <p className="text-sm text-muted-foreground">
                  Redução máxima de riscos e total previsibilidade.
                </p>
              </div>

              <Button
                variant="accent"
                size="lg"
                className="w-full font-semibold"
                onClick={() => handlePlanSelect("pago")}
              >
                Contratar Premium
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Login Modal */}
      <LoginModal
        open={showLogin}
        onOpenChange={(open) => {
          setShowLogin(open);
          if (!open) setPendingPlan(null);
        }}
        defaultTab="client"
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Search Wizard - starts from terms step with pre-selected plan */}
      <SearchWizard
        isOpen={showWizard}
        onClose={() => {
          setShowWizard(false);
          setPendingPlan(null);
        }}
        initialPlan={pendingPlan}
      />
    </>
  );
};

export default ClientPlansSection;
