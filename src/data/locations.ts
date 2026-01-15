export const states = [
  { value: "SP", label: "São Paulo" },
  { value: "RJ", label: "Rio de Janeiro" },
  { value: "MG", label: "Minas Gerais" },
  { value: "PR", label: "Paraná" },
  { value: "RS", label: "Rio Grande do Sul" },
];

export const citiesByState: Record<string, string[]> = {
  SP: ["São Paulo", "Campinas", "Santos", "Ribeirão Preto"],
  RJ: ["Rio de Janeiro", "Niterói", "Petrópolis"],
  MG: ["Belo Horizonte", "Uberlândia", "Contagem"],
  PR: ["Curitiba", "Londrina", "Maringá"],
  RS: ["Porto Alegre", "Caxias do Sul", "Pelotas"],
};
