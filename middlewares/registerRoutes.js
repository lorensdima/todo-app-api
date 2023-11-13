const fs = require("fs");
const express = require("express");
const router = express.Router();
const path = require("path");

function loadRoutes(directory) {
  // Use path.join to create an absolute path based on __dirname
  const absolutePath = path.join(__dirname, directory);

  const routeFiles = fs.readdirSync(absolutePath);

  routeFiles.forEach((file) => {
    const filePath = path.join(absolutePath, file);
    const route = require(filePath);

    // Assuming each route module exports an Express router
    router.use(route);
  });
}

// Load initial routes
loadRoutes("../routes");

module.exports = router;
