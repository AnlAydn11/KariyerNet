const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Jobs", required: true },
  appliedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("JobApplication", jobApplicationSchema);
