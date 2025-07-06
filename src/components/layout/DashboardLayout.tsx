
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar setSidebarOpen={setSidebarOpen} />

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;