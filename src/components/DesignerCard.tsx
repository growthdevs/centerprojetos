import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Store, Briefcase, Star, Award } from "lucide-react";

type MedalType = "bronze" | "prata" | "ouro" | null;

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
    serviceRating?: number;
    medal?: MedalType;
  };
  onClick: () => void;
}

const getMedalInfo = (medal: MedalType) => {
  switch (medal) {
    case "ouro":
      return { emoji: "🥇", label: "Ouro", color: "text-yellow-500", bgColor: "bg-yellow-500/10" };
    case "prata":
      return { emoji: "🥈", label: "Prata", color: "text-gray-400", bgColor: "bg-gray-400/10" };
    case "bronze":
      return { emoji: "🥉", label: "Bronze", color: "text-amber-600", bgColor: "bg-amber-600/10" };
    default:
      return null;
  }
};

const DesignerCard = ({ designer, onClick }: DesignerCardProps) => {
  const medalInfo = getMedalInfo(designer.medal || null);

  return (
    <Card 
      className="cursor-pointer transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 border-border/50 overflow-hidden group"
      onClick={onClick}
    >
      <div className="h-40 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center overflow-hidden relative">
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
        
        {/* Medal badge on image */}
        {medalInfo && (
          <div className={`absolute top-2 right-2 ${medalInfo.bgColor} backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1`}>
            <span className="text-lg">{medalInfo.emoji}</span>
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

        {/* Medal info inside card */}
        {medalInfo && (
          <div className={`flex items-center gap-2 mb-3 p-2 rounded-lg ${medalInfo.bgColor}`}>
            <Award className={`w-4 h-4 ${medalInfo.color}`} />
            <span className={`text-sm font-medium ${medalInfo.color}`}>
              Medalha {medalInfo.label}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center gap-1 text-sm">
            <Briefcase className="w-3.5 h-3.5 text-accent" />
            <span className="text-muted-foreground">{designer.projectsCount} projetos</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Star className="w-3.5 h-3.5 text-accent fill-accent" />
            <span className="text-muted-foreground">{designer.rating.toFixed(1)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DesignerCard;