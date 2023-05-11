const Hub = require("../models/Hube");
const { paginate } = require("../utils");

// Create a new hub
exports.create = async (req, res) => {
  const { phone, address, location, images, users, email, status } = req.body;
  try {
    const hub = new Hub({
      chief: req.user.id,
      phone: phone,
      address: address,
      location: location,
      images: images,
      users: users,
      email: email,
      status: status,
    });
    await hub.save();
    res.status(201).json({ hub });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Update a hub
exports.update = async (req, res) => {
  try {
    const hub = await Hub.findById(req.params.id);
    if (!hub) {
      return res.status(404).json({ success: false, error: "Hub not found" });
    }
    Object.assign(hub, req.body);
    await hub.save();
    res.status(200).json({ success: true, hub });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// List hubs for user with pagination limit 10
exports.list = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const hubs = await Hub.find({});
    const paginatedHubs = paginate(hubs, limit, page);
    res.status(200).json(paginatedHubs);
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Delete a hub
exports.delete = async (req, res) => {
  try {
    const hub = await Hub.findById(req.params.id);
    if (!hub) {
      return res.status(404).json({ success: false, error: "Hub not found" });
    }
    await hub.deleteOne();
    res
      .status(200)
      .json({ success: true, message: "Hub deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Search for hubs
exports.search = async (req, res) => {
  const { query } = req.query;
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const hubs = await Hub.find({ address: { $regex: query } });
    const paginatedHubs = paginate(hubs, limit, page);
    res.status(200).json({ success: true, paginatedHubs });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
