const bcrypt = require("bcrypt");
const User = require("../models/User");

const getMe = async (req, res) => {
  const userId = req.user.id;
  const user = await User.findById(userId).select("-passwordHash"); // 👈 was "-password", didn't match the schema field

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    data: { user },
  });
};

const updateMe = async (req, res) => {
  const userId = req.user.id;
  const { password, ...rest } = req.body;

  // Map the client's "password" field to the schema's "passwordHash",
  // and actually hash it before saving.
  const updates = { ...rest };
  if (password) {
    updates.passwordHash = await bcrypt.hash(password, 10);
  }

  const user = await User.findByIdAndUpdate(userId, updates, {
    new: true,
    runValidators: true,
  }).select("-passwordHash"); // 👈 was "-password"

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    data: { user },
  });
};

module.exports = { getMe, updateMe };