const express = require("express");
const app = express();
const connectDB = require("./db");
const users = require("./routes/users");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const PORT = 3000;

//middleWare
app.use(express.json());
app.use(cookieParser());

connectDB();

app.use("/api", users);

app.post("/register", async (req, res) => {
  try {
    //get all data from body
    const { name, email, password } = req.body;
    if (!(name && email && password)) {
      return res.status(400).send("All fields are required");
    }

    //check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists with this email");
    }

    //encrypt password
    const myEncPassword = await bcrypt.hash(password, 10);

    //save user to database
    const user = await User.create({
      name,
      email,
      password: myEncPassword,
    });

    //generate JWT token for user and send it
    const token = jwt.sign(
      { id: user._id },
      "shhhh", //use something like process.env.jwtsecret);
      { expiresIn: "2h" }
    );

    user.token = token;
    user.password = undefined;

    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    //get the data from frontend
    const { email, password } = req.body;

    //validation
    if (!email && !password) {
      res.status(400).send("all feilds required");
    }

    //find user in DB
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .send("User doesn't exists with this email or password");
    }

    //match the password
    // await bcrypt.compare(password,user.password)
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { id: user._id },
        "shhhh", //use something like process.env.jwtsecret);
        { expiresIn: "2h" }
      );

      user.token = token;
      user.password = undefined;

      //send token in user Cookie
    }
    //send a token
  } catch (error) {
    console.log(error);
  }
});

app.get("/", (req, res) => {
  console.log("Inside home page route handler");
  res.send("Welcome");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

app.listen(PORT, () => {
  console.log("Server Running");
});
