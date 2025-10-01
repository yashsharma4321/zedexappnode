import express from 'express';
import dotenv from 'dotenv';
import sequelize from './models/db.js';   // ✅ import sequelize
import User from './models/users.js';     // ✅ import model
import router from './routes/api.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

// ✅ Test route
app.get('/connected', async (req, res) => {
  try {
    await sequelize.authenticate();
    res.send('✅ Database connected!');
  } catch (err) {
    console.error(err);
    res.status(500).send('❌ DB connection failed: ' + err.message);
  }
});

// Use API routes
app.use('/', router);

app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
