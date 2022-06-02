require("dotenv").config();
var express = require("express");
var router = express.Router();
var debug = require("debug")("server:users");

const { createUser, findByEmail, updateByEmail } = require("../model/userModel");

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
      message: "Email already taken! Please signup with a different email",
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
      message: "Enter email and a password",
    });
  }
});

router.put("/update/:email", async(req, res)=>{
  const email=req.params.email;
  const updateData=req.body;
  try{
    let updatedUser=await updateByEmail(email, updateData);
    if (updatedUser) {
     res.send(updatedUser)
  }
 }catch(err){
  debug(`failed to edit user with email: ${email}`);
  debug(err.message);
  res.status(500).send(`account of ${email} cannot be updated`);
 }
})


module.exports = router;
