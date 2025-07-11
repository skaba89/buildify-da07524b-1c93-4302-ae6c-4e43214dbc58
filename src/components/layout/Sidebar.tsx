
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage as useTranslation } from '../../contexts/LanguageContext';

// Icônes (utilisation de classes CSS pour simuler des icônes)
const DashboardIcon = () => <span className="icon dashboard-icon">📊</span>;
const ContactsIcon = () => <span className="icon contacts-icon">👥</span>;
const ProductsIcon = () => <span className="icon products-icon">📦</span>;
const OrdersIcon = () => <span className="icon orders-icon">🛒</span>;
const EmployeesIcon = () => <span className="icon employees-icon">👨‍💼</span>;
const SettingsIcon = () => <span className="icon settings-icon">⚙️</span>;

const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const menuItems = [
    { path: '/dashboard', label: t('dashboard'), icon: <DashboardIcon /> },
    { path: '/contacts', label: t('contacts'), icon: <ContactsIcon /> },
    { path: '/products', label: t('products'), icon: <ProductsIcon /> },
    { path: '/orders', label: t('orders'), icon: <OrdersIcon /> },
    { path: '/employees', label: t('employees'), icon: <EmployeesIcon /> },
    { path: '/settings', label: t('settings'), icon: <SettingsIcon /> },
  ];

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <h2 className="logo">CRM/ERP</h2>
        <button className="toggle-btn" onClick={toggleSidebar}>
          {collapsed ? '→' : '←'}
        </button>
      </div>
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={location.pathname === item.path ? 'active' : ''}
              >
                {item.icon}
                {!collapsed && <span>{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="sidebar-footer">
        <p>{!collapsed && `© 2025 MonEntreprise`}</p>
      </div>

      <style jsx>{`
        .sidebar {
          width: 250px;
          height: 100vh;
          background-color: #1a1a2e;
          color: #ffffff;
          transition: width 0.3s ease;
          position: fixed;
          left: 0;
          top: 0;
          z-index: 100;
          display: flex;
          flex-direction: column;
        }
        
        .sidebar.collapsed {
          width: 60px;
        }
        
        .sidebar-header {
          padding: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #2d2d42;
        }
        
        .logo {
          margin: 0;
          font-size: 1.5rem;
          white-space: nowrap;
          overflow: hidden;
        }
        
        .toggle-btn {
          background: none;
          border: none;
          color: #ffffff;
          cursor: pointer;
          font-size: 1.2rem;
        }
        
        .sidebar-nav {
          flex: 1;
          padding: 20px 0;
          overflow-y: auto;
        }
        
        .sidebar-nav ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .sidebar-nav li {
          margin-bottom: 5px;
        }
        
        .sidebar-nav a {
          display: flex;
          align-items: center;
          padding: 10px 20px;
          color: #ffffff;
          text-decoration: none;
          transition: background-color 0.3s;
          white-space: nowrap;
          overflow: hidden;
        }
        
        .sidebar-nav a:hover, .sidebar-nav a.active {
          background-color: #2d2d42;
        }
        
        .icon {
          margin-right: 10px;
          font-size: 1.2rem;
          min-width: 20px;
        }
        
        .sidebar-footer {
          padding: 20px;
          border-top: 1px solid #2d2d42;
          text-align: center;
          font-size: 0.8rem;
        }
      `}</style>
    </div>
  );
};

export default Sidebar;