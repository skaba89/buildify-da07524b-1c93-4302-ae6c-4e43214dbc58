
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Company } from '@/types';

interface AuthContextType {
  user: User | null;
  company: Company | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  setupCompany: (company: Omit<Company, 'id'>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [company, setCompany] = useState<Company | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté
    const storedUser = localStorage.getItem('user');
    const storedCompany = localStorage.getItem('company');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    if (storedCompany) {
      setCompany(JSON.parse(storedCompany));
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Simulation d'une requête API
      // Dans une vraie application, vous feriez une requête à votre API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Utilisateur fictif pour la démonstration
      const mockUser: User = {
        id: '1',
        email,
        name: 'Utilisateur Test',
        role: 'admin',
        createdAt: new Date().toISOString(),
      };
      
      const mockCompany: Company = {
        id: '1',
        name: 'Entreprise Test',
        industry: 'Technologie',
        employees: '10-50',
        address: '123 Rue de Test',
        city: 'Paris',
        zipCode: '75000',
        country: 'France',
        phone: '+33123456789',
        website: 'https://example.com',
        createdAt: new Date().toISOString(),
      };
      
      setUser(mockUser);
      setCompany(mockCompany);
      
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('company', JSON.stringify(mockCompany));
    } catch (error) {
      console.error('Erreur de connexion:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      setIsLoading(true);
      
      // Simulation d'une requête API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Utilisateur fictif pour la démonstration
      const mockUser: User = {
        id: '1',
        email,
        name,
        role: 'admin',
        createdAt: new Date().toISOString(),
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const setupCompany = async (companyData: Omit<Company, 'id'>) => {
    try {
      setIsLoading(true);
      
      // Simulation d'une requête API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Entreprise fictive pour la démonstration
      const mockCompany: Company = {
        id: '1',
        ...companyData,
        createdAt: new Date().toISOString(),
      };
      
      setCompany(mockCompany);
      localStorage.setItem('company', JSON.stringify(mockCompany));
    } catch (error) {
      console.error('Erreur de configuration de l\'entreprise:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setCompany(null);
    localStorage.removeItem('user');
    localStorage.removeItem('company');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        company,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        setupCompany,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};