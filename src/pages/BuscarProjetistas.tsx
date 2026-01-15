import { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DesignerCard from "@/components/DesignerCard";
import DesignerDetailModal from "@/components/DesignerDetailModal";
import logoColor from "@/assets/logo-color.png";
import { states, citiesByState } from "@/data/locations";

// Mock data - will be replaced with real data from backend
const mockDesigners = [
  {
    id: "1",
    name: "Maria Silva",
    city: "São Paulo",
    state: "SP",
    store: "Todeschini Centro",
    projectsCount: 47,
    rating: 4.8,
    storeRating: 4.5,
    portfolioImages: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400",
      "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=400",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=400",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=400",
    ],
    reviews: [
      { author: "João M.", comment: "Excelente atendimento! Projeto entregue no prazo e com muita qualidade.", date: "15/12/2024", rating: 5 },
      { author: "Ana P.", comment: "Muito profissional, atenciosa e criativa. Superou minhas expectativas.", date: "03/12/2024", rating: 5 },
    ],
  },
  {
    id: "2",
    name: "João Santos",
    city: "Campinas",
    state: "SP",
    store: "Florense Campinas",
    projectsCount: 32,
    rating: 4.6,
    storeRating: 4.7,
    portfolioImages: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400",
      "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=400",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=400",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=400",
    ],
    reviews: [
      { author: "Carlos R.", comment: "Ótimo profissional, muito dedicado ao trabalho.", date: "20/11/2024", rating: 4 },
    ],
  },
  {
    id: "3",
    name: "Ana Oliveira",
    city: "Rio de Janeiro",
    state: "RJ",
    store: "Formaplas Barra",
    projectsCount: 58,
    rating: 4.9,
    storeRating: 4.3,
    portfolioImages: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400",
      "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=400",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=400",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=400",
    ],
    reviews: [
      { author: "Mariana S.", comment: "Projeto incrível! Comunicação clara e acompanhamento excelente.", date: "08/12/2024", rating: 5 },
      { author: "Pedro L.", comment: "Muito atenciosa e profissional. Recomendo!", date: "25/11/2024", rating: 5 },
    ],
  },
  {
    id: "4",
    name: "Carlos Ferreira",
    city: "Belo Horizonte",
    state: "MG",
    store: "Bertolini BH Centro",
    projectsCount: 23,
    rating: 4.4,
    storeRating: 4.6,
    portfolioImages: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400",
      "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=400",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=400",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=400",
    ],
    reviews: [
      { author: "Fernanda M.", comment: "Bom profissional, projeto bem executado.", date: "10/12/2024", rating: 4 },
    ],
  },
  {
    id: "5",
    name: "Patricia Lima",
    city: "Curitiba",
    state: "PR",
    store: "Favorita Curitiba",
    projectsCount: 41,
    rating: 4.7,
    storeRating: 4.8,
    portfolioImages: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400",
      "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=400",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=400",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=400",
    ],
    reviews: [
      { author: "Ricardo T.", comment: "Excelente trabalho! Projeto ficou perfeito.", date: "18/12/2024", rating: 5 },
      { author: "Lucia F.", comment: "Muito profissional e pontual nas entregas.", date: "05/12/2024", rating: 5 },
    ],
  },
  {
    id: "6",
    name: "Roberto Almeida",
    city: "Porto Alegre",
    state: "RS",
    store: "Linea Porto Alegre",
    projectsCount: 29,
    rating: 4.5,
    storeRating: 4.4,
    portfolioImages: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400",
      "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=400",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=400",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=400",
    ],
    reviews: [
      { author: "Sandra K.", comment: "Bom atendimento e projeto de qualidade.", date: "12/12/2024", rating: 4 },
    ],
  },
];

const BuscarProjetistas = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedState, setSelectedState] = useState<string>(searchParams.get("state") || "");
  const [selectedCity, setSelectedCity] = useState<string>(searchParams.get("city") || "");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDesigner, setSelectedDesigner] = useState<typeof mockDesigners[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sync with URL params on mount and changes
  useEffect(() => {
    const stateParam = searchParams.get("state");
    const cityParam = searchParams.get("city");
    if (stateParam) setSelectedState(stateParam);
    if (cityParam) setSelectedCity(cityParam);
  }, [searchParams]);

  const availableCities = selectedState ? citiesByState[selectedState] || [] : [];

  const filteredDesigners = useMemo(() => {
    return mockDesigners.filter((designer) => {
      const matchesState = !selectedState || designer.state === selectedState;
      const matchesCity = !selectedCity || designer.city === selectedCity;
      const matchesSearch = !searchQuery || 
        designer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        designer.store.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesState && matchesCity && matchesSearch;
    });
  }, [selectedState, selectedCity, searchQuery]);

  const handleStateChange = (value: string) => {
    setSelectedState(value);
    setSelectedCity("");
    // Update URL
    const newParams = new URLSearchParams(searchParams);
    newParams.set("state", value);
    newParams.delete("city");
    setSearchParams(newParams);
  };

  const handleCityChange = (value: string) => {
    setSelectedCity(value);
    // Update URL
    const newParams = new URLSearchParams(searchParams);
    newParams.set("city", value);
    setSearchParams(newParams);
  };

  const handleDesignerClick = (designer: typeof mockDesigners[0]) => {
    setSelectedDesigner(designer);
    setIsModalOpen(true);
  };

  const clearFilters = () => {
    setSelectedState("");
    setSelectedCity("");
    setSearchQuery("");
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <img 
                src={logoColor} 
                alt="Center Projetos" 
                className="h-10 w-auto"
              />
            </Link>
            <Link to="/">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Voltar
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Encontre seu <span className="text-gradient-gold">Projetista</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Busque projetistas verificados na sua região e confira seus trabalhos
          </p>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-xl border border-border p-4 md:p-6 mb-8 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-accent" />
            <h2 className="font-semibold text-foreground">Filtros</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select value={selectedState} onValueChange={handleStateChange}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o estado" />
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
              onValueChange={handleCityChange}
              disabled={!selectedState}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a cidade" />
              </SelectTrigger>
              <SelectContent>
                {availableCities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome ou loja"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Button 
              variant="outline" 
              onClick={clearFilters}
              className="hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50"
            >
              Limpar Filtros
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            <span className="font-semibold text-foreground">{filteredDesigners.length}</span> projetista{filteredDesigners.length !== 1 ? 's' : ''} encontrado{filteredDesigners.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Designers Grid */}
        {filteredDesigners.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDesigners.map((designer) => (
              <DesignerCard
                key={designer.id}
                designer={designer}
                onClick={() => handleDesignerClick(designer)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Nenhum projetista encontrado
            </h3>
            <p className="text-muted-foreground mb-4">
              Tente ajustar os filtros para encontrar mais resultados
            </p>
            <Button variant="outline" onClick={clearFilters}>
              Limpar Filtros
            </Button>
          </div>
        )}
      </main>

      {/* Designer Detail Modal */}
      <DesignerDetailModal
        designer={selectedDesigner}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default BuscarProjetistas;
