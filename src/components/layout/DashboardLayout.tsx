
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const DashboardLayout: React.FC = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <TopBar />
        <div className="content-wrapper">
          <Outlet />
        </div>
      </div>

      <style jsx>{`
        .dashboard-layout {
          display: flex;
          min-height: 100vh;
        }
        
        .main-content {
          flex: 1;
          margin-left: 250px;
          position: relative;
        }
        
        .content-wrapper {
          padding: 80px 20px 20px;
          min-height: calc(100vh - 60px);
        }
        
        @media (max-width: 768px) {
          .main-content {
            margin-left: 60px;
          }
        }
      `}</style>
    </div>
  );
};

export default DashboardLayout;