const express = require("express");
const app = express();
const morgan = require("morgan");
const dotenv = require("dotenv")
// var routes = require("./routes/dosyaadi")
const cors = require("cors");
const connectDB = require("./config/database");

dotenv.config();




//DB Connection
connectDB();


//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


//route
app.get("/", (req, res) => {
    return res.status(200).send("<h1>asadasd</h1>")
})
app.use("/api/v1/test", require("./Routes/testRoutes"));//silinecekkkkk
app.use("/api/v1/auth", require("./Routes/authRoutes"));
app.use("/api/v1/details", require("./Routes/detailsRoutes"));
app.use("/api/v1/update", require("./Routes/updateRoutes"));
app.use("/api/v1/policlinics", require("./Routes/policlinicRoutes"));
app.use("/api/v1/prescription", require("./Routes/prescriptionRoutes"));

//PORT and listen
const PORT = 7000;
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})

