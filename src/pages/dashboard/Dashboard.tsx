
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DollarSign, Users, ShoppingCart, TrendingUp, Package, UserCheck } from 'lucide-react';
import { DashboardMetric } from '@/types';

const Dashboard: React.FC = () => {
  // Mock data - in a real app, this would come from Supabase
  const metrics: DashboardMetric[] = [
    {
      id: '1',
      name: 'Total Revenue',
      value: 45231.89,
      change: 20.1,
      changeType: 'increase',
      period: 'monthly',
    },
    {
      id: '2',
      name: 'New Customers',
      value: 34,
      change: 12.5,
      changeType: 'increase',
      period: 'monthly',
    },
    {
      id: '3',
      name: 'Active Orders',
      value: 126,
      change: 8.2,
      changeType: 'increase',
      period: 'monthly',
    },
    {
      id: '4',
      name: 'Inventory Items',
      value: 1423,
      change: 2.3,
      changeType: 'decrease',
      period: 'monthly',
    },
  ];

  const recentOrders = [
    { id: 'ORD-001', customer: 'John Smith', date: '2025-07-05', amount: 1250.00, status: 'delivered' },
    { id: 'ORD-002', customer: 'Sarah Johnson', date: '2025-07-04', amount: 890.50, status: 'processing' },
    { id: 'ORD-003', customer: 'Michael Brown', date: '2025-07-03', amount: 2340.75, status: 'shipped' },
    { id: 'ORD-004', customer: 'Emily Davis', date: '2025-07-02', amount: 450.25, status: 'delivered' },
    { id: 'ORD-005', customer: 'Robert Wilson', date: '2025-07-01', amount: 1875.00, status: 'processing' },
  ];

  const topProducts = [
    { id: 'PRD-001', name: 'Premium Laptop', sold: 124, revenue: 186000.00 },
    { id: 'PRD-002', name: 'Wireless Headphones', sold: 85, revenue: 12750.00 },
    { id: 'PRD-003', name: 'Smartphone X', sold: 65, revenue: 58500.00 },
    { id: 'PRD-004', name: 'Office Chair', sold: 43, revenue: 8600.00 },
    { id: 'PRD-005', name: 'Smart Watch', sold: 38, revenue: 9500.00 },
  ];

  const getMetricIcon = (name: string) => {
    switch (name) {
      case 'Total Revenue':
        return <DollarSign className="h-5 w-5 text-muted-foreground" />;
      case 'New Customers':
        return <Users className="h-5 w-5 text-muted-foreground" />;
      case 'Active Orders':
        return <ShoppingCart className="h-5 w-5 text-muted-foreground" />;
      case 'Inventory Items':
        return <Package className="h-5 w-5 text-muted-foreground" />;
      default:
        return <TrendingUp className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <Tabs defaultValue="day">
            <TabsList>
              <TabsTrigger value="day">Day</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="year">Year</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.name}
              </CardTitle>
              {getMetricIcon(metric.name)}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {metric.name.includes('Revenue') 
                  ? formatCurrency(metric.value)
                  : metric.value.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                <span className={metric.changeType === 'increase' ? 'text-green-500' : 'text-red-500'}>
                  {metric.changeType === 'increase' ? '↑' : '↓'} {metric.change}%
                </span>{' '}
                from last {metric.period}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>
              Latest 5 orders across all channels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                <div>Order</div>
                <div>Customer</div>
                <div>Date</div>
                <div className="text-right">Amount</div>
              </div>
              <div className="space-y-2">
                {recentOrders.map((order) => (
                  <div key={order.id} className="grid grid-cols-4 items-center text-sm">
                    <div className="font-medium">{order.id}</div>
                    <div>{order.customer}</div>
                    <div>{order.date}</div>
                    <div className="text-right font-medium">{formatCurrency(order.amount)}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
            <CardDescription>
              Best selling products this month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                <div className="col-span-2">Product</div>
                <div>Sold</div>
                <div className="text-right">Revenue</div>
              </div>
              <div className="space-y-2">
                {topProducts.map((product) => (
                  <div key={product.id} className="grid grid-cols-4 items-center text-sm">
                    <div className="col-span-2 font-medium">{product.name}</div>
                    <div>{product.sold}</div>
                    <div className="text-right font-medium">{formatCurrency(product.revenue)}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;