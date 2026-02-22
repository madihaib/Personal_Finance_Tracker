import React, { useState } from 'react';
import './Pages.css';

const Advice = () => {
  const [insights] = useState([
    { type: 'warning', message: 'You spent $450 on dining out this month, 20% over budget.' },
    { type: 'tip', message: 'Consider reducing subscriptions by $25/month to save $300/year.' },
    { type: 'achievement', message: 'Savings rate increased by 5% this month – great job!' },
  ]);

  const [simulation, setSimulation] = useState({ saveMore: 100, reduceDining: 30 });
  const [simResult, setSimResult] = useState('');

  const runSimulation = () => {
    const extraSavings = simulation.saveMore * 12;
    const diningSavings = (simulation.reduceDining / 100) * 450 * 12;
    setSimResult(`If you save $${simulation.saveMore}/month and reduce dining by ${simulation.reduceDining}%, you could save ~$${Math.round(extraSavings + diningSavings)}/year.`);
  };

  return (
    <div className="page advice">
      <h1>Advice</h1>

      <div className="section">
        <h2>AI-Powered Insights</h2>
        {insights.map((ins, i) => (
          <div key={i} className={`insight ${ins.type}`}>{ins.message}</div>
        ))}
      </div>

      <div className="section">
        <h2>Personalized Recommendations</h2>
        <p>📉 Your credit utilization is 21% – try to keep it below 30%.</p>
        <p>💰 Build an emergency fund of at least $5,000 for 3 months of expenses.</p>
      </div>

      <div className="section">
        <h2>Scenario Simulation</h2>
        <div className="simulator">
          <label>Save extra $/month: <input type="number" value={simulation.saveMore} onChange={e => setSimulation({...simulation, saveMore: +e.target.value})} /></label>
          <label>Reduce dining out by %: <input type="number" value={simulation.reduceDining} onChange={e => setSimulation({...simulation, reduceDining: +e.target.value})} /></label>
          <button onClick={runSimulation}>Simulate</button>
          {simResult && <p className="sim-result">{simResult}</p>}
        </div>
      </div>

      <div className="section">
        <h2>Student Education</h2>
        <ul>
          <li>💡 Credit score basics: pay bills on time, keep utilization low.</li>
          <li>📚 Student loan repayment: consider income-driven plans.</li>
          <li>🎓 Save on campus: buy used textbooks, split streaming accounts.</li>
        </ul>
      </div>
    </div>
  );
};

export default Advice;