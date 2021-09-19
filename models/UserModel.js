"use strict";
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, lowercase: true, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  name: String,
  githubAddress: String,
});
UserSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return next();
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next();
      user.password = hash;
      next();
    });
  });
});
module.exports = mongoose.model("User", UserSchema);
