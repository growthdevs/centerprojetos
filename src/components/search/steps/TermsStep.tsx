import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, FileText, Tag } from "lucide-react";
import logoColor from "@/assets/logo-color.png";
import type { PlanType } from "../SearchWizard";

interface TermsStepProps {
  selectedPlan: PlanType;
  couponCode: string;
  onCouponChange: (code: string) => void;
  onAccept: () => void;
  onBack: () => void;
}

const TermsStep = ({
  selectedPlan,
  couponCode,
  onCouponChange,
  onAccept,
  onBack,
}: TermsStepProps) => {
  const [termsAccepted, setTermsAccepted] = useState(false);

  return (
    <div className="fixed inset-0 bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <img src={logoColor} alt="Center Projetos" className="h-10 w-auto" />
            <Button variant="ghost" onClick={onBack} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center overflow-y-auto max-w-lg">
        <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6">
          <FileText className="w-8 h-8 text-accent" />
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-2 text-center">
          Termos de Uso
        </h1>
        <p className="text-muted-foreground text-center mb-8">
          Plano selecionado: <strong className="text-foreground">
            {selectedPlan === "gratuito" ? "Consultoria Smart" : "Consultoria Premium"}
          </strong>
        </p>

        {/* Terms Box */}
        <div className="w-full bg-muted/50 rounded-lg p-4 mb-6 max-h-48 overflow-y-auto text-sm text-muted-foreground">
          <p className="mb-4">
            Ao utilizar os serviços da Center Projetos, você concorda com os seguintes termos:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Os dados fornecidos serão utilizados exclusivamente para a prestação dos serviços contratados.</li>
            <li>A plataforma atua como intermediadora entre clientes e profissionais.</li>
            <li>Os orçamentos são de responsabilidade dos profissionais cadastrados.</li>
            <li>A Center Projetos não se responsabiliza por acordos realizados fora da plataforma.</li>
            <li>Você poderá cancelar sua conta a qualquer momento através das configurações.</li>
          </ul>
        </div>

        {/* Coupon Code (only for paid plan) */}
        {selectedPlan === "pago" && (
          <div className="w-full mb-6">
            <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
              <Tag className="w-4 h-4 text-accent" />
              Cupom de desconto (opcional)
            </label>
            <Input
              placeholder="Digite seu cupom"
              value={couponCode}
              onChange={(e) => onCouponChange(e.target.value)}
            />
          </div>
        )}

        {/* Accept Checkbox */}
        <div className="w-full flex items-start gap-3 mb-8">
          <Checkbox
            id="terms"
            checked={termsAccepted}
            onCheckedChange={(checked) => setTermsAccepted(checked === true)}
          />
          <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
            Li e aceito os <span className="text-accent underline">Termos de Uso</span> e a{" "}
            <span className="text-accent underline">Política de Privacidade</span> da Center Projetos.
          </label>
        </div>

        <Button
          variant="accent"
          size="lg"
          className="w-full"
          disabled={!termsAccepted}
          onClick={onAccept}
        >
          {selectedPlan === "pago" ? "Solicitar contato" : "Iniciar busca"}
        </Button>
      </main>
    </div>
  );
};

export default TermsStep;
