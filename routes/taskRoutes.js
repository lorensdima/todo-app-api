const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/task-c", authMiddleware.authenticate, taskController.createTask);
router.post("/task-u", authMiddleware.authenticate, taskController.updateTask);
router.post("/task-d", authMiddleware.authenticate, taskController.deleteTask);
router.get("/tasks", authMiddleware.authenticate, taskController.getAllTasks);
router.get("/tasks/:assignedTo", taskController.getUsersTask);
router.get("/tasks/:assignedTo", authMiddleware.authenticate, taskController.getTasksAndCountForUser);

module.exports = router;
