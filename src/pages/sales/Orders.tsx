
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Plus, Search } from 'lucide-react';
import { Order } from '@/types';

const Orders: React.FC = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - in a real app, this would come from Supabase
  const orders: Order[] = [
    {
      id: '1',
      orderNumber: 'ORD-001',
      customerId: '1',
      customerName: 'John Smith',
      status: 'delivered',
      items: [
        {
          id: '1',
          productId: '1',
          productName: 'Premium Laptop',
          quantity: 1,
          unitPrice: 1499.99,
          totalPrice: 1499.99,
        },
      ],
      totalAmount: 1499.99,
      tax: 120.00,
      shippingCost: 15.00,
      paymentStatus: 'paid',
      paymentMethod: 'credit_card',
      companyId: '1',
      createdAt: new Date('2025-07-05'),
      updatedAt: new Date('2025-07-05'),
    },
    {
      id: '2',
      orderNumber: 'ORD-002',
      customerId: '2',
      customerName: 'Sarah Johnson',
      status: 'processing',
      items: [
        {
          id: '2',
          productId: '2',
          productName: 'Wireless Headphones',
          quantity: 2,
          unitPrice: 149.99,
          totalPrice: 299.98,
        },
        {
          id: '3',
          productId: '5',
          productName: 'Smart Watch',
          quantity: 1,
          unitPrice: 249.99,
          totalPrice: 249.99,
        },
      ],
      totalAmount: 549.97,
      tax: 44.00,
      shippingCost: 10.00,
      paymentStatus: 'paid',
      paymentMethod: 'paypal',
      companyId: '1',
      createdAt: new Date('2025-07-04'),
      updatedAt: new Date('2025-07-04'),
    },
    {
      id: '3',
      orderNumber: 'ORD-003',
      customerId: '3',
      customerName: 'Michael Brown',
      status: 'shipped',
      items: [
        {
          id: '4',
          productId: '4',
          productName: 'Smartphone X',
          quantity: 1,
          unitPrice: 899.99,
          totalPrice: 899.99,
        },
        {
          id: '5',
          productId: '2',
          productName: 'Wireless Headphones',
          quantity: 1,
          unitPrice: 149.99,
          totalPrice: 149.99,
        },
      ],
      totalAmount: 1049.98,
      tax: 84.00,
      shippingCost: 0.00,
      paymentStatus: 'paid',
      paymentMethod: 'credit_card',
      companyId: '1',
      createdAt: new Date('2025-07-03'),
      updatedAt: new Date('2025-07-03'),
    },
    {
      id: '4',
      orderNumber: 'ORD-004',
      customerId: '4',
      customerName: 'Emily Davis',
      status: 'delivered',
      items: [
        {
          id: '6',
          productId: '3',
          productName: 'Office Chair',
          quantity: 2,
          unitPrice: 199.99,
          totalPrice: 399.98,
        },
      ],
      totalAmount: 399.98,
      tax: 32.00,
      shippingCost: 25.00,
      paymentStatus: 'paid',
      paymentMethod: 'bank_transfer',
      companyId: '1',
      createdAt: new Date('2025-07-02'),
      updatedAt: new Date('2025-07-02'),
    },
    {
      id: '5',
      orderNumber: 'ORD-005',
      customerId: '5',
      customerName: 'Robert Wilson',
      status: 'processing',
      items: [
        {
          id: '7',
          productId: '1',
          productName: 'Premium Laptop',
          quantity: 1,
          unitPrice: 1499.99,
          totalPrice: 1499.99,
        },
        {
          id: '8',
          productId: '5',
          productName: 'Smart Watch',
          quantity: 1,
          unitPrice: 249.99,
          totalPrice: 249.99,
        },
        {
          id: '9',
          productId: '3',
          productName: 'Office Chair',
          quantity: 1,
          unitPrice: 199.99,
          totalPrice: 199.99,
        },
      ],
      totalAmount: 1949.97,
      tax: 156.00,
      shippingCost: 0.00,
      paymentStatus: 'paid',
      paymentMethod: 'credit_card',
      companyId: '1',
      createdAt: new Date('2025-07-01'),
      updatedAt: new Date('2025-07-01'),
    },
  ];

  const filteredOrders = orders.filter(
    (order) =>
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
      case 'processing':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Processing</Badge>;
      case 'shipped':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Shipped</Badge>;
      case 'delivered':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Delivered</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Order
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            type="search"
            placeholder="Search orders..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order #</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.orderNumber}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{order.createdAt.toLocaleDateString()}</TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
                <TableCell>{formatCurrency(order.totalAmount)}</TableCell>
                <TableCell>
                  <Badge variant={order.paymentStatus === 'paid' ? 'outline' : 'destructive'} className={order.paymentStatus === 'paid' ? 'bg-green-50 text-green-700 border-green-200' : ''}>
                    {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>Edit order</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Update status</DropdownMenuItem>
                      <DropdownMenuItem>Generate invoice</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">Cancel order</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Orders;