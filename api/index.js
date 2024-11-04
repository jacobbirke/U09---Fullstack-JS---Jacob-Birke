const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");  // Path module for serving static files

dotenv.config();

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
    'https://u09-fullstack-js-jacob-birke-bohc.vercel.app', 
    'http://localhost:5173'
  ], 
  credentials: true, 
};

// Apply CORS middleware with options before defining routes
app.use(cors(corsOptions));
app.use(express.json());

// Import routes
const databaseSeeder = require("./databaseSeeder");
const userRoute = require("./Routes/User");
const productRoute = require("./Routes/Product");
const orderRoute = require("./Routes/Order");

// Database seeder routes
app.use("/api/seed", databaseSeeder);

// Routes for users
app.use("/api/users", userRoute);

// Routes for products
app.use("/api/products", productRoute);

// Routes for orders
app.use("/api/orders", orderRoute);

// PayPal configuration
app.use("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Catch-all handler for any requests not handled above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
