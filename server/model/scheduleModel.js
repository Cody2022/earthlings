const { model } = require("mongoose");
//const mongoose = require("mongoose");
const mongoose = require("./mongoose");


const scheduleSchema = {
    title: String,
    startDate: Date,
    endDate: Date
}

const Schedule = mongoose.model("schedule", scheduleSchema);

module.exports = Schedule;
