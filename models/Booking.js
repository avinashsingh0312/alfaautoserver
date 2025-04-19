const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle",
    required: true,
  },
  date: { type: String, required: true },
  time: { type: String, required: true },
  contactPerson: {
    name: String,
    mobileNumber: String,
  },
  note: String,
  isAccepted: {
    type: Boolean,
    default: false,
  },
  isDeclined: {
    type: Boolean,
    default: false,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  isInComplete: {
    type: Boolean,
    default: false,
  },
  washPilot: {
    name: String,
    mobileNumber: String,
  },
  reasonToDecline: String,  
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);
