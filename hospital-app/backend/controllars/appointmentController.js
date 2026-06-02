const db = require("../config/db");

// GET ALL APPOINTMENTS
exports.getAppointments = (req, res) => {
  db.query(
    "SELECT * FROM appointments ORDER BY id DESC",
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};

// ADD APPOINTMENT
exports.addAppointment = (req, res) => {
  const { name, doctor, date, time } = req.body;

  const sql =
    "INSERT INTO appointments (name, doctor, date, time) VALUES (?, ?, ?, ?)";

  db.query(sql, [name, doctor, date, time], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    res.json({
      message: "Appointment Booked",
      id: result.insertId,
    });
  });
};

// DELETE APPOINTMENT
exports.deleteAppointment = (req, res) => {
  db.query(
    "DELETE FROM appointments WHERE id=?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({ message: "Appointment Deleted" });
    }
  );
};
