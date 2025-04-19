const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  photo: { type: String, required: true },
  registrationNumber: { type: String, required: true, unique: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  address: { type: String, required: true },
  color: { type: String, required: true },
  typeOfFuel: { type: String, required: true },
  chassisNo: { type: String },
  nickname: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Vehicle', vehicleSchema);
