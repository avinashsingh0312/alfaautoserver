const twilio = require("twilio");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config(); // Safe even if already loaded elsewhere


const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// 1️⃣ Send OTP
const sendOTP = async (req, res) => {
  console.log("TWILIO_ACCOUNT_SID:", process.env.TWILIO_ACCOUNT_SID);
console.log("TWILIO_AUTH_TOKEN:", process.env.TWILIO_AUTH_TOKEN);
console.log("TWILIO_SERVICE_SID:", process.env.TWILIO_SERVICE_SID);

  const { phone } = req.body;

  if (!phone) return res.status(400).json({ error: "Phone number is required" });

  try {
    const verification = await client.verify
      .v2.services(process.env.TWILIO_SERVICE_SID)
      .verifications.create({ to: phone, channel: "sms" });

    res.json({ message: "OTP sent", sid: verification.sid });
  } catch (err) {
    console.error("OTP Error:", err);
    res.status(500).json({ error: "Failed to send OTP" });
  }
};

// 2️⃣ Verify OTP and issue JWT
const verifyOTP = async (req, res) => {
  const { phone, code } = req.body;

  if (!phone || !code) {
    return res.status(400).json({ error: "Phone and OTP code are required" });
  }

  try {
    const verificationCheck = await client.verify
      .v2.services(process.env.TWILIO_SERVICE_SID)
      .verificationChecks.create({ to: phone, code });

    if (verificationCheck.status === "approved") {
      // Check if user exists
      let user = await User.findOne({ phone });
      if (!user) {
        user = await User.create({
          uid: phone, // using phone as uid
          phone,
          role: "customer"
        });
      }

      const token = jwt.sign(
        { uid: user.uid, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.json({ token });
    } else {
      res.status(401).json({ error: "Invalid OTP" });
    }
  } catch (err) {
    console.error("OTP Verify Error:", err);
    res.status(500).json({ error: "OTP verification failed" });
  }
};

// 3️⃣ Protected route
const protectedRoute = (req, res) => {
  res.json({ message: "Protected route", user: req.user });
};

module.exports = { sendOTP, verifyOTP, protectedRoute };
