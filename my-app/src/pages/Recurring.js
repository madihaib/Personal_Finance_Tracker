import React, { useState } from 'react';
import './Pages.css';

const Recurring = () => {
  const [recurring, setRecurring] = useState([
    { id: 1, name: 'Netflix', amount: 15.99, frequency: 'Monthly', nextDue: '2026-03-05' },
    { id: 2, name: 'Rent', amount: 850, frequency: 'Monthly', nextDue: '2026-03-01' },
    { id: 3, name: 'Spotify', amount: 9.99, frequency: 'Monthly', nextDue: '2026-03-10' },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [newRecurring, setNewRecurring] = useState({ name: '', amount: 0, frequency: 'Monthly', nextDue: '' });

  const addRecurring = () => {
    setRecurring([...recurring, { ...newRecurring, id: recurring.length + 1, amount: parseFloat(newRecurring.amount) }]);
    setShowForm(false);
    setNewRecurring({ name: '', amount: 0, frequency: 'Monthly', nextDue: '' });
  };

  const totalMonthly = recurring.reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className="page recurring">
      <h1>Recurring</h1>
      <div className="summary-cards">
        <div className="card">Total Monthly Recurring: ${totalMonthly.toFixed(2)}</div>
      </div>

      <button onClick={() => setShowForm(!showForm)}>+ Add Recurring</button>
      {showForm && (
        <div className="form">
          <input placeholder="Name" value={newRecurring.name} onChange={e => setNewRecurring({...newRecurring, name: e.target.value})} />
          <input type="number" placeholder="Amount" value={newRecurring.amount} onChange={e => setNewRecurring({...newRecurring, amount: e.target.value})} />
          <select value={newRecurring.frequency} onChange={e => setNewRecurring({...newRecurring, frequency: e.target.value})}>
            <option>Weekly</option><option>Monthly</option><option>Yearly</option>
          </select>
          <input type="date" value={newRecurring.nextDue} onChange={e => setNewRecurring({...newRecurring, nextDue: e.target.value})} />
          <button onClick={addRecurring}>Save</button>
        </div>
      )}

      <table className="recurring-table">
        <thead><tr><th>Name</th><th>Amount</th><th>Frequency</th><th>Next Due</th></tr></thead>
        <tbody>
          {recurring.map(r => (
            <tr key={r.id}>
              <td>{r.name}</td>
              <td>${r.amount}</td>
              <td>{r.frequency}</td>
              <td>{r.nextDue} {new Date(r.nextDue) < new Date() ? '(overdue)' : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recurring;