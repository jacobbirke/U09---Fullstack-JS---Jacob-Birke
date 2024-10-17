const express = require("express");
const app = express();
const dotenv = require("dotenv");
const serverless = require('serverless-http');
dotenv.config();
const PORT = process.env.PORT;
const cors = require("cors");
const mongoose = require("mongoose");
//connect db
mongoose
  .connect(process.env.MONGOOSEDB_URI)
  .then(() => console.log("db connected"))
  .catch((err) => {
    console.error("Connection error", err);
  });

const databaseSeeder = require("./databaseSeeder");
const userRoute = require("./Routes/User");
const productRoute = require("./Routes/Product");
const orderRoute = require("./Routes/Order");

app.use(express.json());

app.use(cors());

//database seeder routes
app.use("/api/seed", databaseSeeder);

//routes for users
app.use("/api/users", userRoute);

//routes for products
app.use("/api/products", productRoute);

//routes for order
app.use("/api/orders", orderRoute);

app.listen(PORT || 9000, () => {
  console.log(`server listening on port ${PORT}`);
});

//paypal pay
app.use("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

module.exports = app;
module.exports.handler = serverless(app);

