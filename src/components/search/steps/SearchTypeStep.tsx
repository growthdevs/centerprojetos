import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Store, User, ArrowRight } from "lucide-react";
import logoColor from "@/assets/logo-color.png";
import type { SearchType } from "../SearchWizard";

interface SearchTypeStepProps {
  onSelect: (type: SearchType) => void;
  onBack: () => void;
}

const SearchTypeStep = ({ onSelect, onBack }: SearchTypeStepProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
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
      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center overflow-y-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Como deseja buscar?
          </h1>
          <p className="text-muted-foreground">
            Escolha buscar por loja ou diretamente por profissional
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl w-full">
          {/* Search by Store */}
          <Card
            className="p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-accent/50 border-border group"
            onClick={() => onSelect("lojas")}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <Store className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Buscar por Lojas</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Encontre lojas parceiras e depois escolha um projetista vinculado
              </p>
              <div className="flex items-center text-accent font-medium text-sm group-hover:gap-2 transition-all">
                Selecionar
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Card>

          {/* Search by Designer */}
          <Card
            className="p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-accent/50 border-border group"
            onClick={() => onSelect("projetistas")}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <User className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Buscar por Projetistas</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Encontre diretamente profissionais com base em avaliações e portfólio
              </p>
              <div className="flex items-center text-accent font-medium text-sm group-hover:gap-2 transition-all">
                Selecionar
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default SearchTypeStep;
