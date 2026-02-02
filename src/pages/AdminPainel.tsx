import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import {
  Store,
  Users,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  AlertTriangle,
  Building2,
  UserCheck,
  UserX,
  CreditCard,
} from "lucide-react";

// Mock data for store registration requests
const mockStoreRequests = [
  {
    id: "sr-1",
    fantasyName: "Móveis Modernos LTDA",
    corporateName: "Móveis Modernos Planejados LTDA",
    cnpj: "12.345.678/0001-90",
    segment: "Móveis Planejados",
    phone: "(11) 3333-4444",
    city: "São Paulo",
    state: "SP",
    requestDate: "28/01/2025",
    status: "pending",
  },
  {
    id: "sr-2",
    fantasyName: "Casa & Design",
    corporateName: "Casa Design Interiores EIRELI",
    cnpj: "98.765.432/0001-10",
    segment: "Design de Interiores",
    phone: "(21) 2222-3333",
    city: "Rio de Janeiro",
    state: "RJ",
    requestDate: "27/01/2025",
    status: "pending",
  },
  {
    id: "sr-3",
    fantasyName: "Planejados Premium",
    corporateName: "Premium Móveis e Decorações S/A",
    cnpj: "11.222.333/0001-44",
    segment: "Móveis Planejados",
    phone: "(31) 3344-5566",
    city: "Belo Horizonte",
    state: "MG",
    requestDate: "25/01/2025",
    status: "approved",
  },
];

// Mock data for designer registration requests
const mockDesignerRequests = [
  {
    id: "dr-1",
    name: "Fernanda Oliveira",
    qualification: "Arquiteta",
    cpf: "***.***.***-12",
    email: "fernanda.arq@email.com",
    whatsapp: "(11) 98888-7777",
    storeName: "Móveis Modernos LTDA",
    requestDate: "29/01/2025",
    status: "pending",
  },
  {
    id: "dr-2",
    name: "Ricardo Santos",
    qualification: "Designer de Interiores",
    cpf: "***.***.***-34",
    email: "ricardo.design@email.com",
    whatsapp: "(21) 97777-6666",
    storeName: "Casa & Design",
    requestDate: "28/01/2025",
    status: "pending",
  },
  {
    id: "dr-3",
    name: "Camila Mendes",
    qualification: "Vendedora",
    cpf: "***.***.***-56",
    email: "camila.vendas@email.com",
    whatsapp: "(31) 96666-5555",
    storeName: "Planejados Premium",
    requestDate: "26/01/2025",
    status: "approved",
  },
];

// Mock stats data
const mockStats = {
  orders: {
    requested: 156,
    closed: 89,
    noAgreement: 23,
    inProgress: 44,
  },
  designers: {
    total: 234,
    active: 198,
    inactive: 24,
    pendingPayment: 12,
  },
  stores: {
    total: 87,
    active: 72,
    inactive: 8,
    pendingPayment: 7,
  },
};

const AdminPainel = () => {
  const navigate = useNavigate();
  const { isAuthenticated, userType, userName } = useAuth();
  const { toast } = useToast();
  const [storeRequests, setStoreRequests] = useState(mockStoreRequests);
  const [designerRequests, setDesignerRequests] = useState(mockDesignerRequests);

  // For demo purposes, allow admin access
  if (!isAuthenticated || userType !== "admin") {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-32 pb-20 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Acesso Restrito</h1>
          <p className="text-muted-foreground">
            Faça login como administrador para acessar o painel.
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            Use: <strong>admin</strong> / <strong>123456</strong>
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  const handleApproveStore = (id: string) => {
    setStoreRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: "approved" } : req))
    );
    toast({
      title: "Loja aprovada!",
      description: "O lojista receberá uma notificação de aprovação.",
    });
  };

  const handleRejectStore = (id: string) => {
    setStoreRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: "rejected" } : req))
    );
    toast({
      title: "Loja recusada",
      description: "O lojista será notificado sobre a recusa.",
      variant: "destructive",
    });
  };

  const handleApproveDesigner = (id: string) => {
    setDesignerRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: "approved" } : req))
    );
    toast({
      title: "Projetista aprovado!",
      description: "O profissional e a loja serão notificados.",
    });
  };

  const handleRejectDesigner = (id: string) => {
    setDesignerRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: "rejected" } : req))
    );
    toast({
      title: "Projetista recusado",
      description: "A loja será notificada sobre a recusa.",
      variant: "destructive",
    });
  };

  const pendingStores = storeRequests.filter((r) => r.status === "pending").length;
  const pendingDesigners = designerRequests.filter((r) => r.status === "pending").length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 pt-28 pb-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Painel Administrativo</h1>
            <p className="text-muted-foreground">Bem-vindo, Consultor {userName}</p>
          </div>

          {/* Quick Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <Clock className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{pendingStores}</p>
                    <p className="text-xs text-muted-foreground">Lojas Pendentes</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{pendingDesigners}</p>
                    <p className="text-xs text-muted-foreground">Projetistas Pendentes</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{mockStats.orders.closed}</p>
                    <p className="text-xs text-muted-foreground">Vendas Fechadas</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <FileText className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{mockStats.orders.inProgress}</p>
                    <p className="text-xs text-muted-foreground">Em Andamento</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="stores" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="stores" className="flex items-center gap-2">
                <Store className="w-4 h-4" />
                <span className="hidden sm:inline">Lojas</span>
                {pendingStores > 0 && (
                  <Badge variant="destructive" className="ml-1 text-xs">
                    {pendingStores}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="designers" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">Projetistas</span>
                {pendingDesigners > 0 && (
                  <Badge variant="destructive" className="ml-1 text-xs">
                    {pendingDesigners}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="reports" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">Relatórios</span>
              </TabsTrigger>
            </TabsList>

            {/* Store Requests Tab */}
            <TabsContent value="stores">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="w-5 h-5" />
                    Solicitações de Cadastro de Lojas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nome Fantasia</TableHead>
                          <TableHead className="hidden md:table-cell">CNPJ</TableHead>
                          <TableHead className="hidden md:table-cell">Segmento</TableHead>
                          <TableHead className="hidden lg:table-cell">Cidade</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {storeRequests.map((request) => (
                          <TableRow key={request.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{request.fantasyName}</p>
                                <p className="text-xs text-muted-foreground md:hidden">
                                  {request.cnpj}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">{request.cnpj}</TableCell>
                            <TableCell className="hidden md:table-cell">{request.segment}</TableCell>
                            <TableCell className="hidden lg:table-cell">
                              {request.city}/{request.state}
                            </TableCell>
                            <TableCell>
                              {request.status === "pending" && (
                                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                                  <Clock className="w-3 h-3 mr-1" />
                                  Pendente
                                </Badge>
                              )}
                              {request.status === "approved" && (
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Aprovado
                                </Badge>
                              )}
                              {request.status === "rejected" && (
                                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                                  <XCircle className="w-3 h-3 mr-1" />
                                  Recusado
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell>
                              {request.status === "pending" && (
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-green-600 border-green-200 hover:bg-green-50"
                                    onClick={() => handleApproveStore(request.id)}
                                  >
                                    <CheckCircle className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-red-600 border-red-200 hover:bg-red-50"
                                    onClick={() => handleRejectStore(request.id)}
                                  >
                                    <XCircle className="w-4 h-4" />
                                  </Button>
                                </div>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Designer Requests Tab */}
            <TabsContent value="designers">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Solicitações de Cadastro de Projetistas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nome</TableHead>
                          <TableHead className="hidden md:table-cell">Qualificação</TableHead>
                          <TableHead className="hidden lg:table-cell">Loja Vinculada</TableHead>
                          <TableHead className="hidden md:table-cell">E-mail</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {designerRequests.map((request) => (
                          <TableRow key={request.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{request.name}</p>
                                <p className="text-xs text-muted-foreground md:hidden">
                                  {request.qualification}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">{request.qualification}</TableCell>
                            <TableCell className="hidden lg:table-cell">{request.storeName}</TableCell>
                            <TableCell className="hidden md:table-cell">{request.email}</TableCell>
                            <TableCell>
                              {request.status === "pending" && (
                                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                                  <Clock className="w-3 h-3 mr-1" />
                                  Pendente
                                </Badge>
                              )}
                              {request.status === "approved" && (
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Aprovado
                                </Badge>
                              )}
                              {request.status === "rejected" && (
                                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                                  <XCircle className="w-3 h-3 mr-1" />
                                  Recusado
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell>
                              {request.status === "pending" && (
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-green-600 border-green-200 hover:bg-green-50"
                                    onClick={() => handleApproveDesigner(request.id)}
                                  >
                                    <CheckCircle className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-red-600 border-red-200 hover:bg-red-50"
                                    onClick={() => handleRejectDesigner(request.id)}
                                  >
                                    <XCircle className="w-4 h-4" />
                                  </Button>
                                </div>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Reports Tab */}
            <TabsContent value="reports">
              <div className="grid gap-6">
                {/* Orders Report */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Relatório de Pedidos
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="p-4 bg-blue-50 rounded-lg text-center">
                        <p className="text-3xl font-bold text-blue-600">{mockStats.orders.requested}</p>
                        <p className="text-sm text-blue-700">Solicitados</p>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg text-center">
                        <p className="text-3xl font-bold text-green-600">{mockStats.orders.closed}</p>
                        <p className="text-sm text-green-700">Vendas Fechadas</p>
                      </div>
                      <div className="p-4 bg-red-50 rounded-lg text-center">
                        <p className="text-3xl font-bold text-red-600">{mockStats.orders.noAgreement}</p>
                        <p className="text-sm text-red-700">Sem Acordo</p>
                      </div>
                      <div className="p-4 bg-amber-50 rounded-lg text-center">
                        <p className="text-3xl font-bold text-amber-600">{mockStats.orders.inProgress}</p>
                        <p className="text-sm text-amber-700">Em Andamento</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Designers Report */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Relatório de Projetistas Cadastrados
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Categoria</TableHead>
                            <TableHead className="text-right">Quantidade</TableHead>
                            <TableHead className="text-right">%</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="flex items-center gap-2">
                              <UserCheck className="w-4 h-4 text-green-500" />
                              Ativos
                            </TableCell>
                            <TableCell className="text-right font-medium">{mockStats.designers.active}</TableCell>
                            <TableCell className="text-right text-muted-foreground">
                              {((mockStats.designers.active / mockStats.designers.total) * 100).toFixed(1)}%
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="flex items-center gap-2">
                              <UserX className="w-4 h-4 text-gray-400" />
                              Inativos
                            </TableCell>
                            <TableCell className="text-right font-medium">{mockStats.designers.inactive}</TableCell>
                            <TableCell className="text-right text-muted-foreground">
                              {((mockStats.designers.inactive / mockStats.designers.total) * 100).toFixed(1)}%
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="flex items-center gap-2">
                              <CreditCard className="w-4 h-4 text-amber-500" />
                              Mensalidade Pendente
                            </TableCell>
                            <TableCell className="text-right font-medium">{mockStats.designers.pendingPayment}</TableCell>
                            <TableCell className="text-right text-muted-foreground">
                              {((mockStats.designers.pendingPayment / mockStats.designers.total) * 100).toFixed(1)}%
                            </TableCell>
                          </TableRow>
                          <TableRow className="bg-muted/30">
                            <TableCell className="font-semibold">Total</TableCell>
                            <TableCell className="text-right font-bold">{mockStats.designers.total}</TableCell>
                            <TableCell className="text-right">100%</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>

                {/* Stores Report */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Store className="w-5 h-5" />
                      Relatório de Lojas Cadastradas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Categoria</TableHead>
                            <TableHead className="text-right">Quantidade</TableHead>
                            <TableHead className="text-right">%</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              Ativas
                            </TableCell>
                            <TableCell className="text-right font-medium">{mockStats.stores.active}</TableCell>
                            <TableCell className="text-right text-muted-foreground">
                              {((mockStats.stores.active / mockStats.stores.total) * 100).toFixed(1)}%
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="flex items-center gap-2">
                              <XCircle className="w-4 h-4 text-gray-400" />
                              Inativas
                            </TableCell>
                            <TableCell className="text-right font-medium">{mockStats.stores.inactive}</TableCell>
                            <TableCell className="text-right text-muted-foreground">
                              {((mockStats.stores.inactive / mockStats.stores.total) * 100).toFixed(1)}%
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="flex items-center gap-2">
                              <AlertTriangle className="w-4 h-4 text-amber-500" />
                              Mensalidade Pendente
                            </TableCell>
                            <TableCell className="text-right font-medium">{mockStats.stores.pendingPayment}</TableCell>
                            <TableCell className="text-right text-muted-foreground">
                              {((mockStats.stores.pendingPayment / mockStats.stores.total) * 100).toFixed(1)}%
                            </TableCell>
                          </TableRow>
                          <TableRow className="bg-muted/30">
                            <TableCell className="font-semibold">Total</TableCell>
                            <TableCell className="text-right font-bold">{mockStats.stores.total}</TableCell>
                            <TableCell className="text-right">100%</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="hidden md:block">
        <Footer />
      </div>
    </div>
  );
};

export default AdminPainel;
