const express = require("express");
const router = express.Router();
const Request = require("../model/requestModel")

router.route("/").post((req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const newRequest = new Request({
        title,
        content
    })

    newRequest.save();
})

module.exports = router;

