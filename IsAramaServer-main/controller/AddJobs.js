const jobs = [
  {
    title: "Backend Developer",
    location: "İstanbul",
    description: "Node.js ve Express.js bilgisi...",
    country: "Türkiye",
    town: "Üsküdar",
    workPreference: "Hybrid",
    salary: "12000-17000 TL",
    companyName: "DevTech",
    postedAt: new Date("2025-01-21T12:30:50Z"),
  },
  {
    title: "Frontend Developer",
    location: "Ankara",
    description: "React ve Angular bilgisi...",
    country: "Türkiye",
    town: "Çankaya",
    workPreference: "Remote",
    salary: "15000-20000 TL",
    companyName: "TechSoft",
    postedAt: new Date("2025-01-22T15:45:30Z"),
  },
  {
    title: "Full Stack Developer",
    location: "İzmir",
    description: "React, Node.js ve MongoDB bilgisi...",
    country: "Türkiye",
    town: "Bornova",
    workPreference: "Onsite",
    salary: "14000-18000 TL",
    companyName: "CodeHouse",
    postedAt: new Date("2025-01-20T09:20:15Z"),
  },
  {
    title: "Mobile Developer",
    location: "Bursa",
    description: "React Native ve Flutter bilgisi...",
    country: "Türkiye",
    town: "Nilüfer",
    workPreference: "Hybrid",
    salary: "13000-16000 TL",
    companyName: "MobileWorks",
    postedAt: new Date("2025-01-23T11:30:00Z"),
  },
  {
    title: "DevOps Engineer",
    location: "İstanbul",
    description: "CI/CD ve Docker tecrübesi...",
    country: "Türkiye",
    town: "Kadıköy",
    workPreference: "Onsite",
    salary: "17000-20000 TL",
    companyName: "CloudTech",
    postedAt: new Date("2025-01-19T14:10:50Z"),
  },
  {
    title: "Data Scientist",
    location: "Ankara",
    description: "Python ve ML algoritmaları bilgisi...",
    country: "Türkiye",
    town: "Keçiören",
    workPreference: "Remote",
    salary: "16000-19000 TL",
    companyName: "DataHub",
    postedAt: new Date("2025-01-18T10:05:40Z"),
  },
  {
    title: "Software Architect",
    location: "İstanbul",
    description: "Mikroservis mimarisi bilgisi...",
    country: "Türkiye",
    town: "Şişli",
    workPreference: "Hybrid",
    salary: "20000-25000 TL",
    companyName: "SoftDesign",
    postedAt: new Date("2025-01-17T13:45:25Z"),
  },
  {
    title: "Cybersecurity Specialist",
    location: "İzmir",
    description: "Penetration testing ve ağ güvenliği...",
    country: "Türkiye",
    town: "Karşıyaka",
    workPreference: "Onsite",
    salary: "15000-18000 TL",
    companyName: "SecureTech",
    postedAt: new Date("2025-01-16T16:30:10Z"),
  },
  {
    title: "AI Engineer",
    location: "Antalya",
    description: "Derin öğrenme ve TensorFlow bilgisi...",
    country: "Türkiye",
    town: "Konyaaltı",
    workPreference: "Remote",
    salary: "18000-22000 TL",
    companyName: "AIWorks",
    postedAt: new Date("2025-01-15T12:00:00Z"),
  },
  {
    title: "QA Engineer",
    location: "Bursa",
    description: "Otomasyon test araçları bilgisi...",
    country: "Türkiye",
    town: "Osmangazi",
    workPreference: "Hybrid",
    salary: "14000-17000 TL",
    companyName: "TestLab",
    postedAt: new Date("2025-01-14T09:30:00Z"),
  },
];

const mongoose = require("mongoose");
const Job = require("../models/Jobs");


mongoose.connect("mongodb+srv://anlaydn11:anıl123@cluster0.8cvqo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Bağlantı hatası:"));
db.once("open", async () => {
  console.log("MongoDB bağlantısı başarılı!");

  try {
    const result = await Job.insertMany(jobs);
    console.log(`${result.length} iş başarıyla eklendi!`);
  } catch (error) {
    console.error("Toplu ekleme sırasında hata:", error);
  } finally {
    mongoose.connection.close();
  }
});

