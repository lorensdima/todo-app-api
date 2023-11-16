const Task = require("../models/taskModel");

exports.createTask = async (title, description, status, group, assignedTo) => {
  const task = new Task({
    title,
    description,
    status,
    group,
    assignedTo,
  });

  await task.save();

  return task;
};

exports.getAllTasks = async () => {
  // Sample ng query sa mongodb ang .find()
  // Parang select * from...
  const task = await Task.find({});
  return task;
};

exports.getUsersTask = async (assignedToFilter) => {
  // Create a query object with the provided filter
  // ano yung mga filter na ilalagay sa {}...
  const query = assignedToFilter ? { assignedTo: assignedToFilter } : {};

  // Use the query to filter tasks
  const tasks = await Task.find(query);

  return tasks;
}
