const Application = require("../models/Application");
const Resume = require("../models/Resume");
const JobSeeker = require("../models/JobSeeker");


exports.applyToJob = async (req, res) => {
  try {
    const jobSeeker = await JobSeeker.findOne({ user: req.user.id });
    if (!jobSeeker) {
      return res.status(400).json({ message: "Create job seeker profile first" });
    }

    const resume = await Resume.findOne({ jobSeeker: jobSeeker._id });
    if (!resume) {
      return res.status(400).json({ message: "Please upload resume before applying" });
    }

    const exists = await Application.findOne({
      job: req.params.jobId,
      applicant: req.user.id,
    });

    if (exists) {
      return res.status(400).json({ message: "Already applied to this job" });
    }

    const app = await Application.create({
      job: req.params.jobId,
      applicant: req.user.id,
      resume: resume._id,
    });

    res.status(201).json(app);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getMyApplications = async (req, res) => {
  try {
    const apps = await Application.find({ applicant: req.user.id })
      .populate("job");
    res.json(apps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
