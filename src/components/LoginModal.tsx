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
import { User, Briefcase, Mail, Lock, Store } from "lucide-react";
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
  defaultTab?: "client" | "designer" | "shopowner";
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
  const [userType, setUserType] = useState<"client" | "designer" | "shopowner">(defaultTab);
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
        const demoHint = userType === "shopowner" 
          ? "Tente: lojista / 123456"
          : userType === "designer"
          ? "Tente: projetista / 123456"
          : "Tente: cliente / 123456";
        setLoginError(`Usuário ou senha incorretos. ${demoHint}`);
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
      setLoginError(null);
    }
    onOpenChange(isOpen);
  };

  const handleTabChange = (value: string) => {
    setUserType(value as "client" | "designer" | "shopowner");
    setLoginError(null);
    form.reset();
  };

  const getButtonLabel = () => {
    switch (userType) {
      case "client":
        return isSubmitting ? "Entrando..." : "Entrar como Cliente";
      case "designer":
        return isSubmitting ? "Entrando..." : "Entrar como Projetista";
      case "shopowner":
        return isSubmitting ? "Entrando..." : "Entrar como Lojista";
    }
  };

  const getDemoCredentials = () => {
    switch (userType) {
      case "client":
        return null;
      case "designer":
        return { user: "projetista", pass: "123456" };
      case "shopowner":
        return { user: "lojista", pass: "123456" };
    }
  };

  const demoCredentials = getDemoCredentials();

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md bg-background border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-primary">
            Entrar
          </DialogTitle>
        </DialogHeader>

        <Tabs value={userType} onValueChange={handleTabChange} className="w-full mt-4">
          <TabsList className="grid w-full grid-cols-3 bg-muted">
            <TabsTrigger 
              value="client" 
              className="flex items-center gap-1.5 text-xs sm:text-sm data-[state=active]:bg-[#104DB1] data-[state=active]:text-white"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Cliente</span>
              <span className="sm:hidden">Cliente</span>
            </TabsTrigger>
            <TabsTrigger 
              value="designer"
              className="flex items-center gap-1.5 text-xs sm:text-sm data-[state=active]:bg-[#104DB1] data-[state=active]:text-white"
            >
              <Briefcase className="w-4 h-4" />
              <span className="hidden sm:inline">Projetista</span>
              <span className="sm:hidden">Proj.</span>
            </TabsTrigger>
            <TabsTrigger 
              value="shopowner"
              className="flex items-center gap-1.5 text-xs sm:text-sm data-[state=active]:bg-[#104DB1] data-[state=active]:text-white"
            >
              <Store className="w-4 h-4" />
              <span className="hidden sm:inline">Lojista</span>
              <span className="sm:hidden">Lojista</span>
            </TabsTrigger>
          </TabsList>

          {/* Single form for all tabs */}
          <div className="mt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">E-mail ou Usuário</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            type="text"
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

                {loginError && (
                  <p className="text-sm text-destructive">{loginError}</p>
                )}

                {demoCredentials && (
                  <p className="text-xs text-muted-foreground">
                    Demo: usuário <strong>{demoCredentials.user}</strong> / senha{" "}
                    <strong>{demoCredentials.pass}</strong>
                  </p>
                )}

                <Button
                  type="submit"
                  variant="accent"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {getButtonLabel()}
                </Button>
              </form>
            </Form>
          </div>
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
