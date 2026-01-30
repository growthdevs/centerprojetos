import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { mockDesigners, getMedalInfo } from "@/data/mockStores";
import ThermometerDisplay from "@/components/search/ThermometerDisplay";
import {
  User,
  Edit2,
  Save,
  X,
  Image,
  Star,
  MessageSquare,
  Thermometer,
  Plus,
  Trash2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock current designer data (would come from auth in real app)
const currentDesigner = mockDesigners[0];

const ProjetistaPerfil = () => {
  const { isAuthenticated, userType, userName } = useAuth();
  const { toast } = useToast();

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingCard, setIsEditingCard] = useState(false);

  const [profileForm, setProfileForm] = useState({
    name: userName || currentDesigner.name,
    email: "projetista@email.com",
    phone: "(11) 99999-8888",
    city: currentDesigner.city,
    state: currentDesigner.state,
  });

  const [cardForm, setCardForm] = useState({
    bio: currentDesigner.bio,
    portfolioImages: [...currentDesigner.portfolioImages],
  });

  if (!isAuthenticated || userType !== "designer") {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-32 pb-20 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Acesso Restrito</h1>
          <p className="text-muted-foreground">Faça login como projetista para acessar o perfil.</p>
        </div>
        <Footer />
      </div>
    );
  }

  const medalInfo = getMedalInfo(currentDesigner.medal);

  const handleSaveProfile = () => {
    setIsEditingProfile(false);
    toast({
      title: "Perfil atualizado!",
      description: "Suas informações foram salvas com sucesso.",
    });
  };

  const handleSaveCard = () => {
    setIsEditingCard(false);
    toast({
      title: "Card atualizado!",
      description: "As informações do seu card foram salvas.",
    });
  };

  const handleRemoveImage = (index: number) => {
    setCardForm((prev) => ({
      ...prev,
      portfolioImages: prev.portfolioImages.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 pt-28 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Meu Perfil</h1>
            <p className="text-muted-foreground">Gerencie suas informações e card de projetista</p>
          </div>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="profile">Dados Pessoais</TabsTrigger>
              <TabsTrigger value="card">Meu Card</TabsTrigger>
              <TabsTrigger value="reviews">Avaliações</TabsTrigger>
              <TabsTrigger value="ratings">Métricas</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Informações Pessoais
                  </CardTitle>
                  {!isEditingProfile ? (
                    <Button variant="ghost" size="sm" onClick={() => setIsEditingProfile(true)}>
                      <Edit2 className="w-4 h-4 mr-2" />
                      Editar
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsEditingProfile(false)}
                      >
                        <X className="w-4 h-4 mr-2" />
                        Cancelar
                      </Button>
                      <Button variant="accent" size="sm" onClick={handleSaveProfile}>
                        <Save className="w-4 h-4 mr-2" />
                        Salvar
                      </Button>
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  {isEditingProfile ? (
                    <div className="grid gap-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-foreground mb-1 block">
                            Nome
                          </label>
                          <Input
                            value={profileForm.name}
                            onChange={(e) =>
                              setProfileForm({ ...profileForm, name: e.target.value })
                            }
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-foreground mb-1 block">
                            E-mail
                          </label>
                          <Input
                            type="email"
                            value={profileForm.email}
                            onChange={(e) =>
                              setProfileForm({ ...profileForm, email: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <label className="text-sm font-medium text-foreground mb-1 block">
                            Telefone
                          </label>
                          <Input
                            value={profileForm.phone}
                            onChange={(e) =>
                              setProfileForm({ ...profileForm, phone: e.target.value })
                            }
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-foreground mb-1 block">
                            Cidade
                          </label>
                          <Input
                            value={profileForm.city}
                            onChange={(e) =>
                              setProfileForm({ ...profileForm, city: e.target.value })
                            }
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-foreground mb-1 block">
                            Estado
                          </label>
                          <Input
                            value={profileForm.state}
                            onChange={(e) =>
                              setProfileForm({ ...profileForm, state: e.target.value })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Nome</p>
                          <p className="font-medium text-foreground">{profileForm.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">E-mail</p>
                          <p className="font-medium text-foreground">{profileForm.email}</p>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Telefone</p>
                          <p className="font-medium text-foreground">{profileForm.phone}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Cidade</p>
                          <p className="font-medium text-foreground">{profileForm.city}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Estado</p>
                          <p className="font-medium text-foreground">{profileForm.state}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Card Tab */}
            <TabsContent value="card">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Image className="w-5 h-5" />
                    Dados do Card
                  </CardTitle>
                  {!isEditingCard ? (
                    <Button variant="ghost" size="sm" onClick={() => setIsEditingCard(true)}>
                      <Edit2 className="w-4 h-4 mr-2" />
                      Editar
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => setIsEditingCard(false)}>
                        <X className="w-4 h-4 mr-2" />
                        Cancelar
                      </Button>
                      <Button variant="accent" size="sm" onClick={handleSaveCard}>
                        <Save className="w-4 h-4 mr-2" />
                        Salvar
                      </Button>
                    </div>
                  )}
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Bio */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Biografia
                    </label>
                    {isEditingCard ? (
                      <Textarea
                        value={cardForm.bio}
                        onChange={(e) => setCardForm({ ...cardForm, bio: e.target.value })}
                        rows={4}
                        placeholder="Descreva sua experiência e especialidades..."
                      />
                    ) : (
                      <p className="text-muted-foreground bg-muted/50 p-3 rounded-lg">
                        {cardForm.bio}
                      </p>
                    )}
                  </div>

                  {/* Portfolio Images */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-foreground">
                        Fotos do Portfólio ({cardForm.portfolioImages.length}/10)
                      </label>
                      {isEditingCard && cardForm.portfolioImages.length < 10 && (
                        <Button variant="outline" size="sm">
                          <Plus className="w-4 h-4 mr-2" />
                          Adicionar Foto
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      {cardForm.portfolioImages.map((img, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={img}
                            alt={`Projeto ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          {isEditingCard && (
                            <button
                              onClick={() => handleRemoveImage(index)}
                              className="absolute top-1 right-1 bg-destructive text-destructive-foreground p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Comentários de Clientes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {currentDesigner.reviews.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      Você ainda não recebeu avaliações.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {currentDesigner.reviews.map((review, index) => (
                        <div key={index} className="bg-muted/50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-medium text-foreground">{review.author}</p>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                              <span className="text-sm font-medium">{review.rating.toFixed(1)}</span>
                            </div>
                          </div>
                          <p className="text-muted-foreground text-sm">{review.comment}</p>
                          <p className="text-xs text-muted-foreground mt-2">{review.date}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Ratings Tab */}
            <TabsContent value="ratings">
              <div className="space-y-6">
                {/* Thermometer */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Thermometer className="w-5 h-5" />
                      Termômetro Center
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ThermometerDisplay value={currentDesigner.thermometer} />
                    <p className="text-sm text-muted-foreground mt-4 text-center">
                      O Termômetro Center é uma métrica interna que reflete sua performance geral na
                      plataforma.
                    </p>
                  </CardContent>
                </Card>

                {/* Service Rating */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="w-5 h-5" />
                      Avaliação de Atendimento
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <div className="text-4xl font-bold text-foreground">
                        {currentDesigner.serviceRating.toFixed(1)}
                      </div>
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-6 h-6 ${
                              star <= currentDesigner.serviceRating
                                ? "text-yellow-500 fill-yellow-500"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Baseado em {currentDesigner.projectsCount} projetos finalizados
                    </p>
                  </CardContent>
                </Card>

                {/* Medal */}
                {medalInfo && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Medalha de Desempenho</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4">
                        <div
                          className={`text-5xl w-16 h-16 flex items-center justify-center rounded-full ${medalInfo.bgColor}`}
                        >
                          {medalInfo.emoji}
                        </div>
                        <div>
                          <p className={`text-xl font-bold ${medalInfo.color}`}>
                            Medalha {medalInfo.label}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {medalInfo.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProjetistaPerfil;
