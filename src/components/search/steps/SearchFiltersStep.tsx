import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Search, MapPin, SlidersHorizontal, Store } from "lucide-react";
import logoColor from "@/assets/logo-color.png";
import { states, citiesByState } from "@/data/locations";
import { getStoresByLocation } from "@/data/mockStores";
import type { SearchType } from "../SearchWizard";

interface SearchFiltersStepProps {
  searchType: SearchType;
  filters: {
    state: string;
    city: string;
    query: string;
    sortBy: "rating" | "sales";
  };
  onFiltersChange: (filters: SearchFiltersStepProps["filters"]) => void;
  onSearch: (filters: SearchFiltersStepProps["filters"]) => void;
  onBack: () => void;
}

const SearchFiltersStep = ({
  searchType,
  filters,
  onFiltersChange,
  onSearch,
  onBack,
}: SearchFiltersStepProps) => {
  const availableCities = filters.state ? citiesByState[filters.state] || [] : [];

  // Get stores for the selected location (only for store search)
  const availableStores = useMemo(() => {
    if (searchType !== "lojas" || !filters.state) return [];
    return getStoresByLocation(filters.state, filters.city || undefined);
  }, [searchType, filters.state, filters.city]);

  const handleStateChange = (value: string) => {
    onFiltersChange({ ...filters, state: value, city: "", query: "" });
  };

  const handleCityChange = (value: string) => {
    onFiltersChange({ ...filters, city: value, query: "" });
  };

  const handleStoreSelect = (storeId: string) => {
    const store = availableStores.find(s => s.id === storeId);
    if (store) {
      onFiltersChange({ ...filters, query: store.name });
    }
  };

  const canSearch = filters.state || filters.city || filters.query.trim();

  // For stores, show select after location is chosen
  const showStoreSelect = searchType === "lojas" && filters.state;

  return (
    <div className="fixed inset-0 bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <img src={logoColor} alt="Center Projetos" className="h-10 w-auto" />
            <Button variant="ghost" onClick={onBack} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center overflow-y-auto max-w-lg">
        <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6">
          <SlidersHorizontal className="w-8 h-8 text-accent" />
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-2 text-center">
          Filtrar {searchType === "lojas" ? "Lojas" : "Projetistas"}
        </h1>
        <p className="text-muted-foreground text-center mb-8">
          Defina os critérios da sua busca
        </p>

        <div className="w-full space-y-4">
          {/* Region Filters */}
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <MapPin className="w-4 h-4 text-accent" />
            Região
          </div>

          <Select value={filters.state} onValueChange={handleStateChange}>
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
            value={filters.city}
            onValueChange={handleCityChange}
            disabled={!filters.state}
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

          {/* Store Select (only for store search after location selected) */}
          {showStoreSelect && (
            <div className="pt-4">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                <Store className="w-4 h-4 text-accent" />
                Buscar Loja
              </div>
              {availableStores.length > 0 ? (
                <Select
                  value={availableStores.find(s => s.name === filters.query)?.id || ""}
                  onValueChange={handleStoreSelect}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma loja" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableStores.map((store) => (
                      <SelectItem key={store.id} value={store.id}>
                        {store.name} - {store.city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-sm text-muted-foreground py-2">
                  Nenhuma loja encontrada nesta região
                </p>
              )}
            </div>
          )}

          {/* Search Query (only for projetistas) */}
          {searchType === "projetistas" && (
            <div className="pt-4">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                <Search className="w-4 h-4 text-accent" />
                Busca por nome
              </div>
              <Input
                placeholder="Buscar projetista por nome"
                value={filters.query}
                onChange={(e) => onFiltersChange({ ...filters, query: e.target.value })}
              />
            </div>
          )}

          {/* Sort By */}
          <div className="pt-4">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
              <SlidersHorizontal className="w-4 h-4 text-accent" />
              Ordenar por
            </div>
            <Select
              value={filters.sortBy}
              onValueChange={(value: "rating" | "sales") =>
                onFiltersChange({ ...filters, sortBy: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">
                  Avaliação ({searchType === "lojas" ? "Google" : "Atendimento"})
                </SelectItem>
                <SelectItem value="sales">
                  Número de {searchType === "lojas" ? "vendas" : "projetos"}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          variant="accent"
          size="lg"
          className="w-full mt-8"
          disabled={!canSearch}
          onClick={() => onSearch(filters)}
        >
          <Search className="w-4 h-4 mr-2" />
          Buscar
        </Button>
      </main>
    </div>
  );
};

export default SearchFiltersStep;
