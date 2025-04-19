const express = require("express");
const router = express.Router();
const { addVehicle } = require("../controllers/vehicleController");
const authenticateJWT = require("../middlewares/authenticateJWT");
const { getUserVehicles } = require("../controllers/vehicleController");


router.post("/vehicles", authenticateJWT, addVehicle);

router.get("/vehicles", authenticateJWT, getUserVehicles);


module.exports = router;
