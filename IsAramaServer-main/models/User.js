const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  country: { type: String, required: true, default: "Belirtilmemiş" },
  city: { type: String, required: true, default: "Belirtilmemiş" },
});

module.exports = mongoose.model("User", userSchema);