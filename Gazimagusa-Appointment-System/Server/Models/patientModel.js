// server/Models/patientModel.js

const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: [true, "First name is required."],
    },
    Surname: {
      type: String,
      required: [true, "Last name is required."],
    },
    Email: {
      type: String,
      required: [true, "Email is required."],
      unique: true, // Her email benzersiz olmalı
    },
    Password: {
      type: String,
      required: [true, "Password is required."],
    },
    DOB: { // Date of Birth
      type: Date,
      required: [true, "Date of Birth is required."],
    },
    Phone: {
      type: String, // String olarak saklamak daha esnek (örn: +90 ...)
      required: [true, "Phone number is required."],
    },
    Sex: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    Address: {
      street1: String,
      street2: String,
      city: String,
      state: String,
      zip: String,
    },
    MaritalStatus: {
      type: String,
      enum: ["Single", "Married", "Divorced", "Widowed"],
    },
    // Acil durum ve diğer bilgiler opsiyonel olabilir, bu yüzden 'required' değil.
    EmergencyContact: {
      firstName: String,
      lastName: String,
      relationship: String,
      phone: String,
    },
    HealthHistory: {
      reasonForRegistration: String,
      additionalNotes: String,
      isTakingMeds: Boolean,
      medsList: String,
    },
    // Varsayılan ve değişmez alanlar
    userType: {
      type: String,
      default: "Patient",
      enum: ["Patient", "Doctor", "Admin"],
    },
    Profile: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png",
    },
    // authAnswer alanı formda yok ama backend'de zorunlu. Şimdilik geçici bir değer atayacağız.
    authAnswer: {
      type: String,
      required: [true, "Authentication answer is required."],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("patient-Data", patientSchema);