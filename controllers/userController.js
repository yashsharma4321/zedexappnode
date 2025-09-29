import User from "../models/User.js";

const UserController = (req, res) => {
  res.json({ message: "hello" });
};

export default UserController; // ✅ default export
