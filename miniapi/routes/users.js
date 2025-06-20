const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { authenticate } = require("../middleware/auth");

// 📥 GET wszyscy użytkownicy (bez hasła)
router.get("/", async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

// ⚙️ GET ustawienia użytkownika (motyw + projekt)
router.get("/settings", authenticate, async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  res.json({
    activeProjectId: user.activeProjectId,
    theme: user.theme,
  });
});

// ♻️ POST aktualizacja ustawień
router.post("/settings", authenticate, async (req, res) => {
  const { activeProjectId, theme } = req.body;
  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  if (typeof activeProjectId !== "undefined") {
    user.activeProjectId = activeProjectId;
  }

  if (typeof theme !== "undefined") {
    user.theme = theme;
  }

  await user.save();
  res.json({ message: "Settings updated" });
});

module.exports = router;
