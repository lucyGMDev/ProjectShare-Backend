"use strict";

const express = require("express");
const api = express.Router();
const ProjectController = require("../../controllers/UserController");

api.get("/", (req, res) => {
  ProjectController.getUsers(req, res);
});
api.get("/:userId", (req, res) => {
  ProjectController.getUserById(req, res);
});
api.post("/", (req, res) => {
  ProjectController.addUser(req, res);
});
api.delete("/:userId", (req, res) => {
  ProjectController.deleteUser(req, res);
});
api.put("/:userId", (req, res) => {
  ProjectController.updateUser(req, res);
});

module.exports = api;
