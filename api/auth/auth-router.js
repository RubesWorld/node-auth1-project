const express = require("express");
const router = express.Router();
const User = require("../user/user-model");
const bcrypt = require("bcryptjs");

router.post("/register", (req, res) => {
  console.log("registering");
});

router.post("/login", (req, res) => {
  console.log("logging in");
});

router.get("/logout", (req, res) => {
  console.log("logout");
});

module.exports = router;
