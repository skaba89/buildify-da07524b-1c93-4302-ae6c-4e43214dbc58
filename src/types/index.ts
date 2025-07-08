
// Types utilisateur et authentification
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  companyId: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  EMPLOYEE = 'EMPLOYEE',
  VIEWER = 'VIEWER',
}

export interface Company {
  id: string;
  name: string;
  industry: string;
  size: string;
  address?: string;
  city?: string;
  zipCode?: string;
  country?: string;
  phone?: string;
  website?: string;
  logo?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Types CRM
export interface Contact {
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
  status: ContactStatus;
  companyId: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum ContactStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  LEAD = 'LEAD',
  CUSTOMER = 'CUSTOMER',
}

export interface Opportunity {
  id: string;
  name: string;
  contactId?: string;
  amount: number;
  stage: OpportunityStage;
  closeDate: Date;
  probability: number;
  notes?: string;
  companyId: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum OpportunityStage {
  PROSPECTING = 'PROSPECTING',
  QUALIFICATION = 'QUALIFICATION',
  PROPOSAL = 'PROPOSAL',
  NEGOTIATION = 'NEGOTIATION',
  CLOSED_WON = 'CLOSED_WON',
  CLOSED_LOST = 'CLOSED_LOST',
}

// Types Inventaire
export interface Product {
  id: string;
  name: string;
  code: string;
  description?: string;
  price: number;
  cost: number;
  quantity: number;
  category: string;
  supplier?: string;
  warehouse?: string;
  reorderLevel?: number;
  status: ProductStatus;
  companyId: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum ProductStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DISCONTINUED = 'DISCONTINUED',
}

// Types Ventes
export interface Order {
  id: string;
  orderNumber: string;
  orderDate: Date;
  customerId?: string;
  customerName: string;
  total: number;
  subtotal: number;
  tax: number;
  discount: number;
  shipping: number;
  shippingAddress?: string;
  billingAddress?: string;
  paymentMethod: string;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  notes?: string;
  items: OrderItem[];
  companyId: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
}

export enum PaymentStatus {
  PAID = 'PAID',
  UNPAID = 'UNPAID',
  PARTIAL = 'PARTIAL',
}

export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED',
}

// Types RH
export interface Employee {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  mobile?: string;
  department: string;
  position: string;
  manager?: string;
  hireDate: Date;
  salary: number;
  status: EmployeeStatus;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  notes?: string;
  companyId: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum EmployeeStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ON_LEAVE = 'ON_LEAVE',
  TERMINATED = 'TERMINATED',
}

// Types pour les tableaux et filtres
export interface TableColumn {
  id: string;
  label: string;
  accessor: string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: any, row: any) => React.ReactNode;
}

export interface FilterOption {
  id: string;
  label: string;
  value: string;
}

export interface SortOption {
  id: string;
  direction: 'asc' | 'desc';
}

// Types pour les notifications
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  createdAt: Date;
  userId: string;
}

export enum NotificationType {
  INFO = 'INFO',
  SUCCESS = 'SUCCESS',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
}

// Types pour les statistiques du tableau de bord
export interface DashboardStats {
  totalRevenue: number;
  totalSales: number;
  totalCustomers: number;
  totalOrders: number;
  totalProducts: number;
  totalEmployees: number;
  recentOrders: Order[];
  recentContacts: Contact[];
  salesByMonth: { month: string; value: number }[];
  topProducts: { name: string; value: number }[];
}