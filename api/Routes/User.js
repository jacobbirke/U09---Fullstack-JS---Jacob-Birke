const express = require("express");
const userRoute = express.Router();
const AsynHandler = require("express-async-handler");
const User = require("../Models/User");
const generateToken = require("../TokenGenerate");
const protect = require("../Middleware/Auth");
userRoute.post(
  "/login",
  AsynHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
        createdAt: user.createdAt,
      });
    } else {
      res.status(401);
      throw new Error("Fel mail eller lösenord");
    }
  })
);

//register route
userRoute.post(
  "/",
  AsynHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const existUser = await User.findOne({ email });
    if (existUser) {
      res.status(400);
      throw new Error("Användaren är redan regristerad");
    } else {
      const user = await User.create({
        name,
        email,
        password,
      });

      if (user) {
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          createdAt: user.createdAt,
        });
      } else {
        res.status(400);
        throw new Error("Felaktig inmatning");
      }
    }
  })
);

//profile data
userRoute.get(
  "/profile",
  protect,
  AsynHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
      });
    } else {
      res.status(404);
      throw new Error("Användare ej hittad");
    }
  })
);

module.exports = userRoute;
