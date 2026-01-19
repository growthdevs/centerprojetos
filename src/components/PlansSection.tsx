import { Button } from "@/components/ui/button";
import { Check, Star, Crown } from "lucide-react";

const plans = [
  {
    name: "Consultoria Smart",
    price: "Gratuita",
    icon: Star,
    description: "Ideal para clientes que desejam apenas acompanhamento básico",
    features: [
      "Desconto exclusivo de até 10%",
      "Solicitação de até 3 orçamentos simultâneos",
      "Acesso a dezenas de projetistas e lojas verificadas",
      "Assessoria básica da Center Projetos",
      "Vistoria final gratuita",
    ],
    popular: false,
    buttonText: "Escolher Plano Smart",
  },
  {
    name: "Consultoria Premium",
    price: "Consulte",
    icon: Crown,
    description: "Ideal para clientes que querem maior tranquilidade",
    features: [
      "Desconto exclusivo de até 10%",
      "Sem limites de solicitação de orçamentos",
      "Acesso a dezenas de projetistas e lojas verificadas",
      "Um projetista exclusivo Center Projetos",
      "Briefing CenterProjetos",
      "Acompanhamento até as lojas",
      "Acompanhamento em todas as etapas",
      "Acompanhamento de prazos",
      "Análise de projeto executivo",
      "Acompanhamento de montagem",
      "Vistoria final",
    ],
    popular: true,
    buttonText: "Escolher Plano Premium",
  },
];

const PlansSection = () => {
  return (
    <section id="planos" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-semibold text-accent uppercase tracking-widest">
            Planos
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2 mb-4">
            Escolha o plano ideal para você
          </h2>
          <p className="text-muted-foreground text-lg">
            Oferecemos duas opções de consultoria para atender às suas necessidades
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-8 transition-all duration-300 hover:shadow-elevated ${
                  plan.popular
                    ? "bg-primary border-2 border-accent shadow-lg"
                    : "bg-card border border-border hover:border-accent/50"
                }`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="bg-accent text-accent-foreground text-sm font-semibold px-4 py-1.5 rounded-full shadow-red">
                      Mais Popular
                    </div>
                  </div>
                )}

                {/* Plan Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                    plan.popular ? "bg-accent/20" : "bg-accent/10"
                  }`}>
                    <Icon className="w-7 h-7 text-accent" />
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold ${plan.popular ? "text-primary-foreground" : "text-primary"}`}>
                      {plan.name}
                    </h3>
                    <p className="text-2xl font-bold text-accent">
                      {plan.price}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className={`text-sm mb-6 ${plan.popular ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  {plan.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        plan.popular ? "bg-accent/20" : "bg-accent/10"
                      }`}>
                        <Check className="w-3 h-3 text-accent" />
                      </div>
                      <span className={`text-sm ${plan.popular ? "text-primary-foreground/90" : "text-foreground"}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  className={`w-full font-semibold ${
                    plan.popular
                      ? "bg-accent hover:bg-accent/90 text-accent-foreground shadow-red"
                      : "bg-primary hover:bg-navy-light text-primary-foreground"
                  }`}
                  size="lg"
                >
                  {plan.buttonText}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PlansSection;
