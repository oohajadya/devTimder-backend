const mongoose = require("mongoose");
const {isEmail} = require('validator')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


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
    validate:(value) => {
       if(!isEmail(value))
        throw new Error('please enter a valid email')
    }
  },
  password:{
    type:String,
    required:true
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

userSchema.methods.getJWT = async function(){
  const user = this;
   // create a jwt token
        const token = await jwt.sign({ userId: user._id }, "devtinder$99");       
        return token;
}

userSchema.methods.validatePassword = async function(userInputPassword){
  const user = this;
  // hash the password
  const passwordHash = user.password;
  const isvalidatePassword = await bcrypt.compare(userInputPassword,passwordHash)
  console.log(isvalidatePassword)
  return isvalidatePassword;

}

const User = mongoose.model("User", userSchema);

module.exports = User;
