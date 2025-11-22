const express = require("express");
const app = express();
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/database");

dotenv.config();
<<<<<<< HEAD

// DB Connection
connectDB();

// Middlewares
=======
connectDB();

// Middleware
>>>>>>> 7b3a0b3e41d5f03eb64d3e0e6406268789185d8e
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

<<<<<<< HEAD
// 🔥 FRONTEND PATH
// Server klasöründen bir üst klasör (Gazimagusa-Appointment-System)
// onun içinde Client klasörü var
const clientPath = path.join(__dirname, "..", "Client");

// Tüm statik dosyaları (css/js/images) serve et
app.use(express.static(clientPath));

// API ROUTELARI
app.use("/api/v1/test", require("./Routes/testRoutes")); // silinecekse sonra silersin
=======
// ANAHTAR: BİR ÜST KLASÖRE ÇIK → KÖK DİZİN (frontend burada!)
app.use(express.static(path.join(__dirname, "..")));

// API ROUTELARI (hepsi /api ile başladığı için çakışma olmaz)
app.use("/api/v1/test", require("./Routes/testRoutes"));
>>>>>>> 7b3a0b3e41d5f03eb64d3e0e6406268789185d8e
app.use("/api/v1/auth", require("./Routes/authRoutes"));
app.use("/api/v1/details", require("./Routes/detailsRoutes"));
app.use("/api/v1/update", require("./Routes/updateRoutes"));
app.use("/api/v1/policlinics", require("./Routes/policlinicRoutes"));
app.use("/api/v1/prescription", require("./Routes/prescriptionRoutes"));

<<<<<<< HEAD
// 🔥 TÜM DİĞER İSTEKLERDE FRONTEND'İN ANA HTML'İNİ GÖNDER
// Eğer index.html "Client/Home/index.html" içindeyse:
app.get("*", (req, res) => {
    res.sendFile(path.join(clientPath, "Home", "index.html"));
});

// PORT
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
=======
// TÜM DİĞER İSTEKLERİ KÖKTEKİ index.html'E YÖNLENDİR
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "index.html"));
});

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`Server ${PORT} portunda çalışıyor`);
});
>>>>>>> 7b3a0b3e41d5f03eb64d3e0e6406268789185d8e
