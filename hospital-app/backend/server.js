const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// ✅ FIXED CORS (CRITICAL FOR YOUR ISSUE)
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("trust proxy", 1);

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/patients", require("./routes/patientRoutes"));
app.use("/api/doctors", require("./routes/doctorRoutes"));
app.use("/api/appointments", require("./routes/appointmentRoutes"));
app.use("/api/pharmacy", require("./routes/pharmacyRoutes"));
app.use("/api/profile", require("./routes/profileRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));

// Health check
app.get("/", (req, res) => {
  res.send("Hospital Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});