import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";
import { CheckCircle2, Circle, ArrowRight, Store, User, Building2 } from "lucide-react";

type ChecklistSubject = "client" | "store" | "center";

interface ChecklistItem {
  id: string;
  label: string;
  subject: ChecklistSubject;
  completed: boolean;
  actionButton?: {
    label: string;
    targetNotificationId?: string;
  };
}

// Smart Plan Checklist
const smartChecklist: ChecklistItem[] = [
  { id: "s1", label: "Solicitação de Contato", subject: "client", completed: true },
  { id: "s2", label: "Solicitação respondida", subject: "store", completed: true },
  { id: "s3", label: "Confirmação de pedido de orçamento", subject: "client", completed: true, actionButton: { label: "Ver confirmação", targetNotificationId: "smart-2" } },
  { id: "s4", label: "Aceite de Termo de Responsabilidade", subject: "client", completed: true },
  { id: "s5", label: "Pedido de orçamento aceito", subject: "store", completed: true },
  { id: "s6", label: "Briefing", subject: "store", completed: true },
  { id: "s7", label: "Agendamento de Apresentação", subject: "store", completed: true },
  { id: "s8", label: "Projeto Apresentado", subject: "store", completed: true },
  { id: "s9", label: "Situação: Fechado", subject: "store", completed: true },
  { id: "s10", label: "Contrato loja/cliente Disponível", subject: "store", completed: false, actionButton: { label: "Ver contrato", targetNotificationId: "contract" } },
  { id: "s11", label: "Projeto executivo assinado", subject: "store", completed: false },
  { id: "s12", label: "Em fabricação", subject: "store", completed: false },
  { id: "s13", label: "Material entregue", subject: "store", completed: false },
  { id: "s14", label: "Em Montagem", subject: "store", completed: false },
  { id: "s15", label: "Montagem finalizada", subject: "store", completed: false },
  { id: "s16", label: "Vistoria Center", subject: "center", completed: false },
  { id: "s17", label: "Projeto Concluído com Sucesso", subject: "center", completed: false },
];

// Premium Plan - Initial Checklist (before stores)
const premiumInitialChecklist: ChecklistItem[] = [
  { id: "p1", label: "Conheci meu consultor Center", subject: "center", completed: true },
  { id: "p2", label: "Contrato Center enviado", subject: "center", completed: true },
  { id: "p3", label: "Contrato assinado", subject: "client", completed: true },
  { id: "p4", label: "Projeto iniciado", subject: "center", completed: true },
  { id: "p5", label: "Briefing", subject: "center", completed: true },
  { id: "p6", label: "Desenvolvimento do projeto", subject: "center", completed: true },
  { id: "p7", label: "Apresentação", subject: "center", completed: true },
  { id: "p8", label: "Projeto Aprovado", subject: "center", completed: true },
  { id: "p9", label: "Vitrine de lojas desbloqueada", subject: "center", completed: true },
];

// Premium Plan - Per-store checklist
const createStoreChecklist = (storeId: number, completedCount: number): ChecklistItem[] => [
  { id: `ps${storeId}-1`, label: "Solicitação de contato", subject: "center", completed: completedCount >= 1 },
  { id: `ps${storeId}-2`, label: "Solicitação respondida", subject: "store", completed: completedCount >= 2 },
  { id: `ps${storeId}-3`, label: "Confirmação de pedido de orçamento", subject: "client", completed: completedCount >= 3 },
  { id: `ps${storeId}-4`, label: "Pedido de orçamento aceito", subject: "store", completed: completedCount >= 4 },
  { id: `ps${storeId}-5`, label: "Envio do projeto", subject: "center", completed: completedCount >= 5 },
  { id: `ps${storeId}-6`, label: "Agendamento de Apresentação", subject: "store", completed: completedCount >= 6 },
  { id: `ps${storeId}-7`, label: "Projeto apresentado", subject: "store", completed: completedCount >= 7 },
  { id: `ps${storeId}-8`, label: "Situação: Fechado", subject: "store", completed: completedCount >= 8 },
  { id: `ps${storeId}-9`, label: "Contrato loja/cliente Disponível", subject: "store", completed: completedCount >= 9, actionButton: { label: "Ver contrato", targetNotificationId: "contract" } },
  { id: `ps${storeId}-10`, label: "Projeto executivo assinado", subject: "store", completed: completedCount >= 10 },
  { id: `ps${storeId}-11`, label: "Em Fabricação", subject: "store", completed: completedCount >= 11 },
  { id: `ps${storeId}-12`, label: "Material entregue", subject: "store", completed: completedCount >= 12 },
  { id: `ps${storeId}-13`, label: "Em Montagem", subject: "store", completed: completedCount >= 13 },
  { id: `ps${storeId}-14`, label: "Montagem finalizada", subject: "store", completed: completedCount >= 14 },
  { id: `ps${storeId}-15`, label: "Vistoria Center", subject: "center", completed: completedCount >= 15 },
  { id: `ps${storeId}-16`, label: "Projeto Concluído com Sucesso", subject: "center", completed: completedCount >= 16 },
];

// Mock stores for premium plan
const premiumStores = [
  { id: 1, name: "Todeschini Centro", completedItems: 8 },
  { id: 2, name: "Florense Campinas", completedItems: 4 },
  { id: 3, name: "Formaplas Barra", completedItems: 2 },
];

