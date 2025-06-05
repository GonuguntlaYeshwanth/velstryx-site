const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // serve your front-end files

// Initialize SQLite DB
const db = new sqlite3.Database('./velstryx.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
    // Create contacts table if not exists
    db.run(`CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
  }
});

// Setup nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'icymac.in@gmail.com',  // Replace with your Gmail
    pass: 'umlt kfib tewo ejbu'      // Replace with your Gmail App Password
  }
});

// API endpoint for contact form
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const query = `INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)`;
  db.run(query, [name, email, message], function(err) {
    if (err) {
      console.error('DB insert error:', err.message);
      return res.status(500).json({ error: 'Database error.' });
    }

    // Send email notification
    const mailOptions = {
      from: 'VELSTRYX <your-email@gmail.com>',
      to: 'icymac.in@gmail.com',
      subject: 'New Contact Form Submission - VELSTRYX',
      text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ error: 'Failed to send notification email.' });
      }
      res.json({ message: 'Contact saved and notification email sent.', id: this.lastID });
    });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});