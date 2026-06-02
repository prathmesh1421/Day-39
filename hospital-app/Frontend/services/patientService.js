import cors from "cors";
import express from "express";

const app = express();

app.use(cors());
app.use(express.json()); // VERY IMPORTANT

let patients = [];

// GET
app.get("/api/patients", (req, res) => {
  res.json(patients);
});

// POST (THIS IS REQUIRED)
app.post("/api/patients", (req, res) => {
  const { name, age, disease } = req.body;

  console.log("BODY RECEIVED:", req.body);

  const newPatient = {
    id: Date.now(),
    name,
    age,
    disease,
  };

  patients.push(newPatient);

  res.json(newPatient);
});

app.listen(5000, "0.0.0.0", () => {
  console.log("Server running on port 5000");
});
