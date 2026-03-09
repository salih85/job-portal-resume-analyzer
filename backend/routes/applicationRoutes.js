const router = require("express").Router();
const { protect } = require("../middlewears/authMiddleware");
const { applyToJob, getMyApplications } = require("../controllers/applicationController");

router.post("/apply/:jobId", protect, applyToJob);
router.get("/my", protect, getMyApplications);

module.exports = router;
