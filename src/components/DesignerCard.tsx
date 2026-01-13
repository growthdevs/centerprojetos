import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Store, Briefcase, Star } from "lucide-react";

interface DesignerCardProps {
  designer: {
    id: string;
    name: string;
    city: string;
    state: string;
    store: string;
    imageUrl?: string;
    projectsCount: number;
    rating: number;
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
        
        <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-2">
          <MapPin className="w-4 h-4 text-accent" />
          <span>{designer.city}, {designer.state}</span>
        </div>
        
        <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-3">
          <Store className="w-4 h-4 text-accent" />
          <span className="line-clamp-1">{designer.store}</span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center gap-1 text-sm">
            <Briefcase className="w-3.5 h-3.5 text-gold" />
            <span className="text-muted-foreground">{designer.projectsCount} projetos</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Star className="w-3.5 h-3.5 text-gold fill-gold" />
            <span className="text-muted-foreground">{designer.rating.toFixed(1)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DesignerCard;