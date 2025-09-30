import express from 'express';
import dotenv from 'dotenv';
import mysql from 'mysql'; // ✅ Missing import
import router from './routes/api.js';

dotenv.config(); // Load .env file

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', './views'); // Folder for EJS files

// Serve static files (CSS, JS, images, etc.)
app.use(express.static('public'));

// ✅ MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});



db.connect((err) => {
  if (err) {
    console.error('❌ Database connection failed:', err);
  } else {

   
    console.log('✅ Connected to the database');
     app.get('/hello', (req, res) => {
      res.send('Connected');
    });
  }
});

// Make DB accessible in routes (optional)
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Use your API routes
app.use('/', router);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
