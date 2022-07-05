const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    category: {
      type: Array,
    },
    img: {
      type: String,
    },
  },
  { timestamp: true }
);

const donation = mongoose.model("Donation", donationSchema);
