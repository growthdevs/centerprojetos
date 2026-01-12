import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Store } from "lucide-react";

interface DesignerCardProps {
  designer: {
    id: string;
    name: string;
    city: string;
    state: string;
    stores: string[];
    imageUrl?: string;
  };
  onClick: () => void;
}

const DesignerCard = ({ designer, onClick }: DesignerCardProps) => {
  return (
    <Card 
      className="cursor-pointer transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 border-border/50 overflow-hidden group"
      onClick={onClick}
    >
      <div className="h-40 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center overflow-hidden">
        {designer.imageUrl ? (
          <img 
            src={designer.imageUrl} 
            alt={designer.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-3xl font-bold text-primary">
              {designer.name.charAt(0)}
            </span>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
          {designer.name}
        </h3>
        
        <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-3">
          <MapPin className="w-4 h-4 text-accent" />
          <span>{designer.city}, {designer.state}</span>
        </div>
        
        {designer.stores.length > 0 && (
          <div className="flex items-start gap-1.5 text-muted-foreground text-sm">
            <Store className="w-4 h-4 text-accent mt-0.5 shrink-0" />
            <span className="line-clamp-2">
              {designer.stores.slice(0, 2).join(", ")}
              {designer.stores.length > 2 && ` +${designer.stores.length - 2}`}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DesignerCard;
