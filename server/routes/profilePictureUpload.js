const express = require('express');
const router = express.Router();
const { createImage, getImageByEmail } = require("../model/imageUploadModel");

//Upload a profile picture
router.post("/uploadpicture", async (req, res) => {
  const image = req.body;
  try {
    const newImage = await createImage(image);
    console.log(`New image created with id of: ${newImage.id}`);
    res.send(newImage);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/:email", async (req, res) => {
  const email = req.params.email;
  try {
    const findImage = await getImageByEmail(email);
    console.log(`Retrieving image with id of: ${findImage.id}`);
    res.send(findImage);
  } catch (err) {
    console.log(err.message);
  }
});


module.exports = router;