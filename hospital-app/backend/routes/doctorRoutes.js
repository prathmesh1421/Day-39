const express = require("express");

const router = express.Router();

let doctors = [
  {
    id: 1,
    name: "Dr. Sharma",
    specialization: "Cardiologist",
    experience: 8,
  },

  {
    id: 2,
    name: "Dr. Mehta",
    specialization: "Neurologist",
    experience: 10,
  },
];


// GET ALL DOCTORS
router.get("/", (req, res) => {
  res.json(doctors);
});


// ADD DOCTOR
router.post("/", (req, res) => {

  const newDoctor = {
    id: Date.now(),
    ...req.body,
  };

  doctors.push(newDoctor);

  res.status(201).json({
    message: "Doctor Added Successfully",
    doctor: newDoctor,
  });
});


// UPDATE DOCTOR
router.put("/:id", (req, res) => {

  const id = parseInt(req.params.id);

  doctors = doctors.map((doctor) =>
    doctor.id === id
      ? { ...doctor, ...req.body }
      : doctor
  );

  res.json({
    message: "Doctor Updated Successfully",
  });
});


// DELETE DOCTOR
router.delete("/:id", (req, res) => {

  const id = parseInt(req.params.id);

  doctors = doctors.filter(
    (doctor) => doctor.id !== id
  );

  res.json({
    message: "Doctor Deleted Successfully",
  });
});

module.exports = router;
