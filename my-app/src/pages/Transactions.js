import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './Pages.css';

const Transactions = () => {
  const [searchParams] = useSearchParams();
  const accountFilter = searchParams.get('account');

  const categories = ['Food & Dining', 'Rent', 'Transportation', 'Tuition', 'Groceries', 'Subscriptions', 'Entertainment', 'Utilities', 'Miscellaneous'];
  const [transactions, setTransactions] = useState([
    { id: 1, date: '2026-02-20', description: 'Starbucks', amount: -4.50, category: 'Food & Dining', account: 1 },
    { id: 2, date: '2026-02-19', description: 'Paycheck', amount: 1200.00, category: 'Income', account: 1 },
    { id: 3, date: '2026-02-18', description: 'Netflix', amount: -15.99, category: 'Subscriptions', account: 4 },
    { id: 4, date: '2026-02-17', description: 'Tuition Payment', amount: -2500.00, category: 'Tuition', account: 5 },
  ]);
  const [filters, setFilters] = useState({ dateRange: '', category: '', type: '' });
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTx, setNewTx] = useState({ date: '', description: '', amount: '', category: '', account: '' });

  const addTransaction = () => {
    if (!newTx.description) return;
    setTransactions([...transactions, { ...newTx, id: transactions.length + 1, amount: parseFloat(newTx.amount) }]);
    setShowAddForm(false);
    setNewTx({ date: '', description: '', amount: '', category: '', account: '' });
  };

  const filtered = transactions.filter(tx => {
    if (accountFilter && tx.account !== parseInt(accountFilter)) return false;
    if (filters.category && tx.category !== filters.category) return false;
    if (filters.type === 'income' && tx.amount < 0) return false;
    if (filters.type === 'expense' && tx.amount > 0) return false;
    return true;
  });

  const totalSpent = filtered.filter(tx => tx.amount < 0).reduce((sum, tx) => sum + tx.amount, 0);
  const totalIncome = filtered.filter(tx => tx.amount > 0).reduce((sum, tx) => sum + tx.amount, 0);

  return (
    <div className="page transactions">
      <h1>Transactions</h1>
      {accountFilter && <p>Filtered by Account ID: {accountFilter}</p>}
      <div className="summary-cards">
        <div className="card">Income: ${totalIncome.toFixed(2)}</div>
        <div className="card">Expenses: ${Math.abs(totalSpent).toFixed(2)}</div>
        <div className="card">Net: ${(totalIncome + totalSpent).toFixed(2)}</div>
      </div>

      <div className="filters">
        <select onChange={e => setFilters({...filters, category: e.target.value})}>
          <option value="">All Categories</option>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <select onChange={e => setFilters({...filters, type: e.target.value})}>
          <option value="">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      <button onClick={() => setShowAddForm(!showAddForm)}>+ Add Transaction</button>
      {showAddForm && (
        <div className="form">
          <input type="date" value={newTx.date} onChange={e => setNewTx({...newTx, date: e.target.value})} />
          <input placeholder="Description" value={newTx.description} onChange={e => setNewTx({...newTx, description: e.target.value})} />
          <input type="number" placeholder="Amount" value={newTx.amount} onChange={e => setNewTx({...newTx, amount: e.target.value})} />
          <select value={newTx.category} onChange={e => setNewTx({...newTx, category: e.target.value})}>
            <option value="">Category</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <select value={newTx.account} onChange={e => setNewTx({...newTx, account: e.target.value})}>
            <option value="">Account</option>
            <option value="1">Checking</option><option value="2">Savings</option><option value="4">Credit Card</option>
          </select>
          <button onClick={addTransaction}>Save</button>
        </div>
      )}

      <table className="transactions-table">
        <thead><tr><th>Date</th><th>Description</th><th>Category</th><th>Amount</th></tr></thead>
        <tbody>
          {filtered.map(tx => (
            <tr key={tx.id}>
              <td>{tx.date}</td>
              <td>{tx.description}</td>
              <td>{tx.category}</td>
              <td className={tx.amount < 0 ? 'negative' : 'positive'}>${tx.amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;