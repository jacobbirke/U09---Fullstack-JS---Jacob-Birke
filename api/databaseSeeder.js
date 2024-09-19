const router = require("express").Router();
const User = require("./Models/User");
const users = require("./Data/Users");
const Product = require("./Models/Products");
const Products = require("./Data/Products");
const AsynHandler = require("express-async-handler");

router.post(
  "/users",
  AsynHandler(async (req, res) => {
    await User.deleteMany({});
    const UserSeeder = await User.insertMany(users);
    res.send({ UserSeeder });
  })
);

router.get(
  "/products",
  AsynHandler(async (req, res) => {
    await Product.deleteMany({});
    const ProductSeeder = await Product.insertMany(products);
    res.send({ ProductSeeder });
  })
);

module.exports = router;
