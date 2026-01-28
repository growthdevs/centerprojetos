// Mock data for stores
export type MedalType = "bronze" | "prata" | "ouro" | "platinum" | null;

export interface Store {
  id: string;
  name: string;
  city: string;
  state: string;
  googleRating: number;
  thermometer: number; // 0-100 internal Center rating
  salesCount: number;
  bio: string;
  imageUrl?: string;
  designers: Designer[];
}

export interface Designer {
  id: string;
  name: string;
  city: string;
  state: string;
  store: string;
  storeId: string;
  projectsCount: number;
  rating: number;
  storeRating: number;
  serviceRating: number;
  thermometer: number; // 0-100 internal Center rating
  medal: MedalType;
  bio: string;
  imageUrl?: string;
  portfolioImages: string[];
  reviews: {
    author: string;
    comment: string;
    date: string;
    rating: number;
  }[];
}

// Calculate medal based on projects closed
export const getMedalByProjects = (projectsCount: number): MedalType => {
  if (projectsCount >= 51) return "platinum";
  if (projectsCount >= 26) return "ouro";
  if (projectsCount >= 11) return "prata";
  if (projectsCount >= 1) return "bronze";
  return null;
};

export const getMedalInfo = (medal: MedalType) => {
  switch (medal) {
    case "platinum":
      return { emoji: "💎", label: "Platinum", color: "text-cyan-500", bgColor: "bg-cyan-500/10", description: "51-100 projetos fechados" };
    case "ouro":
      return { emoji: "🥇", label: "Ouro", color: "text-yellow-500", bgColor: "bg-yellow-500/10", description: "26-50 projetos fechados" };
    case "prata":
      return { emoji: "🥈", label: "Prata", color: "text-gray-400", bgColor: "bg-gray-400/10", description: "11-25 projetos fechados" };
    case "bronze":
      return { emoji: "🥉", label: "Bronze", color: "text-amber-600", bgColor: "bg-amber-600/10", description: "0-10 projetos fechados" };
    default:
      return null;
  }
};

export const mockDesigners: Designer[] = [
  {
    id: "1",
    name: "Maria Silva",
    city: "São Paulo",
    state: "SP",
    store: "Todeschini Centro",
    storeId: "store-1",
    projectsCount: 47,
    rating: 4.8,
    storeRating: 4.5,
    serviceRating: 4.9,
    thermometer: 85,
    medal: "ouro",
    bio: "Projetista com mais de 10 anos de experiência em móveis planejados, especializada em cozinhas e closets de alto padrão.",
    portfolioImages: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400",
      "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=400",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=400",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=400",
    ],
    reviews: [
      { author: "João M.", comment: "Excelente atendimento! Projeto entregue no prazo e com muita qualidade.", date: "15/12/2024", rating: 5 },
      { author: "Ana P.", comment: "Muito profissional, atenciosa e criativa. Superou minhas expectativas.", date: "03/12/2024", rating: 5 },
    ],
  },
  {
    id: "2",
    name: "João Santos",
    city: "Campinas",
    state: "SP",
    store: "Florense Campinas",
    storeId: "store-2",
    projectsCount: 32,
    rating: 4.6,
    storeRating: 4.7,
    serviceRating: 4.5,
    thermometer: 72,
    medal: "ouro",
    bio: "Designer de interiores focado em ambientes residenciais modernos e funcionais.",
    portfolioImages: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400",
      "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=400",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400",
    ],
    reviews: [
      { author: "Carlos R.", comment: "Ótimo profissional, muito dedicado ao trabalho.", date: "20/11/2024", rating: 4 },
    ],
  },
  {
    id: "3",
    name: "Ana Oliveira",
    city: "Rio de Janeiro",
    state: "RJ",
    store: "Formaplas Barra",
    storeId: "store-3",
    projectsCount: 58,
    rating: 4.9,
    storeRating: 4.3,
    serviceRating: 5.0,
    thermometer: 92,
    medal: "platinum",
    bio: "Especialista em projetos de luxo com foco em ergonomia e otimização de espaços.",
    portfolioImages: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400",
    ],
    reviews: [
      { author: "Mariana S.", comment: "Projeto incrível! Comunicação clara e acompanhamento excelente.", date: "08/12/2024", rating: 5 },
      { author: "Pedro L.", comment: "Muito atenciosa e profissional. Recomendo!", date: "25/11/2024", rating: 5 },
    ],
  },
  {
    id: "4",
    name: "Carlos Ferreira",
    city: "Belo Horizonte",
    state: "MG",
    store: "Bertolini BH Centro",
    storeId: "store-4",
    projectsCount: 8,
    rating: 4.4,
    storeRating: 4.6,
    serviceRating: 4.2,
    thermometer: 55,
    medal: "bronze",
    bio: "Projetista em início de carreira com grande entusiasmo e atenção aos detalhes.",
    portfolioImages: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400",
    ],
    reviews: [
      { author: "Fernanda M.", comment: "Bom profissional, projeto bem executado.", date: "10/12/2024", rating: 4 },
    ],
  },
  {
    id: "5",
    name: "Patricia Lima",
    city: "Curitiba",
    state: "PR",
    store: "Favorita Curitiba",
    storeId: "store-5",
    projectsCount: 18,
    rating: 4.7,
    storeRating: 4.8,
    serviceRating: 4.8,
    thermometer: 78,
    medal: "prata",
    bio: "Design sustentável e materiais ecológicos são minha especialidade.",
    portfolioImages: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400",
      "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=400",
    ],
    reviews: [
      { author: "Ricardo T.", comment: "Excelente trabalho! Projeto ficou perfeito.", date: "18/12/2024", rating: 5 },
      { author: "Lucia F.", comment: "Muito profissional e pontual nas entregas.", date: "05/12/2024", rating: 5 },
    ],
  },
  {
    id: "6",
    name: "Roberto Almeida",
    city: "Porto Alegre",
    state: "RS",
    store: "Linea Porto Alegre",
    storeId: "store-6",
    projectsCount: 52,
    rating: 4.5,
    storeRating: 4.4,
    serviceRating: 4.0,
    thermometer: 68,
    medal: "platinum",
    bio: "Veterano do setor com vasta experiência em projetos corporativos e residenciais.",
    portfolioImages: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400",
    ],
    reviews: [
      { author: "Sandra K.", comment: "Bom atendimento e projeto de qualidade.", date: "12/12/2024", rating: 4 },
    ],
  },
];

