const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// SQLite setup
const db = new sqlite3.Database('./contacts.db', (err) => {
  if (err) return console.error('DB Connection error:', err.message);
  console.log('Connected to SQLite database.');
});

// Create contacts table if it doesn't exist
db.run(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) return console.error('Table creation error:', err.message);
    console.log('Contacts table ensured.');
  });

// Nodemailer transporter (update your Gmail and app password here)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER || 'icymac.in@gmail.com',  // your gmail
    pass: process.env.GMAIL_APP_PASS || 'umlt kfib tewo ejbu'   // your app password
  }
});

// API endpoint to receive contact form submissions
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please provide name, email, and message.' });
  }

  // Insert into DB
  const sql = `INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)`;
  db.run(sql, [name, email, message], function (err) {
    if (err) {
      console.error('DB Insert error:', err.message);
      return res.status(500).json({ error: 'Failed to save contact message.' });
    }

    // Send notification email
    const mailOptions = {
      from: `"VELSTRYX Contact" <${transporter.options.auth.user}>`,
      to: 'icymac.in@gmail.com',  // your notification email
      subject: 'New Contact Form Submission',
      text: `New message from contact form:\n\nName: ${name}\nEmail: ${email}\nMessage:\n${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ error: 'Failed to send notification email.' });
      }
      console.log('Notification email sent:', info.response);
      res.json({ message: 'Contact message saved and email sent successfully.', id: this.lastID });
    });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});