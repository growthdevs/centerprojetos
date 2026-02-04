import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Store,
  X,
  Briefcase,
  Star,
  MessageSquare,
  Award,
  CheckCircle,
  XCircle,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ThermometerDisplay from "../ThermometerDisplay";
import { getMedalInfo, type Designer } from "@/data/mockStores";

interface DesignerDetailModalShopownerProps {
  designer: (Designer & { isActive?: boolean }) | null;
  isOpen: boolean;
  onClose: () => void;
}

const DesignerDetailModalShopowner = ({
  designer,
  isOpen,
  onClose,
}: DesignerDetailModalShopownerProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!designer) return null;

  const medalInfo = getMedalInfo(designer.medal);
  const isActive = designer.isActive ?? true;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-accent fill-accent" : "text-muted-foreground"
        }`}
      />
    ));
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl w-[95vw] p-0 left-0 top-0 right-0 bottom-0 max-h-screen overflow-y-auto rounded-none sm:left-[50%] sm:top-[50%] sm:right-auto sm:bottom-auto sm:max-h-[85vh] sm:min-h-[650px] sm:translate-x-[-50%] sm:translate-y-[-50%] sm:rounded-lg">
          <DialogHeader className="p-6 pb-4 border-b border-border">
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden shrink-0">
                {designer.imageUrl ? (
                  <img
                    src={designer.imageUrl}
                    alt={designer.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-3xl font-bold text-primary">
                    {designer.name.charAt(0)}
                  </span>
                )}
              </div>
              <div className="flex-1">
                <DialogTitle className="text-2xl font-bold text-foreground mb-2">
                  {designer.name}
                </DialogTitle>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <MapPin className="w-4 h-4 text-accent" />
                  <span>
                    {designer.city}, {designer.state}
                  </span>
                </div>
              </div>
            </div>
          </DialogHeader>

          <div className="p-6 space-y-6">
            {/* Subscription Status Block */}
            <div className={`p-4 rounded-lg border ${isActive ? 'border-green-200 bg-green-500/10' : 'border-red-200 bg-red-500/10'}`}>
              <div className="flex items-center gap-3">
                {isActive ? (
                  <CheckCircle className="w-6 h-6 text-green-600" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-600" />
                )}
                <div>
                  <p className={`font-semibold ${isActive ? 'text-green-700' : 'text-red-700'}`}>
                    {isActive ? 'Assinatura Ativa' : 'Assinatura Inativa'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {isActive 
                      ? 'Este projetista está com a assinatura Center Projetos em dia.' 
                      : 'Este projetista está com a assinatura Center Projetos pendente.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Bio */}
            <p className="text-muted-foreground">{designer.bio}</p>

            {/* Stats Grid - 2x2 layout */}
            <div className="grid grid-cols-2 gap-4">
              {/* Projetos */}
              <div className="p-4 rounded-lg border border-border bg-muted/30">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Briefcase className="w-4 h-4" />
                  <span className="text-sm">Projetos</span>
                </div>
                <p className="text-2xl font-bold text-foreground">
                  {designer.projectsCount}
                </p>
              </div>

              {/* Atendimento */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="p-4 rounded-lg border border-border bg-muted/30 cursor-help">
                      <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <Star className="w-4 h-4" />
                        <span className="text-sm">Atendimento</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-2xl font-bold text-foreground">
                          {designer.serviceRating.toFixed(1)}
                        </p>
                        <div className="flex">
                          {renderStars(Math.round(designer.serviceRating))}
                        </div>
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Avaliação feita pelo cliente após a vistoria</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {/* Loja (Google) */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="p-4 rounded-lg border border-border bg-muted/30 cursor-help col-span-2 sm:col-span-1">
                      <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <Store className="w-4 h-4" />
                        <span className="text-sm">Loja (Google)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-2xl font-bold text-foreground">
                          {designer.storeRating.toFixed(1)}
                        </p>
                        <div className="flex">
                          {renderStars(Math.round(designer.storeRating))}
                        </div>
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Avaliação da loja no Google Meu Negócio</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {/* Store name on mobile */}
              <div className="p-4 rounded-lg border border-border bg-muted/30 col-span-2 sm:col-span-1 sm:hidden">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Store className="w-4 h-4" />
                  <span className="text-sm">Loja onde atua</span>
                </div>
                <p className="text-lg font-semibold text-foreground">
                  {designer.store}
                </p>
              </div>
            </div>

            {/* Thermometer - Full width */}
            <ThermometerDisplay value={designer.thermometer} />

            {/* Medal Section */}
            {medalInfo && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="p-4 rounded-lg border border-border bg-muted/30 cursor-help">
                      <div className="flex items-center gap-2 text-muted-foreground mb-2">
                        <Award className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          Medalha de Desempenho
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-4xl">{medalInfo.emoji}</span>
                        <div>
                          <p className={`text-xl font-bold ${medalInfo.color}`}>
                            {medalInfo.label}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {medalInfo.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Medalha baseada no número de projetos fechados</p>
                    <ul className="text-xs mt-1 space-y-0.5">
                      <li>🥉 Bronze: 0-10 projetos</li>
                      <li>🥈 Prata: 11-25 projetos</li>
                      <li>🥇 Ouro: 26-50 projetos</li>
                      <li>💎 Platinum: 51-100 projetos</li>
                    </ul>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

            {/* Store - Desktop only */}
            <div className="hidden sm:block">
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Store className="w-4 h-4 text-accent" />
                Loja onde atua
              </h4>
              <span className="px-3 py-1.5 bg-muted rounded-full text-sm text-muted-foreground">
                {designer.store}
              </span>
            </div>

            {/* Reviews */}
            {designer.reviews.length > 0 && (
              <div>
                <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-accent" />
                  Comentários de Clientes
                </h4>
                <div className="space-y-3">
                  {designer.reviews.map((review, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg border border-border bg-muted/20"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-foreground">
                          {review.author}
                        </span>
                        <div className="flex items-center gap-2">
                          <div className="flex">{renderStars(review.rating)}</div>
                          <span className="text-xs text-muted-foreground">
                            {review.date}
                          </span>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Portfolio */}
            {designer.portfolioImages.length > 0 && (
              <div>
                <h4 className="font-semibold text-foreground mb-4">
                  Portfólio de Trabalhos
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {designer.portfolioImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(image)}
                      className="aspect-square rounded-lg overflow-hidden border border-border hover:border-accent transition-all hover:shadow-lg"
                    >
                      <img
                        src={image}
                        alt={`Trabalho ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Image Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={selectedImage}
            alt="Trabalho ampliado"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
          />
        </div>
      )}
    </>
  );
};

export default DesignerDetailModalShopowner;
