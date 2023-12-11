const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/config");
const registerRoutes = require("./middlewares/registerRoutes");
const authMiddleware = require("./middlewares/authMiddleware");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/userModel");
const session = require("express-session");
const passport = require("passport");

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
app.use(cors());

const sessionSecret = process.env.SESSION_SECRET || "default-secret-key";

app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(
    { usernameField: "username" },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ username: username }).exec();

        // If user not found or password is incorrect
        if (!user || !bcrypt.compareSync(password, user.password)) {
          return done(null, false, { message: "Invalid username or password" });
        }

        // If credentials are correct, return the user object
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).exec();
    done(null, user);
  } catch (error) {
    return done(error);
  }
});

// Routes
app.use("/api", registerRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
