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

const getAllBookingsForAdmin = async (req, res) => {
  try {
    // Find all bookings and populate the user, service, and vehicle details
    const bookings = await Booking.find()
      .populate("userId", "name email phoneNumber")  // You can specify which fields to return from the user
      .populate("serviceId", "name description price image discount")  // Specify the fields to return from the service
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

module.exports = { createBooking, getAllBookingsForAdmin };
