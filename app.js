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

// Create MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Connect to the database
db.connect(err => {
  if (err) {
    console.error('❌ Database connection failed:', err);
  } else {
    console.log('✅ Connected to the database');
  }
});

// Make DB accessible in routes
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Test route to check connection
app.get('/connected', (req, res) => {
  res.send('✅ Database connected!');
});

// Use your API routes
app.use('/', router);

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
