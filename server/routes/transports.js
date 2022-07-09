require("dotenv").config();
const express = require("express");
const router = express.Router();
const debug = require("debug")("server:transports");
const bcrypt = require("bcrypt");

const {
  createTransport,
  getByDate,
  updateByEmail,
  getAllTransports,
  deleteTransportByEmailAndTime,
  getByStartTime,
  findByEmail,
} = require("../model/transportModel");

/** create transport form */
router.post("/create", async (req, res) => {
  try {
    let transportInfo=req.body;
    let date=new Date (transportInfo.date);
    let startTime=new Date (transportInfo.startTime);
    let endTime=new Date (transportInfo.endTime);
    let newTransport = await createTransport({...transportInfo, date:date, startTime:startTime, endTime:endTime});
    if (newTransport) {
      res.send(newTransport);
    }
  } catch (err) {
    debug(`failed to create new Transport`);
    debug(err.message);
    res.status(500).send(`failed to create new Transport`);
  }
});

/*Get transport information by email*/
router.get("/get/:email", async(req, res)=>{
  const email=req.params.email;
  try{
    let transportFound=await findByEmail({ email: email })
    if (transportFound) {
    res.send(transportFound)
  }
 }catch(err){
  debug(`failed to find transport with email: ${email}`);
  res.status(500).send(`failed to find transport with email: ${email}`);
 }
})

/*Get all transports*/
router.get("/getall", async(req, res)=>{
  try{
    let transports=await getAllTransports();
    res.send(transports);
  } catch(error){
    debug(error.message)
    res.status(500).send(`failed to find all transport info`);
  }
})

/*Get all transports by date*/
router.post("/getbydate", async(req, res)=>{
  const {date}=req.body;
  try{
    let transports=await getByDate(date);
    res.send(transports);
  } catch(error){
    debug(error.message)
    res.status(500).send(`failed to find transport by date`);
  }
})

/*Get all transports by startTime*/
router.post("/getbystarttime", async(req, res)=>{
  const {startTime}=req.body;
  try{
    let transports=await getByStartTime(startTime);
    res.send(transports);
  } catch(error){
    debug(error.message)
    res.status(500).send(`failed to find transport info by startTime`);
  }
})

/**Delete transport info based on email and Time */

router.put("/delete", async(req, res)=>{
  const {email, startTime}=req.body;
  try{
    let deletedTransport=deleteTransportByEmailAndTime(email, startTime);
    res.status(200).send(deletedTransport)
  }catch(error){
    debug(error)
    res.status(500).send(`Failed to delete transport info by email and startTime`);
  }
})


/*Update transport form----?*/
router.put("/update/", async (req, res) => {
  const {email, ...updateData}=req.body;
  try {
    let updatedTransport = await updateByEmail(email, updateData);
    if (updatedTransport) {
      res.send(updatedTransport);
    }
  } catch (err) {
    debug(`failed to edit transport with email: ${email}`);
    debug(err.message);
    res.status(500).send(`account of ${email} cannot be updated`);
  }
});


module.exports = router;
