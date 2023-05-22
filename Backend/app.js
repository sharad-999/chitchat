const express = require('express');
const app = express();
const cookieParser=require('cookie-parser')
const PORT = process.env.PORT || 5000;

// Databadse connection
const connectDB = require('./db');

app.use(express.json());
app.use(cookieParser());

// web routes
app.use('/',require('./routes/web'))
app.use('/',require('./routes/auth'))

// Server 
app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
})