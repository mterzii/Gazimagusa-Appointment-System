const express = require("express");
const {updatePatientController, updateDoctorController, resetPasswordController, updatePasswordController } = require("../Controllers/userController");
const authMiddleware = require("../Middlewares/authMiddleware");
const router = express.Router();

//ROUTES

//UPDATE PROFILE
router.put("/patient", authMiddleware, updatePatientController);
router.put("/doctor", authMiddleware, updateDoctorController)

//password
router.post("/update-password", authMiddleware, updatePasswordController);
router.post("/reset-password", authMiddleware, resetPasswordController);



module.exports = router;
