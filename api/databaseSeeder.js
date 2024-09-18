const router = require('express').Router();
const User = require('./Models/User')
const users = require('./Data/Users')
const Product = require('./Models/Products')
const Products = require('./Data/Products')

router.post('/Users', async(req,res)=>{
  await User.deleteMany({});
  const UserSeeder = await User.insertMany(users);
  res.send({UserSeeder})
});

router.post('/Products', async(req,res)=>{
  await Product.deleteMany({});
  const ProductSeeder = await Product.insertMany(Products);
  res.send({ProductSeeder})
});


module.exports = router;