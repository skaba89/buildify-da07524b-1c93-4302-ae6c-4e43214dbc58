
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Company, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  company: Company | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  logout: () => void;
  setupCompany: (companyData: Partial<Company>) => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<void>;
  updateCompany: (companyData: Partial<Company>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  company: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  setupCompany: async () => {},
  updateUser: async () => {},
  updateCompany: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [company, setCompany] = useState<Company | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simuler le chargement des données utilisateur depuis le stockage local
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
      // Simuler une requête d'API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simuler un utilisateur pour la démo
      const mockUser: User = {
        id: '1',
        email,
        firstName: 'Jean',
        lastName: 'Dupont',
        role: UserRole.ADMIN,
        companyId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      const mockCompany: Company = {
        id: '1',
        name: 'Ma Société SAS',
        industry: 'Technologie',
        size: '10-50',
        country: 'France',
        createdAt: new Date(),
        updatedAt: new Date(),
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

  const register = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      setIsLoading(true);
      // Simuler une requête d'API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Créer un utilisateur sans entreprise
      const mockUser: User = {
        id: '1',
        email,
        firstName,
        lastName,
        role: UserRole.ADMIN,
        companyId: '',
        createdAt: new Date(),
        updatedAt: new Date(),
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

  const setupCompany = async (companyData: Partial<Company>) => {
    try {
      setIsLoading(true);
      // Simuler une requête d'API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockCompany: Company = {
        id: '1',
        name: companyData.name || 'Ma Société',
        industry: companyData.industry || 'Technologie',
        size: companyData.size || '1-10',
        address: companyData.address,
        city: companyData.city,
        zipCode: companyData.zipCode,
        country: companyData.country || 'France',
        phone: companyData.phone,
        website: companyData.website,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      // Mettre à jour l'utilisateur avec l'ID de l'entreprise
      if (user) {
        const updatedUser = { ...user, companyId: mockCompany.id };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
      
      setCompany(mockCompany);
      localStorage.setItem('company', JSON.stringify(mockCompany));
    } catch (error) {
      console.error('Erreur de configuration de l\'entreprise:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (userData: Partial<User>) => {
    try {
      setIsLoading(true);
      // Simuler une requête d'API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (user) {
        const updatedUser = { ...user, ...userData, updatedAt: new Date() };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error('Erreur de mise à jour de l\'utilisateur:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateCompany = async (companyData: Partial<Company>) => {
    try {
      setIsLoading(true);
      // Simuler une requête d'API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (company) {
        const updatedCompany = { ...company, ...companyData, updatedAt: new Date() };
        setCompany(updatedCompany);
        localStorage.setItem('company', JSON.stringify(updatedCompany));
      }
    } catch (error) {
      console.error('Erreur de mise à jour de l\'entreprise:', error);
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
        updateUser,
        updateCompany,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);