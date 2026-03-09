const Application = require("../models/Application");
const JobSeeker = require("../models/JobSeeker");


exports.getJobSeekerDashboard = async (req, res) => {
  try {
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

    const recentApps = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .limit(3)
      .populate("job", "title company");

    res.json({
      total,
      shortlisted,
      rejected,
      recentApplications: recentApps.map(app => ({
        jobTitle: app.job?.title || "Unknown Position",
        status: app.status,
        date: app.createdAt
      }))
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getProfile = async (req, res) => {
  try {
    const profile = await JobSeeker.findOne({ user: req.user.id });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.updateProfile = async (req, res) => {
  try {
    const profile = await JobSeeker.findOneAndUpdate(
      { user: req.user.id },
      req.body,
      { new: true, upsert: true }
    );
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
