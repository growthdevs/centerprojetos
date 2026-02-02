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
import { Textarea } from "@/components/ui/textarea";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { User, Briefcase, ArrowLeft, ArrowRight, Store } from "lucide-react";
import RegistrationSuccessModal from "./RegistrationSuccessModal";

const baseSchema = z.object({
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
  userType: z.enum(["client", "designer", "shopowner"], {
    required_error: "Selecione uma opção",
  }),
});

const storeSchema = z.object({
  storeName: z.string().min(2, { message: "Nome da loja é obrigatório" }),
  storePhone: z.string().optional(),
  storeWhatsapp: z.string().optional(),
  storeEmail: z.string().email({ message: "E-mail inválido" }).optional().or(z.literal("")),
});

const shopownerSchema = z.object({
  fantasyName: z.string().min(2, { message: "Nome fantasia é obrigatório" }),
  corporateName: z.string().min(2, { message: "Razão social é obrigatória" }),
  cnpj: z
    .string()
    .trim()
    .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$|^\d{14}$/, {
      message: "CNPJ inválido. Use o formato 00.000.000/0000-00",
    }),
  stateRegistration: z.string().optional(),
  segment: z.string().min(1, { message: "Selecione o segmento" }),
  commercialPhone: z.string().optional(),
  address: z.string().min(5, { message: "Endereço é obrigatório" }),
  city: z.string().min(2, { message: "Cidade é obrigatória" }),
  state: z.string().min(2, { message: "Estado é obrigatório" }),
  zipCode: z.string().optional(),
});

type BaseFormData = z.infer<typeof baseSchema>;
type StoreFormData = z.infer<typeof storeSchema>;
type ShopownerFormData = z.infer<typeof shopownerSchema>;

