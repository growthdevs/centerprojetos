import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown, UserCheck } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data - será substituído por dados reais do banco
const mockProfessionals = [
  { id: "CP001", name: "Maria Silva" },
  { id: "CP002", name: "João Santos" },
  { id: "CP003", name: "Ana Oliveira" },
  { id: "CP004", name: "Pedro Costa" },
  { id: "CP005", name: "Carla Ferreira" },
  { id: "CP006", name: "Lucas Martins" },
  { id: "CP007", name: "Fernanda Lima" },
  { id: "CP008", name: "Ricardo Alves" },
];

interface ReferralModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContinue?: (professionalId: string, professionalName: string) => void;
}

const ReferralModal = ({ open, onOpenChange, onContinue }: ReferralModalProps) => {
  const [comboboxOpen, setComboboxOpen] = useState(false);
  const [selectedProfessional, setSelectedProfessional] = useState<string>("");
  const [manualCode, setManualCode] = useState("");
  const [searchMode, setSearchMode] = useState<"select" | "manual">("select");

  const selectedProfessionalData = mockProfessionals.find(
    (p) => `${p.name} - ${p.id}` === selectedProfessional
  );

  const handleContinue = () => {
    if (searchMode === "select" && selectedProfessionalData) {
      onContinue?.(selectedProfessionalData.id, selectedProfessionalData.name);
      onOpenChange(false);
      resetForm();
    } else if (searchMode === "manual" && manualCode.trim()) {
      // Procura pelo código ou nome
      const found = mockProfessionals.find(
        (p) =>
          p.id.toLowerCase() === manualCode.trim().toLowerCase() ||
          p.name.toLowerCase().includes(manualCode.trim().toLowerCase())
      );
      if (found) {
        onContinue?.(found.id, found.name);
        onOpenChange(false);
        resetForm();
      }
    }
  };

  const resetForm = () => {
    setSelectedProfessional("");
    setManualCode("");
    setSearchMode("select");
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      resetForm();
    }
    onOpenChange(newOpen);
  };

  const isValid =
    (searchMode === "select" && selectedProfessional) ||
    (searchMode === "manual" && manualCode.trim().length > 0);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md bg-background border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-primary flex items-center justify-center gap-2">
            <UserCheck className="w-6 h-6 text-blue-dark" />
            Indicação de Profissional
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Selecione ou digite o código do profissional que indicou você
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Tabs para alternar entre modos */}
          <div className="flex rounded-lg border border-border overflow-hidden">
            <button
              type="button"
              onClick={() => setSearchMode("select")}
              className={cn(
                "flex-1 py-2.5 text-sm font-medium transition-colors",
                searchMode === "select"
                  ? "bg-[#104DB1] text-white"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              Selecionar da Lista
            </button>
            <button
              type="button"
              onClick={() => setSearchMode("manual")}
              className={cn(
                "flex-1 py-2.5 text-sm font-medium transition-colors",
                searchMode === "manual"
                  ? "bg-[#104DB1] text-white"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              Digitar Código
            </button>
          </div>

          {searchMode === "select" ? (
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Profissional
              </label>
              <Popover open={comboboxOpen} onOpenChange={setComboboxOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={comboboxOpen}
                    className="w-full justify-between border-input bg-background hover:bg-muted"
                  >
                    {selectedProfessional || "Selecione um profissional..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 bg-background border-border">
                  <Command className="bg-background">
                    <CommandInput 
                      placeholder="Buscar por nome ou código..." 
                      className="border-none focus:ring-0"
                    />
                    <CommandList>
                      <CommandEmpty>Nenhum profissional encontrado.</CommandEmpty>
                      <CommandGroup>
                        {mockProfessionals.map((professional) => {
                          const displayValue = `${professional.name} - ${professional.id}`;
                          return (
                            <CommandItem
                              key={professional.id}
                              value={displayValue}
                              onSelect={(currentValue) => {
                                setSelectedProfessional(
                                  currentValue === selectedProfessional ? "" : currentValue
                                );
                                setComboboxOpen(false);
                              }}
                              className="cursor-pointer"
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  selectedProfessional === displayValue
                                    ? "opacity-100 text-blue-dark"
                                    : "opacity-0"
                                )}
                              />
                              <span className="font-medium">{professional.name}</span>
                              <span className="ml-2 text-muted-foreground">
                                - {professional.id}
                              </span>
                            </CommandItem>
                          );
                        })}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <p className="text-xs text-muted-foreground">
                Digite para buscar por nome ou código do profissional
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Código ou Nome do Profissional
              </label>
              <Input
                placeholder="Ex: CP001 ou Maria Silva"
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value)}
                className="border-input"
              />
              <p className="text-xs text-muted-foreground">
                Digite o código (ex: CP001) ou o nome do profissional
              </p>
            </div>
          )}

          {/* Preview do profissional selecionado */}
          {searchMode === "select" && selectedProfessionalData && (
            <div className="p-4 rounded-lg bg-blue-light/20 border border-blue-mid/30">
              <p className="text-sm font-medium text-foreground">
                Profissional selecionado:
              </p>
              <p className="text-lg font-bold text-blue-dark">
                {selectedProfessionalData.name}
              </p>
              <p className="text-sm text-muted-foreground">
                Código: {selectedProfessionalData.id}
              </p>
            </div>
          )}

          <Button
            onClick={handleContinue}
            disabled={!isValid}
            variant="accent"
            className="w-full"
          >
            Continuar
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Não tem indicação?{" "}
            <button
              type="button"
              className="text-blue-dark font-medium hover:underline"
              onClick={() => handleOpenChange(false)}
            >
              Voltar
            </button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReferralModal;
