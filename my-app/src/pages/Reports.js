import React, { useState } from 'react';
import './Pages.css';

const Reports = () => {
  const [reportType, setReportType] = useState('spending');
  const [period, setPeriod] = useState('monthly');

  // Dummy data
  const categoryBreakdown = [
    { category: 'Food & Dining', amount: 450 },
    { category: 'Rent', amount: 850 },
    { category: 'Transportation', amount: 120 },
    { category: 'Tuition', amount: 2500 },
    { category: 'Entertainment', amount: 80 },
  ];

  const incomeSources = [
    { source: 'Part-time Job', amount: 1200 },
    { source: 'Scholarship', amount: 500 },
    { source: 'Family', amount: 200 },
  ];

  const savingsRate = ((1200 + 500 + 200 - 4000) / (1200 + 500 + 200) * 100).toFixed(1);

  return (
    <div className="page reports">
      <h1>Reports</h1>
      <div className="report-controls">
        <select value={reportType} onChange={e => setReportType(e.target.value)}>
          <option value="spending">Spending Report</option>
          <option value="income">Income Report</option>
          <option value="savings">Savings Metrics</option>
        </select>
        <select value={period} onChange={e => setPeriod(e.target.value)}>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
        <button>Export PDF</button>
        <button>Export CSV</button>
      </div>

      {reportType === 'spending' && (
        <div className="report">
          <h3>Spending by Category ({period})</h3>
          <table>
            <thead><tr><th>Category</th><th>Amount</th></tr></thead>
            <tbody>
              {categoryBreakdown.map(cat => (
                <tr key={cat.category}><td>{cat.category}</td><td>${cat.amount}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {reportType === 'income' && (
        <div className="report">
          <h3>Income Sources</h3>
          <table>
            <thead><tr><th>Source</th><th>Amount</th></tr></thead>
            <tbody>
              {incomeSources.map(src => (
                <tr key={src.source}><td>{src.source}</td><td>${src.amount}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {reportType === 'savings' && (
        <div className="report">
          <h3>Savings Metrics</h3>
          <p>Savings Rate: {savingsRate}%</p>
          <p>Tuition vs. Lifestyle: 2500 vs 650 (approx)</p>
        </div>
      )}
    </div>
  );
};

export default Reports;