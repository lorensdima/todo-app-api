// Eto yung paggawa ng schema sa database/collection na gusto mong access
// pweding di lahat ng fields ay ang ilagay mo sa schema
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: { type: String },
  name: { type: String },
  password: { type: String },
  email: { type: String },
});

// Hash the password before saving the user
userSchema.pre("save", async function (next) {
  const user = this;

  // Hash the password only if it's modified or a new user
  if (!user.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

// (name nagusto mo para sa model, yung schema ng collection, name ng mismong collection sa MongoDB)
const User = mongoose.model("RegisteredUser", userSchema, "registeredUsers");

module.exports = User;
