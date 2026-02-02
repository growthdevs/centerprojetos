import type { ClientPlan } from "@/contexts/AuthContext";

export type NotificationType = 
  | "response" 
  | "budget_confirmation" 
  | "project_submission" 
  | "addendum_signature" 
  | "process_checklist"
  | "technical_visit_scheduled"
  | "technical_visit_completed"
  | "budget_sent"
  | "budget_approved"
  | "fabrication_started"
  | "fabrication_completed"
  | "delivery_scheduled"
  | "installation_scheduled"
  | "installation_completed"
  | "final_inspection";

export interface ClientNotification {
  id: string;
  designerName: string;
  designerStore: string;
  type: NotificationType;
  message: string;
  createdAt: string;
  isRead: boolean;
  originalMessage?: string;
  planRequired?: ClientPlan;
  checklistItems?: { label: string; completed: boolean }[];
}

// Smart plan notifications - baseado no checklist completo
const smartNotifications: ClientNotification[] = [
  {
    id: "smart-1",
    designerName: "Ana Paula Santos",
    designerStore: "Móveis Planejados Premium",
    type: "response",
    message: "Olá! Recebi sua solicitação e ficarei feliz em ajudar com seu projeto de cozinha. Podemos agendar uma visita técnica para tirar as medidas e conversarmos melhor sobre suas necessidades?",
    createdAt: "2025-01-20T10:00:00",
    isRead: true,
    originalMessage: "Olá! Estou interessada em fazer um projeto de cozinha planejada para meu apartamento novo.",
    planRequired: "smart",
  },
  {
    id: "smart-2",
    designerName: "Center Projetos",
    designerStore: "Plataforma",
    type: "technical_visit_scheduled",
    message: "📅 Visita técnica agendada! O projetista Ana Paula Santos irá até seu endereço no dia 22/01/2025 às 14h para realizar a medição do ambiente. Tenha os cômodos acessíveis e limpos para a visita.",
    createdAt: "2025-01-21T09:00:00",
    isRead: true,
    planRequired: "smart",
  },
  {
    id: "smart-3",
    designerName: "Ana Paula Santos",
    designerStore: "Móveis Planejados Premium",
    type: "technical_visit_completed",
    message: "✅ Visita técnica concluída! Já realizei todas as medições necessárias. Agora vou elaborar o projeto e o orçamento detalhado para você. Em breve entrarei em contato com a proposta.",
    createdAt: "2025-01-22T16:30:00",
    isRead: true,
    planRequired: "smart",
  },
  {
    id: "smart-4",
    designerName: "Ana Paula Santos",
    designerStore: "Móveis Planejados Premium",
    type: "budget_sent",
    message: "💰 Seu orçamento está pronto! Preparei uma proposta completa para sua cozinha planejada. O valor total ficou em R$ 28.500,00, podendo ser parcelado em até 12x sem juros. Confira os detalhes e me avise se tiver dúvidas!",
    createdAt: "2025-01-25T11:00:00",
    isRead: true,
    planRequired: "smart",
  },
  {
    id: "smart-5",
    designerName: "Ana Paula Santos",
    designerStore: "Móveis Planejados Premium",
    type: "budget_confirmation",
    message: "🎉 Orçamento confirmado! Obrigada por aprovar nossa proposta. Agora vamos iniciar a produção do seu projeto. Você receberá atualizações sobre cada etapa do processo.",
    createdAt: "2025-01-26T14:00:00",
    isRead: false,
    planRequired: "smart",
  },
  {
    id: "smart-6",
    designerName: "Center Projetos",
    designerStore: "Plataforma",
    type: "fabrication_started",
    message: "🏭 Fabricação iniciada! Os móveis da sua cozinha entraram em produção. O prazo estimado é de 30 dias úteis. Fique tranquilo(a), acompanharemos todo o processo para você.",
    createdAt: "2025-01-28T09:00:00",
    isRead: false,
    planRequired: "smart",
  },
  {
    id: "smart-7",
    designerName: "Center Projetos",
    designerStore: "Plataforma",
    type: "process_checklist",
    message: "📋 Acompanhe o status do seu pedido em tempo real. Estamos trabalhando para entregar tudo no prazo!",
    createdAt: "2025-01-29T10:00:00",
    isRead: false,
    planRequired: "smart",
    checklistItems: [
      { label: "Solicitação de contato enviada", completed: true },
      { label: "Visita técnica agendada", completed: true },
      { label: "Visita técnica realizada", completed: true },
      { label: "Orçamento enviado", completed: true },
      { label: "Orçamento aprovado", completed: true },
      { label: "Fabricação em andamento", completed: true },
      { label: "Fabricação concluída", completed: false },
      { label: "Entrega agendada", completed: false },
      { label: "Montagem agendada", completed: false },
      { label: "Montagem concluída", completed: false },
      { label: "Vistoria final Center Projetos", completed: false },
    ],
  },
];

