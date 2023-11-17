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
  const task = await Task.find({});
  return task;
};

exports.getUsersTask = async (assignedToFilter) => {
  const query = assignedToFilter ? { "assignedTo.$oid": assignedToFilter } : {};
  // Use the query to filter tasks
  const tasks = await Task.find(query);

  return tasks;
};
