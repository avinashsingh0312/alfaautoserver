const express = require("express");
const { login, protectedRoute } = require("../controllers/authController");
const verifyFirebaseToken = require("../middlewares/verifyFirebaseMock");
const authenticateJWT = require("../middlewares/authenticateJWT");


const router = express.Router();

router.post("/login", verifyFirebaseToken, login);
router.get("/protected", authenticateJWT, protectedRoute);




module.exports = router;
