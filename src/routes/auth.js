const express = require('express');
const { validateSignupData, validateLoginData } = require('../utils/validation');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const authRouter = express.Router();

// signup
authRouter.post("/signup", async (req, res) => {
  // creating a instance of user

  try {
    const { firstName, lastName, gender, age, emailId, password } = req.body;
    validateSignupData(firstName, lastName, emailId, password);

    // encrypt paswword before saving it into DB
    const passwordHash = await bcrypt.hash(password, 10);

    const userObj = new User({
      firstName,
      lastName,
      gender,
      age,
      emailId,
      password: passwordHash,
    });

    await userObj.save();
    res.send("User data successfully updated");
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

// login
authRouter.post("/login", async (req, res) => {
  const { emailId, password } = req.body;
  try {
    validateLoginData(emailId, password);
    // get password from DB
    const dbUser = await User.findOne({ emailId });
    if (!dbUser) {
      throw new Error("Email address doesnt exists");
    } 
    const isSamePassword = await dbUser.validatePassword(password)
      if (isSamePassword) {
        // sending token in the cookie
        const token = await dbUser.getJWT();
        res.cookie("token", token);
        res.send("login successful");
      } else {
        throw new Error("Invalid Credentials");
      }
    
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

// logout
authRouter.post("/logout",async (req,res) => {
    // res.cookie('token',null,{expires: new Date(Date.now())})
    res.clearCookie('token')
    res.send('Logout Successfully')

})

module.exports = authRouter