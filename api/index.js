const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;

const mongoose = require("mongoose");

//connect db
mongoose
  .connect(process.env.MONGOOSEDB_URI)
  .then(() => console.log("db connected"))
  .catch((err) => {
    console.error("Connection error", err);
  });

  const databaseSeeder = require('./databaseSeeder')
  //database seeder routes
  app.use('/api/seed',databaseSeeder )
app.listen(PORT || 9000, () => {
  console.log(`server listening on port ${PORT}`);
});
