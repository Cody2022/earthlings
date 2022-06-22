const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
    },
    sender: {
      type: String,
    },
    message: {
      type: String,
    },
  },
  { timestamp: true }
);

const messageModel = mongoose.model("Message", messageSchema);

//Create a new message
const createMessage = async (message) => {
  const newMessage = await messageModel.create(message);
  return newMessage;
};

module.exports = { createMessage };
