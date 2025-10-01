import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

// ✅ Connection Pool (Vercel friendly)
const db = mysql.createPool({
  connectionLimit: 10, // max connections
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
});

// ✅ Test connection
db.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Database connection failed:', err.message);
  } else {
    console.log('✅ Connected to the database');
    connection.release();
  }
});

export default db;
