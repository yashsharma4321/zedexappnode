import express from 'express';
import dotenv from 'dotenv';
import sequelize from './models/db.js';  // Sequelize connection
import User from './models/User.js';      // User model
import router from './routes/api.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.use(express.json()); // for parsing JSON request bodies

// Test connection and sync models
sequelize.authenticate()
  .then(() => {
    console.log('✅ Connected to DB with Sequelize');
    return sequelize.sync(); // Sync models with DB
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Unable to connect to DB:', err);
  });

// Routes
app.use('/', router);
