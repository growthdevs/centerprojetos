import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut } from "lucide-react";
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

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [isReferralOpen, setIsReferralOpen] = useState(false);
  const { isAuthenticated, userName, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      // Consider "scrolled" when past the hero section (approximately 100vh)
      setIsScrolled(window.scrollY > window.innerHeight * 0.8);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Portal Projetistas", href: "/portal-projetista" },
    { label: "Institucional", href: "#institucional" },
    { label: "Planos Cliente", href: "#planos" },
    { label: "Cliente Vindo de Indicação", href: "#indicacao", onClick: () => setIsReferralOpen(true) },
  ];

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
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
                <a
                  key={link.label}
                  href={link.onClick ? undefined : link.href}
                  onClick={link.onClick ? (e) => { e.preventDefault(); link.onClick(); } : undefined}
                  className="text-sm font-medium text-primary-foreground/80 hover:text-blue-mid transition-colors duration-300 cursor-pointer"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Desktop CTA Buttons or User Info */}
            <div className="hidden lg:flex items-center gap-4">
              {isAuthenticated ? (
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
                    <DropdownMenuItem className="font-medium">
                      <User className="mr-2 h-4 w-4" />
                      Meu Perfil
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

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-primary-foreground p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t border-blue-mid/20 animate-fade-in">
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.onClick ? undefined : link.href}
                    onClick={(e) => {
                      if (link.onClick) {
                        e.preventDefault();
                        link.onClick();
                      }
                      setIsMenuOpen(false);
                    }}
                    className="text-sm font-medium text-primary-foreground/80 hover:text-blue-mid transition-colors py-2 cursor-pointer"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="flex flex-col gap-3 pt-4 border-t border-blue-mid/20">
                  {isAuthenticated ? (
                    <>
                      <div className="flex items-center gap-3 py-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-accent flex items-center justify-center">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-primary-foreground">{userName}</p>
                          <p className="text-xs text-primary-foreground/60">Logado</p>
                        </div>
                      </div>
                      <Button 
                        onClick={handleLogout}
                        variant="outline"
                        className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sair
                      </Button>
                    </>
                  ) : (
                    <>
                      <button 
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsRegisterOpen(true);
                        }}
                        className="text-blue-mid font-bold hover:text-blue-accent transition-colors text-center py-2"
                      >
                        Criar Conta
                      </button>
                      <Button 
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsLoginOpen(true);
                        }}
                        variant="accent"
                      >
                        Entrar
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

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
          // TODO: Continuar para o fluxo de cadastro com indicação
        }}
      />
    </>
  );
};

export default Navbar;
