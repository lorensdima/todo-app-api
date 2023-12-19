const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/users", authMiddleware.authenticate, userController.getUser);
router.get("/get-user/:username", userController.getUserData);
router.post("/register", userController.createUser);
router.post("/login", userController.login);

module.exports = router;
