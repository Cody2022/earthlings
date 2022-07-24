const mongoose = require("mongoose");

//This
const translateSchema = new mongoose.Schema({
    task: { type: String },
    name: { type: String },
    email: { type: String, required: true },
    date: { type: Date },
    startTime: { type: Date },
    endTime: { type: Date },
    fromLanguage: {type: Array},
    toLanguage: {type: Array},    
  },
    { timestamp: true }
  );

const translateModel = mongoose.model("translates", translateSchema)

module.exports = translateModel;
