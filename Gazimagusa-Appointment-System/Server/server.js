const express = require("express");
const app = express();
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/database");

dotenv.config();
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// ANAHTAR: BİR ÜST KLASÖRE ÇIK → KÖK DİZİN (frontend burada!)
app.use(express.static(path.join(__dirname, "..")));

// API ROUTELARI (hepsi /api ile başladığı için çakışma olmaz)
app.use("/api/v1/test", require("./Routes/testRoutes"));
app.use("/api/v1/auth", require("./Routes/authRoutes"));
app.use("/api/v1/details", require("./Routes/detailsRoutes"));
app.use("/api/v1/update", require("./Routes/updateRoutes"));
app.use("/api/v1/policlinics", require("./Routes/policlinicRoutes"));
app.use("/api/v1/prescription", require("./Routes/prescriptionRoutes"));

// TÜM DİĞER İSTEKLERİ KÖKTEKİ index.html'E YÖNLENDİR
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "index.html"));
});

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`Server ${PORT} portunda çalışıyor`);
});