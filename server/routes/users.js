require("dotenv").config();
const express = require("express");
const router = express.Router();
const debug = require("debug")("server:users");
const bcrypt = require("bcrypt");

const { createUser, findByEmail, findUsersFirstName, updateByEmail, getAllUsers, deleteUser } = require("../model/userModel");

router.get("/", function (req, res) {
  res.send("Welcome earthlings to project 3!!");
});

/* User Sign up*/
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

/*Get user by email*/
router.get("/get/:email", async(req, res)=>{
  const email=req.params.email;
  try{
    let userFound=await findByEmail({ email: email })
    if (userFound) {
     res.send(userFound)
  }
 }catch(err){
  debug(`failed to find user with email: ${email}`);
  debug(err.message);
  res.status(500).send(`account of ${email} cannot be found`);
 }
})

//Get users firstName by querying out 
router.get("/name", async (req, res) => {
  console.log(req.query);
  const firstName = req.query.email;
  try {
    const findUserName = await findUsersFirstName(firstName);
    res.send(findUserName);
  } catch (err) {
    res.status(500).send(err.message)
  }
});

/*Update user profile*/
router.put("/update/", async (req, res) => {
  const {email, ...updateData}=req.body;
  try {
    let updatedUser = await updateByEmail(email, updateData);
    if (updatedUser) {
      res.send(updatedUser);
    }
  } catch (err) {
    debug(`failed to edit user with email: ${email}`);
    debug(err.message);
    res.status(500).send(`account of ${email} cannot be updated`);
  }
});

/*Get all newcomers*/
router.get("/getnewcomers", async(req, res)=>{
  let filter={isNewcomer:true}
  let newcomers=await getAllUsers(filter);
  res.send(newcomers);
})

/*Get all volunteers user*/
router.get("/volunteerusers", async(req, res)=>{
  let filter={isVolunteer:true}
  let volunteers=await getAllUsers(filter);
  res.send(volunteers);
})

/*Get all newcomer user*/
router.get("/newcomersusers", async(req, res)=>{
  let filter={isVolunteer:false}
  let volunteers=await getAllUsers(filter);
  res.send(volunteers);
})

/*Get all volunteers*/
router.get("/getvolunteers", async(req, res)=>{
  let filter={isVolunteer:true}
  let volunteers=await getAllUsers(filter);
  res.send(volunteers);
})

/*Delete user*/
router.put("/delete", async(req,res)=>{
    let email=req.body.email;
    let deletedUser=deleteUser({email:email})
    res.send(deletedUser)
})

/*Login*/
router.post("/login", async (req,res)=>{
  const email = req.body.email;
  const password = req.body.password;
  if (email === undefined || password === undefined) {
    return res.send({
      status: "noInput",
      id: email,
      message: "Enter email and password please",
    });
  }
  const userInfo = await findByEmail({ email: email });
  if (userInfo === null) {
    res.send({
      status: "notSignup",
      id: email,
      message: "New user, Signup first please",
    });
  } else {
    const result = await bcrypt.compare(password, userInfo.password);
    if (result === true) {
      res.send(userInfo);
    } else {
      res.send({
        status: "failed",
        id: email,
        message: "Wrong email or password",
      });
    }
  }
})

module.exports = router;
