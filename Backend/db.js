const mongoose=require('mongoose')
const dotenv = require('dotenv')
require('dotenv').config()

// Database connection
const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    console.log('Database connected successfully.');
}

connectDB();