const express = require("express");
const app = express();
const connectDB = require("./db");
const users = require("./routes/users");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

const PORT = 3000;

app.use(express.json());

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
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
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
