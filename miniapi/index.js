const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./models/User");
const { generateToken } = require("./middleware/auth");

mongoose.connect("mongodb://localhost:27017/managme");

mongoose.connection.once("open", () => {
  console.log("✅ Połączono z MongoDB");
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 📦 Import tras
const usersRouter = require("./routes/users");
const projectsRouter = require("./routes/projects");
const storiesRouter = require("./routes/stories");
const tasksRouter = require("./routes/tasks");

// 📌 REST API
app.use("/api/users", usersRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/stories", storiesRouter);
app.use("/api/tasks", tasksRouter);

// 🔐 Login endpoint
app.post("/auth/login", async (req, res) => {
  const { login, password } = req.body;
  const user = await User.findOne({ login, password });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const tokens = generateToken(user);
  res.json(tokens);
});

// 🔄 Refresh token
app.post("/auth/refresh", async (req, res) => {
  const { refreshToken } = req.body;
  const { SECRET } = require("./middleware/auth");

  try {
    const payload = require("jsonwebtoken").verify(refreshToken, SECRET);
    const user = await User.findById(payload.id);
    if (!user) throw new Error();
    res.json(generateToken(user));
  } catch {
    res.status(401).json({ message: "Invalid refresh token" });
  }
});

// 👤 Get current user
app.get("/auth/me", async (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: "Missing token" });

  try {
    const token = auth.split(" ")[1];
    const { SECRET } = require("./middleware/auth");
    const payload = require("jsonwebtoken").verify(token, SECRET);
    const user = await User.findById(payload.id).select("-password");
    if (!user) return res.status(404).json({ message: "Not found" });
    res.json(user);
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
});

app.listen(3000, () => {
  console.log("🚀 API działa na http://localhost:3000");
});
