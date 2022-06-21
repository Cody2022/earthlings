const mongoose = require("mongoose")
//Create an array that will store the members ids of the conversation
const conversationSchema = new mongoose.Schema({
    members: {
        type: [{
            senderId: String,
            recieverId: [String],
        }],
    }
}, { timestamps: true});

const conversationModel = mongoose.model("Members", conversationSchema);

//Create a new conversation
const createMembers = async (members) => {
    const newMembers = await conversationModel.create(members);
    return newMembers
};

module.exports = { createMembers }

