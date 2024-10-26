const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

const MONGOOSEDB_URI = process.env.MONGOOSEDB_URI; // Use the URI from .env
const PORT = process.env.PORT || 3000; // Use the PORT from .env or default to 3000

const app = express();
app.use(express.json()); // To parse JSON bodies

// Connect to MongoDB
mongoose.connect(MONGOOSEDB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Order model
const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    orderItems: [{ type: Object }],
    shippingAddress: { type: Object },
    paymentMethod: { type: String },
    taxPrice: { type: Number },
    shippingPrice: { type: Number },
    totalPrice: { type: Number },
    isPaid: { type: Boolean },
    isDelivered: { type: Boolean },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    paidAt: { type: Date },
    paymentResult: { type: Object }
});
const Order = mongoose.model('Order', orderSchema);

// Product model
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: Number, required: true },
    numReview: { type: Number, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true }
});
const Product = mongoose.model('Product', productSchema);

// User model
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false }
}, { timestamps: true });
const User = mongoose.model('User', userSchema);

// Routes for Orders
app.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.find().populate('user', 'name email'); // Populate user info if needed
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Routes for Products
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Routes for Users
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Exclude password for security
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST API to delete a user by userId
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

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const corsOptions = {
    origin: 'https://u09-fullstack-js-jacob-birke-bohc-goejsy5i1.vercel.app/', 
    credentials: true, 
  };

  app.use(cors(corsOptions));