const router = require("express").Router();
const { protect } = require("../middlewears/authMiddleware");
const { authorize } = require("../middlewears/roleMiddleware");

const User = require("../models/User");
const Job = require("../models/Job");
const Application = require("../models/Application");
const Recruiter = require("../models/Recruiter");
const JobSeeker = require("../models/JobSeeker");

// 📊 Admin Dashboard Stats
router.get("/dashboard", protect, authorize("admin"), async (req, res) => {
  const totalUsers = await User.countDocuments();
  const jobSeekers = await JobSeeker.countDocuments();
  const recruiters = await Recruiter.countDocuments();
  const jobs = await Job.countDocuments();
  const applications = await Application.countDocuments();

  res.json({
    totalUsers,
    jobSeekers,
    recruiters,
    jobs,
    applications,
  });
});

router.get("/users", protect, authorize("admin"), async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

module.exports = router;
