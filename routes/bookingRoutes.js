const express = require("express");
const { getAllBookingsForAdmin } = require("../controllers/bookingController");

const { createBooking } = require("../controllers/bookingController");
const authenticateJWT = require("../middlewares/authenticateJWT");
const isAdmin = require("../middlewares/isAdmin");


const router = express.Router();

router.post("/bookings", authenticateJWT, createBooking);
router.get("/bookings", authenticateJWT, isAdmin, getAllBookingsForAdmin);


module.exports = router;
