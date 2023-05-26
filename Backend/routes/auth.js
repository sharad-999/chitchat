const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../Model/User');

const router = express.Router();

router.post('/verifytoken', async (req, res) => {
    const authToken = req.body.authToken;
    
    if(!authToken){
        return res.status(400).json({error:"auth token is missing"})
    }
    try {
        const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
        const id= decoded.user.id;
        const user=await User.findById(id);
        if(!user){
            return res.status(400).json({ error: "Token Not valid" })
        }
        console.log('user', user)
        res.status(200).json({success: 'user Authenticated Successfully' });
    } catch (error) {
        // console.log('decode', decode);
        return res.status(400).json({error:error})
    }
});

module.exports = router;