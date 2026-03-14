import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Overview from './Overview';
import Analytics from './Analytics';
import Announcements from './Announcements';
import FinancialFine from './FinancialFine';
import Fleet from './Fleet';
import RegisterDriver from './RegisterDriver';
import RegisterEmployee from './RegisterEmployee';

export default function DashboardRoutes() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Overview />} />
      <Route path="/dashboard/overview" element={<Overview />} />
      <Route path="/dashboard/analytics" element={<Analytics />} />
      <Route path="/dashboard/announcements" element={<Announcements />} />
      <Route path="/dashboard/financial/fine" element={<FinancialFine />} />
      <Route path="/dashboard/fleet" element={<Fleet />} />
      <Route path="/dashboard/register-driver" element={<RegisterDriver />} />
      <Route path="/dashboard/register-employee" element={<RegisterEmployee />} />
    </Routes>
  );
}
