const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {

  res.json([
    {
      id: 1,
      medicine: "Paracetamol",
      price: 50,
      stock: 100,
    },

    {
      id: 2,
      medicine: "Insulin",
      price: 500,
      stock: 20,
    },
  ]);

});

module.exports = router;