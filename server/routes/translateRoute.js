const express = require("express");
const router = express.Router();
const translateModel = require("../model/translateModel");
const userModel= require("../model/userModel")

router.use('*', (req,res, next) => {
    console.log(`reach the transRouter`)
    next();
})
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
  
      const newTranslate = new translateModel({
        email,
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
  
  /*Get translate information by email*/
router.post("/user/:email", async (req, res) => {
    console.log(`email `)
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


  

  module.exports = router;
