
import React from 'react';
import { useTranslation } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  // Données fictives pour le tableau de bord
  const dashboardData = {
    todaySales: '2 450 €',
    monthlyRevenue: '78 500 €',
    totalCustomers: '1 245',
    pendingOrders: '18',
    recentActivity: [
      { id: 1, type: 'order', description: 'Nouvelle commande #1234 de Jean Martin', time: 'Il y a 10 minutes' },
      { id: 2, type: 'contact', description: 'Nouveau contact ajouté: Marie Dupont', time: 'Il y a 30 minutes' },
      { id: 3, type: 'product', description: 'Stock faible pour "Ordinateur portable XYZ"', time: 'Il y a 1 heure' },
      { id: 4, type: 'order', description: 'Commande #1230 marquée comme livrée', time: 'Il y a 2 heures' },
    ],
  };

  return (
    <div className="dashboard-page">
      <h1>{t('welcomeBack')}, {user?.name || 'Utilisateur'} 👋</h1>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>{t('todaySales')}</h3>
          <p className="stat-value">{dashboardData.todaySales}</p>
        </div>
        <div className="stat-card">
          <h3>{t('monthlyRevenue')}</h3>
          <p className="stat-value">{dashboardData.monthlyRevenue}</p>
        </div>
        <div className="stat-card">
          <h3>{t('totalCustomers')}</h3>
          <p className="stat-value">{dashboardData.totalCustomers}</p>
        </div>
        <div className="stat-card">
          <h3>{t('pendingOrders')}</h3>
          <p className="stat-value">{dashboardData.pendingOrders}</p>
        </div>
      </div>
      
      <div className="dashboard-content">
        <div className="recent-activity">
          <h2>{t('recentActivity')}</h2>
          <ul className="activity-list">
            {dashboardData.recentActivity.map((activity) => (
              <li key={activity.id} className={`activity-item ${activity.type}`}>
                <div className="activity-icon">
                  {activity.type === 'order' && '🛒'}
                  {activity.type === 'contact' && '👤'}
                  {activity.type === 'product' && '📦'}
                </div>
                <div className="activity-details">
                  <p className="activity-description">{activity.description}</p>
                  <p className="activity-time">{activity.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="quick-actions">
          <h2>{t('quickActions')}</h2>
          <div className="action-buttons">
            <a href="/contacts/new" className="action-btn">
              <span className="action-icon">👤</span>
              <span className="action-text">{t('addContact')}</span>
            </a>
            <a href="/products/new" className="action-btn">
              <span className="action-icon">📦</span>
              <span className="action-text">{t('addProduct')}</span>
            </a>
            <a href="/orders/new" className="action-btn">
              <span className="action-icon">🛒</span>
              <span className="action-text">{t('viewAllOrders')}</span>
            </a>
            <a href="/employees/new" className="action-btn">
              <span className="action-icon">👨‍💼</span>
              <span className="action-text">{t('addEmployee')}</span>
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .dashboard-page {
          padding: 20px;
        }
        
        h1 {
          margin-bottom: 30px;
          color: #1a1a2e;
        }
        
        .dashboard-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }
        
        .stat-card {
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          padding: 20px;
          transition: transform 0.3s ease;
        }
        
        .stat-card:hover {
          transform: translateY(-5px);
        }
        
        .stat-card h3 {
          font-size: 1rem;
          color: #6c757d;
          margin-bottom: 10px;
        }
        
        .stat-value {
          font-size: 1.8rem;
          font-weight: 600;
          color: #1a1a2e;
          margin: 0;
        }
        
        .dashboard-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }
        
        .recent-activity, .quick-actions {
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          padding: 20px;
        }
        
        .activity-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .activity-item {
          display: flex;
          align-items: flex-start;
          padding: 15px 0;
          border-bottom: 1px solid #e0e0e0;
        }
        
        .activity-item:last-child {
          border-bottom: none;
        }
        
        .activity-icon {
          font-size: 1.5rem;
          margin-right: 15px;
          min-width: 30px;
          text-align: center;
        }
        
        .activity-details {
          flex: 1;
        }
        
        .activity-description {
          margin: 0 0 5px;
          font-size: 0.95rem;
        }
        
        .activity-time {
          margin: 0;
          font-size: 0.8rem;
          color: #6c757d;
        }
        
        .action-buttons {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 15px;
          margin-top: 15px;
        }
        
        .action-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-color: #f8f9fa;
          border-radius: 8px;
          padding: 15px;
          text-decoration: none;
          color: #1a1a2e;
          transition: background-color 0.3s ease;
        }
        
        .action-btn:hover {
          background-color: #e9ecef;
          text-decoration: none;
        }
        
        .action-icon {
          font-size: 2rem;
          margin-bottom: 10px;
        }
        
        .action-text {
          font-size: 0.9rem;
          text-align: center;
        }
        
        @media (max-width: 768px) {
          .dashboard-stats {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .dashboard-content {
            grid-template-columns: 1fr;
          }
        }
        
        @media (max-width: 480px) {
          .dashboard-stats {
            grid-template-columns: 1fr;
          }
          
          .action-buttons {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;