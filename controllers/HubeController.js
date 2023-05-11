const Hub = require("../models/Hube");
const { paginate } = require("../utils");

// Create a new hub
const createHub = async (req, res) => {
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
    res.status(201).json({ success: true, hub });
  } catch (error) {
    res.status(400).json({ success: false, error: "Please set all fields" });
  }
};

// Update a hub
const updateHub = async (req, res) => {
  try {
    const hub = await Hub.findById(req.params.id);
    if (!hub) {
      return res.status(404).json({ success: false, error: "Hub not found" });
    }
    Object.assign(hub, req.body);
    await hub.save();
    res.status(200).json({ success: true, hub });
  } catch (error) {
    res.status(400).json({ success: false, error: "Please set all fields" });
  }
};

// List hubs for admin with pagination limit 20
const listHubsForAdmin = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const hubs = await Hub.find({});
    const paginatedHubs = paginate(hubs, limit, page);
    res.status(200).json(paginatedHubs);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// List hubs for user with pagination limit 10
const listHubsForUser = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const hubs = await Hub.find({ chief: req.user.id });
    const paginatedHubs = paginate(hubs, limit, page);
    res.status(200).json(paginatedHubs);
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Delete a hub
const deleteHub = async (req, res) => {
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
    res.status(400).json({ success: false, error: error.message });
  }
};

// Search for hubs
const searchHubs = async (req, res) => {
  const { query } = req.query;
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const hubs = await Hub.find({ address: { $regex: query } });
    const paginatedHubs = paginate(hubs, limit, page);
    res.status(200).json({ success: true, paginatedHubs });
  } catch (error) {
    res.status(400).json({ success: false, error: "Not Found" });
  }
};

module.exports = {
  createHub,
  updateHub,
  listHubsForAdmin,
  listHubsForUser,
  deleteHub,
  searchHubs,
};
