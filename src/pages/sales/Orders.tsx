
import React, { useState } from 'react';
import { useTranslation } from '../../i18n/index';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { MoreHorizontal, Search, FileDown, Printer, RefreshCw } from 'lucide-react';

interface Order {
  id: string;
  customer: {
    name: string;
    email: string;
  };
  date: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
    total: number;
  }[];
  paymentStatus: 'paid' | 'pending' | 'failed';
  total: number;
}

// Données de démonstration
const demoOrders: Order[] = [
  {
    id: 'ORD-001',
    customer: {
      name: 'Jean Dupont',
      email: 'jean.dupont@example.com',
    },
    date: '2025-07-01',
    status: 'completed',
    total: 245.99,
    items: [
      {
        id: 'ITEM-001',
        name: 'Ordinateur portable Pro',
        quantity: 1,
        price: 199.99,
        total: 199.99,
      },
      {
        id: 'ITEM-002',
        name: 'Souris sans fil',
        quantity: 1,
        price: 45.99,
        total: 45.99,
      },
    ],
    paymentStatus: 'paid',
  },
  {
    id: 'ORD-002',
    customer: {
      name: 'Marie Martin',
      email: 'marie.martin@example.com',
    },
    date: '2025-07-02',
    status: 'processing',
    total: 129.95,
    items: [
      {
        id: 'ITEM-003',
        name: 'Écouteurs sans fil',
        quantity: 1,
        price: 89.99,
        total: 89.99,
      },
      {
        id: 'ITEM-004',
        name: 'Étui de protection',
        quantity: 1,
        price: 39.96,
        total: 39.96,
      },
    ],
    paymentStatus: 'paid',
  },
  {
    id: 'ORD-003',
    customer: {
      name: 'Pierre Dubois',
      email: 'pierre.dubois@example.com',
    },
    date: '2025-07-03',
    status: 'pending',
    total: 779.97,
    items: [
      {
        id: 'ITEM-005',
        name: 'Smartphone Premium',
        quantity: 1,
        price: 699.99,
        total: 699.99,
      },
      {
        id: 'ITEM-006',
        name: 'Protège-écran',
        quantity: 1,
        price: 19.99,
        total: 19.99,
      },
      {
        id: 'ITEM-007',
        name: 'Chargeur rapide',
        quantity: 1,
        price: 59.99,
        total: 59.99,
      },
    ],
    paymentStatus: 'pending',
  },
  {
    id: 'ORD-004',
    customer: {
      name: 'Sophie Leroy',
      email: 'sophie.leroy@example.com',
    },
    date: '2025-07-04',
    status: 'cancelled',
    total: 349.98,
    items: [
      {
        id: 'ITEM-008',
        name: 'Tablette 10 pouces',
        quantity: 1,
        price: 299.99,
        total: 299.99,
      },
      {
        id: 'ITEM-009',
        name: 'Support tablette',
        quantity: 1,
        price: 49.99,
        total: 49.99,
      },
    ],
    paymentStatus: 'failed',
  },
  {
    id: 'ORD-005',
    customer: {
      name: 'Lucas Bernard',
      email: 'lucas.bernard@example.com',
    },
    date: '2025-07-05',
    status: 'completed',
    total: 159.98,
    items: [
      {
        id: 'ITEM-010',
        name: 'Clavier mécanique',
        quantity: 1,
        price: 129.99,
        total: 129.99,
      },
      {
        id: 'ITEM-011',
        name: 'Repose-poignet',
        quantity: 1,
        price: 29.99,
        total: 29.99,
      },
    ],
    paymentStatus: 'paid',
  },
];

const Orders: React.FC = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');

  // Filtrer les commandes
  const filteredOrders = demoOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesPayment = paymentFilter === 'all' || order.paymentStatus === paymentFilter;
    
    return matchesSearch && matchesStatus && matchesPayment;
  });

  // Fonction pour obtenir la couleur du badge de statut
  const getStatusBadgeColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Fonction pour obtenir la couleur du badge de paiement
  const getPaymentBadgeColor = (status: Order['paymentStatus']) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('orders.title')}</CardTitle>
          <CardDescription>{t('orders.description')}</CardDescription>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder={t('orders.search')}
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder={t('orders.statusFilter')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('orders.allStatuses')}</SelectItem>
                <SelectItem value="pending">{t('orders.statusPending')}</SelectItem>
                <SelectItem value="processing">{t('orders.statusProcessing')}</SelectItem>
                <SelectItem value="completed">{t('orders.statusCompleted')}</SelectItem>
                <SelectItem value="cancelled">{t('orders.statusCancelled')}</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={paymentFilter} onValueChange={setPaymentFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder={t('orders.paymentFilter')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('orders.allPayments')}</SelectItem>
                <SelectItem value="paid">{t('orders.paymentPaid')}</SelectItem>
                <SelectItem value="pending">{t('orders.paymentPending')}</SelectItem>
                <SelectItem value="failed">{t('orders.paymentFailed')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" size="sm">
              <FileDown className="h-4 w-4 mr-2" />
              {t('orders.export')}
            </Button>
            <Button variant="outline" size="sm">
              <Printer className="h-4 w-4 mr-2" />
              {t('orders.print')}
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              {t('orders.refresh')}
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('orders.orderId')}</TableHead>
                <TableHead>{t('orders.customer')}</TableHead>
                <TableHead>{t('orders.date')}</TableHead>
                <TableHead>{t('orders.status')}</TableHead>
                <TableHead>{t('orders.payment')}</TableHead>
                <TableHead className="text-right">{t('orders.total')}</TableHead>
                <TableHead className="text-right">{t('orders.actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>
                      <div>{order.customer.name}</div>
                      <div className="text-sm text-gray-500">{order.customer.email}</div>
                    </TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadgeColor(order.status)}>
                        {t(`orders.status${order.status.charAt(0).toUpperCase() + order.status.slice(1)}`)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPaymentBadgeColor(order.paymentStatus)}>
                        {t(`orders.payment${order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}`)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">{order.total.toFixed(2)} €</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">{t('orders.openMenu')}</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>{t('orders.actions')}</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>{t('orders.viewDetails')}</DropdownMenuItem>
                          <DropdownMenuItem>{t('orders.editOrder')}</DropdownMenuItem>
                          <DropdownMenuItem>{t('orders.updateStatus')}</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">{t('orders.cancelOrder')}</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                    {t('orders.noOrdersFound')}
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

export default Orders;