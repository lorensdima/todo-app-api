const taskService = require("../services/taskService");

exports.createUser = async (req, res) => {
  try {
    const { title, description, status, group, assignedTo } = req.body;

    const task = await taskService.createTask(
      title,
      description,
      status,
      group,
      assignedTo
    );

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
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

