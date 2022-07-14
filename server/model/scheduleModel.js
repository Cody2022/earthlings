const { model } = require("mongoose");
//const mongoose = require("mongoose");
const mongoose = require("./mongoose");

const scheduleSchema = {
  task: { type: String, required: true },
  email: { type: String, required: true },
  startDate: { type: Date, default: new Date() },
  endDate: { type: Date, default: new Date() },
};

const Schedule = mongoose.model("schedule", scheduleSchema);

module.exports = Schedule;
