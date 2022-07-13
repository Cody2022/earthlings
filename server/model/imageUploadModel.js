const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
    profilePic: String 
})

const image = mongoose.model("Image", imageSchema);

const createImage = async (pic) => {
  const newImage = await image.create(pic);
  return newImage;
};

const getImageById = async (_id) => {
  const viewImage = await image.findById(_id);
  return viewImage;
};

module.exports = { createImage, getImageById }