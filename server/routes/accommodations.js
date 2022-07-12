const express = require("express");
const debug = require("debug")("server:routes");
const router = express.Router();

const {
  createAccomListing,
  updateByEmail,
  deleteListing,
  findByEmail,
  getAllListings,
} = require("../model/accommodationModel");

// POST a new Accommodation Listing
router.post("/create", async (req, res) => {
  // newAccomListing= {startDate, endDate, numberOfRooms, maxNumTenants, location, allowPets, accommodationType, accessibleHome}
  const newAccomListing = req.body;
  console.log("new accomm listing is", newAccomListing);
  // debug(`Post a new accommodation listing: ${newAccomListing}`)
  try {
    const createdListing = await createAccomListing(newAccomListing);
    console.log(`Creating listing with id of: ${createdListing}`);
    res.send(createdListing);
  } catch (err) {
    debug(`failed to add accomodation listing: ${newAccomListing}`);
    debug(err.message);
    res.status(500).send("Error in data. Please try again.");
  }
});

// Update a Listing
router.put("/update/", async (req, res) => {
  const { email, ...updateData } = req.body;
  try {
    let updatedListing = await updateByEmail(email, updateData);
    if (updatedListing) {
      res.send(updatedListing);
    }
  } catch (err) {
    debug(`failed to edit user with email: ${email}`);
    debug(err.message);
    res.status(500).send(`account of ${email} cannot be updated`);
  }
});

// Find a listing
router.get("/get/:email", async (req, res) => {
  const email = req.params.email;
  try {
    let listingFound = await findByEmail({ email: email });
    if (listingFound) {
      res.send(listingFound);
    }
  } catch (err) {
    debug(`failed to find listing with email: ${email}`);
    debug(err.message);
    res.status(500).send(`account of ${email} cannot be found`);
  }
});

// Get all listings
router.get("/listings", async (req, res) => {
  let listings = await getAllListings();
  res.send(listings);
});

// Delete a listing
router.put("/delete", async (req, res) => {
  let email = req.body.email;
  let deletedListing = deleteListing({ email: email });
  res.send(deletedListing);
});

module.exports = router;
