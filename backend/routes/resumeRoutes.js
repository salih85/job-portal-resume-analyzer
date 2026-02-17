const router = require("express").Router();
const Resume = require("../models/Resume");
const JobSeeker = require("../models/JobSeeker");
const upload = require("../middlewears/uploadMiddleware");
const { protect } = require("../middlewears/authMiddleware");
const pdfParse = require("pdf-parse");
const fs = require("fs");
const path = require("path");
const { detectSkills } = require("../utils/skillDetector");

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

      // Extract text from PDF
      let extractedText = "";
      let detectedSkills = [];

      try {
        const filePath = path.join(__dirname, "..", req.file.path);
        const dataBuffer = fs.readFileSync(filePath);

        // Parse PDF
        const pdfData = await pdfParse(dataBuffer);
        extractedText = pdfData.text;

        // Detect skills from extracted text
        detectedSkills = detectSkills(extractedText);
      } catch (parseError) {
        console.error("PDF parsing error:", parseError);
        // Continue without text extraction if parsing fails
      }

      // Delete old resume if exists
      const oldResume = await Resume.findOne({ jobSeeker: jobSeeker._id });
      if (oldResume) {
        await Resume.findByIdAndDelete(oldResume._id);
      }

      // Create new resume record
      const resume = await Resume.create({
        jobSeeker: jobSeeker._id,
        resumeUrl: `/uploads/resumes/${req.file.filename}`,
        extractedText,
        detectedSkills,
      });

      res.json({
        message: "Resume uploaded successfully",
        resume,
        skillsDetected: detectedSkills.length,
        skills: detectedSkills,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// 📄 Get My Resume
router.get("/my", protect, async (req, res) => {
  try {
    const jobSeeker = await JobSeeker.findOne({ user: req.user.id });
    if (!jobSeeker) {
      return res.status(404).json({ message: "JobSeeker profile not found" });
    }

    const resume = await Resume.findOne({ jobSeeker: jobSeeker._id });
    res.json(resume);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 📋 Get Resume Details by ID
router.get("/:id", protect, async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id)
      .populate({
        path: "jobSeeker",
        populate: {
          path: "user",
          select: "name email"
        }
      });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.json(resume);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

