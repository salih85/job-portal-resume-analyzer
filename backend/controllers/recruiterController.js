const Job = require("../models/Job");
const Application = require("../models/Application");


exports.getRecruiterDashboard = async (req, res) => {
  try {
    const jobs = await Job.find({ recruiter: req.user.id });
    const jobIds = jobs.map(j => j._id);

    const applications = await Application.find({ job: { $in: jobIds } });

    res.json({
      totalJobs: jobs.length,
      totalApplications: applications.length,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getRecruiterApplications = async (req, res) => {
  try {
    const jobs = await Job.find({ recruiter: req.user.id });
    const jobIds = jobs.map(j => j._id);

    const apps = await Application.find({ job: { $in: jobIds } })
      .populate("job", "title location")
      .populate("applicant", "name email")
      .populate("resume");

    res.json(apps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.updateApplicationStatus = async (req, res) => {
  try {
    const app = await Application.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.json(app);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
