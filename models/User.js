const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  role: { type: String, default: "admin" } // customer or admin
});

module.exports = mongoose.model("User", userSchema);
