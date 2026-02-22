import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Accounts', path: '/accounts' },
    { name: 'Transactions', path: '/transactions' },
    { name: 'Cash Flow', path: '/cashflow' },
    { name: 'Currency', path: '/currency' },
    { name: 'Reports', path: '/reports' },
    { name: 'Budget', path: '/budget' },
    { name: 'Recurring', path: '/recurring' },
    { name: 'Goals', path: '/goals' },
    { name: 'Investments', path: '/investments' },
    { name: 'Advice', path: '/advice' },
    { name: 'Logout', path: '/logout' }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h2>💰 Finance</h2>
      </div>
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;