const express = require("express");
const router = express.Router();
const User = require("../user/user-model");
const bcrypt = require("bcryptjs");
const mw = require("./auth-middleware");
const e = require("express");

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

router.post("/login", mw.checkPayload, mw.checkUserExists, async (req, res) => {
  try {
    const verified = bcrypt.compareSync(
      req.body.password,
      req.userData.password
    );
    if (verified) {
      req.session.user = req.userData;
      res.json(`Welcome back ${req.userData.username}`);
    } else {
      res.status(401).json({ message: "There is an error. Try again" });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.json("can't log out");
      } else {
        res.json("logged out");
      }
    });
  } else {
    res.json("no session");
  }
});

module.exports = router;
