var express = require("express");
const { get } = require("mongoose");
var router = express.Router();

const { createUser, findByEmail } = require("../model/userModel");

/* GET users listing. */
router.get("/", function (req, res) {
  res.send("Welcome earthlings to project 3!!");
});

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await findByEmail({ email: email });

  if (existingUser) {
    return res.send({
      status: "userexists",
      message: "Username already taken! Please signup with a different name",
    });
  } else if (email && password) {
    const createdNewUser = createUser(req.body);

    res.send({
      status: "signupsuccess",
      message: "Success, Thanks for signing up!",
    });
  } else {
    return res.send({
      status: "noInput",
      message: "Enter username and a password",
    });
  }
});

router.put("/update/:email", async(req, res)=>{
  const email=req.params.email;
  console.log("req.email", req.params.email);
  const updateData=req.body;
  console.log("req.body", req.body);
  try{
    let updatedUser=await updateByEmail(email, updateData);
    if (updatedUser) {
      res.send(updatedUser)
  }
 }catch(err){
  debug(`failed to edit user with email: ${email}`);
  debug(err.message);
  res.status(500).send("Error in data. Please try again.");
 }
})

// router.get("/email", async (req, res) => {
//   const { email } = req.body;

//   try {
//     const newComer = await findByEmail(email);
//     return res.send(newComer);
//   } catch (error) {
//     console.log(error.message);
//     return res.status(500).send(error.message);
//   }
// });

// const mustBeAdmin = (req, res, next) => {
//   console.log("reached mustBeAgent middleware");
//   if (req.user && req.user.isAdmin) {
//     return next();
//   }
//   res.sendStatus(401);
// };

module.exports = router;
