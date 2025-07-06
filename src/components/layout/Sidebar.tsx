
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  X, 
  LayoutDashboard, 
  Users, 
  ShoppingCart, 
  Package, 
  FileText, 
  BarChart3, 
  Settings, 
  HelpCircle,
  UserCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { 
      name: 'CRM', 
      href: '#', 
      icon: Users,
      children: [
        { name: 'Contacts', href: '/crm/contacts' },
        { name: 'Opportunities', href: '/crm/opportunities' },
      ]
    },
    { 
      name: 'Sales', 
      href: '#', 
      icon: ShoppingCart,
      children: [
        { name: 'Orders', href: '/sales/orders' },
        { name: 'Invoices', href: '/sales/invoices' },
      ]
    },
    { 
      name: 'Inventory', 
      href: '#', 
      icon: Package,
      children: [
        { name: 'Products', href: '/inventory/products' },
        { name: 'Categories', href: '/inventory/categories' },
      ]
    },
    { 
      name: 'HR', 
      href: '#', 
      icon: UserCircle,
      children: [
        { name: 'Employees', href: '/hr/employees' },
        { name: 'Departments', href: '/hr/departments' },
      ]
    },
    { name: 'Reports', href: '/reports', icon: BarChart3 },
    { name: 'Settings', href: '/settings', icon: Settings },
    { name: 'Help', href: '/help', icon: HelpCircle },
  ];

  return (
    <>
      {/* Mobile sidebar */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-gray-900/80 lg:hidden",
          open ? "block" : "hidden"
        )}
        onClick={() => setOpen(false)}
      />

      {/* Sidebar component */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-900 dark:text-white">ERP+CRM</span>
          </Link>
          <button
            type="button"
            className="lg:hidden -mr-1 flex h-10 w-10 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            onClick={() => setOpen(false)}
          >
            <span className="sr-only">Close sidebar</span>
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-col h-0 flex-1 overflow-y-auto pt-5 pb-4">
          <nav className="mt-5 flex-1 space-y-1 px-2">
            {navigation.map((item) => (
              <div key={item.name}>
                {!item.children ? (
                  <Link
                    to={item.href}
                    className={cn(
                      "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                      location.pathname === item.href
                        ? "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                    )}
                  >
                    <item.icon
                      className={cn(
                        "mr-3 h-5 w-5",
                        location.pathname === item.href
                          ? "text-gray-500 dark:text-gray-300"
                          : "text-gray-400 dark:text-gray-400"
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                ) : (
                  <>
                    <div className="flex items-center px-2 py-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                      <item.icon className="mr-3 h-5 w-5 text-gray-400 dark:text-gray-400" aria-hidden="true" />
                      {item.name}
                    </div>
                    <div className="ml-6 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          to={child.href}
                          className={cn(
                            "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                            location.pathname === child.href
                              ? "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                          )}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </nav>
        </div>

        <div className="flex flex-shrink-0 border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
                <UserCircle className="h-5 w-5" />
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Admin User</p>
              <Link to="/profile" className="text-xs font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                View profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;