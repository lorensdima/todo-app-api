const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/task-c", authMiddleware.authenticate, taskController.createUser);
router.get("/tasks", authMiddleware.authenticate, taskController.getAllTasks);
// Define route for GET requests with assignedTo parameter
router.get('/tasks/:assignedTo', taskController.getUsersTask);

module.exports = router;
