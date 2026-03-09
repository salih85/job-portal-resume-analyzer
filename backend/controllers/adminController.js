const User = require("../models/User");
const Job = require("../models/Job");
const Application = require("../models/Application");
const Recruiter = require("../models/Recruiter");
const JobSeeker = require("../models/JobSeeker");


exports.getDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const jobSeekers = await JobSeeker.countDocuments();
    const recruiters = await Recruiter.countDocuments();
    const jobs = await Job.countDocuments();
    const applications = await Application.countDocuments();

    res.json({
      totalUsers,
      jobSeekers,
      recruiters,
      jobs,
      applications,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
