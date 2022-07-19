const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
  email: { type: String, required: true},
  profilePic: { type: String }
})

const image = mongoose.model("Image", imageSchema);

const createImage = async (pic) => {
  const newImage = await image.create(pic);
  return newImage;
};

const getImageByEmail = async (email) => {
  const viewImage = await image.findOne({ email: email });
  return viewImage;
};

module.exports = { createImage, getImageByEmail }