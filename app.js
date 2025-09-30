import express from 'express';
import router from './routes/api.js';

const app = express();
const PORT = 3000;

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', './views'); // your EJS files folder

// Serve static files like CSS/JS from 'public'
app.use(express.static('public'));

// Use your router
app.use('/', router);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
