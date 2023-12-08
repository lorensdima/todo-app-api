const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/user-c", authMiddleware.authenticate, userController.createUser);
router.get("/users", authMiddleware.authenticate, userController.getUser);
router.get("/get-user/:username", userController.getUserData);
router.post("/authorize", userController.authorize)

module.exports = router;
