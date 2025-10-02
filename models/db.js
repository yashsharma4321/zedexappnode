import mysql from 'mysql2/promise'; // promise based, async/await ke liye
import dotenv from 'dotenv';

dotenv.config();

// MySQL connection pool create
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,  // max 10 simultaneous connections
  queueLimit: 0
});

export default pool;
