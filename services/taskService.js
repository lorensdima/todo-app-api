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

exports.updateTask = async (taskID, updatedData) => {
  const filter = { _id: taskID };
  const update = {
    title: updatedData.title,
    description: updatedData.description,
    status: updatedData.status,
    assignedTo: updatedData.assignedTo,
    group: updatedData.group,
  };
  Task.updateOne(filter, update)
    .then((result) => {
      console.log("Task Update Successful");
    })
    .catch((err) => {
      return err;
    });
  return { status: "Document updated successfully" };
};

exports.deleteTask = async (taskId) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (deletedTask) {
      console.log('Task deleted successfully:', deletedTask);
    } else {
      console.log('Task not found');
    }
  } catch (error) {
    console.error('Error deleting task:', error.message);
  }
};