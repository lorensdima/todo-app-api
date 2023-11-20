// Define dito yung pagquery at manipulate ng data from db
const User = require("../models/userModel");

exports.createUser = async (name, password, email) => {
  const user = new User({
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
exports.getUserData = async (inputString) => {
  const user = new User({
    inputValue: inputString,
  });

  await user.save();

  return user;
};