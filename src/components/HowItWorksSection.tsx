import { Search, MessageSquare, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Busque Projetistas",
    description: "Encontre profissionais verificados na sua região filtrando por cidade e estado.",
  },
  {
    icon: MessageSquare,
    step: "02",
    title: "Solicite Contato",
    description: "Escolha um projetista e envie uma mensagem diretamente pela plataforma.",
  },
  {
    icon: CheckCircle,
    step: "03",
    title: "Inicie seu Projeto",
    description: "Receba o contato do profissional e comece a planejar seus móveis.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="para-clientes" className="py-16 md:py-20 bg-secondary">
      <div className="container mx-auto px-6 md:px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-sm font-semibold text-accent uppercase tracking-widest">
            Para Clientes
          </span>
          <h2 className="text-2xl md:text-4xl font-bold text-primary mt-2 mb-4">
            Como funciona
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Encontre o projetista ideal em poucos passos
          </p>
        </div>

        {/* Steps */}
        <div className="flex flex-col md:grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto mb-10 md:mb-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className="relative bg-card rounded-xl p-6 md:p-8 border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-card-hover text-center"
              >
                {/* Step Number */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground font-bold text-sm px-3 py-1 rounded-full">
                  {step.step}
                </div>
                
                {/* Icon */}
                <div className="bg-accent/10 w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center mx-auto mb-4 md:mb-6 mt-2">
                  <Icon className="w-7 h-7 md:w-8 md:h-8 text-accent" />
                </div>
                
                <h3 className="text-lg md:text-xl font-semibold text-primary mb-2 md:mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                  {step.description}
                </p>

                {/* Connector Line (desktop only) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-border" />
                )}
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center px-4">
          <Link to="/buscar-projetistas" className="block">
            <Button variant="accent" size="lg" className="font-semibold text-lg px-8 w-full sm:w-auto">
              Buscar Projetistas
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
