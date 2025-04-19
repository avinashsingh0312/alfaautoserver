const Service = require("../models/Service");
const User = require("../models/User");

const createService = async (req, res) => {
  const { name, description, price, image, discount, duration } = req.body;

  if (!name || !price) {
    return res.status(400).json({ error: "Name and price are required" });
  }

  const discountedPrice = discount
    ? price - (price * discount) / 100
    : price;

  const service = new Service({
    name,
    description,
    price,
    image,
    discount,
    discountedPrice,
    duration
  });

  await service.save();
  res.status(201).json({ message: "Service created", service });
};

const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch services" });
  }
};

const updateService = async (req, res) => {
  const { id } = req.params;
  const { uid } = req.user;

  try {
    const user = await User.findOne({ uid });
    if (!user || user.role !== "admin") {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }

    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    const updates = req.body;

    if (updates.price !== undefined) {
      service.price = updates.price;
    }
    if (updates.discount !== undefined) {
      service.discount = updates.discount;
    }
    if (updates.name !== undefined) {
      service.name = updates.name;
    }
    if (updates.description !== undefined) {
      service.description = updates.description;
    }
    if (updates.image !== undefined) {
      service.image = updates.image;
    }
    if (updates.duration !== undefined) {
      service.duration = updates.duration;
    }

    service.discountedPrice = service.discount
      ? service.price - (service.price * service.discount) / 100
      : service.price;

    await service.save();

    res.json(service);
  } catch (err) {
    res.status(500).json({ error: "Failed to update service" });
  }
};

module.exports = { createService, getAllServices, updateService };
