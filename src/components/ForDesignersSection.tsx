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
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-accent uppercase tracking-widest">
            Para Projetistas
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mt-2 mb-4">
            Cresça com a Center Projetos
          </h2>
          <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto">
            Cadastre-se como projetista e amplie sua carteira de clientes
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-xl p-6 text-center hover:bg-primary-foreground/10 transition-colors"
              >
                <div className="bg-accent/20 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-primary-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-primary-foreground/70 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link to="/portal-projetista">
            <Button 
              variant="heroOutline" 
              size="lg" 
              className="font-semibold text-lg px-8"
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
