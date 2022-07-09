const mongoose = require("mongoose")
//Create an array that will store the members ids of the conversation
const conversationSchema = new mongoose.Schema({
    members: {
        type: Array,   
    }
}, { timestamps: true});

const conversationModel = mongoose.model("Members", conversationSchema);

//Create a new conversation
const createMembers = async (members) => {
    const newMembers = await conversationModel.create(members);
    return newMembers
};

//Find a members conversations by id
const findConversation = async (_id) => {
    const getConversation = await conversationModel.find({ members: { $in: _id } });
    return getConversation
}

module.exports = { createMembers, findConversation }

