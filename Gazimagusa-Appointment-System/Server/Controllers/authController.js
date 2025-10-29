//REGISTER
const patientModel = require("../Models/patientModel");
const doctorModel = require("../Models/doctorModel");
const adminModel = require("../Models/adminModel");
const bcrypt = require("bcryptjs");

const JWT = require("jsonwebtoken");
const { Admin } = require("mongodb");

const validateFieldsPatient = (body) => {
  const requiredFields = [
    "Name",
    "Surname",
    "Email",
    "Password",
    "DOB",
    "Address",
    "Phone",
    "authAnswer",
  ];
  for (let field of requiredFields) {
    if (!body[field]) return true;
  }
  return false;
};

const validateFieldsDoctor = (body) => {
  const requiredFields = [
    "Name",
    "Surname",
    "Email",
    "Password",
    "Department",
    "DOB",
    "Address",
    "Phone",
    "authAnswer",
  ];
  for (let field of requiredFields) {
    if (!body[field]) return true;
  }
  return false;
};
const validateFieldsAdmin = (body) => {
  const requiredFields = [
    "Name",
    "Surname",
    "Email",
    "Password",
    "Department",
    "Address",
    "Phone",
    "authAnswer",
  ];
  for (let field of requiredFields) {
    if (!body[field]) return true;
  }
  return false;
};
const generateToken = (user, role) => {
  return JWT.sign({ id: user._id, role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

//! REG PATIENT CONTROLLER
const registerPatientController = async (req, res) => {
  try {
    // 1. Gelen tüm verileri request body'sinden al
    const {
      Name,
      Surname,
      Email,
      Password,
      DOB,
      Phone,
      Sex,
      Address, // Bu artık bir obje olarak gelecek: { street1, city, ... }
      MaritalStatus,
      EmergencyContact, // Bu da bir obje
      HealthHistory, // Bu da bir obje
    } = req.body;

    // 2. Temel alanların kontrolü
    if (!Name || !Surname || !Email || !Password || !DOB || !Phone) {
      return res.status(400).send({ // 400 Bad Request daha uygun
        success: false,
        message: "Please provide all required fields (Name, Surname, Email, Password, DOB, Phone).",
      });
    }

    // 3. Kullanıcı zaten var mı diye kontrol et
    const existing = await patientModel.findOne({ Email: Email });
    if (existing) {
      return res.status(409).send({ // 409 Conflict daha uygun
        success: false,
        message: "Email is already registered. Please try logging in.",
      });
    }

    // 4. Şifreyi hash'le
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Password, salt);

    // 5. Yeni hasta verisini oluştur
    const newPatient = new patientModel({
      Name,
      Surname,
      Email,
      Password: hashedPassword,
      DOB,
      Phone,
      Sex,
      Address, // Frontend'den gelen obje doğrudan atanır
      MaritalStatus,
      EmergencyContact, // Frontend'den gelen obje doğrudan atanır
      HealthHistory, // Frontend'den gelen obje doğrudan atanır
      authAnswer: "default_answer", // Formda bu alan olmadığı için geçici bir değer atıyoruz.
    });

    // 6. Veritabanına kaydet
    await newPatient.save();

    res.status(201).send({
      success: true,
      message: "Successfully Registered.",
      patient: newPatient, // newPatient'ı geri döndürelim
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Patient Register API!",
      error: error.message,
    });
  }
};
//! REG DOCTOR CONTROLLER
const registerDoctorController = async (req, res) => {
  try {
    if (validateFieldsDoctor(req.body)) {
      return res.status(500).send({
        success: false,
        message: "Please Provide All Fields.",
      });
    }
    //CHECK DOCTOR
    const existing = await doctorModel.findOne({ Email: req.body.Email });
    if (existing) {
      return res.status(500).send({
        success: false,
        message: "Email is Alredy Registered, Please Try Log In.",
      });
    }

    //hashing password
    const hashedPassword = await bcrypt.hash(
      req.body.Password,
      bcrypt.genSaltSync(10)
    );

    //Create New Doctor
    const newDoctor = await doctorModel.create({
      ...req.body,
      Password: hashedPassword,
    });
    res.status(201).send({
      success: true,
      message: "Succesfully Registered.",
      newDoctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Doctor Register API!",
      error,
    });
  }
};
//! REG ADMIN CONTROLLER
const registerAdminController = async (req, res) => {
  try {
    if (validateFieldsAdmin(req.body)) {
      return res.status(500).send({
        success: false,
        message: "Please Provide All Fields.",
      });
    }
    //CHECK ADMIN
    const existing = await adminModel.findOne({ Email: req.body.Email });
    if (existing) {
      return res.status(500).send({
        success: false,
        message: "Email is Alredy Registered, Please Try Log In.",
      });
    }

    //hashing password
    const hashedPassword = await bcrypt.hash(
      req.body.Password,
      bcrypt.genSaltSync(10)
    );

    //Create New Admin
    const newAdmin = await adminModel.create({
      ...req.body,
      Password: hashedPassword,
    });
    res.status(201).send({
      success: true,
      message: "Succesfully Registered.",
      newAdmin,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Admin Register API!",
      error,
    });
  }
};

//LOGIN

//! LOG IN PATIENT CONTROLLER
const loginPatientController = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    //validation
    if (!Email || !Password) {
      return res.status(500).send({
        success: false,
        message: "Email or Password is incorrect",
      });
    }
    //Check Patient
    const patient = await patientModel.findOne({ Email: req.body.Email });
    if (!patient) {
      return res.status(404).send({
        success: false,
        message: "Patient Not Found!",
      });
    }
    //Check Password
    const isMatch = await bcrypt.compare(Password, patient.Password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid Password!",
      });
    }

    //Create JWT Token
    const token = generateToken(patient, "patient");
    patient.Password = undefined; //remove password from db
    res.status(200).send({
      success: true,
      message: "Log in Succesfully",
      token,
      patient,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Patient Log in API!",
      error: error.message,
    });
  }
};
//! LOG IN DOCTOR CONTROLLER
const loginDoctorController = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    //validation
    if (!Email || !Password) {
      return res.status(500).send({
        success: false,
        message: "Email or Password is incorrect",
      });
    }
    //Check Doctor
    const doctor = await doctorModel.findOne({ Email: req.body.Email });
    if (!doctor) {
      return res.status(404).send({
        success: false,
        message: "Doctor Not Found!",
      });
    }
    //Check Password
    const isMatch = await bcrypt.compare(Password, doctor.Password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid Password!",
      });
    }
    //Create JWT Token
    const token = generateToken(doctor, "doctor");
    doctor.Password = undefined; //remove password from db
    res.status(200).send({
      success: true,
      message: "Log in Succesfully",
      token,
      doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Doctor Log in API!",
      error: error.message,
    });
  }
};
//! LOG IN ADMIN CONTROLLER
const loginAdminController = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    //validation
    if (!Email || !Password) {
      return res.status(500).send({
        success: false,
        message: "Email or Password is incorrect",
      });
    }
    //Check Patient
    const admin = await adminModel.findOne({ Email: req.body.Email });
    if (!admin) {
      return res.status(404).send({
        success: false,
        message: "Admin Not Found!",
      });
    }
    //Check Password
    const isMatch = await bcrypt.compare(Password, admin.Password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid Password!",
      });
    }
    //Create JWT Token
    const token = generateToken(admin, "admin");
    admin.Password = undefined; //remove password from db
    res.status(200).send({
      success: true,
      message: "Log in Succesfully",
      token,
      admin,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Admin Log in API!",
      error: error.message,
    });
  }
};

module.exports = {
  registerPatientController,
  registerDoctorController,
  registerAdminController,
  loginPatientController,
  loginDoctorController,
  loginAdminController,
};
