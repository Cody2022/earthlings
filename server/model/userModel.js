debug = require("debug")("server:userModel");
const mongoose = require("./mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String},
  lastName: { type: String},
  age:{type: String},
  gender:{type: String},
  languages: {type: Array},
  educationLevel:{type: String},
  isNewcomer: { type: Boolean },
  isAdmin: { type: Boolean },
  isVolunteer: { type: Boolean},
  address:{type: String},
  city:{type: String},
  province:{type: String},
  bio:{type: String},
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
});

const User = mongoose.model("User", userSchema);

const createUser = async (newUserData) => {
  const hashedPassword = bcrypt.hashSync(
    newUserData.password,
    (saltRounds = 10)
  );
  const newUser = await User.create({
    ...newUserData,
    password: hashedPassword,
  });
  return newUser;
};

const findByEmail = async (email) => {
  try {
    return await User.findOne(email);
  } catch (error) {
    debug("Cannot find the email in database");
  }
};

const findUserById = async (id) => {
  let user = await User.findById(id);
  return user;
};

//Find user by first name
const findUsersFirstName = async (email) => {
  const locateFirstName = User.findOne({ email: email });
  return locateFirstName
};

const updateByEmail = async (email, newUserData) => {
    if (newUserData.password) {
        const hashedPassword = bcrypt.hashSync(newUserData.password, (saltRounds = 10));
        let updatedUser = await User.findOneAndUpdate({email: email}, {password: hashedPassword, ...newUserData}, {
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

// get all newcomers or volunteers based on the filter
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

const deleteUser = async (email) => {
  let deletedUser = await User.deleteOne(email);
  return deletedUser;
};

module.exports = {
  createUser,
  findByEmail,
  findUsersFirstName,
  updateByEmail,
  getAllUsers,
  findUserById,
  updateUserById,
  deleteUser,
  deleteUserById,
};
