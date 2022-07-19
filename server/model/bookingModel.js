const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    volunteerEmail: { 
      type: String, 
      required: true 
    },
    
    newcomerEmail: { 
      type: String, 
      required: true 
    },
    
    task: { 
      type: String, 
      // required: true 
    },

    startDate: { 
      type: Date, 
      // required: true 
    },
    
    startTime: { 
      type: Date, 
      // required: true 
    },
    
    endTime: { 
      type: Date,
      // required: true 
    },

    bookingInfo: {
      type: String,
    },
    
    status: {
      type: String,
      require: true,
      default: "booked",
    },
  },
  { timestamp: true }
);

const bookingModel = mongoose.model("bookings", bookingSchema);

//create Booking
const createBooking = async (bookingInfo) => {
  const newBooking = await bookingModel.create(bookingInfo);
  return newBooking;
};

module.exports = {bookingModel, createBooking};