require("dotenv").config();
const express = require("express");
const router = express.Router();
const debug = require("debug")("server:users");
const bcrypt = require("bcrypt");

const { createUser, findByEmail, updateByEmail, getAllUsers, deleteUser } = require("../model/userModel");

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

router.put("/update/:email", async (req, res) => {
  const email = req.params.email;
  const updateData = req.body;
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

// getUserByEmail
router.get("/get/:email", async (req, res) => {
  const email = req.params.email;

  debug(`:email is (${email})`);
  try {
    let userFound = await findByEmail({email: email});
    if (userFound) {
      res.send (userFound)
    }
      } catch (err) {
        debug(`failed to find user with email: ${email}`);
        debug(err.message);
        res.status(500).send(`account of ${email} cannot be found`);
  }
});

// get newcomers
router.get("/getnewcomers", async(req, res)=>{
  let filter={isNewcomer:true}
  let newcomers=await getAllUsers(filter);
  res.send(newcomers);
})

// get Volunteers
router.get("/getvolunteers", async(req, res)=>{
  let filter={isVolunteer:true}
  let volunteers=await getAllUsers(filter);
  res.send(volunteers);
})

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

router.get("/getnewcomers", async(req, res)=>{
    let filter={isNewcomer:true}
    let newcomers=await getAllUsers(filter);
    res.send(newcomers);
})

router.get("/getvolunteers", async(req, res)=>{
  let filter={isVolunteer:true}
  let volunteers=await getAllUsers(filter);
  res.send(volunteers);
})

router.put("/delete", async(req,res)=>{
    let email=req.body.email;
    let deletedUser=deleteUser({email:email})
    res.send(deletedUser)
})




module.exports = router;
