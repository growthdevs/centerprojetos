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
  portfolioImages: string[];
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

// Helper to generate designer with variations
const createDesigner = (
  id: string,
  name: string,
  city: string,
  state: string,
  store: string,
  storeId: string,
  projectsCount: number,
  serviceRating: number,
  storeRating: number,
  thermometer: number
): Designer => ({
  id,
  name,
  city,
  state,
  store,
  storeId,
  projectsCount,
  rating: serviceRating,
  storeRating,
  serviceRating,
  thermometer,
  medal: getMedalByProjects(projectsCount),
  bio: `Projetista especializado em móveis planejados com foco em qualidade e atendimento personalizado.`,
  portfolioImages: [
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400",
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400",
    "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=400",
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400",
  ],
  reviews: [
    { author: "Cliente", comment: "Ótimo profissional, muito dedicado!", date: "10/01/2025", rating: 5 },
  ],
});

// Store 1 Designers (Todeschini Centro - SP)
const store1Designers: Designer[] = [
  createDesigner("1", "Maria Silva", "São Paulo", "SP", "Todeschini Centro", "store-1", 47, 4.9, 4.5, 85),
  createDesigner("1-2", "Lucas Mendes", "São Paulo", "SP", "Todeschini Centro", "store-1", 35, 4.7, 4.5, 78),
  createDesigner("1-3", "Carla Souza", "São Paulo", "SP", "Todeschini Centro", "store-1", 22, 4.8, 4.5, 72),
  createDesigner("1-4", "Fernando Costa", "São Paulo", "SP", "Todeschini Centro", "store-1", 58, 4.9, 4.5, 91),
  createDesigner("1-5", "Juliana Ramos", "São Paulo", "SP", "Todeschini Centro", "store-1", 15, 4.6, 4.5, 68),
  createDesigner("1-6", "Ricardo Oliveira", "São Paulo", "SP", "Todeschini Centro", "store-1", 8, 4.4, 4.5, 55),
  createDesigner("1-7", "Patrícia Gomes", "São Paulo", "SP", "Todeschini Centro", "store-1", 41, 4.8, 4.5, 82),
  createDesigner("1-8", "André Lima", "São Paulo", "SP", "Todeschini Centro", "store-1", 29, 4.7, 4.5, 76),
  createDesigner("1-9", "Beatriz Santos", "São Paulo", "SP", "Todeschini Centro", "store-1", 12, 4.5, 4.5, 62),
  createDesigner("1-10", "Gustavo Almeida", "São Paulo", "SP", "Todeschini Centro", "store-1", 53, 4.9, 4.5, 88),
];

// Store 2 Designers (Florense Campinas - SP)
const store2Designers: Designer[] = [
  createDesigner("2", "João Santos", "Campinas", "SP", "Florense Campinas", "store-2", 32, 4.5, 4.7, 72),
  createDesigner("2-2", "Marina Ferreira", "Campinas", "SP", "Florense Campinas", "store-2", 28, 4.6, 4.7, 70),
  createDesigner("2-3", "Pedro Nascimento", "Campinas", "SP", "Florense Campinas", "store-2", 45, 4.8, 4.7, 83),
  createDesigner("2-4", "Camila Rocha", "Campinas", "SP", "Florense Campinas", "store-2", 19, 4.4, 4.7, 65),
  createDesigner("2-5", "Bruno Martins", "Campinas", "SP", "Florense Campinas", "store-2", 55, 4.9, 4.7, 90),
  createDesigner("2-6", "Isabela Cruz", "Campinas", "SP", "Florense Campinas", "store-2", 10, 4.3, 4.7, 58),
  createDesigner("2-7", "Rafael Dias", "Campinas", "SP", "Florense Campinas", "store-2", 37, 4.7, 4.7, 77),
  createDesigner("2-8", "Larissa Barbosa", "Campinas", "SP", "Florense Campinas", "store-2", 24, 4.6, 4.7, 71),
  createDesigner("2-9", "Thiago Pereira", "Campinas", "SP", "Florense Campinas", "store-2", 6, 4.2, 4.7, 52),
  createDesigner("2-10", "Amanda Cardoso", "Campinas", "SP", "Florense Campinas", "store-2", 42, 4.8, 4.7, 81),
];

