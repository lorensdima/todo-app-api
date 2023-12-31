const taskService = require("../services/taskService");

exports.createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      status,
      group,
      assignedTo,
      collaborators,
      dueDate,
      modifiedBy,
    } = req.body;

    const task = await taskService.createTask(
      title,
      description,
      status,
      group,
      assignedTo,
      collaborators,
      dueDate,
      modifiedBy
    );

    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const {
      _id,
      title,
      description,
      status,
      group,
      assignedTo,
      dueDate,
      modifiedBy,
    } = req.body;

    const tempJSON = {
      title: title,
      description: description,
      status: status,
      group: group,
      assignedTo: assignedTo,
      dueDate: dueDate,
      modifiedBy: modifiedBy,
    };

    const task = await taskService.updateTask(_id, tempJSON);
    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const task = await taskService.getAllTasks();
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller function to handle GET requests with assignedTo parameter
exports.getUsersTask = async (req, res) => {
  try {
    const assignedToFilter = req.params.assignedTo; // Assuming the parameter is part of the URL path

    const tasks = await taskService.getUsersTask(assignedToFilter);

    res.status(200).json({ tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller function to handle DELETE request for a task by ID
exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.taskId; // Assuming the parameter is part of the URL path

    await taskService.deleteTask(taskId);

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getTasksAndCountForUser = async (req, res) => {
  try {
    const assignedToFilter = req.params.assignedTo; // Assuming the parameter is part of the URL path

    const { tasks, taskCount } = await taskService.getTasksAndCountForUser(
      assignedToFilter
    );

    res.status(200).json({ tasks, taskCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
