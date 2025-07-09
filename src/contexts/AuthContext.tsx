
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types pour l'utilisateur
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

// Types pour le contexte d'authentification
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Création du contexte
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Fournisseur du contexte d'authentification
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Vérifier si l'utilisateur est déjà connecté au chargement
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);
  
  // Fonction de connexion
  const login = async (email: string, password: string): Promise<void> => {
    try {
      setLoading(true);
      // Simuler une requête API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Utilisateur fictif pour la démonstration
      const mockUser: User = {
        id: '1',
        name: 'Jean Dupont',
        email,
        role: 'admin',
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Erreur de connexion:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  // Fonction d'inscription
  const register = async (name: string, email: string, password: string): Promise<void> => {
    try {
      setLoading(true);
      // Simuler une requête API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Utilisateur fictif pour la démonstration
      const mockUser: User = {
        id: '1',
        name,
        email,
        role: 'admin',
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  // Fonction de déconnexion
  const logout = (): void => {
    setUser(null);
    localStorage.removeItem('user');
  };
  
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook pour utiliser le contexte d'authentification
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
  }
  return context;
};