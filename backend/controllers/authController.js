const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) return res.status(400).json({ msg: "User already exists" });

  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashed });
  await user.save();
  res.status(201).json({ msg: "Registered!" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ msg: "User not found" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ msg: "Wrong password" });

  req.session.user = { id: user._id, role: user.role };

  const token = jwt.sign({ id: user._id }, "jwtsecret", { expiresIn: "2h" });
  res.json({ msg: "Logged in", token });
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.json({ msg: "Logged out" });
  });
};

exports.getMe = (req, res) => {
  if (!req.session.user) return res.status(401).json({ msg: "Not logged in" });
  res.json({ msg: `Hello ${req.session.user.role}` });
};
