const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {

  res.json({
    totalPatients: 124,
    totalDoctors: 18,
    totalAppointments: 42,
    totalMedicines: 85,
  });

});

module.exports = router;
