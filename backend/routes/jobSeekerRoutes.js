const router = require("express").Router();
const { protect } = require("../middlewears/authMiddleware");
const {
  getJobSeekerDashboard,
  getProfile,
  updateProfile,
} = require("../controllers/jobSeekerController");

router.get("/dashboard", protect, getJobSeekerDashboard);
router.get("/profile", protect, getProfile);
router.post("/profile", protect, updateProfile);

module.exports = router;
