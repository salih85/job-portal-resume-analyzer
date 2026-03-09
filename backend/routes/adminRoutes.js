const router = require("express").Router();
const { protect } = require("../middlewears/authMiddleware");
const { authorize } = require("../middlewears/roleMiddleware");
const { getDashboard, getUsers } = require("../controllers/adminController");

router.get("/dashboard", protect, authorize("admin"), getDashboard);
router.get("/users", protect, authorize("admin"), getUsers);

module.exports = router;
