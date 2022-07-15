const express = require("express");
const router = express.Router();
const translateModel = require("../model/translateModel");

/** create translate form */
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
  
      const user = await userModel.findByEmail(email);
      if (!user) {
        return res.sendStatus(400);
      }
  
      const newTranslate = new translateModel({
        date,
        startTime,
        endTime,
        fromLanguage,
        toLanguage,
      });
      newTranslate.save();
    } catch (e) {
      console.error(e);
      throw e;
    }
  });
  
  /*Get tranlate information by email*/
router.get("/get/:email", async (req, res) => {
    const email = req.params.email;
    try {
      let transportFound = await findByEmail({ email: email });
      if (transportFound) {
        res.send(transportFound);
      }
    } catch (err) {
      debug(`failed to find transport with email: ${email}`);
      res.status(500).send(`failed to find transport with email: ${email}`);
    }
  });

  /*Get all email*/
  router.get("/:email", async (req, res) => {
    const email = req.params.email;
    const translates = await scheduleModel.find({ email: email });
    res.json(translates);
  });
  

  module.exports = router;
