import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
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

// Mock data - will be replaced with real data from backend
const mockDesigners = [
  {
    id: "1",
    name: "Maria Silva",
    email: "maria.silva@email.com",
    whatsapp: "(11) 99999-1234",
    city: "São Paulo",
    state: "SP",
    stores: ["Todeschini", "Dell Anno", "SCA"],
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
  },
  {
    id: "2",
    name: "João Santos",
    email: "joao.santos@email.com",
    whatsapp: "(11) 98888-5678",
    city: "Campinas",
    state: "SP",
    stores: ["Florense", "Ornare"],
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
  },
  {
    id: "3",
    name: "Ana Oliveira",
    email: "ana.oliveira@email.com",
    whatsapp: "(21) 97777-9012",
    city: "Rio de Janeiro",
    state: "RJ",
    stores: ["Formaplas", "Kitchens"],
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
  },
  {
    id: "4",
    name: "Carlos Ferreira",
    email: "carlos.ferreira@email.com",
    whatsapp: "(31) 96666-3456",
    city: "Belo Horizonte",
    state: "MG",
    stores: ["Bertolini", "Italínea", "Madesa"],
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
  },
  {
    id: "5",
    name: "Patricia Lima",
    email: "patricia.lima@email.com",
    whatsapp: "(41) 95555-7890",
    city: "Curitiba",
    state: "PR",
    stores: ["Favorita", "Criare"],
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
  },
  {
    id: "6",
    name: "Roberto Almeida",
    email: "roberto.almeida@email.com",
    whatsapp: "(51) 94444-1234",
    city: "Porto Alegre",
    state: "RS",
    stores: ["Linea", "Rimo"],
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
  },
];

const states = [
  { value: "SP", label: "São Paulo" },
  { value: "RJ", label: "Rio de Janeiro" },
  { value: "MG", label: "Minas Gerais" },
  { value: "PR", label: "Paraná" },
  { value: "RS", label: "Rio Grande do Sul" },
];

const citiesByState: Record<string, string[]> = {
  SP: ["São Paulo", "Campinas", "Santos", "Ribeirão Preto"],
  RJ: ["Rio de Janeiro", "Niterói", "Petrópolis"],
  MG: ["Belo Horizonte", "Uberlândia", "Contagem"],
  PR: ["Curitiba", "Londrina", "Maringá"],
  RS: ["Porto Alegre", "Caxias do Sul", "Pelotas"],
};

const BuscarProjetistas = () => {
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDesigner, setSelectedDesigner] = useState<typeof mockDesigners[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const availableCities = selectedState ? citiesByState[selectedState] || [] : [];

  const filteredDesigners = useMemo(() => {
    return mockDesigners.filter((designer) => {
      const matchesState = !selectedState || designer.state === selectedState;
      const matchesCity = !selectedCity || designer.city === selectedCity;
      const matchesSearch = !searchQuery || 
        designer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        designer.stores.some(store => store.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesState && matchesCity && matchesSearch;
    });
  }, [selectedState, selectedCity, searchQuery]);

  const handleStateChange = (value: string) => {
    setSelectedState(value);
    setSelectedCity("");
  };

  const handleDesignerClick = (designer: typeof mockDesigners[0]) => {
    setSelectedDesigner(designer);
    setIsModalOpen(true);
  };

  const clearFilters = () => {
    setSelectedState("");
    setSelectedCity("");
    setSearchQuery("");
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
              onValueChange={setSelectedCity}
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
