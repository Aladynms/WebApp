const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: String,
  description: String,
  priority: String,
  status: String,
  estimatedHours: String,
  createdAt: String,
  startDate: String,
  endDate: String,
  storyId: String,
  assigneeId: String,
});

module.exports = mongoose.model("Task", TaskSchema);
