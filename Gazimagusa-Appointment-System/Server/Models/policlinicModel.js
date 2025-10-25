const mongoose = require("mongoose");

const policlinicSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: [true, "Name is required."],
    },
    // Doctor:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "doctor-Data",
    //     required: [true, "Doctor is required."]
    // },
    Address: {
      type: Array,
      required: [true, "Address is required."],
    },
    Phone: {
      type: Number,
      required: [true, "Phone number is required."],
    },
    Profile: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png",
    },
  },
  { timestamps: true } //mongodb sütun ekler
);

module.exports = mongoose.model("policlinic-Data", policlinicSchema); //"User" mongodb otomatik olarak "users" olarak algılıyo ve o isimde bir koleksiyon oluşturur. "policlinic-datas" isimli koleksiyon istediğimiz için ayırdık
