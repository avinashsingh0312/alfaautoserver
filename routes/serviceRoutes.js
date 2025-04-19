const express = require("express");
const router = express.Router();
const { createService } = require("../controllers/serviceController");
const isAdmin = require("../middlewares/isAdmin");

const { getAllServices, updateService } = require("../controllers/serviceController");
const authenticateJWT = require("../middlewares/authenticateJWT");

router.get("/services", getAllServices);                // Public
router.put("/services/:id", authenticateJWT, isAdmin,  updateService); // Admin only

router.post("/services", authenticateJWT, isAdmin, createService);


module.exports = router;
