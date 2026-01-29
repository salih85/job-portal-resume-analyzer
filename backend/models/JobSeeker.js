const mongoose = require('mongoose');

const jobSeekerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    fullName: String,
    phone: String,
    education: String,
    experience: String,
    skills: [String],
    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resume',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('JobSeeker', jobSeekerSchema);
