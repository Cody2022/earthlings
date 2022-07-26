const { model } = require("mongoose");
//const mongoose = require("mongoose");
const mongoose = require("./mongoose");

//This
const scheduleSchema = {
  task: { type: String, required: true },
  email: { type: String },
  startDate: { type: Date, default: new Date() },
  endDate: { type: Date, default: new Date() },
};

const Schedule = mongoose.model("schedule", scheduleSchema);

const createSchedule = async (scheduleInfo) => {
  const newSchedule = await Schedule.create(scheduleInfo);
  return newSchedule;
};

// Find listing by email
const findByEmail = async (email) => {
  try {
    const FoundByEmail = await Schedule.find(email);
    return FoundByEmail;
  } catch (error) {
    debug("Cannot find the email in database");
  }
};

module.exports = { 
  Schedule, 
  createSchedule, 
  findByEmail 
};
