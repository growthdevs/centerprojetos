import { Home, Search, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface MobileTabBarProps {
  onSearchClick: () => void;
  onProfileClick: () => void;
}

const MobileTabBar = ({ onSearchClick, onProfileClick }: MobileTabBarProps) => {
  const { isAuthenticated } = useAuth();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-t border-border md:hidden safe-area-bottom">
      <div className="flex items-center justify-around h-16">
        {/* Home */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex flex-col items-center justify-center flex-1 h-full gap-1 text-muted-foreground hover:text-accent transition-colors"
        >
          <Home className="w-5 h-5" />
          <span className="text-xs font-medium">Home</span>
        </button>

        {/* Buscar */}
        <button
          onClick={onSearchClick}
          className="flex flex-col items-center justify-center flex-1 h-full gap-1 text-muted-foreground hover:text-accent transition-colors"
        >
          <Search className="w-5 h-5" />
          <span className="text-xs font-medium">Buscar</span>
        </button>

        {/* Perfil */}
        <button
          onClick={onProfileClick}
          className="flex flex-col items-center justify-center flex-1 h-full gap-1 text-muted-foreground hover:text-accent transition-colors"
        >
          <User className="w-5 h-5" />
          <span className="text-xs font-medium">{isAuthenticated ? "Perfil" : "Entrar"}</span>
        </button>
      </div>
    </nav>
  );
};

export default MobileTabBar;
