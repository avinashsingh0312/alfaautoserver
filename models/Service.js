const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: [{ type: String }],
  price: Number,
  image: String,
  discount: Number,
  discountedPrice: Number,
  duration: Number
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
