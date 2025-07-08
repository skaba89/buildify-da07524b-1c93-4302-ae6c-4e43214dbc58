
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { I18nProvider } from "./i18n";
import { AuthProvider } from "./contexts/AuthContext";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import CompanySetup from "./pages/auth/CompanySetup";
import Dashboard from "./pages/dashboard/Dashboard";
import Contacts from "./pages/crm/Contacts";
import Products from "./pages/inventory/Products";
import Orders from "./pages/sales/Orders";
import Employees from "./pages/hr/Employees";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <I18nProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Page d'accueil */}
              <Route path="/" element={<Index />} />
              
              {/* Pages d'authentification */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/company-setup" element={<CompanySetup />} />
              
              {/* Pages du tableau de bord */}
              <Route path="/dashboard" element={<Dashboard />} />
              
              {/* Pages CRM */}
              <Route path="/crm/contacts" element={<Contacts />} />
              
              {/* Pages Inventaire */}
              <Route path="/inventory/products" element={<Products />} />
              
              {/* Pages Ventes */}
              <Route path="/sales/orders" element={<Orders />} />
              
              {/* Pages RH */}
              <Route path="/hr/employees" element={<Employees />} />
              
              {/* Page 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </I18nProvider>
  </QueryClientProvider>
);

export default App;