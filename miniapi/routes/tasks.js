const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

router.get("/story/:storyId", async (req, res) => {
  const tasks = await Task.find({ storyId: req.params.storyId });
  res.json(tasks);
});

router.post("/", async (req, res) => {
  const task = new Task({ ...req.body, createdAt: new Date().toISOString() });
  await task.save();
  res.status(201).json(task);
});

router.put("/:id", async (req, res) => {
  const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete("/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;
