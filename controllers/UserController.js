const User = require("../models/UserModel");

const addUser = function (req, res) {
  const user = new User();
  user.email = req.body.email;
  user.password = req.body.password;
  user.name = req.body.name;
  user.githubAddress = req.body.githubAddress;

  user.save((err, userStored) => {
    if (err) {
      res.status(500).send({ message: "Error saving user" });
    }
    res.status(200).send({ user: userStored });
  });
};

const getUsers = function (req, res) {  
  User.find({}, (err, users) => {
    if (err) {
      res.status(500).send({ message: "Error getting users" });
    }
    res.status(200).send({ users });
  });
};

module.exports = {
  addUser,
  getUsers,
};
