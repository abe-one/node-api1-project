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
      console.log(err);
      res.status(500).json({
        message: "The users information could not be retrieved",
      });
    });
});

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  UserModel.findById(id)
    .then((user) => {
      if (!user) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist" });
      } else {
        res.status(200).json(user);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "The user information could not be retrieved",
      });
    });
});

server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  UserModel.remove(id)
    .then((user) => {
      !user
        ? res.status(404).json({ message: "The user could not be removed" })
        : res.status(200).json(`User ${user.id} was successfully deleted`);
    })
    .catch(() => {
      res.status(500).json({
        message: "The user could not be removed",
      });
    });
});

server.put("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, bio } = req.body;
    if (!name || !bio) {
      res
        .status(400)
        .json({ message: "Please provide the name and bio for the user" });
    } else {
      const updatedUser = await UserModel.update(id, req.body);
      !updatedUser
        ? res.status(404).json({
            message: "The user with the specified ID does not exist",
          })
        : res.status(201).json({ message: "User successfully updated." });
    }
  } catch {
    res
      .status(500)
      .json({ message: "The user information could not be modified" });
  }
});

module.exports = server;
