
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
import { useState } from 'react';

const TestI18n: React.FC = () => {
  const { t, language, setLanguage, languages } = useTranslation();
  const [name, setName] = useState('Jean');
  const [count, setCount] = useState(5);

  // Liste des clés de traduction à tester
  const basicKeys = ['dashboard', 'contacts', 'products', 'orders', 'employees', 'settings'];
  const nestedKeys = [
    'orders.title', 
    'orders.description', 
    'orders.search',
    'orders.statusPending',
    'orders.paymentPaid'
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#1a1a2e' }}>Test du système de traduction</h1>
      
      <div style={{ 
        padding: '15px', 
        backgroundColor: '#f8f9fa', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h2 style={{ margin: '0 0 10px 0', fontSize: '1.2rem' }}>Configuration</h2>
        <p><strong>Langue actuelle :</strong> {language}</p>
        <div>
          {languages.map(lang => (
            <button 
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              style={{ 
                margin: '5px', 
                padding: '8px 15px',
                backgroundColor: language === lang.code ? '#1a1a2e' : '#ffffff',
                color: language === lang.code ? '#ffffff' : '#1a1a2e',
                border: '1px solid #1a1a2e',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              {lang.name}
            </button>
          ))}
        </div>
      </div>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '20px'
      }}>
        <div style={{ 
          padding: '15px', 
          backgroundColor: '#f8f9fa', 
          borderRadius: '8px' 
        }}>
          <h2 style={{ margin: '0 0 10px 0', fontSize: '1.2rem' }}>Traductions de base</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>Clé</th>
                <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>Traduction</th>
              </tr>
            </thead>
            <tbody>
              {basicKeys.map(key => (
                <tr key={key}>
                  <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}><code>{key}</code></td>
                  <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{t(key)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div style={{ 
          padding: '15px', 
          backgroundColor: '#f8f9fa', 
          borderRadius: '8px' 
        }}>
          <h2 style={{ margin: '0 0 10px 0', fontSize: '1.2rem' }}>Traductions imbriquées</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>Clé</th>
                <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>Traduction</th>
              </tr>
            </thead>
            <tbody>
              {nestedKeys.map(key => (
                <tr key={key}>
                  <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}><code>{key}</code></td>
                  <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{t(key)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div style={{ 
        padding: '15px', 
        backgroundColor: '#f8f9fa', 
        borderRadius: '8px',
        marginTop: '20px' 
      }}>
        <h2 style={{ margin: '0 0 10px 0', fontSize: '1.2rem' }}>Traductions avec paramètres</h2>
        <p>
          <strong>Exemple 1:</strong> {t('welcome', { name })}
        </p>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ marginRight: '10px' }}>Nom:</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            style={{ padding: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
        </div>
        
        <p>
          <strong>Exemple 2:</strong> {t('items', { count })}
        </p>
        <div>
          <label style={{ marginRight: '10px' }}>Nombre:</label>
          <input 
            type="number" 
            value={count} 
            onChange={(e) => setCount(parseInt(e.target.value) || 0)}
            style={{ padding: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
        </div>
      </div>
      
      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <a 
          href="/" 
          style={{ 
            display: 'inline-block',
            padding: '10px 20px',
            backgroundColor: '#1a1a2e',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            fontWeight: 'bold'
          }}
        >
          Retour à l'application
        </a>
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