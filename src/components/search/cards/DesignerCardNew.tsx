import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Store, Briefcase, Star, Award, Thermometer } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getMedalInfo, type Designer } from "@/data/mockStores";

interface DesignerCardNewProps {
  designer: Designer;
  onClick: () => void;
}

const DesignerCardNew = ({ designer, onClick }: DesignerCardNewProps) => {
  const medalInfo = getMedalInfo(designer.medal);

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
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className={`absolute top-2 right-2 ${medalInfo.bgColor} backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1 cursor-help`}
                >
                  <span className="text-lg">{medalInfo.emoji}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Medalha {medalInfo.label}</p>
                <p className="text-xs text-muted-foreground">{medalInfo.description}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
          {designer.name}
        </h3>

        <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-2">
          <MapPin className="w-4 h-4 text-accent" />
          <span>
            {designer.city}, {designer.state}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-3">
          <Store className="w-4 h-4 text-accent" />
          <span className="line-clamp-1">{designer.store}</span>
        </div>

        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {designer.bio}
        </p>

        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between pt-2 border-t border-border">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1 text-sm cursor-help">
                  <Briefcase className="w-3.5 h-3.5 text-accent" />
                  <span className="text-muted-foreground">{designer.projectsCount}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Projetos fechados</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1 text-sm cursor-help">
                  <Star className="w-3.5 h-3.5 text-accent fill-accent" />
                  <span className="text-muted-foreground">{designer.serviceRating.toFixed(1)}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Avaliação de atendimento (cliente)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1 text-sm cursor-help">
                  <Thermometer className="w-3.5 h-3.5 text-accent" />
                  <span className="text-muted-foreground">{designer.thermometer}%</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Termômetro Center (avaliação interna)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );
};

export default DesignerCardNew;
