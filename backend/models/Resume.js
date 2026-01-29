const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    jobSeeker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobSeeker",
      required: true,
    },
    resumeUrl: {
      type: String,
      required: true,
    },
    extractedText: {
      type: String,
      default: "",
    },
    detectedSkills: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resume", resumeSchema);
