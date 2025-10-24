const express = require("express");
const { getPoliclinicController, createPoliclinicController} = require("../Controllers/policlinicController");
const authMiddleware = require("../Middlewares/authMiddleware");
const { create } = require("../Models/policlinicModel");
const router = express.Router();

//ROUTES
//Create Policlinic
router.post("/create-policlinic", createPoliclinicController);
//Get Policlinic details
router.get("/policlinics-famagusta", getPoliclinicController);

module.exports = router;
