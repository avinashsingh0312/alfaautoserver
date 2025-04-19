const Booking = require("../models/Booking");
const User = require("../models/User");
const Service = require("../models/Service");
const Vehicle = require("../models/Vehicle");


const createBooking = async (req, res) => {
  try {

    const { uid } = req.user;
        const user = await User.findOne({ uid });
    
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
    const { serviceId, vehicleId, date, time, contactPerson, note } = req.body;

    const newBooking = new Booking({
      userId: user._id, // make sure to store ObjectId, not mock-uid
      serviceId,
      vehicleId,
      date,
      time,
      contactPerson,
      note,
    });

    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Failed to create booking" });
  }
};

const getUserBookings = async (req, res) => {
  try {
    const { uid } = req.user; // assuming authentication middleware sets this

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const bookings = await Booking.find({ userId: user._id })
      .populate("serviceId", "name price duration image")
      .populate("vehicleId", "registrationNumber brand model nickname");

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    res.status(500).json({ error: "Failed to get user bookings" });
  }
};


const getAllBookingsForAdmin = async (req, res) => {
  try {
    // Find all bookings and populate the user, service, and vehicle details
    const bookings = await Booking.find()
      .populate("userId", "name email phoneNumber")  // You can specify which fields to return from the user
      .populate("serviceId", "name description price image discount discountedPrice duration")  // Specify the fields to return from the service
      .populate("vehicleId", "photo registrationNumber brand model address color typeOfFuel chassisNo nickname");  // Specify the fields to return from the vehicle

    if (bookings.length === 0) {
      return res.status(404).json({ error: "No bookings found" });
    }

    // Return the populated booking data
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
};


const acceptBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { name, mobileNumber } = req.body;

    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      {
        isAccepted: true,
        isDeclined: false,
        washPilot: { name, mobileNumber },
      },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.status(200).json(updatedBooking);
  } catch (error) {
    console.error("Error accepting booking:", error);
    res.status(500).json({ error: "Failed to accept booking" });
  }
};



const declineBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { reason } = req.body;

    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      {
        isDeclined: true,
        isAccepted: false,
        reasonToDecline: reason,
      },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.status(200).json(updatedBooking);
  } catch (error) {
    console.error("Error declining booking:", error);
    res.status(500).json({ error: "Failed to decline booking" });
  }
};

// Mark booking as completed
const markBookingComplete = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { isCompleted: true },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.status(200).json(updatedBooking);
  } catch (error) {
    console.error("Error marking booking as complete:", error);
    res.status(500).json({ error: "Failed to mark booking as complete" });
  }
};

// Mark booking as incomplete
const markBookingIncomplete = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { isInComplete: true },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.status(200).json(updatedBooking);
  } catch (error) {
    console.error("Error marking booking as incomplete:", error);
    res.status(500).json({ error: "Failed to mark booking as incomplete" });
  }
};




module.exports = { createBooking,getUserBookings,  getAllBookingsForAdmin, acceptBooking , declineBooking, markBookingComplete, markBookingIncomplete};
