const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config(); // Load variables from .env

const uri = process.env.MONGO_URI;

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));
