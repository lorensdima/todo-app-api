const mongoose = require("mongoose");
// Matic na authenticated para testing
exports.authenticate = (req, res, next) => {
  return next();
};
// Check lang kung connected sa db
exports.isConnectedToDatabase = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    res.status(500).send("Error connecting to database.");
  } else {
    next();
  }
};
