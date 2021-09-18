"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {type: String, lowercase:true},
  password: {type: String,select: false},
  name: String,
  githubAddress: String
});

module.exports = mongoose.model("User", UserSchema);
