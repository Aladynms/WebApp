const express = require("express");
const router = express.Router();
const Story = require("../models/Story");

router.get("/project/:projectId", async (req, res) => {
  const stories = await Story.find({ projectId: req.params.projectId });
  res.json(stories);
});

router.get("/:id", async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ error: "Story not found" });
    }
    res.json(story);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/", async (req, res) => {
  const story = new Story({ ...req.body, createdAt: new Date().toISOString() });
  await story.save();
  res.status(201).json(story);
});

router.put("/:id", async (req, res) => {
  const updated = await Story.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete("/:id", async (req, res) => {
  await Story.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;
