const mongoose = require("mongoose");

const requestFormSchema = {
    title: String,
    content: String,
}

const Request = mongoose.model("Request", requestFormSchema)

module.exports = Request;
