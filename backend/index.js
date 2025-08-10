const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./db/config");

const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");

const app = express();
app.use(express.json());
app.use(cors());

// Mount auth routes under /api/auth
app.use("/api/auth", authRoutes);

// Mount book routes under /api/books
app.use("/api/books", bookRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
