const express = require("express");
const router = express.Router();
const calendarModel = require("../model/caledarModel");

//This
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
    res.send(newEvent);
  } catch (e) {
    console.error(e);
    res.status(500).send(`failed to create calendar`);
  }
});

module.exports = router;
