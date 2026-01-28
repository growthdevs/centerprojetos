import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Thermometer } from "lucide-react";

interface ThermometerDisplayProps {
  value: number; // 0-100
  className?: string;
}

const ThermometerDisplay = ({ value, className = "" }: ThermometerDisplayProps) => {
  // Calculate position percentage (value is 0-100)
  const position = Math.min(Math.max(value, 0), 100);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={`p-4 rounded-lg border border-border bg-muted/30 cursor-help ${className}`}>
            <div className="flex items-center gap-2 text-muted-foreground mb-3">
              <Thermometer className="w-4 h-4" />
              <span className="text-sm font-medium">Termômetro Center</span>
            </div>
            
            <div className="space-y-2">
              {/* Thermometer bar */}
              <div className="relative h-6 rounded-full overflow-hidden bg-gradient-to-r from-red-500 via-yellow-400 to-green-500">
                {/* Position indicator */}
                <div 
                  className="absolute top-0 h-full w-1 bg-foreground shadow-lg transition-all duration-300"
                  style={{ left: `calc(${position}% - 2px)` }}
                />
                {/* Value marker */}
                <div 
                  className="absolute -top-1 w-6 h-8 flex items-center justify-center"
                  style={{ left: `calc(${position}% - 12px)` }}
                >
                  <div className="w-4 h-4 bg-foreground rounded-full border-2 border-background shadow-md" />
                </div>
              </div>
              
              {/* Labels */}
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0</span>
                <span className="font-semibold text-foreground text-lg">{value}%</span>
                <span>100</span>
              </div>
            </div>
            
            <p className="text-xs text-muted-foreground mt-2">
              Como a Center avalia o cumprimento de padrões e processos da plataforma.
            </p>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Avaliação interna da Center Plataforma</p>
          <p className="text-xs mt-1">Mede a qualidade do ecossistema</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ThermometerDisplay;
