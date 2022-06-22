const express = require('express');
const router = express.Router();
const { createMessage, getMessages } = require('../model/messageModel')

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

//router that will get messages
router.get("/:convo_id", async (req, res) => {
  const id = req.params.convo_id
  try {
    const findMessages = await getMessages(id)
    console.log(`Retrieved messages with convo if of: ${findMessages}`)
    res.send(findMessages)
  } catch (err) {
    res.status.send(err.message)
  }
});


module.exports = router;