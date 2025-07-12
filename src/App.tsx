
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

// Composant de test pour le système de traduction
import { useTranslation } from './contexts/LanguageContext';

const TestI18n: React.FC = () => {
  const { t, language, setLanguage, languages } = useTranslation();

  return (
    <div style={{ padding: '20px' }}>
      <h1>Test du système de traduction</h1>
      <p>Langue actuelle : {language}</p>
      <div>
        {languages.map(lang => (
          <button 
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            style={{ 
              margin: '5px', 
              padding: '5px 10px',
              backgroundColor: language === lang.code ? '#1a1a2e' : '#ffffff',
              color: language === lang.code ? '#ffffff' : '#1a1a2e',
              border: '1px solid #1a1a2e',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {lang.name}
          </button>
        ))}
      </div>
      <div style={{ marginTop: '20px' }}>
        <h2>Traductions de base</h2>
        <ul>
          <li>dashboard: {t('dashboard')}</li>
          <li>contacts: {t('contacts')}</li>
          <li>products: {t('products')}</li>
          <li>orders: {t('orders')}</li>
        </ul>
      </div>
      <div style={{ marginTop: '20px' }}>
        <h2>Traductions imbriquées</h2>
        <ul>
          <li>orders.title: {t('orders.title')}</li>
          <li>orders.description: {t('orders.description')}</li>
          <li>orders.search: {t('orders.search')}</li>
        </ul>
      </div>
    </div>
  );
};

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
      <Route path="/test-i18n" element={<TestI18n />} />
      
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

export default App;