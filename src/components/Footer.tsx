import { Mail, Phone, MapPin, Instagram, Linkedin, Facebook } from "lucide-react";
import logoWhite from "@/assets/logo-white.png";
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = {
    empresa: [
      { label: "Sobre Nós", href: "#" },
      { label: "Como Funciona", href: "#" },
      { label: "Parceiros", href: "#" },
      { label: "Blog", href: "#" },
    ],
    cliente: [
      { label: "Planos", href: "#planos" },
      { label: "Solicitar Orçamento", href: "#" },
      { label: "FAQ", href: "#" },
      { label: "Suporte", href: "#" },
    ],
    projetista: [
      { label: "Portal Projetista", href: "#portal" },
      { label: "Cadastrar-se", href: "#" },
      { label: "Benefícios", href: "#" },
      { label: "Central de Ajuda", href: "#" },
    ],
  };

  const socials = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-navy-dark border-t border-gold/20">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <img src={logoWhite} alt="Center Projetos" className="h-16" />
            </div>
            <p className="text-primary-foreground/70 leading-relaxed mb-6 max-w-sm">
              Uma camada de inteligência, organização e confiança entre o cliente 
              e o mercado de móveis planejados.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a href="mailto:contato@centerprojetos.com.br" className="flex items-center gap-3 text-primary-foreground/70 hover:text-gold transition-colors">
                <Mail className="w-4 h-4" />
                <span className="text-sm">contato@centerprojetos.com.br</span>
              </a>
              <a href="tel:+5511999999999" className="flex items-center gap-3 text-primary-foreground/70 hover:text-gold transition-colors">
                <Phone className="w-4 h-4" />
                <span className="text-sm">(11) 99999-9999</span>
              </a>
              <div className="flex items-center gap-3 text-primary-foreground/70">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">São Paulo, SP</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-primary-foreground uppercase tracking-wider mb-4">
              Empresa
            </h4>
            <ul className="space-y-3">
              {links.empresa.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-primary-foreground uppercase tracking-wider mb-4">
              Cliente
            </h4>
            <ul className="space-y-3">
              {links.cliente.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-primary-foreground uppercase tracking-wider mb-4">
              Projetista
            </h4>
            <ul className="space-y-3">
              {links.projetista.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gold/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-primary-foreground/50">
              © {currentYear} Center Projetos. Todos os direitos reservados.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-primary-foreground/5 flex items-center justify-center text-primary-foreground/50 hover:bg-gold/20 hover:text-gold transition-all"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-primary-foreground/50 hover:text-gold transition-colors">
                Privacidade
              </a>
              <a href="#" className="text-sm text-primary-foreground/50 hover:text-gold transition-colors">
                Termos
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
