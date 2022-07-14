const express = require("express");
const router = express.Router();
const scheduleModel = require("../model/scheduleModel");
const userModel = require("../model/userModel");
const transportModel = require("../model/transportModel");

router.route("/").post(async (req, res) => {
  try {
    const task = req.body.title;
    const email = req.body.email;
    console.log("!!!", req.body);
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);

    const user = await userModel.findByEmail(email);
    if (!user) {
      return res.sendStatus(400);
    }

    const newEvent = new scheduleModel({
      task,
      email,
      startDate,
      endDate,
    });
    newEvent.save();
  } catch (e) {
    console.error(e);
    throw e;
  }
});

/*Get all newEvents*/
router.get("/:email", async (req, res) => {
  const email = req.params.email;
  const schedules = await scheduleModel.findByEmail({ email: email });
  res.json(schedules);
});

router.get("/", async (req, res) => {
  const newcomerEmail = req.query.email;
  const task = req.query.task;

  const newcomerSlots = await transportModel.find({
    task: { $regex: new RegExp(task, "i") },
    email: newcomerEmail,
    endTime: { $gt: new Date() },
  });

  if (!newcomerSlots.length) {
    return res.json({ volunteers: [] });
  }

  const distinctVolunteerEmails = await scheduleModel.find({
    task: { $regex: new RegExp(task, "i") },
    $or: newcomerSlots.map(({ startTime, endTime }) => ({
      $and: [{ $gte: startTime }, { $lte: endTime }],
    })),
  }).distinct('email').lean().exec();

  res.json({
    volunteers: distinctVolunteerEmails,
  });
});

module.exports = router;
