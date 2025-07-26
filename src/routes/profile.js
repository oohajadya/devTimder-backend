const express = require('express');
const userAuth = require('../middleware/userAuth');
const User = require('../models/User');
const bcrypt = require('bcrypt')

const profileRouter = express.Router();

// get profile
profileRouter.get("/profile/view",userAuth, async (req, res) => {
  try {
      const {user} = req
      res.send(user);
    }
  catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

// update profile
profileRouter.patch("/profile/edit",userAuth, async (req, res) => {
  try {
    const allowed_updates = ["phoneNumber", "age", "gender"];
    const isUpdateAllowed = Object.keys(req.body).every((k) =>
      allowed_updates.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    const {user} = req;

    const updatedDetails = await User.findByIdAndUpdate(user._id,req.body)
    res.send("user details got updated successfully");
  } catch (err) {
    res.status(400).send("something went wrng"+err.message);
  }
});

// update password
profileRouter.patch('/profile/password',userAuth,async (req,res) => {
    try{
     const {password,newPassword} = req.body
      const {user} = req;
      const isValidOldPassword = await user.validatePassword(password)
     if(!isValidOldPassword){
        throw new Error('old password is incorrect')
     }
     const hashNewPassword = await bcrypt.hash(newPassword,10);
    await User.findByIdAndUpdate(user._id,{password:hashNewPassword})
       res.send('password got updated successfully')
    }catch(err){
        res.status(400).send('Error:'+err.message)
    }

})

module.exports = profileRouter;

