const express = require('express');
const router = express.Router();
const { createMembers, findConversation} = require('../model/conversationModel');

//Create a new conversation
router.post("/", async (req, res) => {
    const newMembers = { members: [req.body.members.senderId, req.body.members.recieverId] };
    try {
        const addedMembers = await createMembers(newMembers);
        console.log(`Adding members to conversation with id of: ${addedMembers}`);
        res.json(newMembers);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

//Get the conversation from ID
router.get("/:senderId", async (req, res) => {
    const id = req.params.senderId;
    try {
        const getConversation = await findConversation(id);
        console.log(`Retrived conversation with id of: ${id}`);
        res.send(getConversation);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
