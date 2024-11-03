const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const MONGOOSEDB_URI = process.env.MONGOOSEDB_URI;
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

// Set up CORS
const corsOptions = {
    origin: 'https://u09-fullstack-js-jacob-birke-bohc.vercel.app', // No trailing slash
    credentials: true,
};
app.use(cors(corsOptions));

// Connect to MongoDB
mongoose.connect(MONGOOSEDB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define your models here (Orders, Products, Users)

// Define your routes here
app.get('/api/orders', async (req, res) => {
    // Your existing route logic
});

app.get('/api/products', async (req, res) => {
    // Your existing route logic
});

app.get('/api/users', async (req, res) => {
    // Your existing route logic
});

app.post('/api/users/delete', async (req, res) => {
    // Your existing route logic
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
