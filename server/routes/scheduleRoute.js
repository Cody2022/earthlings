const express = require("express");
const router = express.Router();
const userModel = require("../model/userModel");
const { Transport } = require("../model/transportModel");
const Translate = require("../model/translateModel");
const Accommodation = require("../model/accommodationModel");
const Schedule = require("../model/scheduleModel");

//This
router.route("/").post(async (req, res) => {
  try {
    const task = req.body.task;
    const email = req.body.email;
    console.log("schedule !!!", req.body);
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);

    const user = await userModel.findByEmail(email);
    if (!user) {
      return res.sendStatus(400);
    }

    const newEvent = new Schedule({
      task,
      email,
      startDate,
      endDate,
    });
    newEvent.save();
    res.send(newEvent);
  } catch (e) {
    console.error(e);
    res.status(500).send(`failed to create schedule`);
    // throw e;
  }
});

router.get("/overlaps", async (req, res) => {
  const newcomerEmail = req.query.email;
  const task = req.query.task;

  const newcomerSlots = await Schedule.find({
    task: { $regex: new RegExp(task, "i") },
    email: newcomerEmail,
    endDate: { $gt: new Date() },
  });

  if (!newcomerSlots.length) {
    return res.json({ overlaps: [] });
  }

  if (task === "transport") {
    const query = {
      $or: newcomerSlots.map(({ startDate, endDate }) => ({
        $and: [
          { startTime: { $lte: endDate } },
          { endTime: { $gte: startDate } },
        ],
      })),
    };
    const transports = await Transport.find(query);
    console.log(JSON.stringify(query, undefined, 2));
    return res.json({ overlaps: transports });
  }

  if (task === "translate") {
    const translates = await Translate.find({
      $or: newcomerSlots.map(({ startDate, endDate }) => ({
        $and: [
          { startTime: { $lte: endDate } },
          { endTime: { $gte: startDate } },
        ],
      })),
    });
    return res.json({ overlaps: translates });
  }

  if (task === "accommodation") {
    const accomms = await Accommodation.find({
      $or: newcomerSlots.map(({ startDate, endDate }) => ({
        $and: [
          { startDate: { $lte: endDate } },
          { endDate: { $gte: startDate } },
        ],
      })),
    });
    return res.json({ overlaps: accomms });
  }

  res.status(400);
});

/*Get all newEvents*/
router.get("/:email", async (req, res) => {
  const email = req.params.email;
  const schedules = await Schedule.find({ email: email });
  res.json(schedules);
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

module.exports = router;
