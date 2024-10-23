const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const generateToken = require('./utils/generateToken'); // Import your token utility
require('dotenv').config(); // Make sure you're using dotenv to access env variables

// MongoDB connection string
const MONGOOSEDB_URI = process.env.MONGOOSEDB_URI; // Use the URI from .env
const PORT = process.env.PORT || 3000; // Use the PORT from .env or default to 3000

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies

// Connect to MongoDB
mongoose.connect(MONGOOSEDB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define User Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    isAdmin: Boolean,
}, { timestamps: true });

// Create a User model
const User = mongoose.model('User', userSchema);

// POST /api/login - Login route that generates a JWT
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email }); // Find user by email
        if (user && (await user.matchPassword(password))) { // Assuming you have a method to match passwords
            const token = generateToken(user._id);
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token,
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// DELETE API to delete a user by userId
app.post('/api/users/delete', async (req, res) => {
  try {
      const { userId } = req.body;

      if (!userId) {
          return res.status(400).json({ message: 'User ID is required' });
      }

      // Find and delete the user by userId
      const deletedUser = await User.findByIdAndDelete(userId);

      if (!deletedUser) {
          return res.status(404).json({ message: 'User not found' });
      }

      return res.json({ message: 'User deleted successfully', user: deletedUser });
  } catch (error) {
      console.error('Error deleting user:', error);
      return res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
