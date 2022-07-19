const mongoose = require("./mongoose");
const translateModel = require("./translateModel");

const createTranslate = async (translatesInfo) => {
    const newTranslates = await translateModel.create(translatesInfo);
    return newTranslates;
  };
  
  const updateByEmail = async (email, newTranslateInfo) => {
    let updatedInfo = await translateModel.findOneAndUpdate(
      { email: email },
      newTranslateInfo,
      {
        new: true,
      }
    );
    return updatedInfo;
  };
  
  const findByEmail = async (email) => {
      let FoundByEmail = await translateModel.find(email);
      return FoundByEmail;
  };
  
  // get all translate availabilities
  const getAllTranslates = async () => {
      const translates = await translate.find();
      return translates;
  };
  
  // get all translate availabilities on given date
  const getByDate = async (date) => {
    const translateInfo = await translateModel.find({
      date:{
          $eq: new Date(date)
      }
    });
    return translateInfo;
  };
  
  // get all translate availabilities based on given starttime
  const getByStartTime = async (startTime) => {
    const translatesInfo = await translateModel.find({
      startTime:{
        $lte: new Date(startTime)
      },
      endTime:{
        $gte: new Date(startTime)
      }
    });
    return translatesInfo;
  };
  
  const deleteTranslatesByEmailAndTime = async (email, startTime) => {
    let deletedTranslates = await translateModel.deleteOne({
      email: email,
      startTime: { $eq: new Date (startTime) },
    });
    return deletedTranslates;
  };
  
  /*Filter all translate availabilities based on Languages*/
  const getByLanguage = async (languages) => {
    const translatesInfo = await translateModel.find({
      languages:{$all:languages}
    });
    return translatesInfo;
  };
  
  module.exports = {
    createTranslate,
    getByDate,
    findByEmail,
    updateByEmail,
    getAllTranslates,
    deleteTranslatesByEmailAndTime,
    getByStartTime,
    getByLanguage,
  };
  