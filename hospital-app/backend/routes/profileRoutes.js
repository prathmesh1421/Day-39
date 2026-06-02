const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {

  res.json({
    name: "Admin",
    email: "admin@hospital.com",
    role: "Administrator",
  });

});

module.exports = router;