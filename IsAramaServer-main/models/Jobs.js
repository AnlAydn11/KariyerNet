const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true }, 
    location: { type: String, required: true }, 
    description: { type: String, required: true }, 
    country: { type: String, default: "Türkiye" }, 
    town: { type: String, default: "Belirtilmemiş" }, 
    workPreference: { type: String, enum: ["Onsite", "Remote", "Hybrid"], default: "Onsite" }, 
    salary: { type: String, default: "Belirtilmemiş" }, 
    companyName: { type: String, default: "Bilinmiyor" }, 
    postedAt: { type: Date, default: Date.now }, 
  });

module.exports = mongoose.model("Jobs", jobSchema);
