const mongoose=require('mongoose');

const ChatSchema=new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    question:{
        type:String,
        required:true
    },
    answer:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('chat',ChatSchema)