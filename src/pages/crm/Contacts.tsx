
import React, { useState, useEffect } from 'react';
import { useLanguage as useTranslation } from '../../contexts/LanguageContext';
import { Search } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ContactStatus } from '../../types';

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  mobile?: string;
  company?: string;
  jobTitle?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  notes?: string;
  status: string;
  companyId: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const Contacts: React.FC = () => {
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
        return 'bg-green-100 text-green-800';
      case 'INACTIVE':
        return 'bg-gray-100 text-gray-800';
      case 'LEAD':
        return 'bg-yellow-100 text-yellow-800';
      case 'CUSTOMER':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return t('active');
      case 'INACTIVE':
        return t('inactive');
      case 'LEAD':
        return 'Lead';
      case 'CUSTOMER':
        return t('customer');
      default:
        return status;
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>{t('contacts')}</CardTitle>
              <CardDescription>{t('addContact')}</CardDescription>
            </div>
            <Button>
              {t('addContact')}
            </Button>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder={t('search')}
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder={t('status')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">{t('filter')}</SelectItem>
                <SelectItem value="ACTIVE">{t('active')}</SelectItem>
                <SelectItem value="INACTIVE">{t('inactive')}</SelectItem>
                <SelectItem value="LEAD">Lead</SelectItem>
                <SelectItem value="CUSTOMER">{t('customer')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('name')}</TableHead>
                <TableHead>{t('email')}</TableHead>
                <TableHead>{t('phone')}</TableHead>
                <TableHead>{t('company')}</TableHead>
                <TableHead>{t('status')}</TableHead>
                <TableHead className="text-right">{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContacts.length > 0 ? (
                filteredContacts.map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell className="font-medium">
                      {contact.firstName} {contact.lastName}
                    </TableCell>
                    <TableCell>{contact.email}</TableCell>
                    <TableCell>{contact.phone || '-'}</TableCell>
                    <TableCell>{contact.company || '-'}</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadgeClass(contact.status)}>
                        {getStatusLabel(contact.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        {t('view')}
                      </Button>
                      <Button variant="ghost" size="sm">
                        {t('edit')}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                    {t('noData')}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Contacts;
                