import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Award, Users, TrendingUp, Shield, Star, Briefcase } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoginModal from "@/components/LoginModal";
import { useAuth } from "@/contexts/AuthContext";

const PortalProjetista = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { isAuthenticated, userType } = useAuth();
  const navigate = useNavigate();

  const handleAccessDashboard = () => {
    if (isAuthenticated && userType === "designer") {
      navigate("/projetista/dashboard");
    } else {
      setIsLoginOpen(true);
    }
  };

  const handleLoginSuccess = () => {
    navigate("/projetista/dashboard");
  };
  const benefits = [
    {
      icon: Award,
      title: "Construa sua Reputação",
      description: "Desenvolva um perfil profissional próprio com sistema de qualificação por níveis e medalhas que reconhecem sua experiência e consistência."
    },
    {
      icon: Users,
      title: "Clientes Qualificados",
      description: "Receba demandas de clientes que buscam organização e segurança no processo de compra de móveis planejados."
    },
    {
      icon: TrendingUp,
      title: "Perfil Independente",
      description: "Seu perfil pertence a você e não está vinculado permanentemente a uma loja, preservando seu histórico profissional."
    },
    {
      icon: Shield,
      title: "Avaliação Justa",
      description: "Seja avaliado apenas por critérios compatíveis com sua função técnica, sem responsabilidade por fabricação ou montagem."
    },
    {
      icon: Star,
      title: "Destaque Profissional",
      description: "Mostre seu portfólio com até 10 trabalhos selecionados para potenciais clientes conhecerem seu trabalho."
    },
    {
      icon: Briefcase,
      title: "Autonomia Profissional",
      description: "Atue de forma integrada às lojas parceiras, mantendo sua autonomia e respeitando os fluxos comerciais."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-primary to-primary/90">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Portal do <span className="text-gold">Projetista</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed">
              Faça parte da Center Projetos como profissional habilitado e receba demandas qualificadas de clientes em busca de móveis planejados.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gold hover:bg-gold-light text-primary font-bold text-lg px-8 py-6"
              >
                Quero me Cadastrar
              </Button>
              <Button 
                size="lg" 
                variant="heroOutline"
                className="font-bold text-lg px-8 py-6"
                onClick={handleAccessDashboard}
              >
                Acessar Meu Espaço
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-8">
              O Papel do <span className="text-gold">Projetista</span> na Center
            </h2>
            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                O projetista participa da Center Projetos como <strong className="text-foreground">profissional habilitado</strong> a atuar junto às lojas cadastradas, recebendo demandas qualificadas provenientes de clientes que buscam maior organização e segurança no processo de compra de móveis planejados.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Ao integrar a plataforma, o projetista constrói um <strong className="text-foreground">perfil profissional próprio e individual</strong>, cuja reputação é desenvolvida de forma progressiva por meio da atuação em projetos vinculados à Center, avaliações dos clientes e um sistema de qualificação por níveis (medalhas), que reconhece experiência, recorrência e consistência de desempenho.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Esse perfil <strong className="text-foreground">pertence ao projetista</strong> e não está condicionado de forma permanente ao seu vínculo com uma loja específica, podendo acompanhá-lo em eventuais mudanças de parceria comercial dentro da plataforma, preservando seu histórico profissional.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                As avaliações são baseadas em critérios compatíveis com a função técnica: atendimento, qualidade do projeto, comunicação, clareza de informações, acompanhamento e cumprimento de prazos — <strong className="text-foreground">não incluindo aspectos relacionados à fabricação, entrega ou montagem</strong>, que são atribuições exclusivas das lojas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
            Por que ser um <span className="text-gold">Projetista Center</span>?
          </h2>
          <p className="text-center text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
            Descubra as vantagens de fazer parte da nossa plataforma e como podemos impulsionar sua carreira.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="bg-card rounded-xl p-6 shadow-md border border-border hover:border-gold/50 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                  <benefit.icon className="w-7 h-7 text-gold" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Pronto para <span className="text-gold">crescer</span> com a Center?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Junte-se a uma rede de profissionais qualificados e comece a receber demandas de clientes organizados.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gold hover:bg-gold-light text-primary font-bold text-lg px-8 py-6"
            >
              Cadastrar como Projetista
            </Button>
            <Button 
              size="lg" 
              variant="heroOutline"
              className="font-bold text-lg px-8 py-6"
              onClick={handleAccessDashboard}
            >
              Já sou Cadastrado
            </Button>
          </div>
        </div>
      </section>

      <Footer />

      <LoginModal
        open={isLoginOpen}
        onOpenChange={setIsLoginOpen}
        defaultTab="designer"
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
};

export default PortalProjetista;