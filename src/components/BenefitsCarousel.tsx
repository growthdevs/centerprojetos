import { useEffect, useState } from "react";
import { Percent, Zap, Shield, Sparkles, MessageSquare, ChevronLeft, ChevronRight } from "lucide-react";

const benefits = [
  {
    icon: Percent,
    title: "Até 10% de Desconto",
    description: "Em todas as lojas cadastradas na plataforma",
  },
  {
    icon: Zap,
    title: "Facilidade",
    description: "Centralize medições, projetos e comparações em um só lugar",
  },
  {
    icon: Shield,
    title: "Segurança",
    description: "Parceiros verificados e contratos registrados",
  },
  {
    icon: Sparkles,
    title: "Praticidade",
    description: "Acompanhamento completo de todas as etapas",
  },
  {
    icon: MessageSquare,
    title: "Depoimentos",
    description: "Avaliações reais de clientes satisfeitos",
  },
];

const BenefitsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % benefits.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + benefits.length) % benefits.length);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % benefits.length);
  };

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-accent uppercase tracking-widest">
            Benefícios
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2">
            Por que escolher a Center Projetos?
          </h2>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-5 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="group bg-card rounded-xl p-6 border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-card-hover cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-accent/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {benefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={benefit.title}
                    className="w-full flex-shrink-0 px-4"
                  >
                    <div className="bg-card rounded-xl p-8 border border-border text-center">
                      <div className="bg-accent/10 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-6">
                        <Icon className="w-8 h-8 text-accent" />
                      </div>
                      <h3 className="text-xl font-semibold text-primary mb-3">
                        {benefit.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-primary hover:border-accent hover:text-accent transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex gap-2">
              {benefits.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setCurrentIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "w-6 bg-accent"
                      : "bg-border hover:bg-accent/50"
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-primary hover:border-accent hover:text-accent transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsCarousel;
