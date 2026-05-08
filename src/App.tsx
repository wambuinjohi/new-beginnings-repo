import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import { useAnalyticsPageTracking } from "@/hooks/use-analytics";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MedicalEquipment from "./pages/products/MedicalEquipment";
import MicrobiologyBiotechnology from "./pages/products/MicrobiologyBiotechnology";
import Glassware from "./pages/products/Glassware";
import LaboratoryChemicals from "./pages/products/LaboratoryChemicals";
import WaterAnalysis from "./pages/products/WaterAnalysis";
import LaboratoryTesting from "./pages/products/LaboratoryTesting";
import SafetyProducts from "./pages/products/SafetyProducts";
import WasteWaterFiltration from "./pages/products/WasteWaterFiltration";
import PalintestKits from "./pages/products/PalintestKits";
import LabEquipment from "./pages/products/LabEquipment";
import AutomobileSupplies from "./pages/products/AutomobileSupplies";
import ChromatographyConsumables from "./pages/products/ChromatographyConsumables";
import EquipmentQualityControl from "./pages/products/EquipmentQualityControl";
import Filtration from "./pages/products/Filtration";
import LaboratoryMaterialTesting from "./pages/products/LaboratoryMaterialTesting";
import ProductDetail from "./pages/products/ProductDetail";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import { LeadsManager } from "@/components/admin/LeadsManager";
import { CustomersManager } from "@/components/admin/CustomersManager";
import { CampaignManager } from "@/components/admin/CampaignManager";
import { ProductManager } from "@/components/admin/ProductManager";
import { AnalyticsDashboard } from "@/components/admin/AnalyticsDashboard";

const queryClient = new QueryClient();

/**
 * Inner component that handles analytics page tracking
 * Must be inside BrowserRouter to use useLocation
 */
const AppRoutes = () => {
  useAnalyticsPageTracking();

  return (
    <>
      <Toaster />
      <Sonner />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/products/medical-equipment" element={<MedicalEquipment />} />
        <Route path="/products/microbiology-biotechnology" element={<MicrobiologyBiotechnology />} />
        <Route path="/products/glassware" element={<Glassware />} />
        <Route path="/products/laboratory-chemicals" element={<LaboratoryChemicals />} />
        <Route path="/products/chromatography-consumables" element={<ChromatographyConsumables />} />
        <Route path="/products/equipment-quality-control" element={<EquipmentQualityControl />} />
        <Route path="/products/water-analysis" element={<WaterAnalysis />} />
        <Route path="/products/laboratory-testing" element={<LaboratoryTesting />} />
        <Route path="/products/safety-products" element={<SafetyProducts />} />
        <Route path="/products/waste-water-filtration" element={<WasteWaterFiltration />} />
        <Route path="/products/palintest-kits" element={<PalintestKits />} />
        <Route path="/products/lab-equipment" element={<LabEquipment />} />
        <Route path="/products/filtration" element={<Filtration />} />
        <Route path="/products/laboratory-material-testing" element={<LaboratoryMaterialTesting />} />
        <Route path="/products/automobile-supplies" element={<AutomobileSupplies />} />
        <Route path="/products/automobile-supplies/:productId" element={<ProductDetail />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/leads" element={<ProtectedRoute><LeadsManager /></ProtectedRoute>} />
        <Route path="/admin/customers" element={<ProtectedRoute><CustomersManager /></ProtectedRoute>} />
        <Route path="/admin/campaigns" element={<ProtectedRoute><CampaignManager /></ProtectedRoute>} />
        <Route path="/admin/products" element={<ProtectedRoute><ProductManager /></ProtectedRoute>} />
        <Route path="/admin/analytics" element={<ProtectedRoute><AnalyticsDashboard /></ProtectedRoute>} />

        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
