require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./database');
const authRoutes = require('./routes/auth');
const authenticateToken = require('./middleware/authMiddleware');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Public Routes
app.use('/api/auth', authRoutes);

// Protected Routes (Require Login Token)
app.get('/api/accounts', authenticateToken, (req, res) => {
  const userId = req.user.id; 
  db.all('SELECT * FROM accounts WHERE user_id = ?', [userId], (err, rows) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(rows);
  });
});

app.get('/api/transactions', authenticateToken, (req, res) => {
  const userId = req.user.id;
  db.all('SELECT * FROM transactions WHERE user_id = ? ORDER BY date DESC', [userId], (err, rows) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(rows);
  });
});

app.post('/api/transactions', authenticateToken, (req, res) => {
  const { account_id, category_id, date, amount, description, merchant } = req.body;
  const userId = req.user.id;
  db.run(
    `INSERT INTO transactions (user_id, account_id, category_id, date, amount, description, merchant) VALUES (?, ?, ?, ?, ?, ?, ?)`,
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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});