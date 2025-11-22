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

// TÜM STATİK DOSYALARI (HTML, CSS, JS, RESİM) BURADAN SERVİS ET
app.use(express.static(__dirname));

// API ROUTELARI
app.use("/api/v1/test", require("./Routes/testRoutes"));
app.use("/api/v1/auth", require("./Routes/authRoutes"));
app.use("/api/v1/details", require("./Routes/detailsRoutes"));
app.use("/api/v1/update", require("./Routes/updateRoutes"));
app.use("/api/v1/policlinics", require("./Routes/policlinicRoutes"));
app.use("/api/v1/prescription", require("./Routes/prescriptionRoutes"));

// TÜM GERİ KALAN İSTEKLERİ index.html'E YÖNLENDİR (ÇOK ÖNEMLİ!)
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`Server ${PORT} portunda çalışıyor`);
});