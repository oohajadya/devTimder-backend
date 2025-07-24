const express = require("express");
const connectDB = require("./config/database.js");
const User = require("./models/User.js");

const app = express();
app.use(express.json())


// creat a user
app.post("/signup", async (req, res) => {
  // creating a instance of user
  const { firstName, lastName, gender, age, emailId } = req.body;
  const userObj = new User({firstName, lastName, gender, age, emailId });
  try {
    await userObj.save();
    res.send("User data successfully updated");
  } catch (err) {
    res.status(401).send("issue with saving the data in database", err);
  }
});

// get the user details via email
app.get('/user',async (req,res) => {

    try{
        const user = await User.findOne({emailId: req.body.emailId})
        if(!user) 
            return res.status(404).send('User not found')
        else 
        res.send(user)
    }
    catch(err){
      res.status(401).send('error finding user',err)
    }

})

// get all users from DB
app.get('/feed', async (req,res) => {
    try{
        const users = await User.find({}) 
        if(!users.length){
            res.status(400).send('No users found')
        }else{
            res.send(users)
        }
    }
    catch(err){
      res.status(401).send('error finding user',err)
    }

})

// listen to the app only if the database connection is successful
connectDB()
  .then(() => {
    console.log("Database connection established successfully");
    app.listen(3000, () => {
      console.log("app is running in the port 3000");
    });
  })
  .catch((err) => console.log("Database is not connected", err));
