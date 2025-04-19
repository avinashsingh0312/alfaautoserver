const express = require("express");
const { createBooking,getUserBookings, getAllBookingsForAdmin, acceptBooking, declineBooking, markBookingComplete, markBookingIncomplete } = require("../controllers/bookingController");

const authenticateJWT = require("../middlewares/authenticateJWT");
const isAdmin = require("../middlewares/isAdmin");


const router = express.Router();

router.post("/bookings", authenticateJWT, createBooking);
router.get("/userBookings", authenticateJWT, getUserBookings)
router.get("/bookings", authenticateJWT, isAdmin, getAllBookingsForAdmin);

router.put("/bookings/:bookingId/accept",authenticateJWT, isAdmin, acceptBooking);
router.put("/bookings/:bookingId/decline", authenticateJWT, isAdmin,declineBooking);

// Mark as completed
router.put("/bookings/:bookingId/complete", markBookingComplete);

// Mark as incomplete
router.put("/bookings/:bookingId/incomplete", markBookingIncomplete);


module.exports = router;
