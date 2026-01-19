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
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Usuário é obrigatório" }),
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
  defaultTab?: "client" | "designer";
  onLoginSuccess?: () => void;
}

const LoginModal = ({ 
  open, 
  onOpenChange, 
  onOpenRegister, 
  onOpenForgotPassword,
  defaultTab = "client",
  onLoginSuccess
}: LoginModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userType, setUserType] = useState<"client" | "designer">(defaultTab);
  const [loginError, setLoginError] = useState<string | null>(null);
  const { login } = useAuth();
  const { toast } = useToast();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    setLoginError(null);
    try {
      const success = login(data.email, data.password, userType);
      if (success) {
        toast({
          title: "Login realizado com sucesso!",
          description: `Bem-vindo ao Center Projetos.`,
        });
        onOpenChange(false);
        form.reset();
        onLoginSuccess?.();
      } else {
        setLoginError("Usuário ou senha incorretos. Tente: projetista / 123456");
      }
    } catch (error) {
      setLoginError("Erro ao fazer login. Tente novamente.");
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
              className="flex items-center gap-2 data-[state=active]:bg-gradient-accent data-[state=active]:text-primary"
            >
              <User className="w-4 h-4" />
              Cliente
            </TabsTrigger>
            <TabsTrigger 
              value="designer"
              className="flex items-center gap-2 data-[state=active]:bg-gradient-accent data-[state=active]:text-primary"
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
                  className="text-sm text-blue-dark hover:underline"
                  onClick={() => {
                    onOpenChange(false);
                    onOpenForgotPassword?.();
                  }}
                >
                  Esqueceu sua senha?
                </button>

                {loginError && userType === "client" && (
                  <p className="text-sm text-destructive">{loginError}</p>
                )}

                <Button
                  type="submit"
                  variant="accent"
                  className="w-full"
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
                  className="text-sm text-blue-dark hover:underline"
                  onClick={() => {
                    onOpenChange(false);
                    onOpenForgotPassword?.();
                  }}
                >
                  Esqueceu sua senha?
                </button>

                {loginError && userType === "designer" && (
                  <p className="text-sm text-destructive">{loginError}</p>
                )}

                <p className="text-xs text-muted-foreground">
                  Demo: usuário <strong>projetista</strong> / senha <strong>123456</strong>
                </p>

                <Button
                  type="submit"
                  variant="accent"
                  className="w-full"
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
            className="text-blue-dark font-medium hover:underline"
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
