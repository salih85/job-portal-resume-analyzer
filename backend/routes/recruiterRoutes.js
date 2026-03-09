const router = require("express").Router();
const { protect } = require("../middlewears/authMiddleware");
const {
  getRecruiterDashboard,
  getRecruiterApplications,
  updateApplicationStatus,
} = require("../controllers/recruiterController");

router.get("/dashboard", protect, getRecruiterDashboard);
router.get("/applications", protect, getRecruiterApplications);
router.put("/applications/:id", protect, updateApplicationStatus);

module.exports = router;
