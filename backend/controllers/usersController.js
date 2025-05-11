const User = require("../models/User");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").lean();
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    res.json({ message: "Users found", users });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { getAllUsers };
