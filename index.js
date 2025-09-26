const express = require("express");
const app = express();
const PORT = 3000;

// Route for /hello
app.get("/", (req, res) => {
  res.send("Hellodd from Node.jsss!");
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
