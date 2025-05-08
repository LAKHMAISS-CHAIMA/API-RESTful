const User = require("../models/User");

const authBasic = async (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth) {
    return res.status(401).json({ message: "No credentials provided" });
  }

  const parts = auth.split(" ");

  if (parts.length !== 2 || parts[0] !== "Basic") {
    return res.status(400).json({ message: "Bad format" });
  }

  const credentials = parts[1]; 

  const separatorIndex = credentials.indexOf(":");

  if (separatorIndex === -1) {
    return res.status(400).json({ message: "Invalid credentials format" });
  }

  const username = credentials.substring(0, separatorIndex);
  const password = credentials.substring(separatorIndex + 1);

  const user = await User.findOne({ username });

  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Wrong username or password" });
  }

  req.user = user;
  next();
};

module.exports = authBasic;
