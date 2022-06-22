const express = require('express');
const router = express.Router();
const { createMessage } = require('../model/messageModel')

//router that will create a message
router.post("/", async (req, res) => {
    const newMessage = req.body;
    console.log(newMessage);
  try {
    const createdMessage = await createMessage(newMessage);
    console.log(`Creating message with id of: ${createdMessage}`);
    res.json(newMessage);
  } catch (err) {
    res.status(500).json(err.message);
  }
});


module.exports = router;