const express = require("express");
const connectDB = require("./config/database.js");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.js");
const profileRouter = require("./routes/profile.js");
const requestRouter = require("./routes/requests.js");


const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/',authRouter)
app.use('/',profileRouter)
app.use('/',requestRouter)



// listen to the app only if the database connection is successful
connectDB()
  .then(() => {
    console.log("Database connection established successfully");
    app.listen(3000, () => {
      console.log("app is running in the port 3000");
    });
  })
  .catch((err) => console.log("Database is not connected", err));