// Premium plan notifications - fluxo completo com múltiplas lojas
const premiumNotifications: ClientNotification[] = [
  {
    id: "premium-1",
    designerName: "Center Projetos",
    designerStore: "Plataforma",
    type: "response",
    message: "🌟 Bem-vindo ao plano Premium! Como cliente exclusivo, você terá acompanhamento dedicado em todas as etapas. Já identificamos 3 lojas parceiras ideais para seu projeto. Aguarde o contato dos projetistas!",
    createdAt: "2025-01-18T09:00:00",
    isRead: true,
    planRequired: "premium",
  },
  {
    id: "premium-2",
    designerName: "Mariana Costa",
    designerStore: "Ambientes Sob Medida",
    type: "response",
    message: "Olá! Sou a Mariana e ficarei responsável pelo seu projeto na Ambientes Sob Medida. Vi que você busca um projeto completo de sala e home office. Podemos agendar uma visita técnica para amanhã às 10h?",
    createdAt: "2025-01-18T11:00:00",
    isRead: true,
    originalMessage: "Quero fazer um projeto completo de sala de estar e home office.",
    planRequired: "premium",
  },
  {
    id: "premium-3",
    designerName: "Roberto Almeida",
    designerStore: "Casa Moderna Planejados",
    type: "response",
    message: "Bom dia! Sou o Roberto da Casa Moderna. Também gostaria de apresentar uma proposta para seu projeto. Posso agendar uma visita para esta semana? Temos condições especiais para clientes Premium!",
    createdAt: "2025-01-18T14:00:00",
    isRead: true,
    planRequired: "premium",
  },
  {
    id: "premium-4",
    designerName: "Center Projetos",
    designerStore: "Plataforma",
    type: "technical_visit_scheduled",
    message: "📅 Visitas técnicas agendadas!\n\n• Ambientes Sob Medida: 19/01 às 10h\n• Casa Moderna: 19/01 às 15h\n• Design & Decoração: 20/01 às 09h\n\nTodas as lojas irão medir e apresentar propostas para você comparar.",
    createdAt: "2025-01-18T16:00:00",
    isRead: true,
    planRequired: "premium",
  },
  {
    id: "premium-5",
    designerName: "Mariana Costa",
    designerStore: "Ambientes Sob Medida",
    type: "technical_visit_completed",
    message: "✅ Medições realizadas! Já tenho todas as informações do seu ambiente. Vou elaborar um projeto 3D completo com renderização profissional. Prazo de entrega: 3 dias úteis.",
    createdAt: "2025-01-19T12:00:00",
    isRead: true,
    planRequired: "premium",
  },
  {
    id: "premium-6",
    designerName: "Roberto Almeida",
    designerStore: "Casa Moderna Planejados",
    type: "technical_visit_completed",
    message: "✅ Visita concluída! Ficou muito claro o que você precisa. Vou montar uma proposta especial com materiais premium e garantia estendida. Envio em até 4 dias.",
    createdAt: "2025-01-19T17:00:00",
    isRead: true,
    planRequired: "premium",
  },
  {
    id: "premium-7",
    designerName: "Mariana Costa",
    designerStore: "Ambientes Sob Medida",
    type: "project_submission",
    message: "🎨 Seu projeto está pronto! Preparei renders 3D fotorrealistas de todos os ambientes. O projeto inclui:\n\n• Sala de estar com móvel de TV sob medida\n• Home office integrado\n• Iluminação em LED embutida\n• Lista completa de materiais\n\nValor total: R$ 45.800,00 (12x sem juros)",
    createdAt: "2025-01-22T10:00:00",
    isRead: true,
    planRequired: "premium",
  },
  {
    id: "premium-8",
    designerName: "Roberto Almeida",
    designerStore: "Casa Moderna Planejados",
    type: "project_submission",
    message: "📐 Proposta finalizada! Desenvolvi um projeto exclusivo com acabamentos premium:\n\n• MDF revestido em lâmina natural\n• Ferragens Blum importadas\n• Garantia de 5 anos\n• Instalação em 25 dias\n\nValor: R$ 52.300,00 (15x sem juros)",
    createdAt: "2025-01-23T11:00:00",
    isRead: true,
    planRequired: "premium",
  },
  {
    id: "premium-9",
    designerName: "Center Projetos",
    designerStore: "Plataforma",
    type: "budget_sent",
    message: "📊 Comparativo de propostas disponível! Você recebeu 3 orçamentos completos. Acesse seu painel para comparar valores, materiais e prazos de cada loja. Nosso consultor está disponível para ajudar na decisão!",
    createdAt: "2025-01-24T09:00:00",
    isRead: true,
    planRequired: "premium",
  },
  {
    id: "premium-10",
    designerName: "Center Projetos",
    designerStore: "Plataforma",
    type: "budget_approved",
    message: "🎉 Excelente escolha! Você aprovou a proposta da Ambientes Sob Medida. Agora precisamos formalizar com a assinatura do termo aditivo contendo todas as especificações do projeto.",
    createdAt: "2025-01-25T14:00:00",
    isRead: true,
    planRequired: "premium",
  },
  {
    id: "premium-11",
    designerName: "Center Projetos",
    designerStore: "Plataforma",
    type: "addendum_signature",
    message: "📝 Termo Aditivo disponível para assinatura!\n\nEste documento contém:\n• Especificações técnicas detalhadas\n• Prazo de entrega garantido\n• Condições de pagamento\n• Garantias e responsabilidades\n\nPor favor, revise e assine digitalmente para iniciarmos a produção.",
    createdAt: "2025-01-25T16:00:00",
    isRead: false,
    planRequired: "premium",
  },
  {
    id: "premium-12",
    designerName: "Center Projetos",
    designerStore: "Plataforma",
    type: "fabrication_started",
    message: "🏭 Produção iniciada! Os móveis do seu projeto entraram na linha de fabricação da Ambientes Sob Medida. Acompanhe cada etapa pelo seu painel:\n\n✅ Corte das chapas\n⏳ Usinagem\n⏳ Acabamento\n⏳ Montagem de componentes\n⏳ Controle de qualidade",
    createdAt: "2025-01-28T08:00:00",
    isRead: false,
    planRequired: "premium",
  },
  {
    id: "premium-13",
    designerName: "Mariana Costa",
    designerStore: "Ambientes Sob Medida",
    type: "fabrication_completed",
    message: "✨ Fabricação concluída! Seus móveis passaram pelo controle de qualidade e estão prontos para entrega. Vamos agendar a instalação para a próxima semana. Qual o melhor dia para você?",
    createdAt: "2025-02-10T11:00:00",
    isRead: false,
    planRequired: "premium",
  },
  {
    id: "premium-14",
    designerName: "Center Projetos",
    designerStore: "Plataforma",
    type: "delivery_scheduled",
    message: "🚚 Entrega agendada!\n\nData: 15/02/2025\nHorário: 08h às 12h\nEquipe: 3 montadores especializados\n\nTempo estimado de instalação: 2 dias\n\nPor favor, certifique-se de que os ambientes estejam livres e acessíveis.",
    createdAt: "2025-02-11T09:00:00",
    isRead: false,
    planRequired: "premium",
  },
  {
    id: "premium-15",
    designerName: "Center Projetos",
    designerStore: "Plataforma",
    type: "installation_scheduled",
    message: "🔧 Montagem em andamento! Nossa equipe está no local realizando a instalação. A projetista Mariana acompanhará todo o processo para garantir a perfeita execução do projeto.",
    createdAt: "2025-02-15T08:30:00",
    isRead: false,
    planRequired: "premium",
  },
  {
    id: "premium-16",
    designerName: "Mariana Costa",
    designerStore: "Ambientes Sob Medida",
    type: "installation_completed",
    message: "🎊 Montagem concluída com sucesso! Seu projeto ficou incrível! Tirei algumas fotos do resultado final para nosso portfólio (com sua autorização, é claro). Agora falta apenas a vistoria final da Center Projetos.",
    createdAt: "2025-02-16T17:00:00",
    isRead: false,
    planRequired: "premium",
  },
  {
    id: "premium-17",
    designerName: "Center Projetos",
    designerStore: "Plataforma",
    type: "final_inspection",
    message: "🔍 Vistoria final agendada!\n\nUm consultor Center Projetos irá ao local dia 18/02 às 10h para realizar a vistoria final e garantir que tudo foi executado conforme o projeto aprovado.\n\nApós a aprovação, você receberá o certificado de conclusão.",
    createdAt: "2025-02-17T09:00:00",
    isRead: false,
    planRequired: "premium",
  },
  {
    id: "premium-18",
    designerName: "Center Projetos",
    designerStore: "Plataforma",
    type: "process_checklist",
    message: "📋 Checklist completo do seu projeto Premium. Acompanhe todas as etapas em tempo real!",
    createdAt: "2025-02-17T10:00:00",
    isRead: false,
    planRequired: "premium",
    checklistItems: [
      { label: "Solicitação enviada", completed: true },
      { label: "Lojas selecionadas (3)", completed: true },
      { label: "Visitas técnicas realizadas", completed: true },
      { label: "Projetos 3D recebidos", completed: true },
      { label: "Orçamentos comparados", completed: true },
      { label: "Proposta aprovada", completed: true },
      { label: "Termo aditivo assinado", completed: true },
      { label: "Fabricação concluída", completed: true },
      { label: "Entrega realizada", completed: true },
      { label: "Montagem concluída", completed: true },
      { label: "Vistoria final Center Projetos", completed: false },
      { label: "Certificado de conclusão", completed: false },
    ],
  },
];

export const getNotificationsByPlan = (plan: ClientPlan): ClientNotification[] => {
  if (plan === "premium") {
    return premiumNotifications;
  }
  return smartNotifications;
};
