import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Pages.css';

const Accounts = () => {
  const [accounts, setAccounts] = useState([
    { id: 1, name: 'Checking', type: 'Checking', balance: 2540.32, interest: 0.01 },
    { id: 2, name: 'Savings', type: 'Savings', balance: 8500.00, interest: 1.5 },
    { id: 3, name: 'Cash', type: 'Cash', balance: 300.00 },
    { id: 4, name: 'Credit Card', type: 'Credit card', balance: -420.50, limit: 2000, utilization: 21.0, dueDate: '2026-03-15' },
    { id: 5, name: 'Student Loan', type: 'Student loan', balance: -12500.00, interest: 4.5, minPayment: 150 },
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAccount, setNewAccount] = useState({ name: '', type: 'Checking', balance: 0 });

  const addAccount = () => {
    if (!newAccount.name) return;
    setAccounts([...accounts, { ...newAccount, id: accounts.length + 1 }]);
    setShowAddForm(false);
    setNewAccount({ name: '', type: 'Checking', balance: 0 });
  };

  const deleteAccount = (id) => {
    setAccounts(accounts.filter(acc => acc.id !== id));
  };

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
  const creditUtil = accounts.filter(acc => acc.type === 'Credit card')
    .map(acc => (Math.abs(acc.balance) / acc.limit) * 100).join(', ') || 'N/A';

  return (
    <div className="page accounts">
      <h1>Accounts</h1>
      <div className="summary-cards">
        <div className="card">Total Balance: ${totalBalance.toFixed(2)}</div>
        <div className="card">Credit Utilization: {creditUtil}%</div>
      </div>

      <div className="section">
        <h2>Account Management</h2>
        <button onClick={() => setShowAddForm(!showAddForm)}>+ Add Account</button>
        {showAddForm && (
          <div className="form">
            <input placeholder="Account Name" value={newAccount.name} onChange={e => setNewAccount({...newAccount, name: e.target.value})} />
            <select value={newAccount.type} onChange={e => setNewAccount({...newAccount, type: e.target.value})}>
              <option>Checking</option><option>Savings</option><option>Cash</option><option>Credit card</option><option>Student loan</option>
            </select>
            <input type="number" placeholder="Balance" value={newAccount.balance} onChange={e => setNewAccount({...newAccount, balance: parseFloat(e.target.value)})} />
            <button onClick={addAccount}>Save</button>
          </div>
        )}
        <table className="accounts-table">
          <thead>
            <tr><th>Name</th><th>Type</th><th>Balance</th><th>Details</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {accounts.map(acc => (
              <tr key={acc.id}>
                <td><Link to={`/transactions?account=${acc.id}`}>{acc.name}</Link></td>
                <td>{acc.type}</td>
                <td className={acc.balance < 0 ? 'negative' : 'positive'}>${acc.balance.toFixed(2)}</td>
                <td>
                  {acc.type === 'Credit card' && `Limit: $${acc.limit} | Due: ${acc.dueDate}`}
                  {acc.type === 'Student loan' && `Interest: ${acc.interest}% | Min: $${acc.minPayment}`}
                </td>
                <td>
                  <button onClick={() => deleteAccount(acc.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="section">
        <h3>Transfers</h3>
        <p>Mock transfer form (from/to accounts)</p>
        {/* In reality you'd implement a transfer form here */}
      </div>

      <div className="section">
        <h3>Balance Trend (Placeholder Chart)</h3>
        <div className="chart-placeholder"></div>
      </div>
    </div>
  );
};

export default Accounts;