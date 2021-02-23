const express = require("express");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);

const authRouter = require("../api/auth/auth-router");
const userRouter = require("./user/user-router");

const server = express();

const config = {
  name: "sessionId",
  secret: "keep it secret, keep it safe",
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false,
    httpOnly: true,
  },
  resave: false,
  saveUnitialized: false,

  //* this adds new feature of storing.Creates a table in the database of the sessions. Can test by logging in and restarting the server.
  store: new KnexSessionStore({
    knex: require("../data/dbconfig.js"),
    tablename: "sessions",
    sidfieldname: "sid",
    createTable: true,
    clearInterval: 1000 * 60 * 60,
  }),
};

server.use(session(config));
server.use(express.json());

server.use("/api/auth", authRouter);
server.use("/api/users", userRouter);

server.get("/", (req, res) => {
  res.json({ api: "ALIVE" });
});

module.exports = server;
