const express = require("express");
const AsyncHandler = require("express-async-handler");
const User = require("../Models/User");
const generateToken = require("../TokenGenerate");
const protect = require("../Middleware/Auth");
const admin = require("../Middleware/Admin"); // Ensure you have this middleware created

const userRoute = express.Router();

// Login Route
userRoute.post(
  "/login",
  AsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
        createdAt: user.createdAt,
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  })
);

// Register Route
userRoute.post(
  "/",
  AsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const existUser = await User.findOne({ email });
    
    if (existUser) {
      res.status(400);
      throw new Error("User already registered");
    } else {
      const user = await User.create({ name, email, password });

      if (user) {
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          createdAt: user.createdAt,
        });
      } else {
        res.status(400);
        throw new Error("Invalid user data");
      }
    }
  })
);

// Get Profile Data
userRoute.get(
  "/profile",
  protect,
  AsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

// Update Profile Data
userRoute.put(
  "/profile",
  protect,
  AsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      if (req.body.password) {
        user.password = req.body.password;
      }
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        createdAt: updatedUser.createdAt,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

// Get All Users (Admin only)
userRoute.get(
  "/",
  protect,
  admin, // Only admin can access this route
  AsyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
  })
);

// Get User by ID (Admin only)
userRoute.get(
  "/:id",
  protect,
  admin,
  AsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

// Update User (Admin only)
userRoute.put(
  "/:id",
  protect,
  admin,
  AsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        createdAt: updatedUser.createdAt,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

// Delete User (Admin only)
userRoute.post(
  "/delete",
  protect,
  admin,
  AsyncHandler(async (req, res) => {
    try {
      const { userId } = req.body;

      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }

      // Find the user by ID and delete them
      const deletedUser = await User.findByIdAndDelete(userId);

      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ message: "User deleted successfully", user: deletedUser });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  })
);


module.exports = userRoute;
