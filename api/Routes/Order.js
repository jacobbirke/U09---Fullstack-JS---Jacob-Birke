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
      paymentMethod,
      shippingPrice,
      taxPrice,
      totalPrice,
      price,
    } = req.body;
    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error("Ingen order hittad");
    } else {
      const order = new Order({
        orderItems,
        shippingAddress,
        paymentMethod,
        shippingPrice,
        taxPrice,
        totalPrice,
        price,
        user: req.user._id,
      });
      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    }
  })
);

//order payment route
orderRoute.put(
  "/:id/payment",
  protect,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        updated_time: req.body.uptades_time,
        email_address: req.body.email_address,
      };
      const updatedOrder = await order.save();
      res.status(200).json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("Order ej hittad");
    }
  })
);

// get all orders
orderRoute.get(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id }).sort({ _id: -1 });
    if (orders) {
      res.status(200).json(orders);
    } else {
      res.status(404);
      throw new Error("Ordrar ej hittad");
    }
  })
);

// get one order by id
orderRoute.get(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate("user", "email");
    if (order) {
      res.status(202).json(order);
    } else {
      res.status(404);
      throw new Error("Order ej hittad");
    }
  })
);

module.exports = orderRoute;