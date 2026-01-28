import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, ArrowRight } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import SearchWizard from "./search/SearchWizard";

const HeroSection = () => {
  const [showSearchWizard, setShowSearchWizard] = useState(false);

  return (
    <>
      <section className="relative min-h-screen flex items-center pt-20">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${heroBg})`,
          }}
        />

        {/* Overlay - increased opacity by 30% */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 to-navy-dark/98" />

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center md:text-left md:mx-0">
            {/* Headline */}
            <h1
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6 animate-fade-in"
              style={{
                animationDelay: "0.1s",
              }}
            >
              Encontre o{" "}
              <span className="text-blue-mid">projetista ideal</span> para seus
              móveis planejados
            </h1>

            {/* Description */}
            <p
              className="text-base md:text-xl text-primary-foreground/80 leading-relaxed mb-10 animate-fade-in px-4 md:px-0"
              style={{
                animationDelay: "0.2s",
              }}
            >
              Conectamos você a profissionais verificados na sua região. Compare
              portfólios, avaliações e encontre o parceiro perfeito para seu
              projeto.
            </p>

            {/* CTA Button */}
            <div
              className="animate-fade-in flex flex-col items-center md:items-start"
              style={{
                animationDelay: "0.3s",
              }}
            >
              <Button
                size="lg"
                variant="accent"
                className="text-base md:text-xl px-6 md:px-12 py-5 md:py-8 font-bold shadow-2xl hover:scale-105 transition-transform group w-full max-w-xs sm:max-w-none sm:w-auto"
                onClick={() => setShowSearchWizard(true)}
              >
                <Search className="mr-2 md:mr-3 w-5 h-5 md:w-6 md:h-6" />
                <span className="whitespace-nowrap">Comece seu projeto</span>
                <ArrowRight className="ml-2 md:ml-3 w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
              </Button>
              <p className="mt-4 text-primary-foreground/60 text-sm">
                Encontre lojas e projetistas verificados na sua região
              </p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator - hidden on mobile */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float hidden md:block">
          <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-blue-mid rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Search Wizard */}
      <SearchWizard
        isOpen={showSearchWizard}
        onClose={() => setShowSearchWizard(false)}
      />
    </>
  );
};

export default HeroSection;