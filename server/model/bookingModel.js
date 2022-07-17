const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  volunteerEmail: { type: String, required: true },
  newcomerEmail: { type: String, required: true },
  task: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  },
    { timestamp: true }
  );

const bookingModel = mongoose.model("Booking", bookingSchema)

module.exports = bookingModel;
