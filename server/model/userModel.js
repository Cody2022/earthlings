debug = require("debug")("server:userModel");
const mongoose = require("./mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isNewcomer: { type: Boolean, defualt: false },
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

const findByEmail = async (email) => {
  try {
    let FoundByEmail = await User.findOne(email);
    return FoundByEmail;
  } catch (error) {
    debug("Cannot find the email in database");
  }
};

const findUserById = async (id) => {
  let user = await User.findById(id);
  return user;
};

const updateByEmail = async (email, newUserData) => {
    if (newUserData.password) {
        const hashedPassword = bcrypt.hashSync(newUserData.password, (saltRounds = 10));
        let updatedUser = await User.findOneAndUpdate({email: email}, {...newUserData, password: hashedPassword}, {
        new: true,
        });
        return updatedUser;
    } else {
        let updatedUser = await User.findOneAndUpdate({email: email}, newUserData, {
        new: true
        });
        return updatedUser;
    }
};

const getAllUsers = async (filter) => {
  const users = await User.find(filter);
  return users;
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
  updateByEmail,
  getAllUsers,
  findUserById,
  updateUserById,
  deleteUserById,
};
