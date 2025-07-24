const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    min: 5,
    max: 20,
    trim: true,
  },
  lastName: {
    type: String,
  },
  gender: {
    type: String,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  age: { type: Number },
  phoneNumber: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
