const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
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
        required:[true, "Department is required"], //poliklinik
    },
    DOB:{
        type:Date,
        required:[true, "Date of Birth is required"]
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
      default: "Doctor",
      enum: ["Patient", "Doctor", "Admin"],
    },
    Profile: {
      type: String,
      default:
        "https://t4.ftcdn.net/jpg/02/29/53/11/360_F_229531197_jmFcViuzXaYOQdoOK1qyg7uIGdnuKhpt.jpg",
    },
    authAnswer: {
      type: String,
      required: [true, "Authentication answer is required."],
    },
  },
  { timestamps: true } //mongodb sütun ekler
);
// JSON olarak döndürülürken sadece tarihi formatla
doctorSchema.set("toJSON", {
  transform: (doc, ret) => {
    if (ret.DOB) {
      ret.DOB = ret.DOB.toISOString().split("T")[0]; // sadece tarih kısmı
    }
    return ret;
  },
});
module.exports = mongoose.model("doctor-Data", doctorSchema); //"User" mongodb otomatik olarak "users" olarak algılıyo ve o isimde bir koleksiyon oluşturur. "doctor-datas" isimli koleksiyon istediğimiz için ayırdık
