import express from "express";
import router from "./routes/api.js"; // Make sure the path is correct

const PORT = 3000;
const app = express();

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

// Use the router for API routes
app.use('/api', router);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
