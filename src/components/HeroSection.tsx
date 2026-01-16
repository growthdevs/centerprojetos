import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";
import { useAuth } from "@/contexts/AuthContext";
import LoginModal from "./LoginModal";

const HeroSection = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleSearchClick = () => {
    if (isAuthenticated) {
      navigate("/buscar-projetistas");
    } else {
      setShowLoginModal(true);
    }
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    navigate("/buscar-projetistas");
  };

  return (
    <>
      <section className="relative min-h-screen flex items-center pt-20">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-hero" />
        
        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Encontre o{" "}
              <span className="text-gradient-gold">projetista ideal</span>{" "}
              para seus móveis planejados
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Conectamos você a profissionais verificados na sua região. 
              Compare portfólios, avaliações e encontre o parceiro perfeito para seu projeto.
            </p>

            {/* CTA Button */}
            <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <Button 
                size="lg" 
                variant="gold"
                className="text-lg md:text-xl px-8 md:px-12 py-6 md:py-8 font-bold shadow-2xl hover:scale-105 transition-transform group"
                onClick={handleSearchClick}
              >
                <Search className="mr-3 w-6 h-6" />
                Buscar Projetistas
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Button>
              <p className="mt-4 text-primary-foreground/60 text-sm">
                {isAuthenticated 
                  ? "Explore profissionais verificados na sua região"
                  : "Faça login para buscar profissionais verificados"
                }
              </p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-gold rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Login Modal */}
      <LoginModal
        open={showLoginModal}
        onOpenChange={setShowLoginModal}
        defaultTab="client"
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
};

export default HeroSection;