interface RegisterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RegisterModal = ({ open, onOpenChange }: RegisterModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successUserType, setSuccessUserType] = useState<"shopowner" | "client" | "designer">("client");

  const form = useForm<BaseFormData>({
    resolver: zodResolver(baseSchema),
    defaultValues: {
      fullName: "",
      cpf: "",
      email: "",
      whatsapp: "",
      userType: undefined,
    },
  });

  const storeForm = useForm<StoreFormData>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      storeName: "",
      storePhone: "",
      storeWhatsapp: "",
      storeEmail: "",
    },
  });

  const shopownerForm = useForm<ShopownerFormData>({
    resolver: zodResolver(shopownerSchema),
    defaultValues: {
      fantasyName: "",
      corporateName: "",
      cnpj: "",
      stateRegistration: "",
      segment: "",
      commercialPhone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
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

  const formatCNPJ = (value: string) => {
    const numbers = value.replace(/\D/g, "").slice(0, 14);
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 5) return `${numbers.slice(0, 2)}.${numbers.slice(2)}`;
    if (numbers.length <= 8)
      return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5)}`;
    if (numbers.length <= 12)
      return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8)}`;
    return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8, 12)}-${numbers.slice(12)}`;
  };

  const formatWhatsApp = (value: string) => {
    const numbers = value.replace(/\D/g, "").slice(0, 11);
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "").slice(0, 11);
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
  };

  const handleStep1Submit = async (data: BaseFormData) => {
    if (data.userType === "designer" || data.userType === "shopowner") {
      setStep(2);
    } else {
      await finalSubmit(data, null, null);
    }
  };

  const handleStep2Submit = async (storeData: StoreFormData) => {
    const baseData = form.getValues();
    await finalSubmit(baseData, storeData, null);
  };

  const handleShopownerStep2Submit = async (shopownerData: ShopownerFormData) => {
    const baseData = form.getValues();
    await finalSubmit(baseData, null, shopownerData);
  };

  const finalSubmit = async (
    baseData: BaseFormData,
    storeData: StoreFormData | null,
    shopownerData: ShopownerFormData | null
  ) => {
    setIsSubmitting(true);
    try {
      console.log("Form submitted:", {
        ...baseData,
        cpf: "***",
        store: storeData,
        shopowner: shopownerData ? { ...shopownerData, cnpj: "***" } : null,
      });

      setSuccessUserType(baseData.userType as "shopowner" | "client" | "designer");
      onOpenChange(false);
      form.reset();
      storeForm.reset();
      shopownerForm.reset();
      setStep(1);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Registration error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    form.reset();
    storeForm.reset();
    shopownerForm.reset();
    setStep(1);
  };

  const currentUserType = form.watch("userType");

  return (
    <>
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md bg-background border-border max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center text-primary">
              {step === 1
                ? "Cadastro"
                : currentUserType === "shopowner"
                ? "Dados da Loja"
                : "Vincular Loja"}
            </DialogTitle>
            {step === 2 && currentUserType === "designer" && (
              <p className="text-center text-muted-foreground text-sm mt-2">
                Como projetista, você precisa vincular uma loja ao seu perfil
              </p>
            )}
            {step === 2 && currentUserType === "shopowner" && (
              <p className="text-center text-muted-foreground text-sm mt-2">
                Informe os dados completos da sua loja
              </p>
            )}
          </DialogHeader>

          {step === 1 ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleStep1Submit)} className="space-y-4 mt-4">
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
                                ? "border-primary bg-primary/10"
                                : "border-border hover:border-primary/50"
                            }`}
                          >
                            <RadioGroupItem value="client" id="client" className="sr-only" />
                            <div
                              className={`p-2 rounded-full ${
                                field.value === "client" ? "bg-primary/20" : "bg-muted"
                              }`}
                            >
                              <User
                                className={`w-5 h-5 ${
                                  field.value === "client" ? "text-primary" : "text-muted-foreground"
                                }`}
                              />
                            </div>
                            <div>
                              <p className="font-medium text-foreground">
                                Sou cliente procurando projetistas
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Quero orçamentos para meu projeto
                              </p>
                            </div>
                          </label>

                          <label
                            htmlFor="designer"
                            className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                              field.value === "designer"
                                ? "border-primary bg-primary/10"
                                : "border-border hover:border-primary/50"
                            }`}
                          >
                            <RadioGroupItem value="designer" id="designer" className="sr-only" />
                            <div
                              className={`p-2 rounded-full ${
                                field.value === "designer" ? "bg-primary/20" : "bg-muted"
                              }`}
                            >
                              <Briefcase
                                className={`w-5 h-5 ${
                                  field.value === "designer" ? "text-primary" : "text-muted-foreground"
                                }`}
                              />
                            </div>
                            <div>
                              <p className="font-medium text-foreground">Sou um projetista</p>
                              <p className="text-sm text-muted-foreground">
                                Quero oferecer meus serviços
                              </p>
                            </div>
                          </label>

                          <label
                            htmlFor="shopowner"
                            className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                              field.value === "shopowner"
                                ? "border-primary bg-primary/10"
                                : "border-border hover:border-primary/50"
                            }`}
                          >
                            <RadioGroupItem value="shopowner" id="shopowner" className="sr-only" />
                            <div
                              className={`p-2 rounded-full ${
                                field.value === "shopowner" ? "bg-primary/20" : "bg-muted"
                              }`}
                            >
                              <Store
                                className={`w-5 h-5 ${
                                  field.value === "shopowner" ? "text-primary" : "text-muted-foreground"
                                }`}
                              />
                            </div>
                            <div>
                              <p className="font-medium text-foreground">Sou lojista</p>
                              <p className="text-sm text-muted-foreground">
                                Quero cadastrar minha loja na plataforma
                              </p>
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
                  variant="accent"
                  className="w-full mt-6"
                  disabled={isSubmitting}
                >
                  {currentUserType === "designer" || currentUserType === "shopowner" ? (
                    <>
                      Próximo
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  ) : isSubmitting ? (
                    "Cadastrando..."
                  ) : (
                    "Criar Conta"
                  )}
                </Button>

                <p className="text-center text-sm text-muted-foreground pt-2">
                  Já tem uma conta?{" "}
                  <button
                    type="button"
                    className="text-primary font-medium hover:underline"
                    onClick={() => handleClose()}
                  >
                    Entrar
                  </button>
                </p>
              </form>
            </Form>
          ) : currentUserType === "shopowner" ? (
            <Form {...shopownerForm}>
              <form
                onSubmit={shopownerForm.handleSubmit(handleShopownerStep2Submit)}
                className="space-y-4 mt-4"
              >
                <div className="p-3 bg-primary/10 rounded-lg border border-primary/30 mb-4">
                  <div className="flex items-center gap-2 text-primary">
                    <Store className="w-5 h-5" />
                    <span className="font-medium">Dados da Loja</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={shopownerForm.control}
                    name="fantasyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Nome Fantasia *</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome da loja" className="border-input" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={shopownerForm.control}
                    name="corporateName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Razão Social *</FormLabel>
                        <FormControl>
                          <Input placeholder="Razão social completa" className="border-input" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={shopownerForm.control}
                    name="cnpj"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">CNPJ *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="00.000.000/0000-00"
                            className="border-input"
                            {...field}
                            onChange={(e) => {
                              field.onChange(formatCNPJ(e.target.value));
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={shopownerForm.control}
                    name="stateRegistration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Inscrição Estadual</FormLabel>
                        <FormControl>
                          <Input placeholder="Número da IE" className="border-input" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={shopownerForm.control}
                    name="segment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Segmento de Atuação *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o segmento" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="moveis_planejados">Móveis Planejados</SelectItem>
                            <SelectItem value="design_interiores">Design de Interiores</SelectItem>
                            <SelectItem value="decoracao">Decoração</SelectItem>
                            <SelectItem value="marcenaria">Marcenaria</SelectItem>
                            <SelectItem value="outro">Outro</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={shopownerForm.control}
                    name="commercialPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Telefone Comercial</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="(00) 0000-0000"
                            className="border-input"
                            {...field}
                            onChange={(e) => {
                              field.onChange(formatPhone(e.target.value));
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={shopownerForm.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Endereço Completo *</FormLabel>
                      <FormControl>
                        <Input placeholder="Rua, número, bairro" className="border-input" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <FormField
                    control={shopownerForm.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Cidade *</FormLabel>
                        <FormControl>
                          <Input placeholder="Cidade" className="border-input" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={shopownerForm.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Estado *</FormLabel>
                        <FormControl>
                          <Input placeholder="UF" className="border-input" maxLength={2} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={shopownerForm.control}
                    name="zipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">CEP</FormLabel>
                        <FormControl>
                          <Input placeholder="00000-000" className="border-input" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Voltar
                  </Button>
                  <Button type="submit" variant="accent" className="flex-1" disabled={isSubmitting}>
                    {isSubmitting ? "Cadastrando..." : "Cadastrar Loja"}
                  </Button>
                </div>
              </form>
            </Form>
          ) : (
            <Form {...storeForm}>
              <form onSubmit={storeForm.handleSubmit(handleStep2Submit)} className="space-y-4 mt-4">
                <div className="p-4 bg-primary/10 rounded-lg border border-primary/30 mb-4">
                  <div className="flex items-center gap-2 text-primary">
                    <Store className="w-5 h-5" />
                    <span className="font-medium">Dados da Loja Vinculada</span>
                  </div>
                </div>

                <FormField
                  control={storeForm.control}
                  name="storeName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Nome da Loja *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nome da loja onde você atua"
                          className="border-input"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={storeForm.control}
                  name="storePhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Telefone da Loja</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="(00) 0000-0000"
                          className="border-input"
                          {...field}
                          onChange={(e) => {
                            field.onChange(formatPhone(e.target.value));
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={storeForm.control}
                  name="storeWhatsapp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">WhatsApp da Loja</FormLabel>
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
                  control={storeForm.control}
                  name="storeEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">E-mail da Loja</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="loja@email.com"
                          className="border-input"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Voltar
                  </Button>
                  <Button type="submit" variant="accent" className="flex-1" disabled={isSubmitting}>
                    {isSubmitting ? "Cadastrando..." : "Criar Conta"}
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </DialogContent>
      </Dialog>

      <RegistrationSuccessModal
        open={showSuccessModal}
        onOpenChange={setShowSuccessModal}
        userType={successUserType}
      />
    </>
  );
};

export default RegisterModal;