export const mockStores: Store[] = [
  {
    id: "store-1",
    name: "Todeschini Centro",
    city: "São Paulo",
    state: "SP",
    googleRating: 4.5,
    thermometer: 88,
    salesCount: 234,
    bio: "Loja referência em móveis planejados de alto padrão na região central de São Paulo. Mais de 20 anos de experiência.",
    designers: mockDesigners.filter(d => d.storeId === "store-1"),
  },
  {
    id: "store-2",
    name: "Florense Campinas",
    city: "Campinas",
    state: "SP",
    googleRating: 4.7,
    thermometer: 75,
    salesCount: 156,
    bio: "Especializada em projetos exclusivos com materiais importados. Atendimento personalizado.",
    designers: mockDesigners.filter(d => d.storeId === "store-2"),
  },
  {
    id: "store-3",
    name: "Formaplas Barra",
    city: "Rio de Janeiro",
    state: "RJ",
    googleRating: 4.3,
    thermometer: 82,
    salesCount: 189,
    bio: "Loja conceito na Barra da Tijuca com showroom completo. Projetos residenciais e comerciais.",
    designers: mockDesigners.filter(d => d.storeId === "store-3"),
  },
  {
    id: "store-4",
    name: "Bertolini BH Centro",
    city: "Belo Horizonte",
    state: "MG",
    googleRating: 4.6,
    thermometer: 70,
    salesCount: 98,
    bio: "Tradição mineira em móveis planejados desde 1985. Qualidade e compromisso com o cliente.",
    designers: mockDesigners.filter(d => d.storeId === "store-4"),
  },
  {
    id: "store-5",
    name: "Favorita Curitiba",
    city: "Curitiba",
    state: "PR",
    googleRating: 4.8,
    thermometer: 90,
    salesCount: 145,
    bio: "Primeira loja carbono neutro do sul do Brasil. Sustentabilidade e design moderno.",
    designers: mockDesigners.filter(d => d.storeId === "store-5"),
  },
  {
    id: "store-6",
    name: "Linea Porto Alegre",
    city: "Porto Alegre",
    state: "RS",
    googleRating: 4.4,
    thermometer: 65,
    salesCount: 112,
    bio: "Design contemporâneo europeu adaptado ao gosto brasileiro. Showroom com mais de 500m².",
    designers: mockDesigners.filter(d => d.storeId === "store-6"),
  },
];
