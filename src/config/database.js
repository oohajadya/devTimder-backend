const mongoose = require('mongoose')

const connectDB = async () => {
    await mongoose.connect('mongodb+srv://learnmongo:OCedqO09cAPKGqd4@mern.mmhudbr.mongodb.net/DevTinder')
}

module.exports = connectDB