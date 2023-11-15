// Dito na yung paggamit ng services. Hiwalay siya sa services kase para magamit yung ibang service ng ibang controller
// para iwas na rin sa duplicates ng mga queries kasi dun sa services nilalagay ang queries
const userService = require("../services/userService");

exports.createUser = async (req, res) => {
  try {
    const { name, password, email } = req.body;

    const user = await userService.createUser(name, password, email);

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
