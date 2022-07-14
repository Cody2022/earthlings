const express = require('express');
const router = express.Router();
const { createImage, getImageById } = require("../model/imageUploadModel");

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

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const findImage = await getImageById(id);
    console.log(`Retrieving image with id of: ${findImage.id}`);
    res.send(findImage);
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;