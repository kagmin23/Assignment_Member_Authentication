const isAdmin = (req, res, next) => {
  if (!req.currentUser?.isAdmin) {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};

module.exports = isAdmin;
