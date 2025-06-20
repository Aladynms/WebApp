const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  login: String,
  password: String,
  firstName: String,
  lastName: String,
  role: { type: String, enum: ["admin", "developer", "devops"] },
  activeProjectId: { type: String, default: null },
  theme: { type: String, enum: ["light", "dark", "auto"], default: "auto" },
});

module.exports = mongoose.model("User", userSchema);
