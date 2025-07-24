const express = require('express');
const connectDB = require('./config/database.js')

const app = express();

// listen to the app only if the database connection is successful
connectDB()
.then(() => {
   console.log('Database connection established successfully')
   app.listen(3000,() => {
    console.log('app is running in the port 3000')
})
})
.catch((err) => console.log('Database is not connected',err))

