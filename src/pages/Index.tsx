import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import PlansSection from "@/components/PlansSection";
import ForDesignersSection from "@/components/ForDesignersSection";
import Footer from "@/components/Footer";
import MobileTabBar from "@/components/MobileTabBar";
import SearchWizard from "@/components/search/SearchWizard";
import LoginModal from "@/components/LoginModal";
import ProfileModal from "@/components/ProfileModal";
import { useAuth } from "@/contexts/AuthContext";
import type { PlanType } from "@/components/search/SearchWizard";

const Index = () => {
  const { isAuthenticated } = useAuth();
  const [showSearch, setShowSearch] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [pendingPlan, setPendingPlan] = useState<PlanType>(null);

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

  const handlePlanSelect = (plan: PlanType) => {
    if (!isAuthenticated) {
      setPendingPlan(plan);
      setShowLogin(true);
    } else {
      setPendingPlan(plan);
      setShowSearch(true);
    }
  };

  const handleLoginSuccess = () => {
    setShowLogin(false);
    if (pendingPlan) {
      setShowSearch(true);
    }
  };

  const handleWizardClose = () => {
    setShowSearch(false);
    setPendingPlan(null);
  };

  // Hide tab bar when search wizard or mobile menu is open
  const hideTabBar = showSearch || isMobileMenuOpen;

  return (
    <div className="min-h-screen pb-16 md:pb-0">
      <Navbar onMenuOpenChange={setIsMobileMenuOpen} />
      <HeroSection onSearchClick={handleSearchClick} />
      <HowItWorksSection />
      <PlansSection onPlanSelect={handlePlanSelect} />
      <ForDesignersSection />
      
      {/* Footer - hidden on mobile */}
      <div className="hidden md:block">
        <Footer />
      </div>

      {/* Mobile Tab Bar - hidden when search wizard or mobile menu is open */}
      {!hideTabBar && (
        <MobileTabBar
          onSearchClick={handleSearchClick}
          onProfileClick={handleProfileClick}
        />
      )}

      {/* Search Wizard */}
      <SearchWizard 
        isOpen={showSearch} 
        onClose={handleWizardClose}
        initialPlan={pendingPlan}
      />

      {/* Login Modal */}
      <LoginModal
        open={showLogin}
        onOpenChange={(open) => {
          setShowLogin(open);
          if (!open) setPendingPlan(null);
        }}
        defaultTab="client"
        onLoginSuccess={handleLoginSuccess}
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
