const mongoose = require("mongoose");
const { Schema, model } = mongoose; //destructuring done here 7.destruncturing

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50,
  },
  age: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const userModel = model("User", userSchema);
//User is the name of model and userSchema is the name of the schema

module.exports = userModel;
//export MODEL
