const express = require('express');
const userAuth = require('../middleware/userAuth');

const requestRouter = express.Router();

// post the send cnnection request api
requestRouter.post('/sendconnectionrequest',userAuth,async (req,res) => {
  try{
    const {user} = req
    res.send(user.firstName+" send the request")

  }catch(err){
    res.status(404).send("ERROR " +err.message)
  }
})

module.exports = requestRouter

