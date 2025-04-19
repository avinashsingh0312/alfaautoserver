const Vehicle = require("../models/Vehicle");
const User = require("../models/User");

const addVehicle = async (req, res) => {
  try {
    const { uid } = req.user;
    const user = await User.findOne({ uid });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const vehicleData = {
      ...req.body,
      userId: user._id
    };

    const vehicle = await Vehicle.create(vehicleData);
    res.status(201).json(vehicle);
  } catch (error) {
    console.error("Vehicle creation error:", error);
    res.status(500).json({ error: "Failed to add vehicle" });
  }
};

const getUserVehicles = async (req, res) => {
  try {
    // Find the user using UID (from decoded JWT)
    const user = await User.findOne({ uid: req.user.uid });
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Now fetch vehicles using the MongoDB _id
    const vehicles = await Vehicle.find({ userId: user._id });

    res.json(vehicles);
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    res.status(500).json({ error: "Failed to fetch vehicles" });
  }
};

module.exports = { addVehicle, getUserVehicles };
