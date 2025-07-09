
import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import DashboardLayout from './components/layout/DashboardLayout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import CompanySetup from './pages/auth/CompanySetup';
import Dashboard from './pages/dashboard/Dashboard';
import Contacts from './pages/crm/Contacts';
import Products from './pages/inventory/Products';
import Orders from './pages/sales/Orders';
import Employees from './pages/hr/Employees';
import NotFound from './pages/NotFound';
import './App.css';

// Composant pour les routes protégées
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div>Chargement...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  // Rediriger vers le tableau de bord si déjà authentifié
  useEffect(() => {
    if (isAuthenticated) {
      // Vous pouvez ajouter une logique de redirection ici si nécessaire
    }
  }, [isAuthenticated]);
  
  return (
    <Routes>
      {/* Routes publiques */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/setup" element={<CompanySetup />} />
      
      {/* Routes protégées avec DashboardLayout */}
      <Route path="/" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="products" element={<Products />} />
        <Route path="orders" element={<Orders />} />
        <Route path="employees" element={<Employees />} />
      </Route>
      
      {/* Route 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;