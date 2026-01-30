import type { ClientPlan } from "@/contexts/AuthContext";

export type NotificationType = 
  | "response" 
  | "budget_confirmation" 
  | "project_submission" 
  | "addendum_signature" 
  | "process_checklist";

export interface ClientNotification {
  id: string;
  designerName: string;
  designerStore: string;
  type: NotificationType;
  message: string;
  createdAt: string;
  isRead: boolean;
  originalMessage?: string;
  planRequired?: ClientPlan; // If set, only show for this plan
  checklistItems?: { label: string; completed: boolean }[];
}

// Smart plan notifications (basic flow)
const smartNotifications: ClientNotification[] = [
  {
    id: "smart-1",
    designerName: "Ana Paula Santos",
    designerStore: "Móveis Planejados Premium",
    type: "response",
    message: "Olá! Recebi sua solicitação e ficarei feliz em ajudar com seu projeto de cozinha. Podemos agendar uma visita técnica para tirar as medidas e conversarmos melhor sobre suas necessidades?",
    createdAt: "2025-01-29T14:30:00",
    isRead: false,
    originalMessage: "Olá! Estou interessada em fazer um projeto de cozinha planejada para meu apartamento novo.",
    planRequired: "smart",
  },
  {
    id: "smart-2",
    designerName: "Ana Paula Santos",
    designerStore: "Móveis Planejados Premium",
    type: "budget_confirmation",
    message: "Confirmo o pedido de orçamento para projeto de cozinha planejada. Em breve entrarei em contato para agendar a visita técnica.",
    createdAt: "2025-01-29T15:00:00",
    isRead: false,
    planRequired: "smart",
  },
  {
    id: "smart-3",
    designerName: "Carlos Eduardo Silva",
    designerStore: "Design & Decoração",
    type: "response",
    message: "Bom dia! Vi seu interesse no projeto de home office. Tenho disponibilidade para conversarmos esta semana. Qual o melhor horário para você?",
    createdAt: "2025-01-28T10:15:00",
    isRead: true,
    originalMessage: "Preciso de ajuda para montar meu escritório em casa.",
    planRequired: "smart",
  },
];

// Premium plan notifications (complete flow with project, addendum and checklist)
const premiumNotifications: ClientNotification[] = [
  {
    id: "premium-1",
    designerName: "Mariana Costa",
    designerStore: "Ambientes Sob Medida",
    type: "response",
    message: "Olá! Como cliente Premium, você terá acompanhamento exclusivo em todo o processo. Já agendei a visita técnica para esta semana. Aguarde meu contato!",
    createdAt: "2025-01-29T09:00:00",
    isRead: false,
    originalMessage: "Quero fazer um projeto completo de sala de estar e home office.",
    planRequired: "premium",
  },
  {
    id: "premium-2",
    designerName: "Mariana Costa",
    designerStore: "Ambientes Sob Medida",
    type: "budget_confirmation",
    message: "Pedido de orçamento confirmado! Projeto completo para sala de estar e home office. Você receberá o projeto em até 5 dias úteis.",
    createdAt: "2025-01-29T10:00:00",
    isRead: false,
    planRequired: "premium",
  },
  {
    id: "premium-3",
    designerName: "Mariana Costa",
    designerStore: "Ambientes Sob Medida",
    type: "project_submission",
    message: "Seu projeto está pronto! 🎉 Segue em anexo o projeto completo com todas as especificações, renders 3D e lista de materiais. Por favor, revise e me avise se tiver alguma dúvida ou ajuste.",
    createdAt: "2025-01-30T11:00:00",
    isRead: false,
    planRequired: "premium",
  },
  {
    id: "premium-4",
    designerName: "Mariana Costa",
    designerStore: "Ambientes Sob Medida",
    type: "addendum_signature",
    message: "Para prosseguirmos com a fabricação, preciso que você assine o termo aditivo com as especificações finais do projeto. Por favor, revise os termos e confirme a assinatura.",
    createdAt: "2025-01-30T14:00:00",
    isRead: false,
    planRequired: "premium",
  },
  {
    id: "premium-5",
    designerName: "Mariana Costa",
    designerStore: "Ambientes Sob Medida",
    type: "process_checklist",
    message: "Acompanhe o status do seu pedido em tempo real. Estamos trabalhando para entregar tudo no prazo!",
    createdAt: "2025-01-30T16:00:00",
    isRead: false,
    planRequired: "premium",
    checklistItems: [
      { label: "Solicitação de contato enviada", completed: true },
      { label: "Visita técnica realizada", completed: true },
      { label: "Projeto desenvolvido", completed: true },
      { label: "Orçamento aprovado", completed: true },
      { label: "Termo aditivo assinado", completed: false },
      { label: "Fabricação em andamento", completed: false },
      { label: "Montagem agendada", completed: false },
      { label: "Vistoria final Center Projetos", completed: false },
    ],
  },
];

export const getNotificationsByPlan = (plan: ClientPlan): ClientNotification[] => {
  if (plan === "premium") {
    return premiumNotifications;
  }
  return smartNotifications;
};
