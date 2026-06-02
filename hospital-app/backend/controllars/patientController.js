const db = require("../config/db");

// GET ALL
exports.getPatients = (req, res) => {
  db.query("SELECT * FROM patients", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

// GET ONE
exports.getPatientById = (req, res) => {
  db.query(
    "SELECT * FROM patients WHERE id=?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result[0]);
    }
  );
};

// ADD
exports.addPatient = (req, res) => {
  console.log("BODY:", req.body);

  const { name, age, disease } = req.body;

  // ✅ VALIDATION (VERY IMPORTANT)
  if (!name || !age || !disease) {
    return res.status(400).json({
      success: false,
      message: "Name, age, disease are required",
    });
  }

  db.query(
    "INSERT INTO patients(name, age, disease) VALUES(?,?,?)",
    [name, age, disease],
    (err, result) => {
      if (err) {
        console.log("INSERT ERROR:", err);
        return res.status(500).json(err);
      }

      console.log("Inserted ID:", result.insertId);

      res.json({
        success: true,
        message: "Patient added successfully",
        id: result.insertId,
      });
    }
  );
};
