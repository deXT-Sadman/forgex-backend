const jwt = require("jsonwebtoken");
const config = require("../config");

// Generate a JWT token
const generateToken = (user) => {
  const payload = {
    id: user._id,
    username: user.username,
    email: user.email,
  };

  const token = jwt.sign(payload, config.jwtSecret, { expiresIn: "30d" });
  return token;
};

// Verify a JWT token
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    return decoded;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
