const router = require("express").Router();
const { protect } = require("../middlewears/authMiddleware");
const Job = require("../models/Job");
const Application = require("../models/Application");

// ✅ Recruiter dashboard stats
router.get("/dashboard", protect, async (req, res) => {
  const jobs = await Job.find({ recruiter: req.user.id });
  const jobIds = jobs.map(j => j._id);

  const applications = await Application.find({ job: { $in: jobIds } });

  res.json({
    totalJobs: jobs.length,
    totalApplications: applications.length,
  });
});

// ✅ Get applications for recruiter jobs
router.get("/applications", protect, async (req, res) => {
  const jobs = await Job.find({ recruiter: req.user.id });
  const jobIds = jobs.map(j => j._id);

  const apps = await Application.find({ job: { $in: jobIds } })
    .populate("job", "title location")
    .populate("applicant", "name email");

  res.json(apps);
});

// ✅ Update application status
router.put("/applications/:id", protect, async (req, res) => {
  const app = await Application.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );

  res.json(app);
});

module.exports = router;
