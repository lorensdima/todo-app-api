const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middlewares/authMiddleware");

//router.get("/user/:id", authMiddleware.authenticate, userController.getUser);
// Eto sample, so access to using: http://localhost:3000/api/users
// yung "/api/" na part eh kasi dun sa app.js, dinefine natin yun na ganun yung link niya
router.post("/task-c", authMiddleware.authenticate, taskController.createUser);
router.get("/tasks", authMiddleware.authenticate, taskController.getAllTasks);

module.exports = router;
