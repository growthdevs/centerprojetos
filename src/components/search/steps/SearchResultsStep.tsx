import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, X, Store, User } from "lucide-react";
import logoColor from "@/assets/logo-color.png";
import { mockStores, mockDesigners, type Store as StoreType, type Designer } from "@/data/mockStores";
import StoreCard from "../cards/StoreCard";
import DesignerCardNew from "../cards/DesignerCardNew";
import StoreDetailModal from "../modals/StoreDetailModal";
import DesignerDetailModalNew from "../modals/DesignerDetailModalNew";
import type { SearchType } from "../SearchWizard";

interface SearchResultsStepProps {
  searchType: SearchType;
  filters: {
    state: string;
    city: string;
    query: string;
    sortBy: "rating" | "sales";
  };
  onBack: () => void;
  onClose: () => void;
}

const SearchResultsStep = ({
  searchType,
  filters,
  onBack,
  onClose,
}: SearchResultsStepProps) => {
  const [selectedStore, setSelectedStore] = useState<StoreType | null>(null);
  const [selectedDesigner, setSelectedDesigner] = useState<Designer | null>(null);

  const filteredResults = useMemo(() => {
    if (searchType === "lojas") {
      let results = mockStores.filter((store) => {
        const matchesState = !filters.state || store.state === filters.state;
        const matchesCity = !filters.city || store.city === filters.city;
        const matchesQuery =
          !filters.query ||
          store.name.toLowerCase().includes(filters.query.toLowerCase());
        return matchesState && matchesCity && matchesQuery;
      });

      // Sort
      if (filters.sortBy === "rating") {
        results.sort((a, b) => b.googleRating - a.googleRating);
      } else {
        results.sort((a, b) => b.salesCount - a.salesCount);
      }

      return results;
    } else {
      let results = mockDesigners.filter((designer) => {
        const matchesState = !filters.state || designer.state === filters.state;
        const matchesCity = !filters.city || designer.city === filters.city;
        const matchesQuery =
          !filters.query ||
          designer.name.toLowerCase().includes(filters.query.toLowerCase()) ||
          designer.store.toLowerCase().includes(filters.query.toLowerCase());
        return matchesState && matchesCity && matchesQuery;
      });

      // Sort
      if (filters.sortBy === "rating") {
        results.sort((a, b) => b.serviceRating - a.serviceRating);
      } else {
        results.sort((a, b) => b.projectsCount - a.projectsCount);
      }

      return results;
    }
  }, [searchType, filters]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <img src={logoColor} alt="Center Projetos" className="h-10 w-auto" />
            <div className="flex items-center gap-2">
              <Button variant="ghost" onClick={onBack} className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Filtros</span>
              </Button>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            {searchType === "lojas" ? (
              <Store className="w-5 h-5 text-accent" />
            ) : (
              <User className="w-5 h-5 text-accent" />
            )}
            <h1 className="text-xl font-bold text-foreground">
              {searchType === "lojas" ? "Lojas" : "Projetistas"}
            </h1>
          </div>
          <span className="text-sm text-muted-foreground">
            {filteredResults.length} resultado{filteredResults.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Active Filters */}
        {(filters.state || filters.city || filters.query) && (
          <div className="flex flex-wrap gap-2 mb-6">
            {filters.state && (
              <span className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full">
                {filters.state}
              </span>
            )}
            {filters.city && (
              <span className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full">
                {filters.city}
              </span>
            )}
            {filters.query && (
              <span className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full">
                "{filters.query}"
              </span>
            )}
          </div>
        )}

        {/* Results Grid */}
        {filteredResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {searchType === "lojas"
              ? (filteredResults as StoreType[]).map((store) => (
                  <StoreCard
                    key={store.id}
                    store={store}
                    onClick={() => setSelectedStore(store)}
                  />
                ))
              : (filteredResults as Designer[]).map((designer) => (
                  <DesignerCardNew
                    key={designer.id}
                    designer={designer}
                    onClick={() => setSelectedDesigner(designer)}
                  />
                ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              {searchType === "lojas" ? (
                <Store className="w-10 h-10 text-muted-foreground" />
              ) : (
                <User className="w-10 h-10 text-muted-foreground" />
              )}
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Nenhum resultado encontrado
            </h3>
            <p className="text-muted-foreground mb-4">
              Tente ajustar os filtros para encontrar mais resultados
            </p>
            <Button variant="outline" onClick={onBack}>
              Alterar Filtros
            </Button>
          </div>
        )}
      </main>

      {/* Modals */}
      <StoreDetailModal
        store={selectedStore}
        isOpen={!!selectedStore}
        onClose={() => setSelectedStore(null)}
        onDesignerSelect={setSelectedDesigner}
      />

      <DesignerDetailModalNew
        designer={selectedDesigner}
        isOpen={!!selectedDesigner}
        onClose={() => setSelectedDesigner(null)}
      />
    </div>
  );
};

export default SearchResultsStep;
