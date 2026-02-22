import React, { useState } from 'react';
import './Pages.css';

const Goals = () => {
  const [goals, setGoals] = useState([
    { id: 1, name: 'Emergency Fund', target: 5000, current: 1250, targetDate: '2026-12-31' },
    { id: 2, name: 'New Laptop', target: 1500, current: 800, targetDate: '2026-06-30' },
  ]);
  const [newGoal, setNewGoal] = useState({ name: '', target: 0, targetDate: '' });
  const [showForm, setShowForm] = useState(false);

  const addGoal = () => {
    setGoals([...goals, { ...newGoal, id: goals.length + 1, current: 0, target: parseFloat(newGoal.target) }]);
    setShowForm(false);
    setNewGoal({ name: '', target: 0, targetDate: '' });
  };

  const contribute = (id, amount) => {
    setGoals(goals.map(g => g.id === id ? { ...g, current: g.current + amount } : g));
  };

  return (
    <div className="page goals">
      <h1>Goals</h1>
      <button onClick={() => setShowForm(!showForm)}>+ Create Goal</button>
      {showForm && (
        <div className="form">
          <input placeholder="Goal Name" value={newGoal.name} onChange={e => setNewGoal({...newGoal, name: e.target.value})} />
          <input type="number" placeholder="Target Amount" value={newGoal.target} onChange={e => setNewGoal({...newGoal, target: e.target.value})} />
          <input type="date" placeholder="Target Date" value={newGoal.targetDate} onChange={e => setNewGoal({...newGoal, targetDate: e.target.value})} />
          <button onClick={addGoal}>Save</button>
        </div>
      )}

      <div className="goals-list">
        {goals.map(g => {
          const percent = (g.current / g.target) * 100;
          const daysLeft = Math.ceil((new Date(g.targetDate) - new Date()) / (1000*60*60*24));
          return (
            <div key={g.id} className="goal-card">
              <h3>{g.name}</h3>
              <p>${g.current} / ${g.target} ({percent.toFixed(1)}%)</p>
              <div className="progress-bar"><div style={{width: percent+'%'}}></div></div>
              <p>{daysLeft > 0 ? `${daysLeft} days left` : 'Past due'}</p>
              <button onClick={() => contribute(g.id, 100)}>Contribute $100</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Goals;