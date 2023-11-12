// Dito na yung pagsetup ng API endpoints para sa API

const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

//router.get("/user/:id", authMiddleware.authenticate, userController.getUser);
// Eto sample, so access to using: http://localhost:3000/api/users
// yung "/api/" na part eh kasi dun sa app.js, dinefine natin yun na ganun yung link niya
router.get("/users", authMiddleware.authenticate, userController.getUser);

module.exports = router;
