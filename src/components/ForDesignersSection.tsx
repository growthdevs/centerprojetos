import { Briefcase, Users, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const benefits = [
  {
    icon: Users,
    title: "Novos Clientes",
    description: "Receba solicitações de clientes interessados nos seus serviços.",
  },
  {
    icon: Briefcase,
    title: "Portfólio Online",
    description: "Exiba até 10 projetos e mostre a qualidade do seu trabalho.",
  },
  {
    icon: Star,
    title: "Reputação",
    description: "Construa sua reputação com avaliações e medalhas.",
  },
  {
    icon: TrendingUp,
    title: "Visibilidade",
    description: "Seja encontrado por clientes da sua região.",
  },
];

const ForDesignersSection = () => {
  return (
    <section className="py-16 md:py-20 bg-primary">
      <div className="container mx-auto px-6 md:px-4">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-16">
          <span className="text-sm font-semibold text-accent uppercase tracking-widest">
            Para Projetistas
          </span>
          <h2 className="text-2xl md:text-4xl font-bold text-primary-foreground mt-2 mb-4">
            Cresça com a Center Projetos
          </h2>
          <p className="text-primary-foreground/70 text-base md:text-lg max-w-2xl mx-auto">
            Cadastre-se como projetista e amplie sua carteira de clientes
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto mb-10 md:mb-12">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-xl p-4 md:p-6 text-center hover:bg-primary-foreground/10 transition-colors"
              >
                <div className="bg-accent/20 w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <Icon className="w-6 h-6 md:w-7 md:h-7 text-accent" />
                </div>
                <h3 className="text-base md:text-lg font-semibold text-primary-foreground mb-1 md:mb-2">
                  {benefit.title}
                </h3>
                <p className="text-primary-foreground/70 text-xs md:text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center px-4">
          <Link to="/portal-projetista" className="block">
            <Button 
              variant="heroOutline" 
              size="lg" 
              className="font-semibold text-lg px-8 w-full sm:w-auto"
            >
              Acessar Portal do Projetista
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ForDesignersSection;
