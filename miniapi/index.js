const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const SECRET = "secret123";
const USERS = [
  { id: 1, login: "admin", password: "admin123", firstName: "Anna", lastName: "Nowak", role: "admin" },
  { id: 2, login: "dev1", password: "dev123", firstName: "Michał", lastName: "Kowalski", role: "developer" },
];

function generateToken(user) {
  const payload = { id: user.id, role: user.role };
  const accessToken = jwt.sign(payload, SECRET, { expiresIn: "15m" });
  const refreshToken = jwt.sign(payload, SECRET, { expiresIn: "7d" });
  return { accessToken, refreshToken };
}

// 🔐 Login endpoint
app.post("/auth/login", (req, res) => {
  const { login, password } = req.body;
  const user = USERS.find(u => u.login === login && u.password === password);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const tokens = generateToken(user);
  res.json(tokens);
});

// 🔄 Refresh token
app.post("/auth/refresh", (req, res) => {
  const { refreshToken } = req.body;
  try {
    const payload = jwt.verify(refreshToken, SECRET);
    const user = USERS.find(u => u.id === payload.id);
    if (!user) throw new Error();
    res.json(generateToken(user));
  } catch {
    res.status(401).json({ message: "Invalid refresh token" });
  }
});

// 👤 Get current user
app.get("/auth/me", (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: "Missing token" });
  try {
    const token = auth.split(" ")[1];
    const payload = jwt.verify(token, SECRET);
    const user = USERS.find(u => u.id === payload.id);
    if (!user) return res.status(404).json({ message: "Not found" });

    const { password, ...userData } = user;
    res.json(userData);
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
});

app.listen(3000, () => {
  console.log("Auth API running on http://localhost:3000");
});
