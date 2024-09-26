const express = require("express");
const userRoute = express.Router();
const AsynHandler = require("express-async-handler");
const User = require("../Models/User");
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
        token: null,
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
      })

      if(user){
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          createdAt: user.createdAt,
        });

      }else{
        res.status(400);
        throw new Error("Felaktig inmatning")
      }


    }
  })
);

module.exports = userRoute;
