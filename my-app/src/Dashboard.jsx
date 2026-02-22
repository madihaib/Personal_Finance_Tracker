import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Retrieve the logged-in user's name from localStorage
    // You would set this when the user logs in, e.g.:
    // localStorage.setItem('userName', response.data.full_name);
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName);
    } else {
      // Fallback if no name is stored
      setUserName('there');
    }
  }, []);

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <h1>Welcome back, {userName}!</h1>
        <div className="profile-icon">👤</div>
      </header>

      {/* Main grid layout – same as before */}
      <div className="dashboard-grid">
        {/* Left column */}
        <div className="grid-col col-left">
          {/* Budget Card */}
          <div className="card budget-card">
            <h2>Budget December 2024</h2>
            <div className="budget-stats">
              <div className="stat-item">
                <span className="stat-label">Income</span>
                <span className="stat-value">$4,200 earned</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Expenses</span>
                <span className="stat-value">$3,508 spent</span>
              </div>
            </div>
            <div className="budget-summary">
              <div className="summary-row">
                <span>$8,410 budget</span>
                <span>$4,210 remaining</span>
                <span>$5,190 budget</span>
              </div>
            </div>
            <div className="net-worth">
              <span className="net-worth-label">$687K net worth</span>
              <span className="net-worth-change">↑ $23,542.96 (3.5%)</span>
              <span className="net-worth-period">1 month</span>
            </div>
          </div>

          {/* Chart 1 (placeholder) */}
          <div className="card chart-card">
            <h3>Chart 1</h3>
            <div className="chart-placeholder">
              <div className="x-axis">Nov 8, Nov 12, Nov 16, Nov 20, Nov 24, Nov 28, Dec 2, Dec 6</div>
              <div className="y-axis">$0 – $1,000</div>
              <div className="fake-chart"></div>
            </div>
          </div>

          {/* Transactions Most Recent */}
          <div className="card transactions-card">
            <h3>Transactions Most Recent</h3>
            <ul className="transaction-list">
              <li><span>SYNCB/CARE...</span> <span>Shopping +$10.00</span></li>
              <li><span>SYNCB/CARE...</span> <span>Transfer +$50.00</span></li>
              <li><span>ATLANTIC MO...</span> <span>Shopping +$10.00</span></li>
              <li><span>ATLANTIC MO...</span> <span>Transfer +$50.00</span></li>
            </ul>
          </div>

          {/* Goals Your top 3 priorities */}
          <div className="card goals-card">
            <h3>Goals Your top 3 priorities:</h3>
            <div className="goal-item">
              <span className="goal-name">EMERGENCY FUND</span>
              <span className="goal-amount">$50,108</span>
              <span className="goal-progress">$0.00 (0%) This month</span>
            </div>
          </div>
        </div>

        {/* Middle column */}
        <div className="grid-col col-middle">
          {/* Spending $3,528.37 this month */}
          <div className="card spending-card">
            <h3>Spending $3,528.37 this month</h3>
            <div className="chart-placeholder">
              <div className="x-axis">Day 3, Day 6, Day 9, Day 13, Day 17, Day 21, Day 25, Day 30</div>
              <div className="y-axis">$0 – $10,000</div>
              <div className="fake-chart"></div>
            </div>
          </div>

          {/* All transactions */}
          <div className="card all-transactions-card">
            <h3>All transactions</h3>
            <ul className="transaction-list">
              <li><span>SYNCB/CARE...</span> <span>Shopping +$10.00</span></li>
              <li><span>SYNCB/CARE...</span> <span>Transfer +$50.00</span></li>
              <li><span>ATLANTIC MO...</span> <span>Shopping +$10.00</span></li>
              <li><span>ATLANTIC MO...</span> <span>Transfer +$50.00</span></li>
            </ul>
          </div>

          {/* Streaming Sub... */}
          <div className="card streaming-card">
            <h3>Streaming Sub...</h3>
            <div className="streaming-item">
              <span>Entertainment...</span> <span>+$10.00</span>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="grid-col col-right">
          {/* Recurring */}
          <div className="card recurring-card">
            <h3>Recurring $888 remaining due</h3>
            <div className="recurring-item">
              <span>Mortgage</span>
              <span>Account • Every month</span>
              <span className="due-amount">$339.00 in 7 days</span>
            </div>
          </div>

          {/* Help & Support */}
          <div className="card help-card">
            <h3>Help & Support</h3>
            <p>Melanie Smith</p>
            <div className="down-payment">
              <span>DOWN PAYMENT</span>
              <span className="amount">$25,890</span>
              <span className="progress">$0.00 (0%) This month</span>
            </div>
          </div>

          {/* Joint Credit Card */}
          <div className="card credit-card">
            <h3>Joint Credit Card</h3>
            <div className="credit-detail">
              <span>Account • Every month</span>
              <span className="due-amount">$549.00 in 13 days</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;