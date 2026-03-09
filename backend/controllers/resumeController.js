const Resume = require("../models/Resume");
const JobSeeker = require("../models/JobSeeker");
const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");
const { detectSkills } = require("../utils/skillDetector");


exports.uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const jobSeeker = await JobSeeker.findOne({ user: req.user.id });
    if (!jobSeeker) {
      return res.status(404).json({ message: "JobSeeker profile not found" });
    }

    let extractedText = "";
    let detectedSkills = [];

    try {
      const filePath = path.join(__dirname, "..", req.file.path);
      const dataBuffer = fs.readFileSync(filePath);

      const pdfData = await pdfParse(dataBuffer);
      extractedText = pdfData.text;
      detectedSkills = detectSkills(extractedText);
    } catch (parseError) {
      console.error("PDF parsing error:", parseError);
    }


    const oldResume = await Resume.findOne({ jobSeeker: jobSeeker._id });
    if (oldResume) {
      await Resume.findByIdAndDelete(oldResume._id);
    }

    const resume = await Resume.create({
      jobSeeker: jobSeeker._id,
      resumeUrl: `/uploads/resumes/${req.file.filename}`,
      extractedText,
      detectedSkills,
    });


    jobSeeker.resume = resume._id;
    await jobSeeker.save();

    res.json({
      message: "Resume uploaded successfully",
      resume,
      skillsDetected: detectedSkills.length,
      skills: detectedSkills,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getMyResume = async (req, res) => {
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
};

exports.getResumeById = async (req, res) => {
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
};
