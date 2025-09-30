import express from 'express';
import { getAllUsers, createUser } from '../controllers/USER/usercontroller.js';


const router = express.Router();


router.get('/', (req, res) => {
  // Render the index.ejs from the views folder with optional data
  res.render('index', { title: 'Home Page' });
});

export default router;
