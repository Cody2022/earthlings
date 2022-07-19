const express = require("express");
const router = express.Router();
const scheduleModel = require("../model/scheduleModel");
// const bookingModel = require("../model/bookingModel");
const { TransportModel } = require("../model/transportModel");

const {
  bookingModel,
  createBooking,
} = require("../model/bookingModel");

router.route("/book").post(async (req, res) => {
  try {
    const newcomerSlotId = req.body.newcomerSlotId;
    const volunteerSlotId = req.body.volunteerSlotId;

    const newcomerSlot = await scheduleModel.findById(newcomerSlotId);
    const volunteerSlot = await TransportModel.findById(volunteerSlotId);
    if (!newcomerSlot || !volunteerSlot) {
      return res.sendStatus(400);
    }

    const newBooking = new bookingModel({
      volunteerEmail: volunteerSlot.email,
      newcomerEmail: newcomerSlot.email,
      task: newcomerSlot.task,
      startDate: moment.max(newcomerSlot.startDate, volunteerSlot.startTime),
      endDate: moment.min(newcomerSlot.endDate, volunteerSlot.endTime),
    });
    newBooking.save();
  } catch (e) {
    console.error(e);
    throw e;
  }
});

/*Get all bookings that the email is involved in */
router.get("/:email", async (req, res) => {
  const email = req.params.email;
  const bookings = await bookingModel.find({
    $or: [{ volunteerEmail: email }, { newcomerEmail: email }],
  });
  res.json({ bookings });
});

//post booking
/** create transport form */
router.post("/create", async (req, res) => {
  try {
    const bookingInfo = req.body;
    console.log('bookingInfo is', bookingInfo)
    // let date = new Date(bookingInfo.date);
    // let startDate = new Date(bookingInfo.startDate);
    // let startTime = new Date(bookingInfo.startTime);
    // let endTime = new Date(bookingInfo.endTime);

    let startDate = bookingInfo.startDate;
    let startTime = bookingInfo.startTime;
    let endTime = bookingInfo.endTime;
    let newBooking = await createBooking({
      ...bookingInfo,
      startDate,
      startTime,
      endTime,
    });
    if (newBooking) {
      res.send(newBooking);
    }
  } catch (err) {
    debug(err.message);
    res.status(500).send(err.message);
  }
});


module.exports = router;
