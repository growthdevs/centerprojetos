import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { mockStores } from "@/data/mockStores";
import type { Designer } from "@/data/mockStores";
import {
  Store,
  Plus,
  Trash2,
  Edit2,
  Save,
  X,
  MapPin,
  Phone,
  Mail,
  Image,
  Instagram,
  Upload,
  Video,
  FileText,
  User,
  ClipboardList,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AddDesignerModal from "@/components/AddDesignerModal";
import DesignerDetailModalShopowner from "@/components/search/modals/DesignerDetailModalShopowner";

// Extended designer type with active status
interface DesignerWithStatus extends Designer {
  isActive: boolean;
}

// Mock data for user's stores with active status
const mockUserStores = [
  {
    id: "user-store-1",
    name: "Todeschini Centro",
    city: "São Paulo",
    state: "SP",
    phone: "(11) 3333-4444",
    whatsapp: "(11) 98888-7777",
    email: "contato@todeschini-centro.com",
    bio: "Loja referência em móveis planejados de alto padrão na região central de São Paulo.",
    imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400",
    portfolioType: "manual" as const,
    instagramUrl: "",
    portfolioImages: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400",
      "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=400",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400",
    ],
    designers: mockStores[0].designers.slice(0, 5).map((d, i) => ({ ...d, isActive: i !== 2 })) as DesignerWithStatus[],
  },
  {
    id: "user-store-2",
    name: "Todeschini Moema",
    city: "São Paulo",
    state: "SP",
    phone: "(11) 3555-6666",
    whatsapp: "(11) 97777-8888",
    email: "contato@todeschini-moema.com",
    bio: "Filial especializada em projetos residenciais de luxo no bairro de Moema.",
    imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
    portfolioType: "instagram" as const,
    instagramUrl: "https://instagram.com/todeschinimoema",
    portfolioImages: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400",
      "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=400",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400",
    ],
    designers: mockStores[1].designers.slice(0, 3).map((d, i) => ({ ...d, isActive: i === 0 })) as DesignerWithStatus[],
  },
];

// Mock data for client orders report
const mockClientOrders = [
  {
    id: "order-1",
    clientName: "Maria Silva",
    designerName: "Ana Costa",
    designerRole: "Arquiteta",
    quotesReceived: 3,
    checklistStep: "Visita Técnica Realizada",
    status: "Em andamento",
  },
  {
    id: "order-2",
    clientName: "João Santos",
    designerName: "Carlos Mendes",
    designerRole: "Designer de Interiores",
    quotesReceived: 2,
    checklistStep: "Aguardando Orçamento",
    status: "Pendente",
  },
  {
    id: "order-3",
    clientName: "Fernanda Oliveira",
    designerName: "Paula Ribeiro",
    designerRole: "Vendedora",
    quotesReceived: 1,
    checklistStep: "Projeto em Fabricação",
    status: "Em produção",
  },
  {
    id: "order-4",
    clientName: "Roberto Lima",
    designerName: "Lucas Ferreira",
    designerRole: "Arquiteto",
    quotesReceived: 4,
    checklistStep: "Entrega Agendada",
    status: "Finalização",
  },
  {
    id: "order-5",
    clientName: "Camila Rocha",
    designerName: "Mariana Duarte",
    designerRole: "Designer de Interiores",
    quotesReceived: 2,
    checklistStep: "Pedido Solicitado",
    status: "Novo",
  },
  {
    id: "order-6",
    clientName: "André Martins",
    designerName: "Ana Costa",
    designerRole: "Arquiteta",
    quotesReceived: 3,
    checklistStep: "Montagem em Andamento",
    status: "Em montagem",
  },
];

