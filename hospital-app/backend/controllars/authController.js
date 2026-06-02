const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  // demo check (replace with DB user table)
  if (email !== "admin@hospital.com" || password !== "1234") {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { email },
    "SECRET_KEY",
    { expiresIn: "1d" }
  );

  res.json({ token });
};
