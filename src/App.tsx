
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import CompanySetup from "./pages/auth/CompanySetup";

// Dashboard
import DashboardLayout from "./components/layout/DashboardLayout";
import Dashboard from "./pages/dashboard/Dashboard";

// CRM
import Contacts from "./pages/crm/Contacts";

// Inventory
import Products from "./pages/inventory/Products";

// Sales
import Orders from "./pages/sales/Orders";

// HR
import Employees from "./pages/hr/Employees";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/company-setup" element={<CompanySetup />} />
            
            {/* Dashboard routes */}
            <Route path="/" element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              
              {/* CRM routes */}
              <Route path="/crm/contacts" element={<Contacts />} />
              
              {/* Inventory routes */}
              <Route path="/inventory/products" element={<Products />} />
              
              {/* Sales routes */}
              <Route path="/sales/orders" element={<Orders />} />
              
              {/* HR routes */}
              <Route path="/hr/employees" element={<Employees />} />
            </Route>
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;