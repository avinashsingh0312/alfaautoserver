const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");
const bookingRoutes = require("./routes/bookingRoutes");



const mongoose = require("mongoose");


require("dotenv").config();

const app = express();
app.use(express.json());



mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);

app.use("/api/vehicles", vehicleRoutes);
app.use("/api/bookings", bookingRoutes);

module.exports = app;
