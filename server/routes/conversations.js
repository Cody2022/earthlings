const express = require('express');
const router = express.Router();
const { createMembers } = require('../model/conversationModel');

router.post("/", async (req, res) => {
    const newMembers = req.body;
    try {
        const addedMembers = await createMembers(newMembers);
        console.log(`Adding members to conversation with id of: ${addedMembers}`);
        res.json(newMembers);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

module.exports = router;
