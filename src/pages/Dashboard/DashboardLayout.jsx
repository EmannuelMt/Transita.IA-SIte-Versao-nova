import React from 'react';
import './Dashboard.css';

export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout">
      {children}
    </div>
  );
}
