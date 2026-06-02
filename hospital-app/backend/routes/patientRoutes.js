const express = require("express");
const router = express.Router();

const patientController = require("../controllers/patientController");

console.log(patientController);

router.get("/", patientController.getPatients);
router.get("/:id", patientController.getPatientById);
router.post("/", patientController.addPatient);
router.delete("/:id", patientController.deletePatient);

module.exports = router;