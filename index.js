const express = require("express");
const mysql = require("mysql2");

const app = express();
const PORT = 3000;

// DB connection
const db = mysql.createConnection({
  host: "sql12.freesqldatabase.com",
  user: "sql12800096",
  password: "GNafgSl45K",
  database: "sql12800096",
  port: 3306
});

db.connect((err) => {
  if (err) {
    console.error("❌ DB connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL database!");
  }
});

// Route for /
app.get("/", (req, res) => {
  res.send("Hello from Node.js!");
});

// Example: Fetch users
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      return res.status(500).send("DB query error: " + err);
    }
    res.json(results);
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
