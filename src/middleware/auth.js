const { verifyToken } = require("../helpers/jwt");

const authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access denied. No token provided.",
    });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid token.",
    });
  }
};

module.exports = { authenticate };
