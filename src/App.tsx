
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
import Dashboard from "./pages/dashboard/Dashboard";
import Contacts from "./pages/crm/Contacts";
import Products from "./pages/inventory/Products";
import Orders from "./pages/sales/Orders";
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
            
            {/* Protected routes - would normally have auth check */}
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* CRM routes */}
            <Route path="/crm/contacts" element={<Contacts />} />
            
            {/* ERP routes */}
            <Route path="/inventory/products" element={<Products />} />
            <Route path="/sales/orders" element={<Orders />} />
            <Route path="/hr/employees" element={<Employees />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;