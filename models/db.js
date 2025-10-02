import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

// MySQL connection create
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD, // .env me DB_PASSWORD likhna
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306
});

// Connect to DB
db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
  } else {
    console.log("✅ Database connected successfully");
  }
});

export default db;
