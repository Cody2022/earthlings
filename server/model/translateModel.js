const mongoose = require("mongoose");

const translateSchema = new mongoose.Schema({
    email: { type: String, required: true },
    date: { type: Date },
    startTime: { type: Date },
    endTime: { type: Date },
    fromLanguage: {type: Array},
    toLanguage: {type: Array},    
  },
    { timestamp: true }
  );

const translateModel = mongoose.model("translatesSlots", translateSchema)

module.exports = translateModel;
