const {isEmail, isStrongPassword} = require('validator')

const validateSignupData = (firstName, lastName, emailId,password) => {

    if(!firstName || !lastName){
        throw new Error('Name is not valid')
    }
    else if(!isEmail(emailId)){
        throw new Error('Email id not valid')
    }
    else if(!isStrongPassword(password)){
        throw new Error('please enter a strong valid password')
    }

}

const validateLoginData = (emailId,password) => {
    if(!emailId || !password){
        throw new Error('Email address or password cannot be empty')
    }
}
module.exports = {validateSignupData,validateLoginData}