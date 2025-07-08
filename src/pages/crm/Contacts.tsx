
import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useTranslation } from '../../i18n';
import { Contact, ContactStatus } from '../../types';

export const Contacts: React.FC = () => {
  const { t } = useTranslation();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        // Simuler une requête d'API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Données fictives pour la démo
        const mockContacts: Contact[] = [
          {
            id: '1',
            firstName: 'Marie',
            lastName: 'Dupont',
            email: 'marie.dupont@example.com',
            phone: '01 23 45 67 89',
            mobile: '06 12 34 56 78',
            company: 'Entreprise ABC',
            jobTitle: 'Directrice Marketing',
            address: '123 Rue de Paris',
            city: 'Paris',
            state: 'Île-de-France',
            zipCode: '75001',
            country: 'France',
            notes: 'Contact principal pour le projet XYZ',
            status: 'ACTIVE',
            companyId: '1',
            createdBy: '1',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: '2',
            firstName: 'Pierre',
            lastName: 'Martin',
            email: 'pierre.martin@example.com',
            phone: '01 98 76 54 32',
            mobile: '06 98 76 54 32',
            company: 'Société XYZ',
            jobTitle: 'Directeur Commercial',
            address: '456 Avenue des Champs-Élysées',
            city: 'Paris',
            state: 'Île-de-France',
            zipCode: '75008',
            country: 'France',
            status: 'LEAD',
            companyId: '1',
            createdBy: '1',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: '3',
            firstName: 'Sophie',
            lastName: 'Lefebvre',
            email: 'sophie.lefebvre@example.com',
            phone: '01 45 67 89 10',
            company: 'Entreprise DEF',
            jobTitle: 'Responsable Achats',
            status: 'CUSTOMER',
            companyId: '1',
            createdBy: '1',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: '4',
            firstName: 'Thomas',
            lastName: 'Bernard',
            email: 'thomas.bernard@example.com',
            phone: '01 23 45 67 89',
            company: 'Société GHI',
            jobTitle: 'PDG',
            status: 'INACTIVE',
            companyId: '1',
            createdBy: '1',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ];
        
        setContacts(mockContacts);
      } catch (error) {
        console.error('Erreur lors du chargement des contacts:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchContacts();
  }, []);

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = 
      contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (contact.company && contact.company.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = selectedStatus ? contact.status === selectedStatus : true;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
      case 'INACTIVE':
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
      case 'LEAD':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200';
      case 'CUSTOMER':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return t('common.active');
      case 'INACTIVE':
        return t('common.inactive');
      case 'LEAD':
        return t('crm.leads');
      case 'CUSTOMER':
        return t('dashboard.customers');
      default:
        return status;
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('crm.contacts')}
          </h1>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {t('crm.addContact')}
          </button>
        </div>
        
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
              <div className="w-full md:w-1/2">
                <label htmlFor="search" className="sr-only">
                  {t('common.search')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                