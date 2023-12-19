const Task = require("../models/taskModel");
const { ObjectId } = require("mongoose").Types;

exports.createTask = async (
  title,
  description,
  status,
  group,
  assignedTo,
  collaborators,
  dueDate,
  modifiedBy
) => {
  const finalDueDate = new Date(dueDate);
  const task = new Task({
    title,
    description,
    status,
    group,
    assignedTo,
    collaborators,
    finalDueDate,
    modifiedBy,
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
    modified: new Date(),
    modifiedBy: updatedData.modifiedBy,
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

exports.deleteTask = async (taskId) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (deletedTask) {
      console.log("Task deleted successfully:", deletedTask);
    } else {
      console.log("Task not found");
    }
  } catch (error) {
    console.error("Error deleting task:", error.message);
  }
};

exports.getTasksAndCountForUser = async (assignedToFilter) => {
  try {
    const query = assignedToFilter
      ? { assignedTo: new ObjectId(assignedToFilter) }
      : {};

    // Use the query to filter tasks
    const tasks = await Task.find(query);

    // Count the number of tasks for the user
    const taskCount = tasks.length;

    return { tasks, taskCount };
  } catch (error) {
    console.error("Error retrieving tasks:", error.message);
    return { error: "Error retrieving tasks", tasks: [], taskCount: 0 };
  }
};
