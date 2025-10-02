import express from 'express';
import dotenv from 'dotenv';
import db from './models/db.js';
import router from './routes/api.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

// Test DB connection route
app.get('/connected', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT NOW() AS now');
    res.send('✅ Database connected! Current time: ' + rows[0].now);
  } catch (err) {
    console.error('❌ Database query failed:', err.message);
    res.status(500).send('❌ Database query failed: ' + err.message);
  }
});

app.use('/', router);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
