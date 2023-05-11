const express = require("express");
const router = express.Router();
const { protect, protectAdmin } = require("../middleware/auth");
const HubeController = require("../controllers/HubeController");

// router.route("/").post(checkAuth, createHub).get(checkAuth, listHubs);
// router.route("/:id").put(checkAuth, updateHub).delete("/:id", checkAuth, deleteHub);

router.post("/create", protect, HubeController.create);
router.put("/update/:id", protect, HubeController.update);
router.get("/list", HubeController.list);
router.delete("/delete/:id", protect, HubeController.delete);
router.get("/search", protect, HubeController.search);

module.exports = router;
