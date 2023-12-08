const Task = require("../models/taskModel");
const { ObjectId } = require("mongoose").Types;

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
  const query = assignedToFilter
    ? {
        $or: [
          { assignedTo: new ObjectId(assignedToFilter) },
          { collaborators: new ObjectId(assignedToFilter) },
        ],
      }
    : {};

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
    group: updatedData.group,
    assignedTo: new ObjectId(updatedData.assignedTo),
  };

  try {
    const result = await Task.findOneAndUpdate(filter, update, { new: true });

    if (result) {
      return { status: "Document updated successfully", updatedTask: result };
    } else {
      return { status: "Document not found" };
    }
  } catch (err) {
    console.error(err);
    return { status: "Document update failed", error: err.message };
  }
};
