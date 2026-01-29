const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recruiter',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    requiredSkills: {
      type: [String],
      required: true,
    },
    experience: String,
    salary: String,
    location: String,
    jobType: {
      type: String,
      enum: ['full-time', 'part-time', 'internship', 'contract'],
      default: 'full-time',
    },
    status: {
      type: String,
      enum: ['open', 'closed'],
      default: 'open',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Job', jobSchema);
