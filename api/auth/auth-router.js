const express = require("express");
const router = express.Router();
const User = require("../user/user-model");
const bcrypt = require("bcryptjs");
const mw = require("./auth-middleware");

router.post(
  "/register",
  mw.checkPayload,
  mw.checkUserIndb,
  async (req, res) => {
    try {
      const { username, password } = req.body;
      const hash = bcrypt.hashSync(password, 10);
      const newUser = await User.add({
        username: username,
        password: hash,
      });
      res.status(201).json(newUser);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
);

router.post("/login", (req, res) => {
  console.log("logging in");
});

router.get("/logout", (req, res) => {
  console.log("logout");
});

module.exports = router;
