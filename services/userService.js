// Define dito yung pagquery at manipulate ng data from db
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
  // Sample ng query sa mongodb ang .find()
  // Parang select * from...
  const user = await User.find({});
  return user;
};

// Other service functions...
exports.getUserData = async (usernameInput) => {
  const user = await User.findOne({ username: usernameInput });

  return user;
};
