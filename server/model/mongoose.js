const mongoose = require('mongoose')


let connectionString = "mongodb://localhost:27017/user";

mongoose.connect(connectionString,()=>{
    console.log("connected to mongoose")
    
})

module.exports = mongoose
