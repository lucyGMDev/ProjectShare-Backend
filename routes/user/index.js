"use strict";

const express = require("express");
const api = express.Router();
const ProjectController = require("../../controllers/UserController");

api.get("/", (req, res) => {
  ProjectController.getUsers(req, res);
});
api.post("/", (req, res) => {
  ProjectController.addUser(req, res);
});

module.exports = api;
