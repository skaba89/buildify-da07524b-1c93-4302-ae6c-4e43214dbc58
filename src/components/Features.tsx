
import React from 'react';
import { 
  Users, 
  ShoppingCart, 
  Package, 
  BarChart3, 
  UserCircle,
  Globe,
  Shield,
  Zap
} from 'lucide-react';

const features = [
  {
    name: 'Customer Relationship Management',
    description: 'Track leads, manage customer interactions, and nurture relationships to drive sales growth.',
    icon: Users,
  },
  {
    name: 'Sales Management',
    description: 'Process orders, generate invoices, and track payments in a streamlined workflow.',
    icon: ShoppingCart,
  },
  {
    name: 'Inventory Control',
    description: 'Monitor stock levels, manage products, and automate reordering processes.',
    icon: Package,
  },
  {
    name: 'Human Resources',
    description: 'Manage employee records, track time off, and streamline HR processes.',
    icon: UserCircle,
  },
  {
    name: 'Analytics & Reporting',
    description: 'Make data-driven decisions with customizable dashboards and comprehensive reports.',
    icon: BarChart3,
  },
  {
    name: 'Multi-Company Support',
    description: 'Manage multiple businesses from a single platform with secure data separation.',
    icon: Globe,
  },
  {
    name: 'Enterprise-Grade Security',
    description: 'Keep your business data safe with advanced security features and role-based access control.',
    icon: Shield,
  },
  {
    name: 'Performance & Scalability',
    description: 'Built for speed and reliability, our platform grows with your business needs.',
    icon: Zap,
  },
];

const Features = () => {
  return (
    <div className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Comprehensive Business Management
          </h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
            Our platform combines powerful CRM and ERP features to streamline your business operations
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.name} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mb-4">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">{feature.name}</h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;