const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const GetByUsername = async (req, res) => {
  // const header = req.headers["authorization"];
  //const token = header.split(' ')[1];
  // if (!token){
  //   return res.status(400).json({msg: 'No token, authorization denied'})
  //}
  const { username } = req.params;
  // const verify = await jwt.decode(token, process.env.SECRET_KEY)
  const user = await User.findOne({ username });

  if (!user) return res.status(400).json({ msg: "User not found" });
  try {
    res.status(200).json({ data: user });
  } catch (err) {
    console.log(err);
  }
};

const getUser = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(400).json({ msg: "No token, authorization denied" });
  }
  const verify = await jwt.decode(token, process.env.SECRET_KEY);
  if (!verify) {
    return res.status(400).json({ msg: "Token is not valid" });
  }
  const user = await User.findOne({ _id: verify._id });
  if (!user) return res.status(400).json({ msg: "User not found" });
  try {
    res.status(200).json({ data: user });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { GetByUsername, getUser };
