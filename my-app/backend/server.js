// backend/server.js
const express = require('express');
const cors = require('cors');
const db = require('./database');
const authRoutes = require('./routes/auth');
const authenticateToken = require('./middleware/authMiddleware'); 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);


app.get('/api/accounts', authenticateToken, (req, res) => {
  const userId = req.user.id; // <-- Gets ID dynamically from the token
  
  db.all('SELECT * FROM accounts WHERE user_id = ?', [userId], (err, rows) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(rows);
  });
});

// Add a new account
app.post('/api/accounts', authenticateToken, (req, res) => {
  const { name, type, balance, credit_limit, due_date } = req.body;
  const userId = req.user.id; 
  
  db.run(
    `INSERT INTO accounts (user_id, name, type, balance, credit_limit, due_date)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [userId, name, type, balance, credit_limit, due_date],
    function(err) {
      if (err) res.status(400).json({ error: err.message });
      else res.json({ id: this.lastID });
    }
  );
});

// Get transactions
app.get('/api/transactions', authenticateToken, (req, res) => {
  const userId = req.user.id;
  const { account_id } = req.query;
  
  let query = 'SELECT * FROM transactions WHERE user_id = ?';
  const params = [userId];
  
  if (account_id) {
    query += ' AND account_id = ?';
    params.push(account_id);
  }
  query += ' ORDER BY date DESC';
  
  db.all(query, params, (err, rows) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(rows);
  });
});

// Add a transaction
app.post('/api/transactions', authenticateToken, (req, res) => {
  const { account_id, category_id, date, amount, description, merchant } = req.body;
  const userId = req.user.id;
  
  db.run(
    `INSERT INTO transactions (user_id, account_id, category_id, date, amount, description, merchant)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [userId, account_id, category_id, date, amount, description, merchant],
    function(err) {
      if (err) res.status(400).json({ error: err.message });
      else {
        db.run('UPDATE accounts SET balance = balance + ? WHERE id = ?', [amount, account_id]);
        res.json({ id: this.lastID });
      }
    }
  );
});

// Get budget summary 
app.get('/api/budgets', authenticateToken, (req, res) => {
  // Mock data for now, but safe behind login!
  res.json([
    { category: 'Food & Dining', limit: 500, spent: 320 },
    { category: 'Rent', limit: 850, spent: 850 },
  ]);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});