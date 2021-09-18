"use strict";

require("dotenv").config();
const app = require("./app");
const mongoose = require("mongoose");
const { port,mongodbAddress } = require("./config");

mongoose
  .connect(mongodbAddress)
  .then(() => {
    console.log("Conexión a la base de datos, establecida");
    app.listen(port, () => {
      console.log("Starting Server on port:" + port);
    });
  })
  .catch(() => {
    console.log("Error loading database");
  });
