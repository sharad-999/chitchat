const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../Model/User');
const Chat = require('../Model/Chat')
const axios = require("axios");

// for jwt validation
router.post('/verifytoken', async (req, res) => {
    const authToken = req.body.authToken;

    if (!authToken) {
        return res.status(400).json({ error: "auth token is missing" })
    }
    try {
        const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
        const id = decoded.user.id;
        const user = await User.findById(id);
        if (!user) {
            return res.status(400).json({ error: "Token Not valid" })
        }
        console.log('user', user)

        res.status(200).json({ success: 'user Authenticated Successfully', user: user });
    } catch (error) {
        // console.log('decode', decode);
        return res.status(400).json({ error: error })
    }
});

// for openAI API call
router.post('/chat', async (req, res) => {
    const { inputvalue, user } = req.body
    // console.log('inputvalue', inputvalue)

    // meet's model
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPEN_AI_API_KEY}`,
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: JSON.stringify(inputvalue) }],
        }),
    };
    try {
    //     const user = await Chat.find({ userID: req.id });
    //     if (user.length === 0 || user[0]?.counter < 5) {
        await axios("https://api.openai.com/v1/chat/completions", options)
            .then((res) => { console.log(res), res.json() })
    //     .then(async (data) => {
    //         let ans = data.choices[0].message.content;
    //         const obj = {
    //             question: input,
    //             answer: ans,
    //         };
    //         const filter = {
    //             userID: req.id,
    //         };
    //         const update = {
    //             $push: { history: obj },
    //             $inc: { counter: 1 },
    //         };
    //         const updatedData = await Chat.findOneAndUpdate(filter, update, {
    //             upsert: true,
    //             new: true,
    //         });
    //         res.status(200).json(updatedData.history);
    //         // res.status(200).json({ message: "Successfully Answered" });
    //     });
    //     } else {
    //     const filter = {
    //         userID: req.id,
    //     };
    //     const update = {
    //         counter: 0,
    //     };
    //     await Chat.findOneAndUpdate(filter, update, {
    //         new: true,
    //     });
    //     res.status(200).json({
    //         message:
    //             "You reached your limit!! Are you want to reset your account??",
        // });
        }
    catch (error) {
        console.log("error", error);
        res.status(401).json({ message: "Something went wrong" });
    }

    // sharad's model
    // openAI configuration
    const client = axios.create({
        headers: {
            Authorization: "Bearer " + process.env.OPENAI_API_KEY,
        },
    });
    const params = {
        prompt:inputvalue ,
        model: "gpt-3.5-turbo",
        max_tokens:70,
        temperature: 0,
    };
    client
        .post("https://api.openai.com/v1/chat/completions", params)
        .then(async(completion) => {
            console.log(completion.data.choices[0].text);
            const chat = await Chat.create({ 
                user: user._id,
                question: inputvalue,
                answer: completion.data.choices[0].text
            })
            console.log('chat', chat)
            res.json({ answer: completion.data.choices[0].text });
        })
        .catch(async(err) => {
            console.log('err', err)
            const chat = await Chat.create({
                user: user._id,
                question: inputvalue,
                answer: Math.random()
            })
            res.json({ answer: chat.answer});
            console.log(err);
        });
    // try {
    //     const completion=await openai.createChatCompletion({
    //         model: "gpt-3.5-turbo",  
    //         messages:[
    //             { "role": "user", "content": inputvalue },
    //         ]
    //     })
    //     console.log(completion.data);
    //     res.send({ ans:completion.data.choices[0].text});
    // } catch (error) {
    //     res.send(error);

    //     console.log('error openAI', error)
    // }
})

router.post('/fetchchat', async (req, res) => {
    const user = req.body.user;
    try {
        const notes = await Chat.find({ user: user._id });
        // console.log('notes', notes) 
        res.status(200).json({ notes })

    } catch (error) {
        console.log('err', error)
    }
})

router.patch('/refreshlimit', async (req, res) => {
    const user = req.body.user;
    try {
        const updateduser = await User.findByIdAndUpdate(user._id, { limit: user.limit + 5 });
        return res.json({ success: "Your Limit increased.", user: updateduser })
    } catch (error) {
        console.log('error', error)
    }
})

module.exports = router;