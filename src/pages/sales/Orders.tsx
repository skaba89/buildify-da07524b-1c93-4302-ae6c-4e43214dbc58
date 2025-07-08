
import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useTranslation } from '../../i18n';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../../components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '../../components/ui/dialog';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '../../components/ui/dropdown-menu';
import { Label } from '../../components/ui/label';
import { Badge } from '../../components/ui/badge';
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash, 
  Download, 
  Filter,
  FileText,
  Truck,
  CheckCircle
} from 'lucide-react';
import { Order } from '../../types';

const Orders: React.FC = () => {
  const { t } = useTranslation();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Données fictives pour les commandes
  const [orders, setOrders] = useState<Order[]>([
    {
      id: '1',
      orderNumber: 'ORD-2025-001',
      customerId: '1',
      customerName: 'Entreprise A',
      status: 'delivered',
      total: 2499.98,
      tax: 499.99,
      shipping: 0,
      discount: 0,
      items: [
        {
          id: '1',
          productId: '1',
          productName: 'Ordinateur Portable Pro',
          sku: 'LP-001',
          price: 1299.99,
          quantity: 1,
          total: 1299.99,
        },
        {
          id: '2',
          productId: '2',
          productName: 'Écran 27" 4K',
          sku: 'MON-4K-27',
          price: 349.99,
          quantity: 2,
          total: 699.98,
        },
      ],
      paymentStatus: 'paid',
      paymentMethod: 'Carte bancaire',
      shippingAddress: {
        firstName: 'Jean',
        lastName: 'Dupont',
        address: '123 Rue de Paris',
        city: 'Paris',
        country: 'France',
        postalCode: '75001',
        phone: '+33 6 12 34 56 78',
      },
      billingAddress: {
        firstName: 'Jean',
        lastName: 'Dupont',
        address: '123 Rue de Paris',
        city: 'Paris',
        country: 'France',
        postalCode: '75001',
        phone: '+33 6 12 34 56 78',
      },
      notes: 'Livraison urgente',
      companyId: '1',
      createdAt: new Date('2025-07-01'),
      updatedAt: new Date('2025-07-02'),
    },
    {
      id: '2',
      orderNumber: 'ORD-2025-002',
      customerId: '2',
      customerName: 'Entreprise B',
      status: 'processing',
      total: 1299.99,
      tax: 259.99,
      shipping: 15,
      discount: 100,
      items: [
        {
          id: '3',
          productId: '1',
          productName: 'Ordinateur Portable Pro',
          sku: 'LP-001',
          price: 1299.99,
          quantity: 1,
          total: 1299.99,
        },
      ],
      paymentStatus: 'paid',
      paymentMethod: 'Virement bancaire',
      shippingAddress: {
        firstName: 'Marie',
        lastName: 'Martin',
        address: '456 Avenue des Champs',
        city: 'Lyon',
        country: 'France',
        postalCode: '69000',
        phone: '+33 6 98 76 54 32',
      },
      billingAddress: {
        firstName: 'Marie',
        lastName: 'Martin',
        address: '456 Avenue des Champs',
        city: 'Lyon',
        country: 'France',
        postalCode: '69000',
        phone: '+33 6 98 76 54 32',
      },
      notes: '',
      companyId: '1',
      createdAt: new Date('2025-07-03'),
      updatedAt: new Date('2025-07-03'),
    },
    {
      id: '3',
      orderNumber: 'ORD-2025-003',
      customerId: '3',
      customerName: 'Entreprise C',
      status: 'pending',
      total: 779.97,
      tax: 155.99,
      shipping: 0,
      discount: 0,
      items: [
        {
          id: '4',
          productId: '3',
          productName: 'Clavier Mécanique RGB',
          sku: 'KB-MECH-01',
          price: 129.99,
          quantity: 6,
          total: 779.97,
        },
      ],
      paymentStatus: 'pending',