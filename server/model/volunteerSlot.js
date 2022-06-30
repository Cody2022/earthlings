debug = require("debug")("server:userModel");
const mongoose = require("./mongoose");

const Schema = mongoose.Schema;

const slotSchema = new Schema ({
  task: {
    type: String, 
    required: true
  },

  category: {
    type: String, 
    required: true
  },

  date: {
    type: Date, 
    required: true
  }
    
}, {
  timestamps: true,

});

const volunteerSlot = mongoose.model("volunteerSlot", slotSchema);

module.exports = {
  volunteerSlot
}