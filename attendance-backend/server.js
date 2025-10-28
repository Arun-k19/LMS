// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',      // change if needed
  password: '',      // change if you have password
  database: 'attendance_system'
});

db.connect(err => {
  if (err) {
    console.error('DB connect error:', err);
  } else {
    console.log('✅ MySQL connected');
  }
});

// Login route
app.post('/api/login', (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ success: false, message: 'Send username, password & role' });
  }

  const sql = 'SELECT * FROM users WHERE username = ? AND password = ? AND role = ?';
  db.query(sql, [username, password, role], (err, results) => {
    if (err) {
      console.error('DB error:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }

    if (results.length > 0) {
      const user = results[0];
      return res.json({ success: true, message: 'Login successful', user: { id: user.id, username: user.username, role: user.role } });
    } else {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  });
});

// quick health
app.get('/', (req, res) => res.send('Backend running'));

const PORT = 3000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
