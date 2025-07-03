const jwt = require("jsonwebtoken");
const Member = require("../models/member.model");

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer token

  if (!token)
    return res.status(401).json({ message: "Access denied: No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    // Lấy thông tin người dùng thật (nếu cần)
    const user = await Member.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    req.currentUser = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;