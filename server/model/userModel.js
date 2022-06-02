const { Schema } = require("mongoose");
const mongoose = require("./mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isNewComer: { type: Boolean, defualt: false },
  isAdmin: { type: Boolean, defualt: false },
  isVolunteer: { type: Boolean, defualt: false },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
});

const User = mongoose.model("User", userSchema);

const createUser = async (newUserData) => {
  const hashedPassword = bcrypt.hashSync(newUserData.password, (saltRounds = 10));
  const newUser = await User.create({
    ...newUserData,
    password: hashedPassword,
  });
  return newUser;
};

const findByEmail = async (userName) => {
  try {
    let FoundByEmail = await User.findOne(userName);
    return FoundByEmail;
  } catch (error) {
    console.log("Cannot find the username in database");
  }
};
// const findByEmail = async (email) => {
//   try {
//     let FoundByEmail = await User.findOne(email);
//     return FoundByEmail;
//   } catch (error) {
//     console.log("Cannot find the username in database");
//   }
// };

const updateByEmail = async (email, newUserData) => {
  console.log("userModel.js email", email)
  if (newUserData.password) {
      const hashedPassword = bcrypt.hashSync(newUserData.password, (saltRounds = 10));
      let updatedUser = await User.findOneAndUpdate({email: email}, {...newUserData, password: hashedPassword}, {
      new: true,
      });
      return updatedUser;
  } else {
      let updatedUser = await User.findOneAndUpdate({email: email}, newUserData, {
      new: true, upsert: true
      });
      return updatedUser;
  // }
};

const findUserById = async (id) => {
  let user = await User.findById(id);
  return user;
};

//   Update exiting user data
const updateUserById = async (id, newUserData) => {
  let updatedUser = await User.findByIdAndUpdate(id, newUserData, {
    new: true,
  });
  return updatedUser;
};

//Delete User data
const deleteUserById = async (id) => {
  let deletedUser = await User.findByIdAndDelete(id);
  return deletedUser;
};

module.exports = {
  createUser,
  findByEmail,
  findUserById,
  updateUserById,
  deleteUserById,
};
