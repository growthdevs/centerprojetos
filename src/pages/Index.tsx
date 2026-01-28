import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import ForDesignersSection from "@/components/ForDesignersSection";
import Footer from "@/components/Footer";
import MobileTabBar from "@/components/MobileTabBar";
import SearchWizard from "@/components/search/SearchWizard";
import LoginModal from "@/components/LoginModal";
import ProfileModal from "@/components/ProfileModal";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { isAuthenticated } = useAuth();
  const [showSearch, setShowSearch] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handleSearchClick = () => {
    setShowSearch(true);
  };

  const handleProfileClick = () => {
    if (isAuthenticated) {
      setShowProfile(true);
    } else {
      setShowLogin(true);
    }
  };

  return (
    <div className="min-h-screen pb-16 md:pb-0">
      <Navbar />
      <HeroSection />
      <HowItWorksSection />
      <ForDesignersSection />
      
      {/* Footer - hidden on mobile */}
      <div className="hidden md:block">
        <Footer />
      </div>

      {/* Mobile Tab Bar - hidden when search wizard is open */}
      {!showSearch && (
        <MobileTabBar
          onSearchClick={handleSearchClick}
          onProfileClick={handleProfileClick}
        />
      )}

      {/* Search Wizard */}
      <SearchWizard isOpen={showSearch} onClose={() => setShowSearch(false)} />

      {/* Login Modal */}
      <LoginModal
        open={showLogin}
        onOpenChange={setShowLogin}
        defaultTab="client"
      />

      {/* Profile Modal */}
      <ProfileModal
        open={showProfile}
        onOpenChange={setShowProfile}
      />
    </div>
  );
};

export default Index;
