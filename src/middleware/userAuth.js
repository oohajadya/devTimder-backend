const jwt = require('jsonwebtoken')
const User = require('../models/User')

const userAuth = async (req,res,next) => {
  try{
 
    // get the token from the cookie
    const {token} = req.cookies
    if(!token){
        throw new Error('Invalid token please relogin')
    }
    // verify the token and retrive the user id
    const decodedMessage = await jwt.verify(token,'devtinder$99')
    const _id = decodedMessage.userId;
    // retrieve the user details from the db if user exists
    const user = await User.findById(_id);
    if(!user){
        throw new Error('User not found')
    }
    else{
        req.user = user;
        next()
    }
  
  }catch(err){
    res.status(400).send("ERROR "+err.message)
  }
   

}

module.exports = userAuth