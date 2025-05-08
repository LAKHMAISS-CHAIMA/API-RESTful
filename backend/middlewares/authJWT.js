const jwt = require("jsonwebtoken");

const authJWT = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Token required" });
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return res.status(401).json({ message: "Token format invalid" });
    }

    const token = parts[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: "Token expired" });
    }
    res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = authJWT;