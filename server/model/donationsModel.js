const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
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

const donations = mongoose.model("Donation", donationSchema);

//Create a donation
const createDonation = async (donation) => {
  const newDonation = await donations.create(donation);
  return newDonation;
};

//Find all donations
const findDonations = async () => {
  const getDonations = await donations.find()
  return getDonations
}

//Update a document
const updateDonation = async (_id, updateData) => {
  const changedDonation = await donations.findByIdAndUpdate(_id, updateData, {
    new: true,
  });
  return changedDonation
}

//Delete a document
const deleteDonation = async (_id) => {
  const removedDonation = await donations.findByIdAndDelete(_id)
  return removedDonation
}

module.exports = { createDonation, findDonations, updateDonation, deleteDonation }
