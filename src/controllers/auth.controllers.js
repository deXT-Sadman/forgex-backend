const bcrypt = require("bcrypt");

const User = require("../models/User");
const { generateToken } = require("../helpers/jwt");

// Sign up a new user
const signUp = async (req, res) => {
  const { username, email, password } = req.body;

  // Hash the password
  const passwordHash = await bcrypt.hash(password, 10);

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Create a new user
  const newUser = new User({ username, email, passwordHash });
  await newUser.save();

  // Generate a JWT token for the new user
  const token = generateToken(newUser);

  // Respond with the new user and token
  // User object is returned without the passwordHash for security reasons
  const userResponse = {
    _id: newUser._id,
    username: newUser.username,
    email: newUser.email,
    profileImageUrl: newUser.profileImageUrl,
    createdAt: newUser.createdAt,
  };

  res.status(201).json({
    success: true,
    message: "User created successfully",
    data: {
      user: userResponse,
      token,
    },
  });
};

// Login a user
const login = async (req, res) => {
  const { email, password } = req.body;

  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  // Compare the provided password with the stored hash
  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    return res.status(400).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  // Generate a JWT token for the user
  const token = generateToken(user);

  // Respond with the user and token
  const userResponse = {
    _id: user._id,
    username: user.username,
    email: user.email,
    profileImageUrl: user.profileImageUrl,
    createdAt: user.createdAt,
  };

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: {
      user: userResponse,
      token,
    },
  });
};

// Forget password
const forgetPassword = async (req, res) => {
  res.status(500).json({
    success: false,
    message: "Email service is not yet implemented. Please try again later.",
  });
};

module.exports = {
  signUp,
  login,
  forgetPassword,
};
