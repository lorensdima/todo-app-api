const mongoose = require("mongoose");
// Matic na authenticated para testing
exports.authenticate = (req, res, next) => {
  return next();
};
// Check lang kung connected sa db
exports.isConnectedToDatabase = (req, res, next) => {
  // Check the `readyState` property of the `mongoose.connection` object.
  if (mongoose.connection.readyState !== 1) {
    // You are not connected to the database.
    res.status(500).send("Error connecting to database.");
  } else {
    // You are connected to the database.
    next();
  }
};
