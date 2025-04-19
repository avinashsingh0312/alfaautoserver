const User = require("../models/User");

const isAdmin = async (req, res, next) => {
  const uid = req.user.uid;

  const user = await User.findOne({ uid });
  if (!user) return res.status(404).json({ error: "User not found" });

  if (user.role !== "admin") {
    return res.status(403).json({ error: "Access denied: Admins only" });
  }

  next();
};

module.exports = isAdmin;
