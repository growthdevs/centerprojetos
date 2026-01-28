import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MapPin, Star, TrendingUp, Thermometer, Users, ChevronRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Store, Designer } from "@/data/mockStores";

interface StoreDetailModalProps {
  store: Store | null;
  isOpen: boolean;
  onClose: () => void;
  onDesignerSelect: (designer: Designer) => void;
}

const StoreDetailModal = ({
  store,
  isOpen,
  onClose,
  onDesignerSelect,
}: StoreDetailModalProps) => {
  if (!store) return null;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.round(rating) ? "text-accent fill-accent" : "text-muted-foreground"
        }`}
      />
    ));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 left-0 top-0 right-0 bottom-0 max-h-screen overflow-y-auto rounded-none sm:left-[50%] sm:top-[50%] sm:right-auto sm:bottom-auto sm:max-h-[90vh] sm:translate-x-[-50%] sm:translate-y-[-50%] sm:rounded-lg">
        <DialogHeader className="p-6 pb-4 border-b border-border">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-lg bg-accent/10 flex items-center justify-center overflow-hidden shrink-0">
              {store.imageUrl ? (
                <img
                  src={store.imageUrl}
                  alt={store.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-2xl font-bold text-accent">
                  {store.name.charAt(0)}
                </span>
              )}
            </div>
            <div className="flex-1">
              <DialogTitle className="text-xl font-bold text-foreground mb-1">
                {store.name}
              </DialogTitle>
              <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                <MapPin className="w-4 h-4 text-accent" />
                <span>
                  {store.city}, {store.state}
                </span>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="p-6 space-y-6">
          {/* Bio */}
          <p className="text-muted-foreground">{store.bio}</p>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="p-4 rounded-lg border border-border bg-muted/30 cursor-help">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Star className="w-4 h-4" />
                      <span className="text-sm">Google</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-2xl font-bold text-foreground">
                        {store.googleRating.toFixed(1)}
                      </p>
                      <div className="flex">{renderStars(store.googleRating)}</div>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Avaliação do Google Meu Negócio</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="p-4 rounded-lg border border-border bg-muted/30 cursor-help">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Thermometer className="w-4 h-4" />
                      <span className="text-sm">Termômetro</span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-2xl font-bold text-foreground">
                        {store.thermometer}%
                      </p>
                      <Progress value={store.thermometer} className="h-2" />
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Avaliação interna da Center Plataforma</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="p-4 rounded-lg border border-border bg-muted/30 cursor-help">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-sm">Vendas</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">
                      {store.salesCount}
                    </p>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Número total de vendas realizadas</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Designers Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-accent" />
              <h3 className="font-semibold text-foreground">
                Projetistas vinculados ({store.designers.length})
              </h3>
            </div>

            {store.designers.length > 0 ? (
              <div className="space-y-3">
                {store.designers.map((designer) => (
                  <button
                    key={designer.id}
                    className="w-full p-4 rounded-lg border border-border hover:border-accent/50 hover:bg-muted/30 transition-all flex items-center gap-4 text-left group"
                    onClick={() => onDesignerSelect(designer)}
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 overflow-hidden">
                      {designer.imageUrl ? (
                        <img
                          src={designer.imageUrl}
                          alt={designer.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-lg font-bold text-primary">
                          {designer.name.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground group-hover:text-accent transition-colors">
                        {designer.name}
                      </p>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-accent fill-accent" />
                          {designer.serviceRating.toFixed(1)}
                        </span>
                        <span>{designer.projectsCount} projetos</span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm text-center py-6">
                Nenhum projetista vinculado a esta loja
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StoreDetailModal;
