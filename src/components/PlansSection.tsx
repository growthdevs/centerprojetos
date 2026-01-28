import { Check } from "lucide-react";

const smartBenefits = [
  "5% de desconto em todas as lojas",
  "Acesso a dezenas de lojas",
  "Acesso a Centenas de Projetistas",
  "Acesso a qualificação das lojas",
  "Até 3 Orçamentos",
  "Suporte básico Center",
  "Vistoria Final Center Projetos",
];

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

const PlansSection = () => {
  return (
    <section id="planos" className="py-24 bg-primary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Comparativo de Planos – Center Projetos
          </h2>
        </div>

        {/* Two Column Layout */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Smart Plan */}
          <div className="bg-primary-foreground/10 rounded-2xl p-8 border border-primary-foreground/20">
            <div className="text-center mb-8">
              <div className="inline-block bg-[#104DB1] text-white px-6 py-3 rounded-lg font-bold text-xl">
                CONSULTORIA SMART
              </div>
              <p className="text-primary-foreground/70 text-lg mt-2">(GRATUITA)</p>
            </div>
            <ul className="space-y-4">
              {smartBenefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="text-primary-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Premium Plan */}
          <div className="bg-accent/20 rounded-2xl p-8 border-2 border-accent">
            <div className="text-center mb-8">
              <div className="inline-block bg-accent text-accent-foreground px-6 py-3 rounded-lg font-bold text-xl">
                CONSULTORIA PREMIUM
              </div>
              <p className="text-primary-foreground/70 text-lg mt-2">(PAGA)</p>
            </div>
            <ul className="space-y-4">
              {premiumBenefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="text-primary-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlansSection;
