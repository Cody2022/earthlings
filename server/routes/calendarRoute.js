const express = require("express");
const router = express.Router();
const calendarModel = require("../model/caledarModel");

router.route("/").post((req, res) => {
  try {
    const task = req.body.title;
    console.log('calendar!!!', req.body);
    const selectDate = new Date(req.body.startDate);
    const startTime = new Date(req.body.startDate);
    const endTime = new Date(req.body.endDate);

    const newEvent = new calendarModel({
      task,
      selectDate,
      startDate,
      endDate,
    });

    newEvent.save();
  } catch (e) {
    console.error(e);
    throw e;
  }
});

module.exports = router;
