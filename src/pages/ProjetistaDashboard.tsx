import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Image as ImageIcon, 
  Store, 
  Mail, 
  Phone, 
  MapPin, 
  Award,
  Plus,
  Trash2,
  Save,
  LogOut
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Mock data - será substituído por dados do banco
const mockDesignerData = {
  id: "CP001",
  name: "Maria Silva",
  email: "maria.silva@email.com",
  whatsapp: "(11) 99999-1234",
  city: "São Paulo",
  state: "SP",
  bio: "Projetista com mais de 10 anos de experiência em móveis planejados, especializada em cozinhas e closets.",
  stores: ["Loja Design SP", "Móveis Planejados ABC"],
  medals: ["Ouro", "5 Estrelas"],
  portfolioImages: [
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400",
  ]
};

const ProjetistaDashboard = () => {
  const [designer, setDesigner] = useState(mockDesignerData);
  const [newStore, setNewStore] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setDesigner(prev => ({ ...prev, [field]: value }));
  };

  const handleAddStore = () => {
    if (newStore.trim()) {
      setDesigner(prev => ({
        ...prev,
        stores: [...prev.stores, newStore.trim()]
      }));
      setNewStore("");
    }
  };

  const handleRemoveStore = (index: number) => {
    setDesigner(prev => ({
      ...prev,
      stores: prev.stores.filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // TODO: Implementar salvamento no banco de dados
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  const handleRemoveImage = (index: number) => {
    setDesigner(prev => ({
      ...prev,
      portfolioImages: prev.portfolioImages.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Olá, <span className="text-gold">{designer.name}</span>
              </h1>
              <p className="text-muted-foreground mt-1">
                Gerencie suas informações e portfólio
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="border-gold text-gold">
                Código: {designer.id}
              </Badge>
              {designer.medals.map((medal, index) => (
                <Badge key={index} className="bg-gold/10 text-gold border-0">
                  <Award className="w-3 h-3 mr-1" />
                  {medal}
                </Badge>
              ))}
            </div>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="bg-card border">
              <TabsTrigger value="profile" className="data-[state=active]:bg-gold data-[state=active]:text-primary">
                <User className="w-4 h-4 mr-2" />
                Perfil
              </TabsTrigger>
              <TabsTrigger value="portfolio" className="data-[state=active]:bg-gold data-[state=active]:text-primary">
                <ImageIcon className="w-4 h-4 mr-2" />
                Portfólio
              </TabsTrigger>
              <TabsTrigger value="stores" className="data-[state=active]:bg-gold data-[state=active]:text-primary">
                <Store className="w-4 h-4 mr-2" />
                Lojas
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Informações Pessoais</CardTitle>
                  <CardDescription>
                    Estas informações serão exibidas para os clientes quando visualizarem seu perfil.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Nome Completo</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input 
                          value={designer.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">E-mail</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input 
                          type="email"
                          value={designer.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">WhatsApp</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input 
                          value={designer.whatsapp}
                          onChange={(e) => handleInputChange("whatsapp", e.target.value)}
                          className="pl-10"
                          placeholder="(00) 00000-0000"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Localização</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input 
                          value={`${designer.city}, ${designer.state}`}
                          onChange={(e) => {
                            const [city, state] = e.target.value.split(", ");
                            handleInputChange("city", city || "");
                            handleInputChange("state", state || "");
                          }}
                          className="pl-10"
                          placeholder="Cidade, Estado"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Sobre Você</label>
                    <Textarea 
                      value={designer.bio}
                      onChange={(e) => handleInputChange("bio", e.target.value)}
                      placeholder="Conte um pouco sobre sua experiência e especialidades..."
                      rows={4}
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button 
                      onClick={handleSave}
                      disabled={isSaving}
                      className="bg-gold hover:bg-gold-light text-primary"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {isSaving ? "Salvando..." : "Salvar Alterações"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Portfolio Tab */}
            <TabsContent value="portfolio">
              <Card>
                <CardHeader>
                  <CardTitle>Meu Portfólio</CardTitle>
                  <CardDescription>
                    Adicione até 10 imagens dos seus melhores trabalhos. Estas imagens serão exibidas quando clientes visualizarem seu perfil.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
                    {designer.portfolioImages.map((image, index) => (
                      <div key={index} className="relative group aspect-square rounded-lg overflow-hidden border border-border">
                        <img 
                          src={image} 
                          alt={`Trabalho ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-2 right-2 p-1.5 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    
                    {designer.portfolioImages.length < 10 && (
                      <button className="aspect-square rounded-lg border-2 border-dashed border-border hover:border-gold/50 flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-gold transition-colors">
                        <Plus className="w-8 h-8" />
                        <span className="text-xs">Adicionar</span>
                      </button>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground">
                    {designer.portfolioImages.length}/10 imagens adicionadas
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Stores Tab */}
            <TabsContent value="stores">
              <Card>
                <CardHeader>
                  <CardTitle>Lojas Parceiras</CardTitle>
                  <CardDescription>
                    Adicione as lojas onde você atua ou já trabalhou. Isto ajuda os clientes a encontrarem você.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex gap-3">
                    <Input 
                      value={newStore}
                      onChange={(e) => setNewStore(e.target.value)}
                      placeholder="Nome da loja..."
                      onKeyDown={(e) => e.key === "Enter" && handleAddStore()}
                    />
                    <Button onClick={handleAddStore} className="bg-gold hover:bg-gold-light text-primary">
                      <Plus className="w-4 h-4 mr-2" />
                      Adicionar
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {designer.stores.map((store, index) => (
                      <div 
                        key={index}
                        className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border"
                      >
                        <div className="flex items-center gap-3">
                          <Store className="w-5 h-5 text-gold" />
                          <span className="font-medium">{store}</span>
                        </div>
                        <button
                          onClick={() => handleRemoveStore(index)}
                          className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {designer.stores.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <Store className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>Nenhuma loja adicionada ainda.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProjetistaDashboard;