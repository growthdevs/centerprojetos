import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { 
  ClipboardList, 
  CheckCircle2, 
  Clock, 
  MessageCircle, 
  Crown, 
  Megaphone,
  User,
  ArrowRight
} from "lucide-react";

// Mock data
const consultorCenter = {
  name: "Ana Paula Silva",
  whatsapp: "5511999999999",
  avatarUrl: null,
};

const mockPedidos = {
  emAberto: 2,
  finalizados: 5,
};

const mockCampanha = {
  titulo: "Promoção de Verão",
  descricao: "Ganhe 20% de desconto em projetos iniciados até o fim de Janeiro!",
  link: "/planos",
};

const ClientePainel = () => {
  const navigate = useNavigate();
  const { isAuthenticated, userType, userName, clientPlan } = useAuth();

  if (!isAuthenticated || userType !== "client") {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-32 pb-20 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Acesso Restrito</h1>
          <p className="text-muted-foreground">Faça login como cliente para acessar seu painel.</p>
        </div>
        <div className="hidden md:block">
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 pt-28 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-blue-mid flex items-center justify-center">
                <User className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Olá, {userName}!</h1>
                <div className="flex items-center gap-2">
                  <Badge variant={clientPlan === "premium" ? "default" : "secondary"}>
                    {clientPlan === "premium" ? "Plano Premium" : "Plano Smart"}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Welcome message for Smart plan */}
          {clientPlan === "smart" && (
            <Card className="mb-6 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 border-amber-300">
              <CardContent className="py-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
                      <Crown className="w-6 h-6 text-amber-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">Boas-vindas à Center Projetos!</h3>
                    <p className="text-sm text-muted-foreground">
                      Que tal conhecer nosso Plano Premium? Tenha acesso a um consultor exclusivo, 
                      projetos personalizados e acompanhamento completo do seu projeto.
                    </p>
                  </div>
                  <Button
                    onClick={() => navigate("/planos")}
                    className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white hover:from-amber-600 hover:to-yellow-600 shrink-0"
                  >
                    Seja Premium
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-6 md:grid-cols-2">
            {/* Meus Pedidos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ClipboardList className="w-5 h-5" />
                  Meus Pedidos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <button 
                    onClick={() => navigate("/cliente/pedidos")}
                    className="w-full flex items-center justify-between p-4 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 hover:bg-amber-100 dark:hover:bg-amber-950/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-amber-600" />
                      <span className="font-medium text-foreground">Em Aberto</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-amber-200 text-amber-800">
                        {mockPedidos.emAberto}
                      </Badge>
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </button>

                  <button 
                    onClick={() => navigate("/cliente/pedidos")}
                    className="w-full flex items-center justify-between p-4 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 hover:bg-green-100 dark:hover:bg-green-950/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-foreground">Finalizados</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-green-200 text-green-800">
                        {mockPedidos.finalizados}
                      </Badge>
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Consultor Center */}
            <Card className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-200">
                  <User className="w-5 h-5" />
                  Seu Consultor Center
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-blue-200 dark:bg-blue-800 flex items-center justify-center">
                    <User className="w-7 h-7 text-blue-700 dark:text-blue-300" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{consultorCenter.name}</p>
                    <p className="text-sm text-muted-foreground">Disponível para atendê-lo</p>
                  </div>
                </div>
                <Button
                  className="w-full border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-950"
                  variant="outline"
                  onClick={() => window.open(`https://wa.me/${consultorCenter.whatsapp}`, '_blank')}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Falar via WhatsApp
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Campanhas */}
          <Card className="mt-6 bg-gradient-to-r from-primary/5 to-blue-mid/5 border-primary/20">
            <CardContent className="py-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Megaphone className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">{mockCampanha.titulo}</h3>
                  <p className="text-sm text-muted-foreground">{mockCampanha.descricao}</p>
                </div>
                <Button
                  variant="default"
                  onClick={() => navigate(mockCampanha.link)}
                  className="shrink-0"
                >
                  Saiba Mais
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="hidden md:block">
        <Footer />
      </div>
    </div>
  );
};

export default ClientePainel;
