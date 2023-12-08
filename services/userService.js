const User = require("../models/userModel");

exports.createUser = async (username, name, password, email) => {
  const user = new User({
    username,
    name,
    password,
    email,
  });

  await user.save();

  return user;
};

exports.getUsers = async () => {
  const user = await User.find({});
  return user;
};

// Other service functions...
exports.getUserData = async (usernameInput) => {
  const user = await User.find({ username: usernameInput });

  return user;
};
