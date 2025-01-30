require('dotenv').config(); 
const JobApplication = require('../models/JobApplication');
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

exports.register = async (req, res) => {
  const { name, surname, email, password, country, city } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      surname,
      email,
      password: hashedPassword,
      country,
      city,
    });

    await newUser.save();
    res.status(201).json({ message: "Kayıt başarılı!" });
  } catch (error) {
    console.error("Kayıt sırasında hata:", error);
    res.status(500).json({ message: "Kayıt sırasında bir hata oluştu!" });
  }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "Kullanıcı bulunamadı!" });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Şifre hatalı!" });
      }
  
      const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
  
     
      res.status(200).json({ message: "Giriş başarılı!", token, user });
    } catch (error) {
      console.error("Giriş sırasında hata:", error);
      res.status(500).json({ message: "Sunucu hatası!" });
    }
  };


  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:5050/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
        
          let user = await User.findOne({ email: profile.emails[0].value });
  
          
          if (!user) {
            user = await User.create({
              name: profile.name.givenName || "Ad",
              surname: profile.name.familyName || "Soyad",
              email: profile.emails[0].value,
              password: "google-auth", 
              country: "Belirtilmemiş", 
              city: "Belirtilmemiş", 
            });
          }
  
          done(null, user);
        } catch (error) {
          done(error, null);
        }
      }
    )
  );
  
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });

  exports.getUserApplications = async (req, res) => {
    try {
      const userId = req.user.id; 
      const applications = await JobApplication.find({ userId })
        .populate("jobId") 
        .sort({ appliedAt: -1 });
  
      res.status(200).json(applications);
    } catch (error) {
      console.error("Başvurular alınırken hata:", error);
      res.status(500).json({ message: "Başvurular alınamadı." });
    }
  };
 