import express from 'express';
import dotenv from 'dotenv';
import mysql from 'mysql';
import router from './routes/api.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', './views'); // EJS views folder

// Serve static files (CSS, JS, images)
app.use(express.static('public'));

// ✅ Use connection pool instead of single connection
const db = mysql.createPool({
  connectionLimit: 10, // max open connections
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
});

// Test DB connection once at startup
db.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Database connection failed:', err.message);
  } else {
    console.log('✅ Connected to the database');
    connection.release();
  }
});

// Make DB accessible in routes
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Test route to check connection
app.get('/connected', (req, res) => {
  db.query('SELECT NOW() AS now', (err, results) => {
    if (err) {
      console.error('❌ Query error:', err);
      return res.status(500).send('❌ Database query failed: ' + err.message);
    }
    res.send('✅ Database connected! Current time: ' + results[0].now);
  });
});

// Use your API routes
app.use('/', router);

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
