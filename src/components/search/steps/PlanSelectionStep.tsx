import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, Check, Crown, Zap } from "lucide-react";
import logoColor from "@/assets/logo-color.png";
import type { PlanType } from "../SearchWizard";

interface PlanSelectionStepProps {
  selectedPlan: PlanType;
  onPlanSelect: (plan: PlanType) => void;
  onNext: () => void;
  onClose: () => void;
}

const PlanSelectionStep = ({
  selectedPlan,
  onPlanSelect,
  onNext,
  onClose,
}: PlanSelectionStepProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <img src={logoColor} alt="Center Projetos" className="h-10 w-auto" />
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center overflow-y-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Escolha seu plano
          </h1>
          <p className="text-muted-foreground">
            Selecione o plano que melhor atende suas necessidades
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl w-full">
          {/* Free Plan */}
          <Card
            className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${
              selectedPlan === "gratuito"
                ? "ring-2 ring-accent border-accent"
                : "border-border hover:border-accent/50"
            }`}
            onClick={() => onPlanSelect("gratuito")}
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
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                5% de desconto em todas as lojas
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                Acesso a dezenas de lojas
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                Acesso a Centenas de Projetistas
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                Acesso a qualificação das lojas
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                Até 3 Orçamentos
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                Suporte básico Center
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                Vistoria Final Center Projetos
              </li>
            </ul>

            <div className="text-2xl font-bold text-foreground">
              R$ 0<span className="text-sm font-normal text-muted-foreground">/mês</span>
            </div>
          </Card>

          {/* Paid Plan */}
          <Card
            className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-lg relative overflow-hidden ${
              selectedPlan === "pago"
                ? "ring-2 ring-accent border-accent"
                : "border-border hover:border-accent/50"
            }`}
            onClick={() => onPlanSelect("pago")}
          >
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
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                10% de desconto em todas as lojas
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                Projetista Center exclusivo para você
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                Desenvolvimento de projeto
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                Até 5 Orçamentos
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                Acompanhamento até às lojas
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                Análise de orçamentos
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                Análise de projeto Final
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                Acompanhamento de montagem
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                Intermediação
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                Vistoria Final
              </li>
            </ul>

            <div className="text-2xl font-bold text-foreground">
              Consulte<span className="text-sm font-normal text-muted-foreground"> valores</span>
            </div>
          </Card>
        </div>

        <Button
          variant="accent"
          size="lg"
          className="mt-8 min-w-[200px]"
          disabled={!selectedPlan}
          onClick={onNext}
        >
          Continuar
        </Button>
      </main>
    </div>
  );
};

export default PlanSelectionStep;
