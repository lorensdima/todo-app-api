const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
  group: String,
  assignedTo: mongoose.Schema.Types.ObjectId,
});

const Task = mongoose.model("Task", taskSchema, "tasks");

module.exports = Task;
