const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const Register = async (req, res) => {
  const { firstName, lastName, email, password, username, avatar } = req.body;

  if (!firstName || !lastName) {
    return res
      .status(400)
      .json({ msg: "First name and last name are required" });
  }
  if (!email || !password) {
    return res.status(400).json({ msg: "Email and password are required" });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "Email already exists" });
    }
    const user = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      username: username,
      password: password,
      avatar,
    });
    const token = await user.CreateJWT();
    return res.status(200).json({ msg: token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server Error" });
  }
};

const Login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "Email and password are required" });
  }
  const user = await User.findOne({ email: email});
  if (!user) {
    return res.status(400).json({ msg: "User not found" });
  }
  if (!password){
    return res.status(400).json({ msg: "Password undefined" });
  }
    if (password && user.password){
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ msg: "Incorrect password" });
    }
  }
  try {
    const token = await user.CreateJWT();
    res.cookie("tokens", token, { httpOnly: true });
    return res.status(200).json({ message: token });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Server Error", error: "Failed to login" });
  }
};

const Logout = async(req, res) => {
 await res.clearCookie("token");
  return res.redirect('/login')
};

module.exports = { Register, Logout, Login };
