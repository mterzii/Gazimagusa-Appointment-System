const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: [true, "Name is required."],
    },
    Surname: {
      type: String,
      required: [true, "Surname is required."],
    },
    Email: {
      type: String,
      required: [true, "Email is required."], // ID no yerine email ile giriş yapılacak
    },
    Password: {
      type: String,
      required: [true, "Password is required."],
    },
    DOB: {
      type: Date,
      required: [true, "Date of Birth is required."],
    },
    Address: {
      type: Array,
      required: [true, "Address is required."],
    },
    Phone: {
      type: Number,
      required: [true, "Phone number is required."],
    },
    userType: {
      type: String,
      required: [true, "User type is required."],
      default: "Patient",
      enum: ["Patient", "Doctor", "Admin"],
    },
    Profile: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png",
    },
    authAnswer: {
      type: String,
      required: [true, "Authentication answer is required."],
    },
  },
  { timestamps: true }
);

// JSON olarak döndürülürken sadece tarihi formatla
patientSchema.set("toJSON", {
  transform: (doc, ret) => {
    if (ret.DOB) {
      ret.DOB = ret.DOB.toISOString().split("T")[0]; // sadece tarih kısmı
    }
    return ret;
  },
});

module.exports = mongoose.model("patient-Data", patientSchema);
