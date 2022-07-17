const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/express-mongoose-app", {
  useNewUrlParser: true,
});
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const User = mongoose.model("User", userSchema);

const transportSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
});

const Transport = mongoose.model("Transport", transportSchema);

// get all transports with user info populated from user collection
const main = async () => {
  // await User.create({
  //   name: "John Doe",
  //   email: "gfg.com ",
  // });

  // await Transport.create({
  //   email: "gfg.com",
  //   startDate: new Date(),
  //   endDate: new Date("2022-07-15"),
  // });

  const result = await Transport.find({});
  let finalResult = [];
  for (let i = 0; i < result.length; i++) {
    console.log(result[i].email);
    const userResult = await User.findOne({
      email: result[i].email,
    });
    console.log(userResult);
    finalResult.push({
      ...result[i].toObject(),
      user: userResult,
    });
  }
  console.log(finalResult);
  mongoose.connection.close();
};

main();