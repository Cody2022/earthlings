debug = require("debug")("server:userModel");
const mongoose = require("./mongoose");

const transportSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  languages: { type: Array },
  isNewcomer: { type: Boolean },
  isAdmin: { type: Boolean },
  isVolunteer: { type: Boolean },
  address: { type: String },
  city: { type: String },
  province: { type: String },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
});
const Transport = mongoose.model("Transport", transportSchema);
