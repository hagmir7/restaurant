const express = require("express");
const router = express.Router();
const { protect, protectAdmin } = require("../middleware/auth");
const {
  createHub,
  updateHub,
  listHubsForAdmin,
  listHubsForUser,
  deleteHub,
  searchHubs,
} = require("../controllers/HubeController");

// router.route("/").post(checkAuth, createHub).get(checkAuth, listHubs);
// router.route("/:id").put(checkAuth, updateHub).delete("/:id", checkAuth, deleteHub);

router.post("/create", protect, createHub);
router.put("/update/:id", protect, updateHub);
router.get("/admin/list", protectAdmin, listHubsForAdmin);
router.get("/user/list", protect, listHubsForUser);
router.delete("/delete/:id", protect, deleteHub);
router.get("/search", protect, searchHubs);

module.exports = router;
