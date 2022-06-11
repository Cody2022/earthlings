const mongoose = require('mongoose')


let connectionString = process.env.MONGODB;

mongoose.connect(connectionString,()=>{
    console.log("connected to mongoose")
    
})

module.exports = mongoose
