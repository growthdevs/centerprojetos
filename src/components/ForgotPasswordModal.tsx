import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "E-mail inválido" })
    .max(255, { message: "E-mail deve ter no máximo 255 caracteres" }),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

interface ForgotPasswordModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBackToLogin?: () => void;
}

const ForgotPasswordModal = ({ open, onOpenChange, onBackToLogin }: ForgotPasswordModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsSubmitting(true);
    try {
      // TODO: Implement password reset logic with Supabase
      console.log("Password reset requested for:", data.email);
      setEmailSent(true);
    } catch (error) {
      console.error("Password reset error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      form.reset();
      setEmailSent(false);
    }
    onOpenChange(isOpen);
  };

  const handleBackToLogin = () => {
    form.reset();
    setEmailSent(false);
    onOpenChange(false);
    onBackToLogin?.();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md bg-background border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-primary">
            Recuperar Senha
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            {!emailSent 
              ? "Digite seu e-mail e enviaremos instruções para redefinir sua senha."
              : "Verifique sua caixa de entrada."
            }
          </DialogDescription>
        </DialogHeader>

        {!emailSent ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">E-mail</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          type="email"
                          placeholder="seu@email.com"
                          className="pl-10 border-input"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-gold hover:bg-gold-light text-primary font-semibold"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Enviar Link de Recuperação"}
              </Button>
            </form>
          </Form>
        ) : (
          <div className="flex flex-col items-center gap-4 py-6">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-center space-y-2">
              <p className="text-foreground font-medium">E-mail enviado!</p>
              <p className="text-sm text-muted-foreground">
                Se o e-mail <span className="font-medium text-foreground">{form.getValues("email")}</span> estiver cadastrado, você receberá um link para redefinir sua senha.
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              className="mt-2"
              onClick={handleBackToLogin}
            >
              Voltar para o Login
            </Button>
          </div>
        )}

        {!emailSent && (
          <button
            type="button"
            className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mt-2"
            onClick={handleBackToLogin}
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para o Login
          </button>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPasswordModal;
