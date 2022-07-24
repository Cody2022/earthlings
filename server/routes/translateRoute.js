const express = require("express");
const router = express.Router();
const translateModel = require("../model/translateModel");
const userModel = require("../model/userModel");
const moment = require("moment");

// router.use("*", (req, res, next) => {
//   console.log(`reach the transRouter`);
//   next();
// });
/** create translate form */

//This
const {
  createTranslate,
  getByDate,
  updateByEmail,
  getAllTranslates,
  deleteTranslatesByEmailAndTime,
  getByStartTime,
  findByEmail,
  getByLanguage,
} = require("../model/translateFunctions");

router.post("/create", async (req, res) => {
  try {
    const task = req.body.task;
    const name = req.body.name;
    const email = req.body.email;
    console.log("translate !!!", req.body);
    const fromLanguage = req.body.fromLanguage;
    const toLanguage = req.body.toLanguage;
    const date = new Date(req.body.date);
    const startTime = new Date(req.body.startTime);
    const endTime = new Date(req.body.endTime);

    const newTranslate = new translateModel({
      task,
      name,
      email,
      date,
      startTime,
      endTime,
      fromLanguage,
      toLanguage,
    });
    newTranslate.save();
    res.send(newTranslate);
  } catch (ex) {
    console.error(ex);
    res.status(500).send(`failed to create translate!!`);
    // throw ex;
  }
});

/*Get all translates*/
router.get("/getall", async (req, res) => {
  try {
    const translates = await translateModel.find({});
    res.send(translates);
  } catch (error) {
    debug(error.message);
    res.status(500).send(`failed to find all translate info`);
  }
});

/*Get translate information by email*/
router.get("/get/:email", async (req, res) => {
  const email = req.params.email;
  try {
    let translateFound = await findByEmail({ email: email });
    if (translateFound) {
      res.send(translateFound);
    }
  } catch (err) {
    debug(`failed to find translate with email: ${email}`);
    res.status(500).send(`failed to find translate with email: ${email}`);
  }
});

/*Search all translate by date/languages*/
router.get("/search", async (req, res) => {
  const when = moment(req.query.when);
  const toLangs = req.query.toLangs; // array
  const fromLangs = req.query.fromLangs; // array
  try {
    const translates = await translateModel.find({
      startTime: { $lte: when.endOf('day').toDate() },
      endTime: { $gte: when.startOf('day').toDate() },
      fromLanguage: { $in: fromLangs },
      toLanguage: { $in: toLangs },
    });
    res.send({ results: translates });
  } catch (error) {
    debug(error.message);
    res.status(500).send(`failed to search translates`);
  }
});

/*Get all translates by date*/
router.post("/getbydate", async (req, res) => {
  const { date } = req.body;
  try {
    let translates = await getByDate(date);
    res.send(translates);
  } catch (error) {
    debug(error.message);
    res.status(500).send(`failed to find translate by date`);
  }
});

/*Get all translates by startTime*/
router.post("/getbystarttime", async (req, res) => {
  const { startTime } = req.body;
  try {
    let translates = await getByStartTime(startTime);
    res.send(translates);
  } catch (error) {
    debug(error.message);
    res.status(500).send(`failed to find translate info by startTime`);
  }
});

/*Get all translates listings based on fromLanguages*/
router.post("/getbyfromlanguages", async (req, res) => {
  const { languages } = req.body;
  try {
    let translate = await getByLanguage(fromLanguage);
    res.send(translate);
  } catch (error) {
    debug(error.message);
    res.status(500).send(`failed to find translate info by languages`);
  }
});

/*Get translates listings based on toLanguage Languages*/
router.post("/getbytolanguages", async (req, res) => {
  const { languages } = req.body;
  try {
    let translate = await getByLanguage(toLanguage);
    res.send(translate);
  } catch (error) {
    debug(error.message);
    res.status(500).send(`failed to find translate info by languages`);
  }
});

/**Delete translates info based on email and Time */

router.put("/delete", async (req, res) => {
  const { email, startTime } = req.body;
  try {
    let deletedSlot = deleteTranslatesByEmailAndTime(email, startTime);
    res.status(200).send(deletedSlot);
  } catch (error) {
    debug(error);
    res
      .status(500)
      .send(`Failed to delete translate info by email and startTime`);
  }
});

/*Update translates form----?*/
router.put("/update/", async (req, res) => {
  const { email, ...updateData } = req.body;
  try {
    let updatedInfo = await updateByEmail(email, updateData);
    if (updatedInfo) {
      res.send(updatedInfo);
    }
  } catch (err) {
    debug(`failed to edit translate with email: ${email}`);
    debug(err.message);
    res.status(500).send(`account of ${email} cannot be updated`);
  }
});

/**Delete translates info based on email and Time */

router.put("/delete", async (req, res) => {
  const { email, startTime } = req.body;
  try {
    let deletedSlot = deleteTranslatesByEmailAndTime(email, startTime);
    res.status(200).send(deletedSlot);
  } catch (error) {
    debug(error);
    res
      .status(500)
      .send(`Failed to delete translate info by email and startTime`);
  }
});

module.exports = router;
