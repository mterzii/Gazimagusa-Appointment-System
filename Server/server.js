const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/database");

dotenv.config();

const app = express();

// MongoDB bağlantısı
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.get("/", (req, res) => {
  res.status(200).send("<h1>Server çalışıyor 🚀</h1>");
});
app.use("/api/v1/test", require("./Routes/testRoutes"));
app.use("/api/v1/auth", require("./Routes/authRoutes"));
app.use("/api/v1/details", require("./Routes/detailsRoutes"));
app.use("/api/v1/update", require("./Routes/updateRoutes"));
app.use("/api/v1/policlinics", require("./Routes/policlinicRoutes"));

// Server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`✅ Server ${PORT} portunda çalışıyor`);
});