const LojaPainel = () => {
  const navigate = useNavigate();
  const { isAuthenticated, userType, userName } = useAuth();
  const { toast } = useToast();

  const [selectedStoreId, setSelectedStoreId] = useState(mockUserStores[0].id);
  const [isEditing, setIsEditing] = useState(false);
  const [stores, setStores] = useState(mockUserStores);
  const [showAddDesignerModal, setShowAddDesignerModal] = useState(false);
  const [selectedDesigner, setSelectedDesigner] = useState<DesignerWithStatus | null>(null);

  const selectedStore = stores.find((s) => s.id === selectedStoreId) || stores[0];

  const [editForm, setEditForm] = useState({
    name: selectedStore.name,
    city: selectedStore.city,
    state: selectedStore.state,
    phone: selectedStore.phone,
    whatsapp: selectedStore.whatsapp,
    email: selectedStore.email,
    bio: selectedStore.bio,
    portfolioType: selectedStore.portfolioType,
    instagramUrl: selectedStore.instagramUrl,
  });

  // Redirect if not authenticated as shopowner
  if (!isAuthenticated || userType !== "shopowner") {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-32 pb-20 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Acesso Restrito</h1>
          <p className="text-muted-foreground">Faça login como lojista para acessar o painel.</p>
        </div>
        <Footer />
      </div>
    );
  }

  const handleStoreChange = (storeId: string) => {
    setSelectedStoreId(storeId);
    const store = stores.find((s) => s.id === storeId);
    if (store) {
      setEditForm({
        name: store.name,
        city: store.city,
        state: store.state,
        phone: store.phone,
        whatsapp: store.whatsapp,
        email: store.email,
        bio: store.bio,
        portfolioType: store.portfolioType,
        instagramUrl: store.instagramUrl,
      });
    }
    setIsEditing(false);
  };

  const handleSave = () => {
    setStores((prev) =>
      prev.map((store) =>
        store.id === selectedStoreId ? { ...store, ...editForm } : store
      )
    );
    setIsEditing(false);
    toast({
      title: "Dados salvos!",
      description: "As informações da loja foram atualizadas com sucesso.",
    });
  };

  const handleRemoveDesigner = (designerId: string) => {
    setStores((prev) =>
      prev.map((store) =>
        store.id === selectedStoreId
          ? { ...store, designers: store.designers.filter((d) => d.id !== designerId) }
          : store
      )
    );
    toast({
      title: "Projetista removido",
      description: "O projetista foi desvinculado da loja.",
    });
  };

  const handleAddStore = () => {
    const newStore = {
      id: `user-store-${Date.now()}`,
      name: "Nova Loja",
      city: "",
      state: "",
      phone: "",
      whatsapp: "",
      email: "",
      bio: "",
      imageUrl: "",
      portfolioType: "manual" as const,
      instagramUrl: "",
      portfolioImages: [],
      designers: [],
    };
    setStores((prev) => [...prev, newStore]);
    setSelectedStoreId(newStore.id);
    setEditForm({
      name: newStore.name,
      city: newStore.city,
      state: newStore.state,
      phone: newStore.phone,
      whatsapp: newStore.whatsapp,
      email: newStore.email,
      bio: newStore.bio,
      portfolioType: newStore.portfolioType,
      instagramUrl: newStore.instagramUrl,
    });
    setIsEditing(true);
    toast({
      title: "Nova loja criada",
      description: "Preencha os dados da nova loja.",
    });
  };

  const handleDesignerAdded = (designer: any) => {
    // In a real app, this would add the designer to the store after approval
    toast({
      title: "Projetista cadastrado!",
      description: `${designer.fullName} foi enviado para análise.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 pt-28 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Painel da Loja</h1>
              <p className="text-muted-foreground">Bem-vindo, {userName}</p>
            </div>

            <div className="flex items-center gap-3">
              {stores.length > 1 && (
                <Select value={selectedStoreId} onValueChange={handleStoreChange}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Selecione a loja" />
                  </SelectTrigger>
                  <SelectContent>
                    {stores.map((store) => (
                      <SelectItem key={store.id} value={store.id}>
                        {store.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              <Button onClick={handleAddStore} variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Nova Loja
              </Button>
            </div>
          </div>

          {/* Store Info Card */}
          <Card className="mb-6">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Store className="w-5 h-5" />
                Dados da Loja
              </CardTitle>
              {!isEditing ? (
                <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
                  <Edit2 className="w-4 h-4 mr-2" />
                  Editar
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>
                    <X className="w-4 h-4 mr-2" />
                    Cancelar
                  </Button>
                  <Button variant="accent" size="sm" onClick={handleSave}>
                    <Save className="w-4 h-4 mr-2" />
                    Salvar
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="grid gap-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">
                        Nome da Loja
                      </label>
                      <Input
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">E-mail</label>
                      <Input
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Cidade</label>
                      <Input
                        value={editForm.city}
                        onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Estado</label>
                      <Input
                        value={editForm.state}
                        onChange={(e) => setEditForm({ ...editForm, state: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">
                        Telefone
                      </label>
                      <Input
                        value={editForm.phone}
                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">WhatsApp</label>
                    <Input
                      value={editForm.whatsapp}
                      onChange={(e) => setEditForm({ ...editForm, whatsapp: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">
                      Descrição da Loja
                    </label>
                    <Textarea
                      value={editForm.bio}
                      onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">
                      Foto da Loja
                    </label>
                    <div className="flex items-center gap-4">
                      {selectedStore.imageUrl && (
                        <img
                          src={selectedStore.imageUrl}
                          alt={selectedStore.name}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                      )}
                      <Button variant="outline" size="sm">
                        <Image className="w-4 h-4 mr-2" />
                        Alterar Foto
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    {selectedStore.imageUrl && (
                      <img
                        src={selectedStore.imageUrl}
                        alt={selectedStore.name}
                        className="w-24 h-24 rounded-lg object-cover"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-foreground">{selectedStore.name}</h3>
                      <p className="text-muted-foreground flex items-center gap-1 mt-1">
                        <MapPin className="w-4 h-4" />
                        {selectedStore.city}, {selectedStore.state}
                      </p>
                      <p className="text-muted-foreground flex items-center gap-1 mt-1">
                        <Phone className="w-4 h-4" />
                        {selectedStore.phone}
                      </p>
                      <p className="text-muted-foreground flex items-center gap-1 mt-1">
                        <Mail className="w-4 h-4" />
                        {selectedStore.email}
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{selectedStore.bio}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Portfolio Card */}
          <Card className="mb-6">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Image className="w-5 h-5" />
                Portfólio da Loja
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Portfolio Type Selection */}
              <div className="mb-6">
                <label className="text-sm font-medium text-foreground mb-3 block">
                  Como você quer exibir seu portfólio?
                </label>
                <RadioGroup
                  value={editForm.portfolioType}
                  onValueChange={(value) =>
                    setEditForm({ ...editForm, portfolioType: value as "instagram" | "manual" })
                  }
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <div>
                    <RadioGroupItem value="instagram" id="instagram" className="peer sr-only" />
                    <Label
                      htmlFor="instagram"
                      className="flex flex-col items-center justify-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:border-primary/50"
                    >
                      <Instagram className="w-8 h-8 text-pink-500" />
                      <div className="text-center">
                        <p className="font-medium">Instagram como Vitrine</p>
                        <p className="text-sm text-muted-foreground">
                          Seus posts aparecem automaticamente no card
                        </p>
                      </div>
                    </Label>
                  </div>

                  <div>
                    <RadioGroupItem value="manual" id="manual" className="peer sr-only" />
                    <Label
                      htmlFor="manual"
                      className="flex flex-col items-center justify-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:border-primary/50"
                    >
                      <Upload className="w-8 h-8 text-primary" />
                      <div className="text-center">
                        <p className="font-medium">Upload Manual</p>
                        <p className="text-sm text-muted-foreground">
                          Suba até 10 fotos ou vídeos
                        </p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Instagram URL Input */}
              {editForm.portfolioType === "instagram" && (
                <div className="mb-6 p-4 bg-muted/50 rounded-lg">
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Link do Instagram da Loja
                  </label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="https://instagram.com/sualoja"
                      value={editForm.instagramUrl}
                      onChange={(e) => setEditForm({ ...editForm, instagramUrl: e.target.value })}
                      className="flex-1"
                    />
                    <Button
                      variant="accent"
                      onClick={() => {
                        setStores((prev) =>
                          prev.map((store) =>
                            store.id === selectedStoreId
                              ? { ...store, instagramUrl: editForm.instagramUrl }
                              : store
                          )
                        );
                        toast({
                          title: "Instagram vinculado!",
                          description: "Os posts do Instagram aparecerão no card da loja.",
                        });
                      }}
                    >
                      Vincular
                    </Button>
                  </div>
                  {selectedStore.instagramUrl && (
                    <p className="text-sm text-muted-foreground mt-2 flex items-center gap-1">
                      <Instagram className="w-4 h-4" />
                      Vinculado: {selectedStore.instagramUrl}
                    </p>
                  )}
                </div>
              )}

              {/* Manual Upload Section */}
              {editForm.portfolioType === "manual" && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-muted-foreground">
                      {selectedStore.portfolioImages.length}/10 arquivos
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={selectedStore.portfolioImages.length >= 10}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Adicionar Foto/Vídeo
                    </Button>
                  </div>

                  {selectedStore.portfolioImages.length === 0 ? (
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                      <div className="flex justify-center gap-4 mb-4">
                        <Image className="w-8 h-8 text-muted-foreground" />
                        <Video className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <p className="text-muted-foreground">
                        Arraste fotos ou vídeos aqui, ou clique para selecionar
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Máximo de 10 arquivos (fotos ou vídeos)
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      {selectedStore.portfolioImages.map((img, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={img}
                            alt={`Projeto ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <button className="absolute top-1 right-1 bg-destructive text-destructive-foreground p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Designers Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Projetistas Vinculados ({selectedStore.designers.length})</CardTitle>
              <Button variant="outline" size="sm" onClick={() => setShowAddDesignerModal(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Projetista
              </Button>
            </CardHeader>
            <CardContent>
              {selectedStore.designers.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  Nenhum projetista vinculado a esta loja.
                </p>
              ) : (
                <div className="space-y-3">
                  {selectedStore.designers.map((designer) => (
                    <div
                      key={designer.id}
                      className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                    >
                      <div 
                        className="flex items-center gap-3 flex-1 cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => setSelectedDesigner(designer as DesignerWithStatus)}
                      >
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-medium text-primary">
                            {designer.name.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-foreground hover:text-primary transition-colors">
                              {designer.name}
                            </p>
                            <Badge 
                              variant="outline" 
                              className={(designer as DesignerWithStatus).isActive 
                                ? "bg-green-500/10 text-green-600 border-green-200" 
                                : "bg-red-500/10 text-red-600 border-red-200"
                              }
                            >
                              {(designer as DesignerWithStatus).isActive ? "Ativo" : "Inativo"}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {designer.projectsCount} projetos • ⭐ {designer.serviceRating.toFixed(1)}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleRemoveDesigner(designer.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Client Orders Report Card */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Relatório de Pedidos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Recebido por</TableHead>
                      <TableHead className="hidden md:table-cell">Função</TableHead>
                      <TableHead className="text-center">Orçamentos</TableHead>
                      <TableHead>Etapa do Checklist</TableHead>
                      <TableHead className="hidden md:table-cell">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockClientOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium">{order.clientName}</span>
                          </div>
                        </TableCell>
                        <TableCell>{order.designerName}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge variant="outline">{order.designerRole}</Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant="secondary">{order.quotesReceived}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <ClipboardList className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">{order.checklistStep}</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge
                            className={
                              order.status === "Novo"
                                ? "bg-blue-500/10 text-blue-600 border-blue-200"
                                : order.status === "Em andamento"
                                ? "bg-amber-500/10 text-amber-600 border-amber-200"
                                : order.status === "Em produção"
                                ? "bg-purple-500/10 text-purple-600 border-purple-200"
                                : order.status === "Finalização"
                                ? "bg-green-500/10 text-green-600 border-green-200"
                                : order.status === "Em montagem"
                                ? "bg-indigo-500/10 text-indigo-600 border-indigo-200"
                                : "bg-muted text-muted-foreground"
                            }
                          >
                            {order.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {mockClientOrders.length === 0 && (
                <p className="text-muted-foreground text-center py-8">
                  Nenhum pedido registrado ainda.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="hidden md:block">
        <Footer />
      </div>

      <AddDesignerModal
        open={showAddDesignerModal}
        onOpenChange={setShowAddDesignerModal}
        onDesignerAdded={handleDesignerAdded}
      />

      <DesignerDetailModalShopowner
        designer={selectedDesigner}
        isOpen={!!selectedDesigner}
        onClose={() => setSelectedDesigner(null)}
      />
    </div>
  );
};

export default LojaPainel;
