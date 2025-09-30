import express from "express";
import sequelize from "../models/db.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import  UserController from "../controllers/userController.js"; // exact same
const router = express.Router();

// --------------------
// DB Sync
// --------------------
sequelize.authenticate()
  .then(() => console.log("✅ DB connected!"))
  .catch(err => console.error("❌ DB connection failed:", err));

sequelize.sync()
  .then(() => console.log("✅ Tables synced!"))
  .catch(err => console.error("❌ Sync error:", err));

// --------------------
// Routes
// --------------------

// Test route
router.get('/hello',(req,res)=>{
  res.send('ee');
})
router.get("/",UserController);

// Signup
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: "User created", userId: user.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    res.json({ message: "Login successful", userId: user.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export { router };
