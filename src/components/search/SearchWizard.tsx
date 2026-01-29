import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import LoginModal from "@/components/LoginModal";
import PlanSelectionStep from "./steps/PlanSelectionStep";
import TermsStep from "./steps/TermsStep";
import PaidPlanScreen from "./steps/PaidPlanScreen";
import SearchTypeStep from "./steps/SearchTypeStep";
import SearchFiltersStep from "./steps/SearchFiltersStep";
import SearchResultsStep from "./steps/SearchResultsStep";

export type SearchWizardStep = 
  | "login"
  | "plan"
  | "terms"
  | "paid-confirmation"
  | "search-type"
  | "search-filters"
  | "results";

export type PlanType = "gratuito" | "pago" | null;
export type SearchType = "lojas" | "projetistas" | null;

interface SearchWizardProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlan?: PlanType;
}

const SearchWizard = ({ isOpen, onClose, initialPlan }: SearchWizardProps) => {
  const { isAuthenticated } = useAuth();
  
  // Determine initial step based on auth and initialPlan
  const getInitialStep = (): SearchWizardStep => {
    if (initialPlan) {
      // Coming from ClientPlansSection with pre-selected plan
      return "terms";
    }
    return isAuthenticated ? "plan" : "login";
  };

  const [currentStep, setCurrentStep] = useState<SearchWizardStep>(getInitialStep());
  const [selectedPlan, setSelectedPlan] = useState<PlanType>(initialPlan || null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [searchType, setSearchType] = useState<SearchType>(null);
  const [filters, setFilters] = useState({
    state: "",
    city: "",
    query: "",
    sortBy: "rating" as "rating" | "sales",
  });

  // Sync state when wizard opens
  useEffect(() => {
    if (isOpen) {
      if (initialPlan) {
        setSelectedPlan(initialPlan);
        setCurrentStep("terms");
      } else {
        setCurrentStep(isAuthenticated ? "plan" : "login");
        setSelectedPlan(null);
      }
      setTermsAccepted(false);
      setCouponCode("");
      setSearchType(null);
    }
  }, [isOpen, isAuthenticated, initialPlan]);

  // Ensure a single scroll surface on mobile (and prevent background page scroll).
  useEffect(() => {
    if (!isOpen) return;
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
    };
  }, [isOpen]);

  const handleLoginSuccess = () => {
    setCurrentStep("plan");
  };

  const handlePlanSelect = (plan: PlanType) => {
    setSelectedPlan(plan);
  };

  const handleTermsAccept = () => {
    setTermsAccepted(true);
    if (selectedPlan === "pago") {
      setCurrentStep("paid-confirmation");
    } else {
      setCurrentStep("search-type");
    }
  };

  const handleSearchTypeSelect = (type: SearchType) => {
    setSearchType(type);
    setCurrentStep("search-filters");
  };

  const handleFiltersApply = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setCurrentStep("results");
  };

  const handleBack = () => {
    switch (currentStep) {
      case "terms":
        if (initialPlan) {
          // If came from ClientPlansSection, close wizard
          onClose();
        } else {
          setCurrentStep("plan");
        }
        break;
      case "search-type":
        if (initialPlan) {
          setCurrentStep("terms");
        } else {
          setCurrentStep("plan");
          setSelectedPlan(null);
          setTermsAccepted(false);
        }
        break;
      case "search-filters":
        setCurrentStep("search-type");
        break;
      case "results":
        setCurrentStep("search-filters");
        break;
      default:
        break;
    }
  };

  if (!isOpen) return null;

  // Show login modal if not authenticated
  if (currentStep === "login" && !isAuthenticated) {
    return (
      <LoginModal
        open={true}
        onOpenChange={(open) => {
          if (!open) onClose();
        }}
        defaultTab="client"
        onLoginSuccess={handleLoginSuccess}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-background overflow-hidden">
      {currentStep === "plan" && (
        <PlanSelectionStep
          selectedPlan={selectedPlan}
          onPlanSelect={handlePlanSelect}
          onNext={() => setCurrentStep("terms")}
          onClose={onClose}
        />
      )}

      {currentStep === "terms" && (
        <TermsStep
          selectedPlan={selectedPlan}
          couponCode={couponCode}
          onCouponChange={setCouponCode}
          onAccept={handleTermsAccept}
          onBack={handleBack}
        />
      )}

      {currentStep === "paid-confirmation" && (
        <PaidPlanScreen onClose={onClose} />
      )}

      {currentStep === "search-type" && (
        <SearchTypeStep
          onSelect={handleSearchTypeSelect}
          onBack={handleBack}
        />
      )}

      {currentStep === "search-filters" && (
        <SearchFiltersStep
          searchType={searchType}
          filters={filters}
          onFiltersChange={setFilters}
          onSearch={handleFiltersApply}
          onBack={handleBack}
        />
      )}

      {currentStep === "results" && (
        <SearchResultsStep
          searchType={searchType}
          filters={filters}
          onBack={handleBack}
          onClose={onClose}
        />
      )}
    </div>
  );
};

export default SearchWizard;
