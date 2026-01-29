const router = require("express").Router();
const Application = require("../models/Application");
const { protect } = require("../middlewears/authMiddleware");

router.post("/", protect, async (req, res) => {
  const app = await Application.create({
    job: req.body.jobId,
    applicant: req.user.id,
    resume: req.body.resumeId,
  });
  res.json(app);
});

router.get("/my", protect, async (req, res) => {
  const apps = await Application.find({ applicant: req.user.id })
    .populate("job");
  res.json(apps);
});

module.exports = router;
