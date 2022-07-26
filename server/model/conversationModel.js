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
const findConversationById = async (_id) => {
    const getConversationById = await conversationModel.find({ members: { $in: _id } });
    return getConversationById
}

const findConversation = async (searchParams) => {
        const getConversation = await conversationModel.findOne(searchParams);
        return getConversation;
}


module.exports = { createMembers, findConversationById, findConversation }

