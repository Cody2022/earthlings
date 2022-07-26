const express = require('express');
const router = express.Router();
const { createMembers, findConversationById, findConversation} = require('../model/conversationModel');

//Create a new conversation
router.post("/", async (req, res) => {
    const newMembers = { members: [req.body.members.senderEmail, req.body.members.recieverEmail] };
    try {
        const conversation = await findConversation(newMembers);
        if (conversation) {
            res.json(newMembers)
        } else {
            try {
                const addedMembers = await createMembers(newMembers);
                console.log(`Adding members to conversation with id of: ${addedMembers}`);
                res.json(newMembers);
            } catch (err) {
                res.status(500).json(err.message);
            }
        }
    } catch (err) {
        console.log(err.message)
    }
});

//Get the conversation from ID
router.get("/:senderEmail", async (req, res) => {
    const id = req.params.senderEmail;
    try {
        const getConversation = await findConversationById(id);
        console.log(`Retrived conversation with id of: ${id}`);
        res.send(getConversation);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
