import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import heroBg from "@/assets/hero-bg.jpg";
import { states, citiesByState } from "@/data/locations";

const HeroSection = () => {
  const navigate = useNavigate();
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const availableCities = selectedState ? citiesByState[selectedState] || [] : [];

  const handleStateChange = (value: string) => {
    setSelectedState(value);
    setSelectedCity("");
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (selectedState) params.set("state", selectedState);
    if (selectedCity) params.set("city", selectedCity);
    if (searchQuery) params.set("q", searchQuery);
    
    navigate(`/buscar-projetistas${params.toString() ? `?${params.toString()}` : ""}`);
  };

  return (
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
        <div className="max-w-4xl">

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

          {/* Search Box */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-gold" />
              <span className="text-primary-foreground font-medium">Encontre um projetista</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_auto] gap-3">
              <Input
                placeholder="Buscar por nome ou loja..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/90 border-0 text-foreground h-12 placeholder:text-muted-foreground"
              />

              <Select value={selectedState} onValueChange={handleStateChange}>
                <SelectTrigger className="bg-white/90 border-0 text-foreground h-12">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem key={state.value} value={state.value}>
                      {state.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select 
                value={selectedCity} 
                onValueChange={setSelectedCity}
                disabled={!selectedState}
              >
                <SelectTrigger className="bg-white/90 border-0 text-foreground h-12 disabled:opacity-50">
                  <SelectValue placeholder="Cidade" />
                </SelectTrigger>
                <SelectContent>
                  {availableCities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button 
                size="lg" 
                variant="gold"
                className="font-semibold h-12"
                onClick={handleSearch}
              >
                <Search className="mr-2 w-5 h-5" />
                Buscar
              </Button>
            </div>
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
  );
};

export default HeroSection;
