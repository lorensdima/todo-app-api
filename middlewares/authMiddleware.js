const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

exports.authenticate = (req, res, next) => {
  const tokenInput = req.session.token || req.header("Authorization");

  const temp = tokenInput.split(" ");
  var token;
  if (temp[0] == "Bearer") {
    token = String(temp[1].slice(1, -1));
  } else {
    token = temp.join(" ");
  }
  if (req.isAuthenticated() || jwt.verify(token, "jwt-secret")) {
    return next();
  } else {
    res.status(401).json({
      isAuthenticated: false,
      message: "Authorization Failed. Please Login.",
    });
  }
};
// Check lang kung connected sa db
exports.isConnectedToDatabase = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    res.status(500).send("Error connecting to database.");
  } else {
    next();
  }
};

exports.authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.sendStatus(401); // Unauthorized
  }
  jwt.verify(
    token.split(" ")[1].replace(/"/g, ""),
    "jwt-secret",
    (err, user) => {
      if (err) {
        return res.sendStatus(403); // Forbidden
      }
      req.user = user;
      next();
    }
  );
};
