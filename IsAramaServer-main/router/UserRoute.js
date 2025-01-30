const express = require("express");
const router = express.Router();
const UserController = require("../controller/AuthController");
const passport = require("passport");
const jwt = require("jsonwebtoken"); 
const { verifyToken } = require("../middleware/authMiddleware");


router.post("/register", UserController.register);

router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    (req, res) => {
      const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
      console.log("Google Token:", token); 
      res.redirect(`http://localhost:3000/google-callback?token=${token}`); 
    }
  );

router.post("/login", UserController.login);

router.get("/profile", verifyToken, (req, res) => {
  res.status(200).json({ message: "Profil bilgileri", user: req.user });
});
router.get("/profileDetail/applications", verifyToken, UserController.getUserApplications);

module.exports = router;