// Store 3 Designers (Formaplas Barra - RJ)
const store3Designers: Designer[] = [
  createDesigner("3", "Ana Oliveira", "Rio de Janeiro", "RJ", "Formaplas Barra", "store-3", 58, 5.0, 4.3, 92),
  createDesigner("3-2", "Diego Moreira", "Rio de Janeiro", "RJ", "Formaplas Barra", "store-3", 33, 4.6, 4.3, 74),
  createDesigner("3-3", "Fernanda Teixeira", "Rio de Janeiro", "RJ", "Formaplas Barra", "store-3", 47, 4.8, 4.3, 85),
  createDesigner("3-4", "Leonardo Vieira", "Rio de Janeiro", "RJ", "Formaplas Barra", "store-3", 21, 4.5, 4.3, 67),
  createDesigner("3-5", "Gabriela Lopes", "Rio de Janeiro", "RJ", "Formaplas Barra", "store-3", 62, 4.9, 4.3, 94),
  createDesigner("3-6", "Marcos Ribeiro", "Rio de Janeiro", "RJ", "Formaplas Barra", "store-3", 14, 4.4, 4.3, 60),
  createDesigner("3-7", "Natália Freitas", "Rio de Janeiro", "RJ", "Formaplas Barra", "store-3", 39, 4.7, 4.3, 79),
  createDesigner("3-8", "Eduardo Cunha", "Rio de Janeiro", "RJ", "Formaplas Barra", "store-3", 26, 4.6, 4.3, 72),
  createDesigner("3-9", "Vanessa Melo", "Rio de Janeiro", "RJ", "Formaplas Barra", "store-3", 9, 4.3, 4.3, 54),
  createDesigner("3-10", "Felipe Araújo", "Rio de Janeiro", "RJ", "Formaplas Barra", "store-3", 51, 4.8, 4.3, 87),
];

// Store 4 Designers (Bertolini BH Centro - MG)
const store4Designers: Designer[] = [
  createDesigner("4", "Carlos Ferreira", "Belo Horizonte", "MG", "Bertolini BH Centro", "store-4", 8, 4.2, 4.6, 55),
  createDesigner("4-2", "Renata Machado", "Belo Horizonte", "MG", "Bertolini BH Centro", "store-4", 31, 4.6, 4.6, 73),
  createDesigner("4-3", "Rodrigo Pinto", "Belo Horizonte", "MG", "Bertolini BH Centro", "store-4", 44, 4.7, 4.6, 80),
  createDesigner("4-4", "Daniela Neves", "Belo Horizonte", "MG", "Bertolini BH Centro", "store-4", 17, 4.5, 4.6, 64),
  createDesigner("4-5", "Marcelo Duarte", "Belo Horizonte", "MG", "Bertolini BH Centro", "store-4", 56, 4.9, 4.6, 89),
  createDesigner("4-6", "Aline Castro", "Belo Horizonte", "MG", "Bertolini BH Centro", "store-4", 11, 4.3, 4.6, 57),
  createDesigner("4-7", "Vinícius Correia", "Belo Horizonte", "MG", "Bertolini BH Centro", "store-4", 38, 4.7, 4.6, 78),
  createDesigner("4-8", "Priscila Borges", "Belo Horizonte", "MG", "Bertolini BH Centro", "store-4", 23, 4.5, 4.6, 69),
  createDesigner("4-9", "Henrique Fonseca", "Belo Horizonte", "MG", "Bertolini BH Centro", "store-4", 5, 4.1, 4.6, 48),
  createDesigner("4-10", "Tatiane Moura", "Belo Horizonte", "MG", "Bertolini BH Centro", "store-4", 49, 4.8, 4.6, 84),
];

