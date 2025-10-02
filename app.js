import express from 'express';
import dotenv from 'dotenv';
import db from './models/db.js';   // ✅ simple MySQL connection import

import router from './routes/api.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Serve static files
app.use(express.static('public'));

// ✅ Test DB connection route
app.get('/connected', (req, res) => {
  db.query('SELECT NOW() AS now', (err, results) => {
    if (err) {
      console.error('❌ Database query failed:', err.message);
      return res.status(500).send('❌ Database query failed: ' + err.message);
    }
    res.send('✅ Database connected! Current time: ' + results[0].now);
  });
});

// Use routes
app.use('/', router);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
