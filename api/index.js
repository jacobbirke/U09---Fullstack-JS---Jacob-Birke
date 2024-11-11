const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9000; // Default to 9000 if PORT is not set

// Connect to MongoDB
mongoose
  .connect(process.env.MONGOOSEDB_URI)
  .then(() => console.log("db connected"))
  .catch((err) => {
    console.error("Connection error", err);
  });

// CORS Options
const corsOptions = {
  origin: [
    'https://u09-fullstack-js-jacob-birke-bohc.vercel.app', // Frontend deployed URL
    'https://u09-fullstack-js-jacob-birke-bohc-nkl9amn86.vercel.app/',
    'http://localhost:5173' // Local development URL
  ],
  credentials: true, // If you're using cookies or session-based auth
};

// Apply CORS middleware
app.use(cors(corsOptions));
app.use(express.json());

// Import routes
const databaseSeeder = require("./databaseSeeder");
const userRoute = require("./Routes/User");
const productRoute = require("./Routes/Product");
const orderRoute = require("./Routes/Order");

// Database seeder routes
app.use("/api/seed", databaseSeeder);

// API routes (Handle API endpoints)
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);

// PayPal configuration route
app.use("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

// Serve static files from the frontend build (React app assets like JS, CSS, images)
app.use(express.static(path.join(__dirname, 'frontend/build')));

// Catch-all handler for frontend routes (i.e., React Router handles navigation)
app.get('*', (req, res) => {
  if (req.headers.accept && req.headers.accept.includes('text/html')) {
    // Only serve index.html for requests that need React Router to handle them
    res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
