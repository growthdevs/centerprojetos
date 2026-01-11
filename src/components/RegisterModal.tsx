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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { User, Briefcase } from "lucide-react";

const registerSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, { message: "Nome deve ter pelo menos 3 caracteres" })
    .max(100, { message: "Nome deve ter no máximo 100 caracteres" }),
  cpf: z
    .string()
    .trim()
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/, {
      message: "CPF inválido. Use o formato 000.000.000-00 ou apenas números",
    }),
  email: z
    .string()
    .trim()
    .email({ message: "E-mail inválido" })
    .max(255, { message: "E-mail deve ter no máximo 255 caracteres" }),
  whatsapp: z
    .string()
    .trim()
    .regex(/^\(\d{2}\)\s?\d{4,5}-?\d{4}$|^\d{10,11}$/, {
      message: "WhatsApp inválido. Use o formato (00) 00000-0000",
    }),
  userType: z.enum(["client", "designer"], {
    required_error: "Selecione uma opção",
  }),
});

type RegisterFormData = z.infer<typeof registerSchema>;

interface RegisterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RegisterModal = ({ open, onOpenChange }: RegisterModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      cpf: "",
      email: "",
      whatsapp: "",
      userType: undefined,
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

  const onSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true);
    try {
      // TODO: Implement registration logic with Supabase
      console.log("Form submitted:", { ...data, cpf: "***" }); // Don't log sensitive data
      onOpenChange(false);
      form.reset();
    } catch (error) {
      console.error("Registration error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-background border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-primary">
            Cadastro
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Nome Completo</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite seu nome completo"
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
                  <FormLabel className="text-foreground">CPF</FormLabel>
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">E-mail</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="seu@email.com"
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
                  <FormLabel className="text-foreground">WhatsApp</FormLabel>
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
              name="userType"
              render={({ field }) => (
                <FormItem className="pt-2">
                  <FormLabel className="text-foreground">Qual seu perfil?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="grid grid-cols-1 gap-3 pt-2"
                    >
                      <label
                        htmlFor="client"
                        className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          field.value === "client"
                            ? "border-gold bg-gold/10"
                            : "border-border hover:border-gold/50"
                        }`}
                      >
                        <RadioGroupItem value="client" id="client" className="sr-only" />
                        <div className={`p-2 rounded-full ${field.value === "client" ? "bg-gold" : "bg-muted"}`}>
                          <User className={`w-5 h-5 ${field.value === "client" ? "text-primary" : "text-muted-foreground"}`} />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Sou cliente procurando projetistas</p>
                          <p className="text-sm text-muted-foreground">Quero orçamentos para meu projeto</p>
                        </div>
                      </label>

                      <label
                        htmlFor="designer"
                        className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          field.value === "designer"
                            ? "border-gold bg-gold/10"
                            : "border-border hover:border-gold/50"
                        }`}
                      >
                        <RadioGroupItem value="designer" id="designer" className="sr-only" />
                        <div className={`p-2 rounded-full ${field.value === "designer" ? "bg-gold" : "bg-muted"}`}>
                          <Briefcase className={`w-5 h-5 ${field.value === "designer" ? "text-primary" : "text-muted-foreground"}`} />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Sou um projetista</p>
                          <p className="text-sm text-muted-foreground">Quero oferecer meus serviços</p>
                        </div>
                      </label>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-gold hover:bg-gold-light text-primary font-semibold mt-6"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Cadastrando..." : "Criar Conta"}
            </Button>

            <p className="text-center text-sm text-muted-foreground pt-2">
              Já tem uma conta?{" "}
              <button
                type="button"
                className="text-gold font-medium hover:underline"
                onClick={() => {
                  onOpenChange(false);
                  // TODO: Open login modal
                }}
              >
                Entrar
              </button>
            </p>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterModal;
