// BUILD YOUR SERVER HERE
const express = require("express");
const server = express();

const UserModel = require("./users/model");

server.use(express.json({ strict: true }));

server.get("/api/users", (_req, res) => {
  UserModel.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(500).json({
        message: "The users information could not be retrieved",
      });
      console.log(err);
    });
});

module.exports = server;
