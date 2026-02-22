import React, { useState } from 'react';
import './Pages.css';

const Investments = () => {
  const [portfolio] = useState({
    total: 12450.32,
    dailyChange: +123.45,
    assets: [
      { name: 'AAPL', type: 'Stock', value: 3250.00, allocation: 26.1 },
      { name: 'VOO', type: 'ETF', value: 5200.00, allocation: 41.8 },
      { name: 'BTC', type: 'Crypto', value: 4000.32, allocation: 32.1 },
    ]
  });

  return (
    <div className="page investments">
      <h1>Investments</h1>
      <div className="summary-cards">
        <div className="card">Total Value: ${portfolio.total.toFixed(2)}</div>
        <div className="card">Daily Change: <span className={portfolio.dailyChange >= 0 ? 'positive' : 'negative'}>${portfolio.dailyChange.toFixed(2)}</span></div>
      </div>

      <div className="section">
        <h3>Asset Allocation</h3>
        <table>
          <thead><tr><th>Asset</th><th>Type</th><th>Value</th><th>Allocation</th></tr></thead>
          <tbody>
            {portfolio.assets.map(a => (
              <tr key={a.name}>
                <td>{a.name}</td><td>{a.type}</td><td>${a.value.toFixed(2)}</td><td>{a.allocation}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="section">
        <h3>Performance (1M / 6M / 1Y)</h3>
        <div className="chart-placeholder"></div>
      </div>

      <div className="section">
        <h3>Risk Metrics</h3>
        <p>Diversification: Medium (3 assets)</p>
        <p>Risk Level: Moderate</p>
      </div>
    </div>
  );
};

export default Investments;