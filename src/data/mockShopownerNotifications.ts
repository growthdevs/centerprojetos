export type ShopownerNotificationType = 
  | "center_status" 
  | "pending_center" 
  | "store_selected" 
  | "quote_request"
  | "registration_pending"
  | "registration_approved"
  | "designer_approved"
  | "payment_reminder"
  | "new_lead";

export interface ShopownerNotification {
  id: string;
  type: ShopownerNotificationType;
  title: string;
  description: string;
  date: string;
  read: boolean;
  details?: {
    clientName?: string;
    clientEmail?: string;
    clientPhone?: string;
    projectType?: string;
    message?: string;
    status?: string;
    deadline?: string;
    designerName?: string;
  };
  actionButton?: {
    label: string;
    action: string;
  };
}

export const mockShopownerNotifications: ShopownerNotification[] = [
  {
    id: "sn-0",
    type: "registration_pending",
    title: "Cadastro em Análise",
    description: "Seu cadastro foi recebido e está sendo analisado pela equipe Center Projetos. Prazo de resposta: até 3 dias úteis.",
    date: "20/01/2025",
    read: true,
    details: {
      status: "Em análise",
      message: "Recebemos sua solicitação de cadastro como loja parceira. Nossa equipe está verificando as informações enviadas. Você receberá uma notificação assim que a análise for concluída."
    }
  },
  {
    id: "sn-1",
    type: "registration_approved",
    title: "🎉 Cadastro Aprovado!",
    description: "Parabéns! Sua loja foi aprovada como parceira Center Projetos. Agora você pode cadastrar seus projetistas.",
    date: "23/01/2025",
    read: false,
    details: {
      status: "Aprovado",
      message: "Bem-vindo à rede Center Projetos! Seu cadastro foi aprovado e sua loja está ativa na plataforma. O próximo passo é cadastrar seus projetistas e vendedores para começar a receber clientes."
    },
    actionButton: {
      label: "Cadastrar Projetistas",
      action: "add_designer"
    }
  },
  {
    id: "sn-2",
    type: "designer_approved",
    title: "Projetista Aprovado",
    description: "O projetista Ana Paula Santos foi aprovado e já está ativo na plataforma.",
    date: "25/01/2025",
    read: false,
    details: {
      designerName: "Ana Paula Santos",
      status: "Ativo",
      message: "O cadastro do projetista foi verificado e aprovado. Ele já pode receber solicitações de clientes através da plataforma."
    }
  },
  {
    id: "sn-3",
    type: "center_status",
    title: "Status da Loja Atualizado",
    description: "Sua loja foi verificada e está ativa na plataforma Center Projetos.",
    date: "28/01/2025",
    read: false,
    details: {
      status: "Loja verificada e ativa",
      message: "Parabéns! Sua loja passou por todas as verificações e está pronta para receber clientes."
    }
  },
  {
    id: "sn-4",
    type: "pending_center",
    title: "Pendência: Documentação",
    description: "Falta enviar o contrato social atualizado para completar o cadastro.",
    date: "25/01/2025",
    read: false,
    details: {
      status: "Documentação pendente",
      deadline: "05/02/2025",
      message: "Por favor, envie o contrato social atualizado para manter sua loja ativa na plataforma."
    }
  },
  {
    id: "sn-5",
    type: "store_selected",
    title: "Sua Loja Foi Selecionada!",
    description: "Um cliente selecionou sua loja durante a pesquisa de móveis planejados.",
    date: "27/01/2025",
    read: true,
    details: {
      clientName: "João Silva",
      projectType: "Cozinha planejada",
      message: "O cliente demonstrou interesse em sua loja através da busca na plataforma."
    }
  },
  {
    id: "sn-6",
    type: "quote_request",
    title: "Nova Solicitação de Orçamento",
    description: "Maria Santos solicitou um orçamento para quarto de casal.",
    date: "26/01/2025",
    read: false,
    details: {
      clientName: "Maria Santos",
      clientEmail: "maria.santos@email.com",
      clientPhone: "(11) 98765-4321",
      projectType: "Quarto de casal completo",
      message: "Preciso de um projeto para quarto de casal com closet embutido. Apartamento de 15m²."
    }
  },
  {
    id: "sn-7",
    type: "new_lead",
    title: "Novo Lead - Cliente Premium",
    description: "Cliente Premium solicitou orçamento. Prioridade alta!",
    date: "29/01/2025",
    read: false,
    details: {
      clientName: "Carlos Oliveira",
      clientEmail: "carlos.premium@email.com",
      clientPhone: "(11) 91234-5678",
      projectType: "Sala de estar + Home office",
      message: "Projeto completo para apartamento de 120m². Cliente Premium com urgência."
    }
  },
  {
    id: "sn-8",
    type: "payment_reminder",
    title: "Lembrete: Mensalidade",
    description: "Sua mensalidade de fevereiro vence em 5 dias.",
    date: "25/01/2025",
    read: true,
    details: {
      status: "Pendente",
      deadline: "01/02/2025",
      message: "A mensalidade da plataforma Center Projetos no valor de R$ 299,00 vence em 01/02/2025. Mantenha seu pagamento em dia para continuar recebendo clientes."
    }
  },
  {
    id: "sn-9",
    type: "quote_request",
    title: "Solicitação de Orçamento",
    description: "Fernando Mendes quer orçamento para cozinha americana.",
    date: "24/01/2025",
    read: true,
    details: {
      clientName: "Fernando Mendes",
      clientEmail: "fernando.m@email.com",
      clientPhone: "(11) 99876-5432",
      projectType: "Cozinha americana",
      message: "Busco um projeto moderno para cozinha americana integrada à sala. Ambiente de 25m²."
    }
  }
];
