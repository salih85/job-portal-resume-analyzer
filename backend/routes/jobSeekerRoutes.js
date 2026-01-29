const router = require("express").Router();
const Application = require("../models/Application");
const JobSeeker = require("../models/JobSeeker");
const { protect } = require("../middlewears/authMiddleware");

router.get("/dashboard", protect, async (req, res) => {
  const userId = req.user.id;

  const total = await Application.countDocuments({ applicant: userId });
  const shortlisted = await Application.countDocuments({
    applicant: userId,
    status: "shortlisted",
  });
  const rejected = await Application.countDocuments({
    applicant: userId,
    status: "rejected",
  });

  res.json({
    total,
    shortlisted,
    rejected,
  });
});


router.get("/profile", protect, async (req, res) => {
  const profile = await JobSeeker.findOne({ user: req.user.id });
  res.json(profile);
});

router.post("/profile", protect, async (req, res) => {
  const profile = await JobSeeker.findOneAndUpdate(
    { user: req.user.id },
    req.body,
    { new: true, upsert: true }
  );
  res.json(profile);
});

module.exports = router;
