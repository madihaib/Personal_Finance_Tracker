import React, { useState } from 'react';
import './Pages.css';

const CashFlow = () => {
  const [events] = useState([
    { date: '2026-03-01', description: 'Payday', type: 'income' },
    { date: '2026-03-03', description: 'Rent', amount: -850, type: 'expense' },
    { date: '2026-03-05', description: 'Netflix', amount: -15.99, type: 'subscription' },
    { date: '2026-03-15', description: 'Credit Card Payment', amount: -150, type: 'expense' },
  ]);

  const [forecastDays] = useState(30);
  const [balance, setBalance] = useState(3400);

  const projectedBalance = events.reduce((bal, ev) => {
    if (ev.amount) return bal + ev.amount;
    return bal;
  }, balance);

  return (
    <div className="page cashflow">
      <h1>Cash Flow</h1>

      <div className="section">
        <h2>Cash Flow Calendar</h2>
        <div className="calendar-grid">
          {events.map((ev, idx) => (
            <div key={idx} className={`event ${ev.type}`}>
              <span>{ev.date}</span> <span>{ev.description} {ev.amount ? `$${ev.amount}` : ''}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <h2>Cash Flow Forecast (Next {forecastDays} days)</h2>
        <div className="forecast">
          <p>Current Balance: ${balance.toFixed(2)}</p>
          <p>Projected Balance: ${projectedBalance.toFixed(2)}</p>
          {projectedBalance < 100 && <div className="alert warning">⚠️ Low balance warning!</div>}
        </div>
        <div className="chart-placeholder"></div>
      </div>

      <div className="section">
        <h2>Risk Alerts</h2>
        <p>No upcoming deficits (demo).</p>
      </div>
    </div>
  );
};

export default CashFlow;