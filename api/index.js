const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;

const mongoose = require("mongoose"); 

//connect db
mongoose.connect(process.env.MONGOOSEDB_RUL)
  .then(() => console.log("db connected"))
  .catch((err) => {
    console.error("Connection error", err); 
  });

app.listen(PORT || 9000, () => {
  console.log(`server listening on port ${PORT}`);
});
