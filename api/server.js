// BUILD YOUR SERVER HERE
const express = require("express");
const server = express();

const UserModel = require("./users/model");

server.use(express.json({ strict: true }));

server.post("/api/users", async (req, res) => {
  const { name, bio } = req.body;
  if (!name || !bio) {
    res.status(400).json({
      message: "Please provide name and bio for the user",
    });
  } else {
    UserModel.insert({ name, bio })
      .then((newUser) => res.status(201).json(newUser))
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: "There was an error while saving the user to the database",
        });
      });
  }
});

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
