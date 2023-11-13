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
