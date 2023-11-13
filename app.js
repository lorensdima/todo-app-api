const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/config");
const registerRoutes = require("./middlewares/registerRoutes");
const authMiddleware = require("./middlewares/authMiddleware");

const app = express();

// Connect to the database
mongoose.connect(
  `mongodb://${config.db.userName}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.dbName}?directConnection=true`
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", async () => console.log("Connected to MongoDB"));

// Middleware or Authentication
app.use(express.json());
app.use(authMiddleware.isConnectedToDatabase);

// Routes
app.use("/api", registerRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
