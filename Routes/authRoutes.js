const express = require("express");
const { registerPatientController, registerDoctorController, registerAdminController, loginPatientController, loginDoctorController, loginAdminController } = require("../Controllers/authController");
const authMiddleware = require("../Middlewares/authMiddleware");
const { deleteProfileController } = require("../Controllers/userController");
const router = express.Router();

//REGISTER
router.post("/register/patient", registerPatientController);
router.post("/register/doctor", registerDoctorController);
router.post("/register/admin", registerAdminController);

//LOGIN
router.post("/login/patient",loginPatientController);
router.post("/login/doctor",loginDoctorController);
router.post("/login/admin",loginAdminController);


//DELETE USER
router.delete("/delete/:id", deleteProfileController);

module.exports = router;
