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

// Route to check DB connection
app.get("/", (req, res) => {
  db.query("SELECT 1", (err) => {
    if (err) {
      res.send("❌ DB connection failed: " + err.message);
    } else {
      res.send("✅ DB connected successfully!");
    }
  });
});

// Route to create users table
app.get("/create-table", (req, res) => {
  const sql = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  db.query(sql, (err) => {
    if (err) {
      res.send("❌ Table creation failed: " + err.message);
    } else {
      res.send("✅ Users table created successfully!");
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
