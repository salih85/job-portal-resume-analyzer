const router = require("express").Router();
const { protect } = require("../middlewears/authMiddleware");
const { getJobs, createJob, deleteJob } = require("../controllers/jobController");

router.get("/", getJobs);
router.post("/", protect, createJob);
router.delete("/:id", protect, deleteJob);

module.exports = router;
