const jwt = require("jsonwebtoken");

const SECRET = "secret123";

function authenticate(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: "Missing token" });

  try {
    const token = auth.split(" ")[1];
    const payload = jwt.verify(token, SECRET);
    req.userId = payload.id;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}

function generateToken(user) {
  const payload = { id: user._id, role: user.role };
  const accessToken = jwt.sign(payload, SECRET, { expiresIn: "15m" });
  const refreshToken = jwt.sign(payload, SECRET, { expiresIn: "7d" });
  return { accessToken, refreshToken };
}

module.exports = {
  SECRET,
  authenticate,
  generateToken,
};
