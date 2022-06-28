debug = require("debug")("server:userModel");
const mongoose = require("./mongoose");
const bcrypt = require("bcrypt");
const { query } = require("express");

const slotSchema = {
  task: String,
  category: String,
  date: date
}

const volunteerSlot = mongoose.model("slot", slotSchema);

module.exports = {
  volunteerSlot
}