const { model } = require("mongoose");
//const mongoose = require("mongoose");
const mongoose = require("./mongoose");


const calendarSchema = {
    task: { type: String, required: true},
    selectDate: { type: Date, default: new Date() },
    startTime: { type: Date, default: new Date() },
    endTime: { type: Date, default: new Date() },
}

const Schedule = mongoose.model("calendar", calendarSchema);

module.exports = Schedule;