// Store 5 Designers (Favorita Curitiba - PR)
const store5Designers: Designer[] = [
  createDesigner("5", "Patricia Lima", "Curitiba", "PR", "Favorita Curitiba", "store-5", 18, 4.8, 4.8, 78),
  createDesigner("5-2", "Alexandre Batista", "Curitiba", "PR", "Favorita Curitiba", "store-5", 34, 4.7, 4.8, 76),
  createDesigner("5-3", "Cristina Azevedo", "Curitiba", "PR", "Favorita Curitiba", "store-5", 52, 4.9, 4.8, 91),
  createDesigner("5-4", "Fábio Nogueira", "Curitiba", "PR", "Favorita Curitiba", "store-5", 20, 4.5, 4.8, 66),
  createDesigner("5-5", "Helena Cavalcanti", "Curitiba", "PR", "Favorita Curitiba", "store-5", 43, 4.8, 4.8, 82),
  createDesigner("5-6", "Igor Medeiros", "Curitiba", "PR", "Favorita Curitiba", "store-5", 13, 4.4, 4.8, 61),
  createDesigner("5-7", "Jéssica Antunes", "Curitiba", "PR", "Favorita Curitiba", "store-5", 36, 4.7, 4.8, 77),
  createDesigner("5-8", "Leandro Carvalho", "Curitiba", "PR", "Favorita Curitiba", "store-5", 27, 4.6, 4.8, 73),
  createDesigner("5-9", "Mônica Siqueira", "Curitiba", "PR", "Favorita Curitiba", "store-5", 7, 4.2, 4.8, 51),
  createDesigner("5-10", "Nicolas Aguiar", "Curitiba", "PR", "Favorita Curitiba", "store-5", 59, 4.9, 4.8, 93),
];

// Store 6 Designers (Linea Porto Alegre - RS)
const store6Designers: Designer[] = [
  createDesigner("6", "Roberto Almeida", "Porto Alegre", "RS", "Linea Porto Alegre", "store-6", 52, 4.0, 4.4, 68),
  createDesigner("6-2", "Simone Pacheco", "Porto Alegre", "RS", "Linea Porto Alegre", "store-6", 30, 4.6, 4.4, 74),
  createDesigner("6-3", "Otávio Guedes", "Porto Alegre", "RS", "Linea Porto Alegre", "store-6", 46, 4.8, 4.4, 83),
  createDesigner("6-4", "Paula Vargas", "Porto Alegre", "RS", "Linea Porto Alegre", "store-6", 16, 4.4, 4.4, 63),
  createDesigner("6-5", "Sérgio Figueiredo", "Porto Alegre", "RS", "Linea Porto Alegre", "store-6", 54, 4.9, 4.4, 88),
  createDesigner("6-6", "Renata Campos", "Porto Alegre", "RS", "Linea Porto Alegre", "store-6", 12, 4.3, 4.4, 59),
  createDesigner("6-7", "Ubirajara Monteiro", "Porto Alegre", "RS", "Linea Porto Alegre", "store-6", 40, 4.7, 4.4, 80),
  createDesigner("6-8", "Valéria Esteves", "Porto Alegre", "RS", "Linea Porto Alegre", "store-6", 25, 4.5, 4.4, 70),
  createDesigner("6-9", "William Rezende", "Porto Alegre", "RS", "Linea Porto Alegre", "store-6", 4, 4.0, 4.4, 45),
  createDesigner("6-10", "Yasmin Prado", "Porto Alegre", "RS", "Linea Porto Alegre", "store-6", 48, 4.8, 4.4, 85),
];

// All designers combined
export const mockDesigners: Designer[] = [
  ...store1Designers,
  ...store2Designers,
  ...store3Designers,
  ...store4Designers,
  ...store5Designers,
  ...store6Designers,
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
    portfolioImages: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400",
      "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=400",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400",
    ],
    designers: store1Designers,
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
    portfolioImages: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400",
      "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=400",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400",
    ],
    designers: store2Designers,
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
    portfolioImages: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400",
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400",
      "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=400",
    ],
    designers: store3Designers,
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
    portfolioImages: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400",
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=400",
    ],
    designers: store4Designers,
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
    portfolioImages: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=400",
      "https://images.unsplash.com/photo-1617104678098-de229db51175?w=400",
      "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=400",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=400",
      "https://images.unsplash.com/photo-1615874694520-474822394e73?w=400",
    ],
    designers: store5Designers,
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
    portfolioImages: [
      "https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?w=400",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=400",
      "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=400",
    ],
    designers: store6Designers,
  },
];

// Helper to get stores by location
export const getStoresByLocation = (state: string, city?: string): Store[] => {
  return mockStores.filter((store) => {
    const matchesState = store.state === state;
    const matchesCity = !city || store.city === city;
    return matchesState && matchesCity;
  });
};
