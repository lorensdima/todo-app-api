const userService = require("../services/userService");
const bcrypt = require("bcryptjs");
const passport = require("passport");

exports.createUser = async (req, res) => {
  try {
    const { username, name, password, email } = req.body;

    const user = await userService.createUser(username, name, password, email);

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userService.getUsers();
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Other controller functions...
// Controller function to handle GET requests with a 'name' parameter
exports.getUserData = async (req, res) => {
  try {
    const usernameInput = req.params.username;

    // Use the userService to create an object with the provided string
    const userObject = await userService.getUserData(usernameInput);

    res.json({ userObject });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      // Authentication failed
      return res.status(401).json({ message: "Authentication failed" });
    }

    // Log in the user
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.json({ message: "Login successful", user });
    });
  })(req, res, next);
};

exports.authorize = async (req, res) => {
  try {
    const { username, password } = req.body;

    const userObject = await userService.getUserData(username);

    const storedPassword = userObject.password;

    const compareFlag = await bcrypt.compare(password, storedPassword);

    return compareFlag
      ? res.json({ status: true, user: userObject })
      : res.json({ status: false });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
