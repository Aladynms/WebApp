const mongoose = require("mongoose");

const StorySchema = new mongoose.Schema({
  name: String,
  description: String,
  priority: String,
  status: String,
  createdAt: String,
  projectId: String,
  ownerId: String,
});

module.exports = mongoose.model("Story", StorySchema);
