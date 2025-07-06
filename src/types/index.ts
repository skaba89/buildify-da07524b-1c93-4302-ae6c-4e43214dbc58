
// Types pour l'authentification
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'user' | 'manager';
  companyId: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Company {
  id: string;
  name: string;
  logo?: string;
  industry: string;
  size: string;
  plan: 'free' | 'starter' | 'professional' | 'enterprise';
  createdAt: Date;
  updatedAt: Date;
}

// Types pour le CRM
export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  status: 'lead' | 'prospect' | 'customer' | 'inactive';
  tags: string[];
  notes?: string;
  assignedTo?: string;
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Opportunity {
  id: string;
  name: string;
  value: number;
  stage: 'qualification' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  contactId: string;
  assignedTo?: string;
  expectedCloseDate?: Date;
  notes?: string;
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Types pour l'ERP
export interface Product {
  id: string;
  name: string;
  sku: string;
  description?: string;
  price: number;
  cost?: number;
  stockQuantity: number;
  category: string;
  tags: string[];
  images?: string[];
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  totalAmount: number;
  tax?: number;
  shippingCost?: number;
  notes?: string;
  shippingAddress?: Address;
  billingAddress?: Address;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod?: string;
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  position: string;
  department: string;
  hireDate: Date;
  salary?: number;
  status: 'active' | 'on-leave' | 'terminated';
  manager?: string;
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Types pour les tableaux de bord et rapports
export interface DashboardMetric {
  id: string;
  name: string;
  value: number;
  change: number;
  changeType: 'increase' | 'decrease';
  period: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string[];
    borderColor?: string;
    borderWidth?: number;
  }[];
}