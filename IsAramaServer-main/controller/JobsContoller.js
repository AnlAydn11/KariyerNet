const JobApplication = require("../models/JobApplication");
const User = require("../models/User");
const Job = require("../models/Jobs");






exports.getJobs = async (req, res) => {
  try {
    const { country, city, town, workPreference } = req.query;

    const query = {};
    if (country) query.country = country;
    if (city) query.location = city;
    if (town) query.town = town;
    if (workPreference) query.workPreference = workPreference;

    const jobs = await Job.find(query);
    res.status(200).json(jobs);
  } catch (error) {
    console.error("Hata:", error);
    res.status(500).json({ message: "Sunucu hatası!" });
  }
};

exports.getCities = async (req, res) => {
  try {
    const cities = await Job.distinct("location"); // Benzersiz şehirler
    res.status(200).json(cities);
  } catch (error) {
    console.error("Hata:", error);
    res.status(500).json({ message: "Sunucu hatası!" });
  }
};

exports.getJobDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ message: "İş ilanı bulunamadı." });
    }
    res.status(200).json(job);
  } catch (error) {
    console.error("Hata:", error);
    res.status(500).json({ message: "Sunucu hatası!" });
  }
};

exports.getFilters = async (req, res) => {
  try {
    const countries = await Job.distinct("country");
    const cities = await Job.distinct("location");
    const towns = await Job.distinct("town");

    res.status(200).json({ countries, cities, towns });
  } catch (error) {
    console.error("Filtre verileri alınırken hata:", error);
    res.status(500).json({ message: "Sunucu hatası!" });
  }
};


exports.applyToJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    const userId = req.user.id; 

   
    const existingApplication = await JobApplication.findOne({ userId, jobId });
    if (existingApplication) {
      return res.status(400).json({ message: "Bu ilana zaten başvurdunuz." });
    }

 
    const application = new JobApplication({ userId, jobId });
    await application.save();

    res.status(201).json({ message: "Başvuru başarıyla tamamlandı." });
  } catch (error) {
    console.error("Başvuru sırasında hata:", error);
    res.status(500).json({ message: "Sunucu hatası." });
  }
};


exports.checkApplications = async (req, res) => {
  try {
    const userId = req.user.id; 

   
    const applications = await JobApplication.find({ userId }).populate("userId");
    res.status(200).json(applications);
  } catch (error) {
    console.error("Başvurular alınırken hata:", error);
    res.status(500).json({ message: "Sunucu hatası." });
  }
};


