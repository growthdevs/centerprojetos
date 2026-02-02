import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Star, TrendingUp, Thermometer, Image as ImageIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Store } from "@/data/mockStores";

interface StoreCardProps {
  store: Store;
  onClick: () => void;
}

const StoreCard = ({ store, onClick }: StoreCardProps) => {
  return (
    <Card
      className="cursor-pointer transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 border-border/50 overflow-hidden group"
      onClick={onClick}
    >
      <div className="h-32 bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center overflow-hidden relative">
        {store.imageUrl ? (
          <img
            src={store.imageUrl}
            alt={store.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
            <span className="text-2xl font-bold text-accent">
              {store.name.charAt(0)}
            </span>
          </div>
        )}
        {store.portfolioImages.length > 0 && (
          <div className="absolute bottom-2 right-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1">
            <ImageIcon className="w-3 h-3 text-accent" />
            <span className="text-xs text-foreground font-medium">{store.portfolioImages.length}</span>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-accent transition-colors line-clamp-1">
          {store.name}
        </h3>

        <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-3">
          <MapPin className="w-4 h-4 text-accent" />
          <span>
            {store.city}, {store.state}
          </span>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {store.bio}
        </p>

        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between pt-3 border-t border-border">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="w-3.5 h-3.5 text-accent fill-accent" />
                  <span className="text-muted-foreground">{store.googleRating.toFixed(1)}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Avaliação Google Meu Negócio</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1 text-sm">
                  <Thermometer className="w-3.5 h-3.5 text-accent" />
                  <span className="text-muted-foreground">{store.thermometer}%</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Termômetro Center (avaliação interna)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1 text-sm">
                  <TrendingUp className="w-3.5 h-3.5 text-accent" />
                  <span className="text-muted-foreground">{store.salesCount}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Número de vendas</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );
};

export default StoreCard;
