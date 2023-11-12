// Define dito yung pagquery at manipulate ng data from db
const User = require("../models/userModel");

/*
// Service for getting using ID. DOES NOT WORK
exports.getUserById = async (userId) => {
  // Your business logic to fetch a user by ID
  const user = await User.find();
  return user;
};
*/

exports.getUsers = async () => {
  // Sample ng query sa mongodb ang .find()
  // Parang select * from...
  const user = await User.find({});
  return user;
};

// Other service functions...
