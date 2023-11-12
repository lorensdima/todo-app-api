require("dotenv").config();

module.exports = {
  // Your configuration parameters (e.g., database connection details)
  db: {
    host: process.env.DATABASE_URL,
    port: 27017,
    dbName: "mydatabase",
    userName: "clients",
    password: "ourclients",
  },
  // Other configuration options...
};
