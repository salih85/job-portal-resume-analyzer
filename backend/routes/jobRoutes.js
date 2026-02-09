const router = require("express").Router();
const Job = require("../models/Job");
const Recruiter = require("../models/Recruiter");
const { protect } = require("../middlewears/authMiddleware");


// ✅ PUBLIC (no protect)
router.get("/", async (req, res) => {
  const jobs = await Job.find().populate("recruiter");
  res.json(jobs);
});


// ✅ recruiter
router.post("/", protect, async (req, res) => {
  const job = await Job.create({
    ...req.body,
    recruiter: req.user.id,
  });
  res.json(job);
});

module.exports = router;
