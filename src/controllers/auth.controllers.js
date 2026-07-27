const bcrypt = require("bcrypt");

const User = require("../models/User");
const { generateToken } = require("../helpers/jwt");

// Sign up a new user
const signUp = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error signing up",
      error: error.message,
    });
  }
};

module.exports = {
  signUp,
};
