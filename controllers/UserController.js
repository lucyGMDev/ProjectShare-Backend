const User = require("../models/UserModel");

const addUser = function (req, res) {
  const user = new User();
  user.email = req.body.email;
  user.password = req.body.password;
  user.name = req.body.name;
  user.username = req.body.username;
  user.githubAddress = req.body.githubAddress;
  if (user.email === null) {
    return res.status(400).send({ message: "Email is required" });
  }
  User.findOne({ email: user.email }, (err, user) => {
    if (err) res.status(500).send({ message: "Internal Server Error" });
    if (user)
      return res
        .status(400)
        .send({ message: "There are another user with the same email" });
  });
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

const getUserById = function (req, res) {
  const userId = req.params.userId;
  User.findById(userId, function (err, user) {
    if (err) return res.status(500).send({ message: "Error getting user" });
    return res.status(200).send({ user });
  });
};

const deleteUser = function (req, res) {
  const userId = req.params.userId;
  User.findByIdAndDelete(userId, (err, userDeleted) => {
    if (err) {
      return res.status(500).send({ message: "Error while deleting user" });
    }
    return res.status(200).send({ user: userDeleted });
  });
};

const updateUser = async function (req, res) {
  const userId = req.params.userId;
  const user = req.body.user;

  if (user.username) {
    User.findOne({ username: user.username }, (err, user) => {
      if (user && userId != user._id) {
        return res
          .status(400)
          .send({ message: "There are another user with this username" });
      }
    });
  }
  try {
    const userUpdated = await User.findByIdAndUpdate(userId, user);
    if (!userUpdated) {
      return res.status(400).send("User doesn't exists");
    }
    return res.status(200).send(userUpdated);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
module.exports = {
  addUser,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
