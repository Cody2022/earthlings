const express = require("express");
const router = express.Router();
const scheduleModel = require("../model/scheduleModel");

router.route("/").post((req, res) => {
  try {
    const title = req.body.title;
    console.log('!!!', req.body);
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);

    const newEvent = new scheduleModel({
      title,
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
