const express = require("express");
const router = express.Router();
const { createDonation, findDonations, updateDonation, deleteDonation } = require("../model/donationsModel")

//Create route that will add a new donation to db
router.post("/create",  async (req, res) => {
    const newDonation = req.body
    try {
        const addedDonation = await createDonation(newDonation);
        console.log(`Added donation ${addedDonation.title} with id of: ${addedDonation._id}`);
        res.send(newDonation);
    } catch (err) {
        res.status(500).send(err.message)
    }
})

//Create route that will finds all the documents
router.get("/find", async (req, res) => {
    const retriveDonations = req.body;
    try {
        const getDonations = await findDonations(retriveDonations)
        console.log(`Got all donations`)
        res.send(getDonations)
    } catch (err) {
        res.status.send(err.message)
    }
})

//Create a route that will update a donation listing by id
router.put("/update/:id", async (req, res) => {
    const id = req.params.id
    const updateData = req.body
    try {
        const changedDonation = await updateDonation(id, updateData)
        console.log(`Updated donation listing with id of ${changedDonation._id} to ${changedDonation}`)
        res.send(changedDonation)
    } catch (err) {
        res.status(500).send(err.message)
    }
})

//Create a route that will delete a donation listing by id
router.delete("/delete/:id", async (req, res) => {
    const id = req.params.id
    try {
        const removedDonation = await deleteDonation(id)
        console.log(`Deleted donation with id of: ${removedDonation}`)
        res.send(removedDonation)
    } catch (err) {
        res.status(500).send(err.message)
    }
})




module.exports = router;