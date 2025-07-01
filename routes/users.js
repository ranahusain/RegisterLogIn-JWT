const express = require("express");
const router = express.Router();

//instead of defining my apis in the seperate file (server.js)
//i define them in a sperate file and for that i use router

const User = require("../models/userModel");
//import everything from model and give it to User variable
//CRUD operations

//when some uses /users this will run
//http://localhost:3000/api/users/

//req that client sends
//res that server sends

//await is used to get a response and then move further
//aisa no ho ki response aya nai aur agy move krdiye

//Read
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

//Create
router.post("/users", async (req, res) => {
  console.log("Received request for POST method");
  try {
    const { name, age, weight } = req.body;
    const newUser = new User({ name, age, weight });
    await newUser.save();
    res.status(200).json({
      success: true,
      user: newUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

//update
//:id is the placeholder gets the id and use it as parameter
router.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, age, weight } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, { name, age, weight });

    if (!updatedUser) {
      res.json({
        message: "User Not found",
      });
    }
    //but if you have updated the user successfully
    res.status(200).json({
      success: true,
      user: updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

//delete
router.delete("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      res.json({
        message: "User not found",
      });
    }
    //if user found and deleted successfully
    res.status(200).json({
      success: true,
      user: deletedUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
