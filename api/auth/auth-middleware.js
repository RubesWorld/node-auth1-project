const auth = require("./auth-router");
const User = require("../user/user-model");

const checkPayload = (req, res, next) => {
  const { password, username } = req.body;
  !password || !username
    ? res.status(401).json("Must have both username and password")
    : next();
};

const checkUserIndb = async (req, res, next) => {
  try {
    const { username } = req.body;
    const rows = await User.findBy({ username: username });
    !rows.length ? next() : res.status(401).json("Username already exists");
  } catch (e) {
    res.status(500).json(`Server error: ${e}`);
  }
};

const checkUserExists = async (req, res, next) => {
  try {
    const { username } = req.body;
    const rows = await User.findBy({ username: username });
    if (rows.length) {
      req.userData = rows[0];
      next();
    } else {
      res.status(401).json("Not inside the db, please check");
    }
  } catch (e) {
    res.status(500).json(`Server error: ${e}`);
  }
};

module.exports = {
  checkPayload,
  checkUserIndb,
  checkUserExists,
};
