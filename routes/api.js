import express from "express";
const router = express.Router();

// Example route
router.get('/hello', (req, res) => {
    res.send('Hello from API!');
});

export default router;
