import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const designerSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, { message: "Nome deve ter pelo menos 3 caracteres" })
    .max(100, { message: "Nome deve ter no máximo 100 caracteres" }),
  cpf: z
    .string()
    .trim()
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/, {
      message: "CPF inválido. Use o formato 000.000.000-00",
    }),
  birthDate: z
    .string()
    .trim()
    .min(1, { message: "Data de nascimento é obrigatória" }),
  whatsapp: z
    .string()
    .trim()
    .regex(/^\(\d{2}\)\s?\d{4,5}-?\d{4}$|^\d{10,11}$/, {
      message: "WhatsApp inválido. Use o formato (00) 00000-0000",
    }),
  email: z
    .string()
    .trim()
    .email({ message: "E-mail inválido" })
    .max(255, { message: "E-mail deve ter no máximo 255 caracteres" }),
});

type DesignerFormData = z.infer<typeof designerSchema>;

interface AddDesignerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDesignerAdded?: (designer: DesignerFormData) => void;
}

const AddDesignerModal = ({ open, onOpenChange, onDesignerAdded }: AddDesignerModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<DesignerFormData>({
    resolver: zodResolver(designerSchema),
    defaultValues: {
      fullName: "",
      cpf: "",
      birthDate: "",
      whatsapp: "",
      email: "",
    },
  });

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, "").slice(0, 11);
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `${numbers.slice(0, 3)}.${numbers.slice(3)}`;
    if (numbers.length <= 9)
      return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`;
    return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9)}`;
  };

  const formatWhatsApp = (value: string) => {
    const numbers = value.replace(/\D/g, "").slice(0, 11);
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
  };

  const onSubmit = async (data: DesignerFormData) => {
    setIsSubmitting(true);
    try {
      // Simular envio para análise
      console.log("Designer submitted for approval:", {
        ...data,
        cpf: "***",
      });

      toast({
        title: "Projetista enviado para análise!",
        description: "A Center Projetos irá analisar o cadastro em até 3 dias úteis.",
      });

      onDesignerAdded?.(data);
      onOpenChange(false);
      form.reset();
    } catch (error) {
      toast({
        title: "Erro ao cadastrar",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-background border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
        <DialogTitle className="text-2xl font-bold text-center text-primary flex items-center justify-center gap-2">
            <UserPlus className="w-6 h-6" />
            Adicionar Projetista
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Nome Completo *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nome completo do profissional"
                      className="border-input"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">CPF *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="000.000.000-00"
                      className="border-input"
                      {...field}
                      onChange={(e) => {
                        field.onChange(formatCPF(e.target.value));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Data de Nascimento *</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      className="border-input"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="whatsapp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">WhatsApp *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="(00) 00000-0000"
                      className="border-input"
                      {...field}
                      onChange={(e) => {
                        field.onChange(formatWhatsApp(e.target.value));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">E-mail *</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="email@exemplo.com"
                      className="border-input"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="bg-muted/50 p-3 rounded-lg text-sm text-muted-foreground">
              <p>📋 O cadastro será enviado para análise da Center Projetos. Prazo de aprovação: até 3 dias úteis.</p>
            </div>

            <Button
              type="submit"
              variant="accent"
              className="w-full mt-6"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Cadastrar Projetista"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDesignerModal;
