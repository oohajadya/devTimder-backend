const express = require("express");
const connectDB = require("./config/database.js");
const User = require("./models/User.js");

const app = express();
app.use(express.json())

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

// listen to the app only if the database connection is successful
connectDB()
  .then(() => {
    console.log("Database connection established successfully");
    app.listen(3000, () => {
      console.log("app is running in the port 3000");
    });
  })
  .catch((err) => console.log("Database is not connected", err));
