import express from 'express';
import dotenv from 'dotenv';
import db from './models/db.js';   // ✅ Sequelize instance import karo

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
// app.get('/connected', async (req, res) => {
//   try {
//     await sequelize.authenticate(); // Sequelize ke authenticate method se test
//     res.send('✅ Database connected successfully!');
//   } catch (err) {
//     console.error('❌ Database connection failed:', err.message);
//     res.status(500).send('❌ Database connection failed: ' + err.message);
//   }
// });

// Use routes
app.use('/', router);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
