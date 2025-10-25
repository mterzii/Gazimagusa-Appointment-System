const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
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
      required: [true, "Email is required."], //ID no yerine email ile giriş yapılacak
    },
    Password: {
      type: String,
      required: [true, "Password is required."],
    },
    Department:{
        type:String,
        required:[true, "Department is required"],
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
      required: [true, " User type is required."], //! olmalı mı?????????????????????????????????
      default: "Admin",
      enum: ["Patient", "Doctor", "Admin"],
    },
    Profile: {
      type: String,
      default:
        "https://cdn-icons-png.flaticon.com/512/78/78948.png",
    },
    authAnswer: {
      type: String,
      required: [true, "Authentication answer is required."],
    },
  },
  { timestamps: true } //mongodb sütun ekler
);

module.exports = mongoose.model("admin-Data", adminSchema); //"User" mongodb otomatik olarak "users" olarak algılıyo ve o isimde bir koleksiyon oluşturur. "admin-datas" isimli koleksiyon istediğimiz için ayırdık
