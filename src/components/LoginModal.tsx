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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Briefcase, Mail, Lock } from "lucide-react";

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "E-mail inválido" })
    .max(255, { message: "E-mail deve ter no máximo 255 caracteres" }),
  password: z
    .string()
    .min(6, { message: "Senha deve ter pelo menos 6 caracteres" }),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOpenRegister?: () => void;
  onOpenForgotPassword?: () => void;
}

const LoginModal = ({ open, onOpenChange, onOpenRegister, onOpenForgotPassword }: LoginModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userType, setUserType] = useState<"client" | "designer">("client");

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    try {
      // TODO: Implement login logic with Supabase
      console.log("Login submitted:", { email: data.email, userType });
      onOpenChange(false);
      form.reset();
    } catch (error) {
      console.error("Login error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      form.reset();
    }
    onOpenChange(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md bg-background border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-primary">
            Entrar
          </DialogTitle>
        </DialogHeader>

        <Tabs value={userType} onValueChange={(v) => setUserType(v as "client" | "designer")} className="w-full mt-4">
          <TabsList className="grid w-full grid-cols-2 bg-muted">
            <TabsTrigger 
              value="client" 
              className="flex items-center gap-2 data-[state=active]:bg-gold data-[state=active]:text-primary"
            >
              <User className="w-4 h-4" />
              Cliente
            </TabsTrigger>
            <TabsTrigger 
              value="designer"
              className="flex items-center gap-2 data-[state=active]:bg-gold data-[state=active]:text-primary"
            >
              <Briefcase className="w-4 h-4" />
              Projetista
            </TabsTrigger>
          </TabsList>

          <TabsContent value="client" className="mt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Senha</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            type="password"
                            placeholder="••••••••"
                            className="pl-10 border-input"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <button
                  type="button"
                  className="text-sm text-gold hover:underline"
                  onClick={() => {
                    onOpenChange(false);
                    onOpenForgotPassword?.();
                  }}
                >
                  Esqueceu sua senha?
                </button>

                <Button
                  type="submit"
                  className="w-full bg-gold hover:bg-gold-light text-primary font-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Entrando..." : "Entrar como Cliente"}
                </Button>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="designer" className="mt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Senha</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            type="password"
                            placeholder="••••••••"
                            className="pl-10 border-input"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <button
                  type="button"
                  className="text-sm text-gold hover:underline"
                  onClick={() => {
                    onOpenChange(false);
                    onOpenForgotPassword?.();
                  }}
                >
                  Esqueceu sua senha?
                </button>

                <Button
                  type="submit"
                  className="w-full bg-gold hover:bg-gold-light text-primary font-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Entrando..." : "Entrar como Projetista"}
                </Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>

        <p className="text-center text-sm text-muted-foreground pt-2">
          Não tem uma conta?{" "}
          <button
            type="button"
            className="text-gold font-medium hover:underline"
            onClick={() => {
              onOpenChange(false);
              onOpenRegister?.();
            }}
          >
            Criar Conta
          </button>
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
