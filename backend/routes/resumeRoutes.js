const router = require("express").Router();
const Resume = require("../models/Resume");
const JobSeeker = require("../models/JobSeeker");
const upload = require("../middlewears/uploadMiddleware");
const { protect } = require("../middlewears/authMiddleware");

// 📤 Upload Resume
router.post(
  "/upload",
  protect,
  upload.single("resume"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const jobSeeker = await JobSeeker.findOne({ user: req.user.id });
      if (!jobSeeker) {
        return res.status(404).json({ message: "JobSeeker profile not found" });
      }

      const resume = await Resume.create({
        jobSeeker: jobSeeker._id,
        resumeUrl: `/uploads/resumes/${req.file.filename}`,
      });

      res.json({
        message: "Resume uploaded successfully",
        resume,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// 📄 Get My Resume
router.get("/my", protect, async (req, res) => {
  const jobSeeker = await JobSeeker.findOne({ user: req.user.id });
  const resume = await Resume.findOne({ jobSeeker: jobSeeker._id });
  res.json(resume);
});

module.exports = router;
