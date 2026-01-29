import { Check, Crown, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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

interface PlansSectionProps {
  onPlanSelect: (plan: PlanType) => void;
}

const PlansSection = ({ onPlanSelect }: PlansSectionProps) => {
  return (
    <section id="planos" className="py-16 md:py-24 bg-primary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <span className="text-sm font-semibold text-accent uppercase tracking-widest">
            Nossos Serviços
          </span>
          <h2 className="text-2xl md:text-4xl font-bold text-primary-foreground mt-2 mb-4">
            Comparativo de Planos
          </h2>
          <p className="text-primary-foreground/70 text-base md:text-lg">
            Escolha o plano ideal para sua jornada de móveis planejados
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Smart Plan */}
          <Card
            className="p-6 md:p-8 bg-primary-foreground/10 border-primary-foreground/20 hover:border-accent/50 transition-all duration-300 hover:shadow-lg flex flex-col"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                <Zap className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary-foreground">Consultoria Smart</h3>
                <p className="text-sm text-primary-foreground/60">Gratuita</p>
              </div>
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              {smartBenefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="text-primary-foreground/80 text-sm md:text-base">{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="mb-6">
              <div className="text-3xl font-bold text-primary-foreground">
                R$ 0<span className="text-base font-normal text-primary-foreground/60">,00</span>
              </div>
            </div>

            <Button
              variant="outline"
              size="lg"
              className="w-full font-semibold border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => onPlanSelect("gratuito")}
            >
              Começar Agora
            </Button>
          </Card>

          {/* Premium Plan */}
          <Card
            className="p-6 md:p-8 border-2 border-accent bg-accent/10 transition-all duration-300 hover:shadow-lg flex flex-col relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
              MAIS ESCOLHIDO
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                <Crown className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary-foreground">Consultoria Premium</h3>
                <p className="text-sm text-primary-foreground/60">Paga</p>
              </div>
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              {premiumBenefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="text-primary-foreground/80 text-sm md:text-base">{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="mb-6">
              <p className="text-sm text-primary-foreground/60">
                Redução máxima de riscos e total previsibilidade.
              </p>
            </div>

            <Button
              variant="accent"
              size="lg"
              className="w-full font-semibold"
              onClick={() => onPlanSelect("pago")}
            >
              Contratar Premium
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PlansSection;
