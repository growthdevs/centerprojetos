import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Briefcase, Award } from "lucide-react";

const stats = [
  { icon: Users, value: "500+", label: "Clientes Atendidos" },
  { icon: Briefcase, value: "50+", label: "Projetistas Parceiros" },
  { icon: Award, value: "98%", label: "Satisfação" },
];

const CTASection = () => {
  return (
    <section id="portal" className="py-24 bg-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto mb-16">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/20 rounded-xl mb-3">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-primary-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-primary-foreground/70">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Content */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Solicite um orçamento com nossos{" "}
            <span className="text-gradient-red">projetistas verificados</span>
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 leading-relaxed">
            Encontre o profissional ideal para seu projeto. Nossa rede de projetistas 
            passou por verificação rigorosa para garantir qualidade e confiança.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg px-8 shadow-red group"
            >
              Encontrar Projetista
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="heroOutline"
              className="font-medium text-lg px-8"
            >
              Sou Projetista
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
