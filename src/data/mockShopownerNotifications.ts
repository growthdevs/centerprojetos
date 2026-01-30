export type ShopownerNotificationType = 
  | "center_status" 
  | "pending_center" 
  | "store_selected" 
  | "quote_request";

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
  };
}

export const mockShopownerNotifications: ShopownerNotification[] = [
  {
    id: "sn-1",
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
    id: "sn-2",
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
    id: "sn-3",
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
    id: "sn-4",
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
    id: "sn-5",
    type: "quote_request",
    title: "Solicitação de Orçamento",
    description: "Carlos Oliveira quer orçamento para home office.",
    date: "24/01/2025",
    read: true,
    details: {
      clientName: "Carlos Oliveira",
      clientEmail: "carlos.oliveira@email.com",
      clientPhone: "(11) 91234-5678",
      projectType: "Home office",
      message: "Busco um projeto de home office integrado à sala de estar. Preciso de espaço para 2 monitores."
    }
  }
];
