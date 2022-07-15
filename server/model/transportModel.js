debug = require("debug")("server:transportModel");
const mongoose = require("./mongoose");

const transportInfoSchema = new mongoose.Schema({
  email: { type: String, required: true },
  date: { type: Date },
  startTime: { type: Date },
  endTime: { type: Date },
  languages: {type: Array},
  accessories: {type: Array},
  maxPassengers:{type: Number},
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
});

const Transport = mongoose.model("Transport", transportInfoSchema);

const createTransport = async (transportInfo) => {
  const newTransport = await Transport.create(transportInfo);
  return newTransport;
};


const updateByEmail = async (email, newTransportInfo) => {
  let updatedInfo = await Transport.findOneAndUpdate(
    { email: email },
    newTransportInfo,
    {
      new: true,
    }
  );
  return updatedInfo;
};

const findByEmail = async (email) => {
    let FoundByEmail = await Transport.find(email);
    return FoundByEmail;
};

// get all transport availabilities
const getAllTransports = async () => {
    const transports = await Transport.find();
    return transports;
};

// get all transport availabilities on given date
const getByDate = async (date) => {
  const transportInfo = await Transport.find({
    date:{
        $eq: new Date(date)
    }
  });
  return transportInfo;
};

// get all transport availabilities based on given starttime
const getByStartTime = async (startTime) => {
  const transportInfo = await Transport.find({
    startTime:{
      $lte: new Date(startTime)
    },
    endTime:{
      $gte: new Date(startTime)
    }
  });
  return transportInfo;
};

const deleteTransportByEmailAndTime = async (email, startTime) => {
  let deletedTransport = await Transport.deleteOne({
    email: email,
    startTime: { $eq: new Date (startTime) },
  });
  return deletedTransport;
};

/*Filter all transport availabilities based on Languages*/
const getByLanguage = async (languages) => {
  const transportInfo = await Transport.find({
    languages:{$all:languages}
  });
  return transportInfo;
};


module.exports = {
  createTransport,
  getByDate,
  findByEmail,
  updateByEmail,
  getAllTransports,
  deleteTransportByEmailAndTime,
  getByStartTime,
  getByLanguage
};
