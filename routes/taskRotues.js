const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/task-c", authMiddleware.authenticate, taskController.createUser);
router.get("/tasks", authMiddleware.authenticate, taskController.getAllTasks);

module.exports = router;
