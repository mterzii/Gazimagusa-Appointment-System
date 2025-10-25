const doctorModel = require("../Models/doctorModel");
const patientModel = require("../Models/patientModel");
const bcrypt = require("bcryptjs");

//!!GET PATIENT DETAILS
const getPatientController = async (req, res) => {
  try {
    //find patient
    const patients = await patientModel.findById(req.user.id);
    //validation
    if (!patients) {
      res.status(404).send({
        success: false,
        message: "Patient not found",
      });
    }
    patients.Password = undefined; // Do not send password in db
    res.status(200).send({
      success: true,
      message: "Patient details fetched successfully",
      patients,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error fetching patient details",
      error: error.message,
    });
  }
};

//!!GET DOCTOR DETAILS
const getDoctorController = async (req, res) => {
  try {
    //find doctor
    const doctor = await doctorModel.findById(req.user.id);
    //validation
    if (!doctor) {
      res.status(404).send({
        success: false,
        message: "Doctor not found",
      });
    }
    doctor.Password = undefined; // Do not send password in db
    res.status(200).send({
      success: true,
      message: "Doctor details fetched successfully",
      doctor,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error fetching doctor details",
      error: error.message,
    });
  }
};

//!!UPDATE PATIENT PROFILE
const updatePatientController = async (req, res) => {
  try {
    //find patient
    const patients = await patientModel.findById(req.user.id);
    //validation
    if (!patients) {
      res.status(404).send({
        success: false,
        message: "Patient not found",
      });
    }
    //update
    const { Name, Surname, Email, Address, Phone, Profile } = req.body;
    if (Name) patients.Name = Name; //* İSİM VE SOYİSİM MANTIĞI OTURMADI AMA KALSIN DURUMA GÖRE SİLİNİR
    if (Surname) patients.Surname = Surname;
    if (Email) patients.Email = Email;
    if (Address) patients.Address = Address;
    if (Phone) patients.Phone = Phone;
    if (Profile) patients.Profile = Profile;
    await patients.save(); // Save updated patient details
    res.status(200).send({
      success: true,
      message: "Patient details updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error Update Patient API",
      error: error.message,
    });
  }
};

//!UPDATE DOCTOR PROFILE
const updateDoctorController = async (req, res) => {
  try {
    //find doctor
    const doctor = await doctorModel.findById(req.user.id);
    //validation
    if (!doctor) {
      res.status(404).send({
        success: false,
        message: "Doctor not found",
      });
    }
    //update
    const { Name, Surname, Email, Address, Phone, Profile } = req.body;
    if (Name) doctor.Name = Name; //* İSİM VE SOYİSİM MANTIĞI OTURMADI AMA KALSIN DURUMA GÖRE SİLİNİR
    if (Surname) doctor.Surname = Surname;
    if (Email) doctor.Email = Email;
    if (Address) doctor.Address = Address;
    if (Phone) doctor.Phone = Phone;
    if (Profile) doctor.Profile = Profile;
    await doctor.save(); // Save updated doctor details
    res.status(200).send({
      success: true,
      message: "Doctor details updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error Update Doctor API",
      error: error.message,
    });
  }
};

// Ortak user bulma fonksiyonu
const findUserById = async (id) => {
  let user = await patientModel.findById(id);
  if (!user) {
    user = await doctorModel.findById(id);
  }
  return user;
};

//!!UPDATE PASSWORD
const updatePasswordController = async (req, res) => {
  try {
    //find user (patient veya doctor olabilir)
    const user = await findUserById(req.user.id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(500).send({
        success: false,
        message: "Old password and new password are required",
      });
    }

    //Check Password
    const isMatch = await bcrypt.compare(oldPassword, user.Password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid Old Password!",
      });
    }
    //hashing new password
    const hashedPassword = await bcrypt.hash(
      newPassword,
      bcrypt.genSaltSync(10)
    );
    user.Password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password update successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error Update Password API",
      error: error.message,
    });
  }
};

//! RESET PASSWORD
const resetPasswordController = async (req, res) => {
  try {
    const { Email, newPassword, authAnswer } = req.body;
    if (!Email || !newPassword || !authAnswer) {
      return res.status(500).send({
        success: false,
        message: "Email, new password and authentication answers are required",
      });
    }
    //find user (patient veya doctor olabilir)
    const user = await findUserById(req.user.id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found or authentication answer is incorrect",
      });
    }

    //hashing new password
    const hashedPassword = await bcrypt.hash(
      newPassword,
      bcrypt.genSaltSync(10)
    );

    user.Password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error Reset Password API",
      error: error.message,
    });
  }
};

//!DELETE PROFILE
const deleteProfileController = async (req, res) => {
  try {
    // Try to delete patient first
    let user = await patientModel.findByIdAndDelete(req.params.id);
    // If not found, try to delete doctor
    if (!user) {
      user = await doctorModel.findByIdAndDelete(req.params.id);
    }
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Profile deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error Delete Profile API",
      error: error.message,
    });
  }
};

module.exports = {
  getPatientController,
  getDoctorController,
  updatePatientController,
  updateDoctorController,
  updatePasswordController,
  resetPasswordController,
  deleteProfileController
};
