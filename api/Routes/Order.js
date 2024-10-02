const express = require("express");
const orderRoute = express.Router();
const protect = require("../Middleware/Auth");
const asyncHandler = require("express-async-handler");
const Order = require("../Models/Order");

orderRoute.post(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethods,
      shippingPrice,
      taxPrice,
      totalPrice,
      price,
    } = req.body;
    if (orderItems && orderItems.lengt === 0) {
      res.status(400);
      throw new Error("Ingen order hittad");
    } else {
      const order = new Order ({
        orderItems,
        shippingAddress,
        paymentMethods,
        shippingPrice,
        taxPrice,
        totalPrice,
        price,
        user:req.user._id
      });
      const createdOrder = await order.save(); 
      res.status(201).json(createdOrder)
    }
  })
);


module.exports = orderRoute;