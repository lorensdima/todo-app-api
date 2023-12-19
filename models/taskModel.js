const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
  group: String,
  assignedTo: mongoose.Schema.Types.ObjectId,
  collaborators: {
    type: [mongoose.Schema.Types.ObjectId], // This defines an array of strings
    default: [],
  },
  dueDate: Date,
  created: {
    type: Date,
    default: Date.now,
  },
  modified: {
    type: Date,
    default: Date.now,
  },
  modifiedBy: String,
});

const Task = mongoose.model("Task", taskSchema, "tasks");

module.exports = Task;
