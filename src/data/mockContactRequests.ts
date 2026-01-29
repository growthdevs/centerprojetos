export interface ContactRequest {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

export const mockContactRequests: ContactRequest[] = [
  {
    id: "1",
    clientName: "Maria Silva",
    clientEmail: "maria.silva@email.com",
    clientPhone: "(11) 98765-4321",
    message: "Olá! Estou interessada em fazer um projeto de cozinha planejada para meu apartamento novo. Gostaria de saber mais sobre seu trabalho e valores.",
    createdAt: "2025-01-29T10:30:00",
    isRead: false,
  },
  {
    id: "2",
    clientName: "João Santos",
    clientEmail: "joao.santos@gmail.com",
    clientPhone: "(11) 99876-5432",
    message: "Bom dia! Vi seu portfólio e adorei os projetos de home office. Preciso de ajuda para montar meu escritório em casa.",
    createdAt: "2025-01-28T15:45:00",
    isRead: true,
  },
  {
    id: "3",
    clientName: "Ana Carolina Oliveira",
    clientEmail: "ana.oliveira@hotmail.com",
    clientPhone: "(21) 97654-3210",
    message: "Boa tarde! Estou reformando minha casa e preciso de um projetista para os quartos e closet. Podemos conversar sobre isso?",
    createdAt: "2025-01-27T09:15:00",
    isRead: false,
  },
  {
    id: "4",
    clientName: "Carlos Eduardo",
    clientEmail: "carlos.edu@email.com",
    clientPhone: "(11) 91234-5678",
    message: "Olá, tudo bem? Estou procurando alguém para fazer o projeto da minha sala de estar. Vi que você tem experiência com ambientes modernos.",
    createdAt: "2025-01-26T14:20:00",
    isRead: true,
  },
  {
    id: "5",
    clientName: "Fernanda Lima",
    clientEmail: "fernanda.lima@gmail.com",
    clientPhone: "(31) 98888-7777",
    message: "Oi! Preciso de um orçamento para móveis planejados do meu apartamento inteiro (2 quartos, sala, cozinha e área de serviço).",
    createdAt: "2025-01-25T11:00:00",
    isRead: true,
  },
  {
    id: "6",
    clientName: "Roberto Almeida",
    clientEmail: "roberto.almeida@empresa.com",
    clientPhone: "(11) 95555-4444",
    message: "Bom dia! Trabalho em uma empresa e estamos buscando um projetista para fazer a ambientação do nosso novo escritório.",
    createdAt: "2025-01-24T16:30:00",
    isRead: false,
  },
];
