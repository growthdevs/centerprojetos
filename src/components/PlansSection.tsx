import { Check, X } from "lucide-react";

const comparisonData = [
  {
    benefit: "Descontos",
    smart: { available: true, description: "Até 10%" },
    premium: { available: true, description: "10% garantido" },
  },
  {
    benefit: "Orçamentos",
    smart: { available: true, description: "Até 3 orçamentos" },
    premium: { available: true, description: "Sem limites" },
  },
  {
    benefit: "Suporte",
    smart: { available: true, description: "Básico" },
    premium: { available: true, description: "Dedicado" },
  },
  {
    benefit: "Vitrine de Lojas",
    smart: { available: true, description: "Lojas verificadas" },
    premium: { available: true, description: "Lojas verificadas" },
  },
  {
    benefit: "Sugestões de Lojas",
    smart: { available: false },
    premium: { available: true, description: "Indicação da Center" },
  },
  {
    benefit: "Escolha de Profissionais",
    smart: { available: true, description: "Cliente escolhe" },
    premium: { available: true, description: "Profissionais exclusivos" },
  },
  {
    benefit: "Acompanhamento de prazos",
    smart: { available: true, description: "Básico" },
    premium: { available: true, description: "Profissional dedicado" },
  },
  {
    benefit: "Projeto exclusivo Center",
    smart: { available: false },
    premium: { available: true },
  },
  {
    benefit: "Acompanhamento às lojas",
    smart: { available: false },
    premium: { available: true },
  },
  {
    benefit: "Análise de negócio",
    smart: { available: false },
    premium: { available: true },
  },
  {
    benefit: "Análise de projeto executivo",
    smart: { available: false },
    premium: { available: true },
  },
  {
    benefit: "Acompanhamento de montagem",
    smart: { available: false },
    premium: { available: true },
  },
  {
    benefit: "Intermediação",
    smart: { available: false },
    premium: { available: true },
  },
  {
    benefit: "Vistoria final",
    smart: { available: true, description: "Básica" },
    premium: { available: true, description: "Completa" },
  },
];

const PlansSection = () => {
  return (
    <section id="planos" className="py-24 bg-primary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Comparativo de Planos – Center Projetos
          </h2>
        </div>

        {/* Comparison Table */}
        <div className="max-w-4xl mx-auto overflow-x-auto">
          <table className="w-full border-collapse">
            {/* Header */}
            <thead>
              <tr>
                <th className="p-4 text-left text-primary-foreground font-bold border-b border-primary-foreground/20">
                  BENEFÍCIO
                </th>
                <th className="p-4 text-center border-b border-primary-foreground/20">
                  <div className="inline-block bg-[#104DB1] text-white px-4 py-2 rounded-lg font-bold">
                    CONSULTORIA SMART
                  </div>
                  <p className="text-primary-foreground/70 text-sm mt-1">(GRÁTIS)</p>
                </th>
                <th className="p-4 text-center border-b border-primary-foreground/20">
                  <div className="inline-block bg-accent text-accent-foreground px-4 py-2 rounded-lg font-bold">
                    CONSULTORIA PREMIUM
                  </div>
                  <p className="text-primary-foreground/70 text-sm mt-1">(PAGA)</p>
                </th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {comparisonData.map((row, index) => (
                <tr
                  key={row.benefit}
                  className={`${
                    index % 2 === 0 ? "bg-primary-foreground/5" : ""
                  } hover:bg-primary-foreground/10 transition-colors`}
                >
                  <td className="p-4 text-primary-foreground font-medium border-b border-primary-foreground/10">
                    {row.benefit}
                  </td>
                  <td className="p-4 text-center border-b border-primary-foreground/10">
                    {row.smart.available ? (
                      <div className="flex flex-col items-center gap-1">
                        <Check className="w-5 h-5 text-emerald-400" />
                        {row.smart.description && (
                          <span className="text-primary-foreground/80 text-sm">
                            {row.smart.description}
                          </span>
                        )}
                      </div>
                    ) : (
                      <X className="w-5 h-5 text-destructive mx-auto" />
                    )}
                  </td>
                  <td className="p-4 text-center border-b border-primary-foreground/10">
                    {row.premium.available ? (
                      <div className="flex flex-col items-center gap-1">
                        <Check className="w-5 h-5 text-emerald-400" />
                        {row.premium.description && (
                          <span className="text-primary-foreground/80 text-sm">
                            {row.premium.description}
                          </span>
                        )}
                      </div>
                    ) : (
                      <X className="w-5 h-5 text-destructive mx-auto" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default PlansSection;
