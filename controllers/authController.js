const jwt = require("jsonwebtoken");
const User = require("../models/User");

const login = async (req, res) => {
    const { uid, phone_number } = req.user;
  
    console.log("LOGIN DATA:", { uid, phone_number });
  
    if (!uid || !phone_number) {
      return res.status(400).json({ error: "UID or phone number missing" });
    }
  
    let user = await User.findOne({ uid });
    if (!user) {
      user = await User.create({
        uid,
        phone: phone_number,
        role: "customer"
      });
    }
  
    const token = jwt.sign(
      { uid, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
  
    res.json({ token });
  };
  

const protectedRoute = (req, res) => {
  res.json({ message: "Protected route", user: req.user });
};

module.exports = { login, protectedRoute };
