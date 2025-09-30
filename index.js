import express from "express";
import sequelize from "./models/db.js";  // 👈 path adjust karo

const app = express();
const PORT = 3000;

// test DB connection before server start
sequelize.authenticate()
  .then(() => {
    console.log("✅ DB connected successfully");

    app.use(express.json());

    app.get("/hello", (req, res) => {
      res.send("hello");
    });

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB connection failed:", err.message);
  });
