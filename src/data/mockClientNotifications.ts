export interface ClientNotification {
  id: string;
  designerName: string;
  designerStore: string;
  type: "response" | "budget_confirmation";
  message: string;
  createdAt: string;
  isRead: boolean;
  originalMessage?: string;
}

export const mockClientNotifications: ClientNotification[] = [
  {
    id: "1",
    designerName: "Ana Paula Santos",
    designerStore: "Móveis Planejados Premium",
    type: "response",
    message: "Olá! Recebi sua solicitação e ficarei feliz em ajudar com seu projeto de cozinha. Podemos agendar uma visita técnica para tirar as medidas e conversarmos melhor sobre suas necessidades?",
    createdAt: "2025-01-29T14:30:00",
    isRead: false,
    originalMessage: "Olá! Estou interessada em fazer um projeto de cozinha planejada para meu apartamento novo."
  },
  {
    id: "2",
    designerName: "Ana Paula Santos",
    designerStore: "Móveis Planejados Premium",
    type: "budget_confirmation",
    message: "Confirmo o pedido de orçamento para projeto de cozinha planejada. Em breve entrarei em contato para agendar a visita técnica.",
    createdAt: "2025-01-29T15:00:00",
    isRead: false,
  },
  {
    id: "3",
    designerName: "Carlos Eduardo Silva",
    designerStore: "Design & Decoração",
    type: "response",
    message: "Bom dia! Vi seu interesse no projeto de home office. Tenho disponibilidade para conversarmos esta semana. Qual o melhor horário para você?",
    createdAt: "2025-01-28T10:15:00",
    isRead: true,
    originalMessage: "Preciso de ajuda para montar meu escritório em casa."
  },
  {
    id: "4",
    designerName: "Mariana Costa",
    designerStore: "Ambientes Sob Medida",
    type: "budget_confirmation",
    message: "Pedido de orçamento confirmado! Projeto completo para sala de estar. Aguarde nosso contato em até 48h para agendarmos uma reunião.",
    createdAt: "2025-01-27T16:45:00",
    isRead: true,
  },
];
