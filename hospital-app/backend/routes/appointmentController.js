const express = require("express");
const router = express.Router();

const {
  getAppointments,
  addAppointment,
  deleteAppointment,
} = require("../controllers/appointmentController");

router.get("/", getAppointments);
router.post("/", addAppointment);
router.delete("/:id", deleteAppointment);

module.exports = router;
