const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/task-c", authMiddleware.authenticate, taskController.createTask);
router.post("/task-u", authMiddleware.authenticate, taskController.updateTask);
router.get("/tasks", authMiddleware.authenticate, taskController.getAllTasks);
router.get("/tasks/:assignedTo", taskController.getUsersTask);

module.exports = router;
