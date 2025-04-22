const express = require("express");
const { sendOTP, verifyOTP, protectedRoute } = require("../controllers/authController");
const authenticateJWT = require("../middlewares/authenticateJWT");

const router = express.Router();

router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP); // generates JWT
router.get("/protected", authenticateJWT, protectedRoute);

module.exports = router;
