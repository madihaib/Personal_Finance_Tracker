// backend/routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../database'); 

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || 'hackathon_secret_key';

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    db.run(
      `INSERT INTO users (full_name, email, password_hash) VALUES (?, ?, ?)`,
      [name, email, hashedPassword],
      function (err) {
        if (err) {
          if (err.message.includes('UNIQUE constraint failed')) {
            return res.status(400).json({ error: 'Email already exists' });
          }
          return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'User created successfully', userId: this.lastID });
      }
    );
  } catch (error) {
    res.status(500).json({ error: 'Server error during registration' });
  }
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(400).json({ error: 'Invalid email or password' });

    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) return res.status(400).json({ error: 'Invalid email or password' });

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '24h' });
    
    res.json({ 
      message: 'Login successful', 
      token, 
      user: { id: user.id, name: user.full_name, email: user.email } 
    });
  });
});

module.exports = router;