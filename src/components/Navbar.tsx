import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut, Bell } from "lucide-react";
import logoWhite from "@/assets/logo-white.png";
import RegisterModal from "@/components/RegisterModal";
import LoginModal from "@/components/LoginModal";
import ForgotPasswordModal from "@/components/ForgotPasswordModal";
import ReferralModal from "@/components/ReferralModal";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  onMenuOpenChange?: (isOpen: boolean) => void;
}

const Navbar = ({ onMenuOpenChange }: NavbarProps) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [isReferralOpen, setIsReferralOpen] = useState(false);
  const { isAuthenticated, userName, userType, clientPlan, logout } = useAuth();

  // Get display name based on user type
  const getUserTypeDisplay = () => {
    if (userType === "client") {
      return clientPlan === "premium" ? "Plano Premium" : "Plano Smart";
    }
    if (userType === "designer") {
      return "Projetista";
    }
    if (userType === "shopowner") {
      return "Lojista";
    }
    if (userType === "admin") {
      return "Consultor Center";
    }
    return "";
  };

  const handleMenuToggle = (open: boolean) => {
    setIsMenuOpen(open);
    onMenuOpenChange?.(open);
  };

  useEffect(() => {
    const handleScroll = () => {
      // Consider "scrolled" when past the hero section (approximately 100vh)
      setIsScrolled(window.scrollY > window.innerHeight * 0.8);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const baseNavLinks = [
    { label: "Para Clientes", href: "#para-clientes" },
    { label: "Para Projetistas", href: "#para-projetistas" },
    { label: "Planos Cliente", href: "/planos" },
  ];

  // Get nav links - desktop always shows base links + user-specific links
  // Mobile menu shows different links based on auth state
  const getNavLinks = () => {
    if (!isAuthenticated) return baseNavLinks;
    
    switch (userType) {
      case "designer":
        return [
          ...baseNavLinks,
          { label: "Solicitações", href: "/projetista/solicitacoes" },
        ];
      case "client":
        return [
          ...baseNavLinks,
          { label: "Meu Painel", href: "/cliente/painel" },
          { label: "Meus Pedidos", href: "/cliente/pedidos" },
          ...(clientPlan === "smart" ? [{ label: "Seja Premium", href: "/seja-premium" }] : []),
        ];
      case "shopowner":
        return [
          ...baseNavLinks,
          { label: "Painel", href: "/loja/painel" },
        ];
      case "admin":
        return [
          ...baseNavLinks,
          { label: "Painel Admin", href: "/admin/painel" },
        ];
      default:
        return baseNavLinks;
    }
  };

  // Mobile menu links - simplified for authenticated users
  const getMobileNavLinks = () => {
    if (!isAuthenticated) return baseNavLinks;
    
    switch (userType) {
      case "designer":
        return [
          { label: "Solicitações", href: "/projetista/solicitacoes" },
          { label: "Meu Perfil", href: "/projetista/perfil" },
        ];
      case "client":
        return [
          { label: "Meu Painel", href: "/cliente/painel" },
          { label: "Meus Pedidos", href: "/cliente/pedidos" },
          ...(clientPlan === "smart" ? [{ label: "Seja Premium", href: "/seja-premium" }] : []),
        ];
      case "shopowner":
        return [
          { label: "Painel da Loja", href: "/loja/painel" },
          { label: "Notificações", href: "/loja/notificacoes" },
        ];
      case "admin":
        return [
          { label: "Painel Admin", href: "/admin/painel" },
        ];
      default:
        return [];
    }
  };

  // Get notification path based on user type
  const getNotificationPath = () => {
    switch (userType) {
      case "client":
        return "/cliente/notificacoes";
      case "shopowner":
        return "/loja/notificacoes";
      case "designer":
        return "/projetista/solicitacoes";
      case "admin":
        return "/admin/painel";
      default:
        return "/";
    }
  };

  const navLinks = getNavLinks();
  const mobileNavLinks = getMobileNavLinks();

  const handleNavClick = (href: string) => {
    if (href.startsWith("#")) {
      const elementId = href.replace("#", "");
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(href);
    }
  };

  const handleLogout = () => {
    logout();
    handleMenuToggle(false);
    navigate("/");
  };

  const handleProfileClick = () => {
    if (userType === "shopowner") {
      navigate("/loja/painel");
    } else if (userType === "designer") {
      navigate("/projetista/perfil");
    } else if (userType === "client") {
      navigate("/cliente/painel");
    } else if (userType === "admin") {
      navigate("/admin/painel");
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-blue-mid/20 transition-colors duration-300 ${
        isScrolled ? "bg-primary/95" : "bg-primary/50"
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="/" className="flex items-center py-2">
              <img 
                src={logoWhite} 
                alt="Center Projetos" 
                className="h-14 transition-transform duration-300 hover:scale-105" 
              />
            </a>

            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="text-sm font-medium text-primary-foreground/80 hover:text-blue-mid transition-colors duration-300 cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Desktop CTA Buttons or User Info */}
            <div className="hidden lg:flex items-center gap-4">
              {isAuthenticated ? (
                <>
                  {/* Notification Bell */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-primary-foreground hover:text-blue-mid hover:bg-white/10 relative"
                    onClick={() => navigate(getNotificationPath())}
                  >
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                  </Button>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        className="flex items-center gap-2 text-primary-foreground hover:text-blue-mid hover:bg-white/10"
                      >
                        <div className="w-8 h-8 rounded-full bg-gradient-accent flex items-center justify-center">
                          <User className="w-4 h-4 text-primary" />
                        </div>
                        <span className="font-medium">{userName}</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem 
                        className="font-medium"
                        onClick={handleProfileClick}
                      >
                        <User className="mr-2 h-4 w-4" />
                        {userType === "shopowner" ? "Painel da Loja" : userType === "client" ? "Meu Painel" : userType === "admin" ? "Painel Admin" : "Meu Perfil"}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={handleLogout}
                        className="text-destructive focus:text-destructive"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sair
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => setIsRegisterOpen(true)}
                    className="text-blue-mid font-bold hover:text-blue-accent transition-colors"
                  >
                    Criar Conta
                  </button>
                  <Button 
                    onClick={() => setIsLoginOpen(true)}
                    variant="accent"
                  >
                    Entrar
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Notification Bell + Menu Button */}
            <div className="lg:hidden flex items-center gap-2">
              {isAuthenticated && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-primary-foreground hover:text-blue-mid hover:bg-white/10 relative"
                  onClick={() => navigate(getNotificationPath())}
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                </Button>
              )}
              <button
                className="text-primary-foreground p-2"
                onClick={() => handleMenuToggle(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

        </div>
      </nav>

      {/* Mobile Menu - Fullscreen */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-primary animate-fade-in flex flex-col">
          {/* Header with close button */}
          <div className="flex items-center justify-between h-20 px-4 border-b border-blue-mid/20">
            <a href="/" className="flex items-center">
              <img 
                src={logoWhite} 
                alt="Center Projetos" 
                className="h-14" 
              />
            </a>
            <button
              className="text-primary-foreground p-2"
              onClick={() => handleMenuToggle(false)}
            >
              <X size={24} />
            </button>
          </div>

          {/* Menu Content */}
          <div className="flex-1 flex flex-col justify-center px-8">
            <div className="flex flex-col gap-6">
              {mobileNavLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => {
                    handleNavClick(link.href);
                    handleMenuToggle(false);
                  }}
                  className="text-xl font-semibold text-primary-foreground/90 hover:text-blue-mid transition-colors text-center py-3 cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Footer with auth buttons */}
          <div className="px-8 pb-12 pt-6 border-t border-blue-mid/20">
            {isAuthenticated ? (
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-accent flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-lg text-primary-foreground">{userName}</p>
                    <p className="text-sm text-primary-foreground/60">
                      {getUserTypeDisplay()}
                    </p>
                  </div>
                </div>

                <Button 
                  onClick={handleLogout}
                  variant="outline"
                  size="lg"
                  className="w-full border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                >
                  <LogOut className="mr-2 h-5 w-5" />
                  Sair
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <Button 
                  onClick={() => {
                    handleMenuToggle(false);
                    setIsLoginOpen(true);
                  }}
                  variant="accent"
                  size="lg"
                  className="w-full text-lg font-semibold"
                >
                  Entrar
                </Button>
                <button 
                  onClick={() => {
                    handleMenuToggle(false);
                    setIsRegisterOpen(true);
                  }}
                  className="text-blue-mid font-bold hover:text-blue-accent transition-colors text-center py-3 text-lg"
                >
                  Criar Conta
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <RegisterModal open={isRegisterOpen} onOpenChange={setIsRegisterOpen} />
      <LoginModal 
        open={isLoginOpen} 
        onOpenChange={setIsLoginOpen} 
        onOpenRegister={() => setIsRegisterOpen(true)}
        onOpenForgotPassword={() => setIsForgotPasswordOpen(true)}
      />
      <ForgotPasswordModal
        open={isForgotPasswordOpen}
        onOpenChange={setIsForgotPasswordOpen}
        onBackToLogin={() => setIsLoginOpen(true)}
      />
      <ReferralModal
        open={isReferralOpen}
        onOpenChange={setIsReferralOpen}
        onContinue={(id, name) => {
          console.log("Profissional selecionado:", { id, name });
        }}
      />
    </>
  );
};

export default Navbar;
