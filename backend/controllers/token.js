const jwt = require("jsonwebtoken");
const User = require('../models/user')
const VerifyToken = async (req, res) => {
  const header = req.headers["authorization"];
  if (!header) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  const token = header.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const isValid = await jwt.verify(token, process.env.SECRET_KEY);

    return res.status(200).json({ msg: "Token is valid", valid: true, });
  } catch (error) {
    return res.status(401).json({ msg: "Token is invalid", valid: false });
  }
};

module.exports = { VerifyToken };
