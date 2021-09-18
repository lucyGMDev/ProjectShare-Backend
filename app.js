'use strict';

const express = require('express');
const app = express();
const userRoutes = require("./routes/user");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/user", userRoutes);


module.exports = app;

