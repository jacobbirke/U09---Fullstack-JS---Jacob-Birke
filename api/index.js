const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;
app.use(express.json());


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
//database seeder routes
app.use("/api/seed", databaseSeeder);


//routes for users
app.use("/api/users", userRoute);

app.listen(PORT || 9000, () => {
  console.log(`server listening on port ${PORT}`);
});
