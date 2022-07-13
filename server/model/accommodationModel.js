debug = require("debug")("server:accommodationModel");
const mongoose = require("./mongoose");

const accommodationSchema = new mongoose.Schema({
  email: { type: String, required: true },
  startDate: { type: String },
  endDate: { type: String },
  numberOfRooms: { type: Number },
  maxNumTenants: { type: Number },
  location: { type: String },
  allowPets: { type: String },
  accommodationType: { type: String },
  accessibleHome: { type: String },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
});
const Accommodation = mongoose.model("Accommodation", accommodationSchema);

// Create a new accommodation listing
const createAccomListing = async (accommodation) => {
  const newAccomListing = await Accommodation.create(accommodation);
  return newAccomListing;
};

// Update or edit an existing listing
const updateByEmail = async (email, updateData) => {
  const updatedListing = await Accommodation.findOneAndUpdate(
    email,
    updateData,
    {
      new: true,
    }
  );
  return updatedListing;
};

// Find listing by email
const findByEmail = async (email) => {
  try {
    let FoundByEmail = await Accommodation.find(email);
    return FoundByEmail;
  } catch (error) {
    debug("Cannot find the email in database");
  }
};

// Get all listings
const getAllListings = async () => {
  const listings = await Accommodation.find();
  return listings;
};

// Delete an existing listing
const deleteListing = async (email) => {
  let deletedListing = await Accommodation.deleteOne(email);
  return deletedListing;
};

module.exports = {
  createAccomListing,
  updateByEmail,
  findByEmail,
  getAllListings,
  deleteListing,
};
