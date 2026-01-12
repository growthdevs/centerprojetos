import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Store, ArrowRight, X } from "lucide-react";
import { useState } from "react";

interface Designer {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  city: string;
  state: string;
  stores: string[];
  portfolioImages: string[];
  imageUrl?: string;
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
    window.open(`https://wa.me/${designer.whatsapp.replace(/\D/g, '')}?text=${message}`, '_blank');
  };

  const handleEmailClick = () => {
    window.open(`mailto:${designer.email}?subject=Solicitação de Orçamento - Center Projetos`, '_blank');
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
            {/* Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={handleEmailClick}
                className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-accent hover:bg-accent/5 transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <div className="text-left">
                  <p className="text-sm text-muted-foreground">E-mail</p>
                  <p className="font-medium text-foreground group-hover:text-accent transition-colors">
                    {designer.email}
                  </p>
                </div>
              </button>

              <button
                onClick={handleWhatsAppClick}
                className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-green-500 hover:bg-green-500/5 transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-green-500" />
                </div>
                <div className="text-left">
                  <p className="text-sm text-muted-foreground">WhatsApp</p>
                  <p className="font-medium text-foreground group-hover:text-green-500 transition-colors">
                    {designer.whatsapp}
                  </p>
                </div>
              </button>
            </div>

            {/* Stores */}
            {designer.stores.length > 0 && (
              <div>
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Store className="w-4 h-4 text-accent" />
                  Lojas onde atua
                </h4>
                <div className="flex flex-wrap gap-2">
                  {designer.stores.map((store, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1.5 bg-muted rounded-full text-sm text-muted-foreground"
                    >
                      {store}
                    </span>
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
