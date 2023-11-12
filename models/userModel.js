// Eto yung paggawa ng schema sa database/collection na gusto mong access
// pweding di lahat ng fields ay ang ilagay mo sa schema
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
});
// (name nagusto mo para sa model, yung schema ng collection, name ng mismong collection sa MongoDB)
const User = mongoose.model("RegisteredUser", userSchema, "registeredUsers");

module.exports = User;
