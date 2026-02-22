import React, { useState, useEffect } from 'react';
import './Pages.css';

// Sample currencies with symbol and conversion rate (relative to USD)
const currencies = [
  { code: 'USD', symbol: '$', rate: 1.0 },
  { code: 'EUR', symbol: '€', rate: 0.92 },
  { code: 'GBP', symbol: '£', rate: 0.79 },
  { code: 'JPY', symbol: '¥', rate: 150.25 },
  { code: 'CAD', symbol: 'C$', rate: 1.35 },
  { code: 'AUD', symbol: 'A$', rate: 1.52 },
];

const Currency = () => {
  const [selectedCurrency, setSelectedCurrency] = useState(() => {
    // Load from localStorage, default to USD
    const saved = localStorage.getItem('preferredCurrency');
    return saved ? JSON.parse(saved) : currencies[0];
  });
  const [amount, setAmount] = useState(100); // example amount in USD

  useEffect(() => {
    // Save to localStorage whenever selection changes
    localStorage.setItem('preferredCurrency', JSON.stringify(selectedCurrency));
  }, [selectedCurrency]);

  const handleCurrencyChange = (code) => {
    const currency = currencies.find(c => c.code === code);
    if (currency) setSelectedCurrency(currency);
  };

  // Convert the example amount from USD to selected currency
  const convertedAmount = (amount * selectedCurrency.rate).toFixed(2);

  return (
    <div className="page currency">
      <h1>Currency Settings</h1>
      <p>Choose your preferred currency for displaying amounts.</p>

      <div className="section">
        <h2>Select Currency</h2>
        <select
          value={selectedCurrency.code}
          onChange={(e) => handleCurrencyChange(e.target.value)}
        >
          {currencies.map((c) => (
            <option key={c.code} value={c.code}>
              {c.code} ({c.symbol})
            </option>
          ))}
        </select>

        <p>Current selection: {selectedCurrency.code} ({selectedCurrency.symbol})</p>
      </div>

      <div className="section">
        <h2>Preview</h2>
        <div className="preview-card">
          <label>
            Enter amount in USD:
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
              min="0"
              step="any"
            />
          </label>
          <p>
            Converted: <strong>{selectedCurrency.symbol}{convertedAmount}</strong> ({selectedCurrency.code})
          </p>
        </div>
      </div>

      <div className="section">
        <h2>Note</h2>
        <p>
          This sets your display currency. All amounts in the app will be shown in {selectedCurrency.code} using the stored conversion rate. 
          The rates above are static examples; in a real app, you would fetch live exchange rates.
        </p>
      </div>
    </div>
  );
};

export default Currency;