const express = require('express');
const router = express.Router();
const User = require('../Model/User')
const bcrypt =require('bcrypt');
const jwt = require('jsonwebtoken')

router.get('/login',(req,res)=>{
    res.send('login')
})
router.get('/signup',(req,res)=>{
    res.send('signup')
})

// Route 1: signup
router.post('/signup', async (req, res) => {
    try {
        // get data
        const { username, password } = req.body;

        const isexist = await User.findOne({username})
        if (isexist) {
            return res.status(400).json({ error: 'user already exist' })
        }

        // save user in DB
        const hpassword =await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            password: hpassword
        })
        res.status(200).json({ user})

    } catch (error) {
        console.log({ error: error.message})
        res.status(500).send({ error: 'something went wrong' })
    }
    
})

// Route 2: Login
router.post('/login',async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json('Wrong credentials');
        }

        const ismatch =await bcrypt.compare(password, user.password)
        if (!ismatch) {
            return res.status(400).json('Wrong credentials');
        }

        // jwt
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '1d' })
        return res.cookie("authToken", authToken, {
            httpOnly: true,
        }).status(200).json({ accessToken: authToken , success:"Loggedin Sucessfully" });

    } catch (error) {
        console.log({ 'error': error })
        res.status(500).send({ error: 'something went wrong' })
    }
    
});

module.exports = router;