const express = require("express");
const { getPatientController, getDoctorController } = require("../Controllers/userController");
const authMiddleware = require("../Middlewares/authMiddleware");
const router = express.Router();

//ROUTES
//GET ALL INFORMATION
router.get("/patients", authMiddleware, getPatientController);
router.get("/doctors", authMiddleware, getDoctorController);


module.exports = router;
