const express = require("express");
const debug = require("debug")("server:routes");
const router = express.Router();
const {
  createAccomListing,
  updateByEmail,
  findByEmail,
  getAllListings,
  deleteListingById,
  getByNumberOfRooms,
  getByMaxNumTenants,
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

// Delete a listing By ID
router.put("/delete/:id", async (req, res) => {
  console.log("reached endpoint")
  let id = req.params.id;
  let deletedListing = deleteListingById(id);
  res.send(deletedListing);
});

// Filter accommodationList by Number of Rooms
router.post("/getbynumberofrooms", async (req, res) => {
  const {numberOfRooms} = req.body;
    try {
    const numOfRoomsList = await getByNumberOfRooms(numberOfRooms);
    res.send(numOfRoomsList);
  } catch (error) {
    debug(`error.message`);
    res.status(500).send("Failed to find accommodation info by numberofrooms.");
  }
});

// Filter accommodationList by Maximum Number of Tenants
router.post("/getbymaxnumtenants", async (req, res) => {
  const {maxNumTenants} = req.body;
    try {
    const maxNumTenantsList = await getByMaxNumTenants(maxNumTenants);
    res.send(maxNumTenantsList);
  } catch (error) {
    debug(`error.message`);
    res.status(500).send("Failed to find accommodation info by maxNumTenants.");
  }
});

module.exports = router;
