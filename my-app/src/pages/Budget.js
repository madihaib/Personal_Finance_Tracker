import React, { useState } from 'react';
import './Pages.css';

const Budget = () => {
  const categories = ['Food & Dining', 'Rent', 'Transportation', 'Tuition', 'Groceries', 'Entertainment', 'Utilities'];
  const [budgets, setBudgets] = useState([
    { category: 'Food & Dining', limit: 500, spent: 320 },
    { category: 'Rent', limit: 850, spent: 850 },
    { category: 'Entertainment', limit: 100, spent: 80 },
  ]);
  const [newBudget, setNewBudget] = useState({ category: '', limit: 0 });

  const addBudget = () => {
    if (!newBudget.category) return;
    setBudgets([...budgets, { ...newBudget, spent: 0 }]);
    setNewBudget({ category: '', limit: 0 });
  };

  const totalBudget = budgets.reduce((sum, b) => sum + b.limit, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);

  return (
    <div className="page budget">
      <h1>Budget</h1>
      <div className="summary-cards">
        <div className="card">Total Budget: ${totalBudget}</div>
        <div className="card">Total Spent: ${totalSpent}</div>
        <div className="card">Remaining: ${totalBudget - totalSpent}</div>
      </div>

      <div className="section">
        <h2>Create / Edit Budget</h2>
        <select value={newBudget.category} onChange={e => setNewBudget({...newBudget, category: e.target.value})}>
          <option value="">Select Category</option>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <input type="number" placeholder="Monthly Limit" value={newBudget.limit} onChange={e => setNewBudget({...newBudget, limit: parseFloat(e.target.value)})} />
        <button onClick={addBudget}>Add Budget</button>
      </div>

      <div className="budget-list">
        {budgets.map((b, idx) => {
          const percent = (b.spent / b.limit) * 100;
          let statusClass = 'good';
          if (percent > 100) statusClass = 'over';
          else if (percent > 80) statusClass = 'warning';
          return (
            <div key={idx} className={`budget-item ${statusClass}`}>
              <span>{b.category}</span>
              <span>Limit: ${b.limit}</span>
              <span>Spent: ${b.spent}</span>
              <div className="progress-bar"><div style={{width: percent+'%'}}></div></div>
              <span>{percent.toFixed(1)}% used</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Budget;