const getSubjectColor = (subject: ChecklistSubject) => {
  switch (subject) {
    case "client":
      return "bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-900";
    case "store":
      return "bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-900";
    case "center":
      return "bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-900";
  }
};

const getSubjectIcon = (subject: ChecklistSubject) => {
  switch (subject) {
    case "client":
      return <User className="w-4 h-4 text-green-600 dark:text-green-400" />;
    case "store":
      return <Store className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
    case "center":
      return <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
  }
};

const getSubjectLabel = (subject: ChecklistSubject) => {
  switch (subject) {
    case "client":
      return "Cliente";
    case "store":
      return "Loja";
    case "center":
      return "Center";
  }
};

interface ChecklistDisplayProps {
  items: ChecklistItem[];
  onActionClick?: (notificationId: string) => void;
}

const ChecklistDisplay = ({ items, onActionClick }: ChecklistDisplayProps) => {
  const completedCount = items.filter((item) => item.completed).length;
  const progressPercent = (completedCount / items.length) * 100;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Progresso</span>
          <span className="font-medium text-foreground">
            {completedCount} de {items.length} etapas
          </span>
        </div>
        <Progress value={progressPercent} className="h-2" />
      </div>

      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            className={`flex items-center gap-3 p-3 rounded-lg border ${getSubjectColor(item.subject)} transition-all`}
          >
            {item.completed ? (
              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0" />
            ) : (
              <Circle className="w-5 h-5 text-muted-foreground shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <p className={`text-sm ${item.completed ? "text-foreground" : "text-muted-foreground"}`}>
                {item.label}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {getSubjectIcon(item.subject)}
              <span className="text-xs text-muted-foreground hidden sm:inline">
                {getSubjectLabel(item.subject)}
              </span>
            </div>
            {item.actionButton && !item.completed && onActionClick && (
              <Button
                variant="ghost"
                size="sm"
                className="shrink-0"
                onClick={() => onActionClick(item.actionButton!.targetNotificationId || "")}
              >
                {item.actionButton.label}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const MeusPedidos = () => {
  const navigate = useNavigate();
  const { isAuthenticated, userType, clientPlan } = useAuth();
  const [selectedStoreTab, setSelectedStoreTab] = useState(premiumStores[0].id.toString());

  if (!isAuthenticated || userType !== "client") {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-32 pb-20 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Acesso Restrito</h1>
          <p className="text-muted-foreground">Faça login como cliente para acessar seus pedidos.</p>
        </div>
        <div className="hidden md:block">
          <Footer />
        </div>
      </div>
    );
  }

  const handleActionClick = (notificationId: string) => {
    navigate(`/cliente/notificacoes?highlight=${notificationId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 pt-28 pb-20">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Meus Pedidos</h1>
            <p className="text-muted-foreground">
              Acompanhe o status do seu projeto em tempo real
            </p>
          </div>

          {/* Legend */}
          <Card className="mb-6">
            <CardContent className="py-4">
              <div className="flex flex-wrap gap-4 justify-center">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-green-200 dark:bg-green-900" />
                  <span className="text-sm text-muted-foreground">Cliente</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-amber-200 dark:bg-amber-900" />
                  <span className="text-sm text-muted-foreground">Loja</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-blue-200 dark:bg-blue-900" />
                  <span className="text-sm text-muted-foreground">Center Projetos</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {clientPlan === "smart" ? (
            /* Smart Plan - Single Checklist */
            <Card>
              <CardHeader>
                <CardTitle>Acompanhamento do Pedido</CardTitle>
              </CardHeader>
              <CardContent>
                <ChecklistDisplay items={smartChecklist} onActionClick={handleActionClick} />
              </CardContent>
            </Card>
          ) : (
            /* Premium Plan - Initial + Tabbed Store Checklists */
            <div className="space-y-6">
              {/* Initial Premium Checklist */}
              <Card>
                <CardHeader>
                  <CardTitle>Etapa Inicial - Center Projetos</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChecklistDisplay items={premiumInitialChecklist} onActionClick={handleActionClick} />
                </CardContent>
              </Card>

              {/* Per-Store Checklists */}
              <Card>
                <CardHeader>
                  <CardTitle>Meus Pedidos de Orçamentos</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs value={selectedStoreTab} onValueChange={setSelectedStoreTab}>
                    <TabsList className="grid w-full grid-cols-3 mb-6">
                      {premiumStores.map((store) => (
                        <TabsTrigger key={store.id} value={store.id.toString()}>
                          {store.name.split(" ")[0]}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    {premiumStores.map((store) => (
                      <TabsContent key={store.id} value={store.id.toString()}>
                        <div className="mb-4 p-3 rounded-lg bg-muted/50">
                          <p className="font-medium text-foreground">{store.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Orçamento em andamento
                          </p>
                        </div>
                        <ChecklistDisplay
                          items={createStoreChecklist(store.id, store.completedItems)}
                          onActionClick={handleActionClick}
                        />
                      </TabsContent>
                    ))}
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      <div className="hidden md:block">
        <Footer />
      </div>
    </div>
  );
};

export default MeusPedidos;
