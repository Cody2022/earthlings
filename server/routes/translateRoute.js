const express = require("express");
const router = express.Router();
const translateModel = require("../model/translateModel");
const userModel = require("../model/userModel");

// router.use("*", (req, res, next) => {
//   console.log(`reach the transRouter`);
//   next();
// });
/** create translate form */

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
    //const task = req.body.title;
    const email = req.body.email;
    console.log("!!!", req.body);
    const fromLanguage = req.body.fromLanguage;
    const toLanguage = req.body.toLanguage;
    const date = new Date(req.body.date);
    const startTime = new Date(req.body.startTime);
    const endTime = new Date(req.body.endTime);

    const newTranslate = new translateModel({
      email,
      date,
      startTime,
      endTime,
      fromLanguage,
      toLanguage,
    });
    newTranslate.save();
  } catch (ex) {
    console.error(ex);
    throw ex;
  }
});

/*Get all translates*/
router.get("/getall", async (req, res) => {
  try {
    const translates = await translateModel.find({})
    res.send(translates);
  } catch (error) {
    debug(error.message);
    res.status(500).send(`failed to find all transport info`);
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
    res.status(500).send(`failed to find transport by date`);
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
    res.status(500).send(`failed to find transport info by startTime`);
  }
});

/*Get all translates listings based on Languages*/
router.post("/getbylanguages", async (req, res) => {
  const { languages } = req.body;
  try {
    let translate = await getByLanguage(languages);
    res.send(translate);
  } catch (error) {
    debug(error.message);
    res.status(500).send(`failed to find transport info by languages`);
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
      .send(`Failed to delete transport info by email and startTime`);
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
    debug(`failed to edit transport with email: ${email}`);
    debug(err.message);
    res.status(500).send(`account of ${email} cannot be updated`);
  }
});

module.exports = router;
