import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MapPin, Store, ArrowRight, X, Briefcase, Star, MessageSquare } from "lucide-react";
import { useState } from "react";

interface Designer {
  id: string;
  name: string;
  city: string;
  state: string;
  store: string;
  portfolioImages: string[];
  imageUrl?: string;
  projectsCount: number;
  rating: number;
  storeRating: number;
  reviews: {
    author: string;
    comment: string;
    date: string;
    rating: number;
  }[];
}

interface DesignerDetailModalProps {
  designer: Designer | null;
  isOpen: boolean;
  onClose: () => void;
}

const DesignerDetailModal = ({ designer, isOpen, onClose }: DesignerDetailModalProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!designer) return null;

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(`Olá ${designer.name}, encontrei seu perfil na Center Projetos e gostaria de solicitar um orçamento.`);
    window.open(`https://wa.me/5511999999999?text=${message}`, '_blank');
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'text-gold fill-gold' : 'text-muted-foreground'}`} 
      />
    ));
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
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
                  <span>{designer.city}, {designer.state}</span>
                </div>
              </div>
            </div>
          </DialogHeader>

          <div className="p-6 space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg border border-border bg-muted/30">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Briefcase className="w-4 h-4" />
                  <span className="text-sm">Projetos Realizados</span>
                </div>
                <p className="text-2xl font-bold text-foreground">{designer.projectsCount}</p>
              </div>

              <div className="p-4 rounded-lg border border-border bg-muted/30">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Star className="w-4 h-4" />
                  <span className="text-sm">Avaliação do Atendimento</span>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-foreground">{designer.rating.toFixed(1)}</p>
                  <div className="flex">{renderStars(Math.round(designer.rating))}</div>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-border bg-muted/30">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Store className="w-4 h-4" />
                  <span className="text-sm">Nota da Loja</span>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-foreground">{designer.storeRating.toFixed(1)}</p>
                  <div className="flex">{renderStars(Math.round(designer.storeRating))}</div>
                </div>
              </div>
            </div>

            {/* Store */}
            <div>
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
                        <span className="font-medium text-foreground">{review.author}</span>
                        <div className="flex items-center gap-2">
                          <div className="flex">{renderStars(review.rating)}</div>
                          <span className="text-xs text-muted-foreground">{review.date}</span>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Portfolio */}
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

            {/* CTA Button */}
            <div className="pt-4 border-t border-border">
              <Button 
                variant="gold"
                size="lg"
                className="w-full font-semibold text-lg group"
                onClick={handleWhatsAppClick}
              >
                Solicitar Serviços
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
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

export default DesignerDetailModal;