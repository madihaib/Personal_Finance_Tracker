import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import Accounts from './pages/Accounts';
import Transactions from './pages/Transactions';
import CashFlow from './pages/CashFlow';
import Reports from './pages/Reports';
import Budget from './pages/Budget';
import Recurring from './pages/Recurring';
import Goals from './pages/Goals';
import Investments from './pages/Investments';
import Advice from './pages/Advice';
import Currency from './pages/Currency';
import Logout from './pages/Logout';
import AuthPage from './AuthPage'; // adjust import path as needed
import './App.css';

function AppContent() {
  const location = useLocation();
  const showSidebar = location.pathname !== '/'; // hide sidebar only on the root (AuthPage)

  return (
    <div className="app-layout">
      {showSidebar && <Sidebar />}
      <main className={`main-content ${!showSidebar ? 'no-sidebar' : ''}`}>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/cashflow" element={<CashFlow />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/recurring" element={<Recurring />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/investments" element={<Investments />} />
          <Route path="/advice" element={<Advice />} />
          <Route path="/currency" element={<Currency />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;